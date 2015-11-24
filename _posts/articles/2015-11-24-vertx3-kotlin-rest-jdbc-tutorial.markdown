---
layout: post
title: "Tutorial: Vertx3 + Kotlin para montar un API REST por persistencia JDBC"
category: articulos
author: maballesteros
tags: [vertx, jdbc]
icon: /images/icons/vertx.png
---

Éste es un tutorial para desarrolladores de nivel principiante e intermedio que deseen una rápida inmersión en la programación asíncrona con [Vertx](http://vertx.io/) y [Kotlin](https://kotlinlang.org/).

> Artículo original en [http://maballesteros.com/articles/vertx3-kotlin-rest-jdbc-tutorial/](http://maballesteros.com/articles/vertx3-kotlin-rest-jdbc-tutorial/)

### Requisitos

Para el tutorial necesitarás tener instalado Java, Maven, Git, y se aconseja el uso de  [IntelliJ](https://www.jetbrains.com/idea/) para trabajar con Kotlin.

### Descargando el código

El [código del tutorial está disponible en GitHub](https://github.com/maballesteros/vertx3-kotlin-rest-jdbc-tutorial), así que crea un directorio de trabajo y clona el proyecto:

{% highlight bash %}
git clone git@github.com:maballesteros/vertx3-kotlin-rest-jdbc-tutorial.git
{% endhighlight %}

Después de clonar el proyecto, abre el `pom.xml` que encontrarás en el directorio raíz en IntelliJ. Es un multiproyecto Maven, con un módulo (subproyecto) para cada paso del tutorial.

### Paso 1: Arrancar un servidor HTTP sencillo con Vertx

En este [primer paso](https://github.com/maballesteros/vertx3-kotlin-rest-jdbc-tutorial/blob/master/step01/src/tutorial01.kt) simplemente vamos a mostrar lo rápido y sencillo que es tener funcionando un servidor HTTP asíncrono usando Vertx y Kotlin... incluso sin agregar *azucar* Kotlin.

{% highlight kotlin %}
{% raw %}
import io.vertx.core.Vertx
import io.vertx.ext.web.Router

object Vertx3KotlinRestJdbcTutorial {

    @JvmStatic fun main(args: Array<String>) {
        val vertx = Vertx.vertx()
        val server = vertx.createHttpServer()
        val port = 9000
        val router = Router.router(vertx)

        router.get("/").handler { it.response().end("Hello world!") }

        server.requestHandler { router.accept(it) }.listen(port) {
            if (it.succeeded()) println("Server listening at $port")
            else println(it.cause())
        }
    }
}
{% endraw %}
{% endhighlight %}

En primer lugar, obtenermos una instancia de `Vertx`, y creamos con ella un `HttpServer`. El server no ha arrancado todavía, por lo que podemos configurarlo hasta adecuarlo a nuestras necesidades. En este caso, simplemente manejamos el enrutado a `GET /` y retornamos un clásico `Hello world!`.


### Paso 2: Repositorio REST de usuarios *in-memory*

En el [segundo paso](https://github.com/maballesteros/vertx3-kotlin-rest-jdbc-tutorial/blob/master/step02/src/tutorial02.kt) definimos un repositorio de usuarios sencillo con el siguiente API:

{% highlight kotlin %}
{% raw %}
data class User(val id:String, val fname: String, val lname: String)

interface UserService {
    fun getUser(id: String): Future<User>
    fun addUser(user: User): Future<Unit>
    fun remUser(id: String): Future<Unit>
}
{% endraw %}
{% endhighlight %}

Esto es, tenemos usuarios `User` y un servicio con las operaciones `get`, `add`, y `remove` para obtener, agregar, y eliminar usuarios respectivamente.

Notar que estamos en programación asíncrona, así que no podemos retornar directamente `User` o `Unit`. En su lugar, *debemos* debemos suministrar algún tipo de *callback* o retornar un resultado futuro `Future<T>` que nos permita registrarnos a resultados satisfactorios o fallidos, cuando estos ocurran.

En este paso implementaremos este servicio con un `Map` mutable (un `HashMap` Java):

{% highlight kotlin %}
{% raw %}
class MemoryUserService(): UserService {

    val _users = HashMap<String, User>()

    init {
        addUser(User("1", "user1_fname", "user1_lname"))
    }

    override fun getUser(id: String): Future<User> {
        return if (_users.containsKey(id)) Future.succeededFuture(_users.getOrImplicitDefault(id))
        else Future.failedFuture(IllegalArgumentException("Unknown user $id"))
    }

    override fun addUser(user: User): Future<Unit> {
        _users.put(user.id, user)
        return Future.succeededFuture()
    }

    override fun remUser(id: String): Future<Unit> {
        _users.remove(id)
        return Future.succeededFuture()
    }
}
{% endraw %}
{% endhighlight %}

Para exponer el servicio vía REST, tendremos que mapear las operaciones a sus correspondientes `GET`, `POST`, y `DELETE`.

Destacar:

  - la llamada a `router.route().handler(BodyHandler.create())`, que que queremos poder obtener el cuerpo de la request como una `String`.
  - el uso de `Gson` para codificar / decodificar JSON
  - como nos suscribimos a un resultado futuro (`future.setHandler`)

{% highlight kotlin %}
{% raw %}
object Vertx3KotlinRestJdbcTutorial {
    val gson = Gson()

    @JvmStatic fun main(args: Array<String>) {
        val port = 9000
        val vertx = Vertx.vertx()
        val server = vertx.createHttpServer()
        val router = Router.router(vertx)
        router.route().handler(BodyHandler.create())
        val userService = MemoryUserService()

        router.get("/:userId").handler { ctx ->
            val userId = ctx.request().getParam("userId")
            jsonResponse(ctx, userService.getUser(userId))
        }

        router.post("/").handler { ctx ->
            val user = jsonRequest<User>(ctx, User::class)
            jsonResponse(ctx, userService.addUser(user))
        }

        router.delete("/:userId").handler { ctx ->
            val userId = ctx.request().getParam("userId")
            jsonResponse(ctx, userService.remUser(userId))
        }

        server.requestHandler { router.accept(it) }.listen(port) {
            if (it.succeeded()) println("Server listening at $port")
            else println(it.cause())
        }
    }

    fun jsonRequest<T>(ctx: RoutingContext, clazz: KClass<out Any>): T =
        gson.fromJson(ctx.bodyAsString, clazz.java) as T


    fun jsonResponse<T>(ctx: RoutingContext, future: Future<T>) {
        future.setHandler {
            if (it.succeeded()) {
                val res = if (it.result() == null) "" else gson.toJson(it.result())
                ctx.response().end(res)
            } else {
                ctx.response().setStatusCode(500).end(it.cause().toString())
            }
        }
    }
}
{% endraw %}
{% endhighlight %}


### Paso 3: Repositorio REST de usuarios *in-memory* (con definiciones REST simplificadas)

En el [tercer paso](https://github.com/maballesteros/vertx3-kotlin-rest-jdbc-tutorial/blob/master/step03/src/tutorial03.kt) sólo simplificaremos las definiciones REST. En un proyecto real pasamos tiempo mapeando servicios de negocio a *endpoints* REST, por lo que cuanto más sencillo sea esto mejor.

Comparemos dos ejemplos de código. El primero es del paso 2, y el segundo es lo que querríamos conseguir:

{% highlight kotlin %}
{% raw %}
router.get("/:userId").handler { ctx ->
    val userId = ctx.request().getParam("userId")
    jsonResponse(ctx, userService.getUser(userId))
}

router.post("/").handler { ctx ->
    val user = jsonRequest<User>(ctx, User::class)
    jsonResponse(ctx, userService.addUser(user))
}

---------->

get("/:userId") { send(userService.getUser(param("userId"))) }

post("/") { send(userService.addUser(bodyAs(User::class))) }
{% endraw %}
{% endhighlight %}

Queremos quitarnos de encima código verboso como `router.`, `.handler { ctx -> `, y `ctx.request().getParam()`. Este código sólo ofusca/complica lo que estamos tratando de expresar en las definiciones del API REST. En este caso sencillo puede no parecer importante, pero cuando tenemos muchos paquetes de negocio, con muchos *endpoints* cada uno, esto cobra una gran relevancio. Así, cuanto más sencillas sean las definiciones, tanto más fácil será el mantenimiento del código.

¿Cómo logramos limpiar y transformar el código para que sea mucho más expresivo? Por su puesto, con *azucar* Kotlin para definir DSL ([Domain Specific Languages](https://es.wikipedia.org/wiki/Lenguaje_espec%C3%ADfico_del_dominio)). Puedes encontrar la idea clave en la entrada [Type Safe Builders](https://kotlinlang.org/docs/reference/type-safe-builders.html) del sitio principal de Kotlin. Usando esas ideas, definimos los siguientes métodos de extensión:

{% highlight kotlin %}
{% raw %}
val GSON = Gson()

fun HttpServer.restAPI(vertx: Vertx, body: Router.() -> Unit): HttpServer {
    val router = Router.router(vertx)
    router.route().handler(BodyHandler.create())  // Required for RoutingContext.bodyAsString
    router.body()
    requestHandler { router.accept(it) }
    return this
}

fun Router.get(path: String, rctx:RoutingContext.() -> Unit) = get(path).handler { it.rctx() }
fun Router.post(path: String, rctx:RoutingContext.() -> Unit) = post(path).handler { it.rctx() }
fun Router.put(path: String, rctx:RoutingContext.() -> Unit) = put(path).handler { it.rctx() }
fun Router.delete(path: String, rctx:RoutingContext.() -> Unit) = delete(path).handler { it.rctx() }

fun RoutingContext.param(name: String): String =
    request().getParam(name)

fun RoutingContext.bodyAs<T>(clazz: KClass<out Any>): T =
        GSON.fromJson(bodyAsString, clazz.java) as T

fun RoutingContext.send<T>(future: Future<T>) {
    future.setHandler {
        if (it.succeeded()) {
            val res = if (it.result() == null) "" else GSON.toJson(it.result())
            response().end(res)
        } else {
            response().setStatusCode(500).end(it.cause().toString())
        }
    }
}
{% endraw %}
{% endhighlight %}


### Paso 4: Repositorio REST de usuarios con persistencia JDBC

En el [cuarto paso](https://github.com/maballesteros/vertx3-kotlin-rest-jdbc-tutorial/blob/master/step04/src/tutorial04.kt) agregamos persistencia JDBC. En este caso sí que vamos a agregar directamente código de insfraestructura para mantener el código simple.

Veamos la implentación del servicio usando JDBC:

{% highlight kotlin %}
{% raw %}
class JdbcUserService(private val client: JDBCClient): UserService {

    init {
        client.execute("""
        CREATE TABLE USERS
            (ID VARCHAR(25) NOT NULL,
            FNAME VARCHAR(25) NOT NULL,
            LNAME VARCHAR(25) NOT NULL)
        """).setHandler {
            val user = User("1", "user1_fname", "user1_lname")
            addUser(user)
            println("Added user $user")
        }
    }

    override fun getUser(id: String): Future<User> =
        client.queryOne("SELECT ID, FNAME, LNAME FROM USERS WHERE ID=?", listOf(id)) {
            it.results.map { User(it.getString(0), it.getString(1), it.getString(2)) }.first()
        }


    override fun addUser(user: User): Future<Unit> =
        client.update("INSERT INTO USERS (ID, FNAME, LNAME) VALUES (?, ?, ?)",
                listOf(user.id, user.fname, user.lname))


    override fun remUser(id: String): Future<Unit> =
        client.update("DELETE FROM USERS WHERE ID = ?", listOf(id))
}
{% endraw %}
{% endhighlight %}

¿Fácil no? Notar que *debemos* suministrar un cliente `JDBCClient` en el momento de la construcción. Aquí está el código que agregamos en el `main()` del proyecto para construir el client JDBC y conectarlo a una BBDD real:

{% highlight kotlin %}
{% raw %}
val client = JDBCClient.createShared(vertx, JsonObject()
        .put("url", "jdbc:hsqldb:mem:test?shutdown=true")
        .put("driver_class", "org.hsqldb.jdbcDriver")
        .put("max_pool_size", 30));
val userService = JdbcUserService(client)
// val userService = MemoryUserService()
{% endraw %}
{% endhighlight %}

En este tutorial emplearemos [hsqldb](http://hsqldb.org/), una base de datos Java usada con frecuencia para el *testing* de capas de acceso a BBDD, ya que proporciona una implementación *in-memory* muy útil para este objetivo.

El soporte de Vertx para JDBC no dispone de APIs tan simples como las que hemos mostrado. Los que ya conocéis JDBC, encontraréis que son similares a las primitivas básicas de JDBC, pero en asíncrono. Nuevamente, haremos uso de algunos métodos de extensión de Kotlin y algo de programación funcional para mantener las cosas simples (ver [db_utils.kt](https://github.com/maballesteros/vertx3-kotlin-rest-jdbc-tutorial/blob/master/step04/src/db_utils.kt)).

### Paso 5: Repositorio REST de usuarios con persistencia JDBC (con Promesas y más *azucar* Kotlin)

En el [quinto paso](https://github.com/maballesteros/vertx3-kotlin-rest-jdbc-tutorial/blob/master/step05/src/tutorial05.kt) agregamos más código de insfraestructura para simplificar más todavía, y lograr así que *la bestia* escale mejor cuando queramos agregar complejidad.

En ejemplos anteriores hemos usado el tipo `Future<T>` proporcionado por Vertx. Éste proporciona un mecanismo familiar para suscribirnos a resultados futuros, de forma que cuando estén disponibles, podamos preguntarle si fue un éxito o falló y tomar acciones adicionales.

Pero el tipo `Future<T>` carece de algunas características importantes para escalar los ejemplos sencillos que mostramos en el tutorial a algo más grande:

  - Capacidad para componerse: no podemos *encadenar* tipos `Future<T>`, de forma que cuando termine uno empiece otro, etc.
  - Sincronización: no podemos *esperar* a que terminen varios futuros, y actuar cuando termine el último (sea cual sea).

Bueno, no estoy siendo del todo justo: sí que se puede... pero con un montón de código verboso y redundante que termina siendo inmanejable.

Entonces, ¿cuál es la alternativa? El [patrón Promesa](http://www.html5rocks.com/en/tutorials/es6/promises/) resuelve todo esto, y es el estándar *de facto* para manejar código asíncrono.

Primero necesitamos una [implementación del patrón Promesa en Kotlin que enganche con el *event loop* de Vertx](https://github.com/maballesteros/vertx3-kotlin-rest-jdbc-tutorial/blob/master/step05/src/promise.kt).

Podemos entonces redefinir nuestro código sobre este patróna asíncrono. Empecemos por redefinir el API del servicio (fácil, basta cambiar `Future<T>` por `Promise<T>`):

{% highlight kotlin %}
{% raw %}
data class User(val id:String, val fname: String, val lname: String)

interface UserService {

    fun getUser(id: String): Promise<User?>
    fun addUser(user: User): Promise<Unit>
    fun remUser(id: String): Promise<Unit>
}
{% endraw %}
{% endhighlight %}

La implementación del servicio JDBC es también muy parecida. Notar el cambio en el método `init()`, donde empezamos a usar las operaciones de composición `.pipe()` y `.then()` para  encadenar acciones asíncronas de forma muy semántica y clara:

{% highlight kotlin %}
{% raw %}
class JdbcUserService(private val client: JDBCClient): UserService {

    init {
        val user = User("1", "user1_fname", "user1_lname")
        client.execute("""
            CREATE TABLE USERS
                (ID VARCHAR(25) NOT NULL,
                FNAME VARCHAR(25) NOT NULL,
                LNAME VARCHAR(25) NOT NULL)
            """)
        .pipe { addUser(user) }
        .then { println("Added user $user") }
    }

    override fun getUser(id: String): Promise<User?> =
        client.queryOne("SELECT ID, FNAME, LNAME FROM USERS WHERE ID=?", listOf(id)) {
            User(it.getString(0), it.getString(1), it.getString(2))
        }


    override fun addUser(user: User): Promise<Unit> =
        client.update("INSERT INTO USERS (ID, FNAME, LNAME) VALUES (?, ?, ?)",
                listOf(user.id, user.fname, user.lname)).then {  }


    override fun remUser(id: String): Promise<Unit> =
        client.update("DELETE FROM USERS WHERE ID = ?", listOf(id)).then {  }
}
{% endraw %}
{% endhighlight %}

Usamos:

  - `.then()`: cuando la siguiente acción retorna un resultado inmediato.
  - `.pipe()`: cuando la siguiente acción retorna una `Promise<T>`, y queremos encadenarnos a la resolución de esta promesa.

En las promesas de JavaScript sólo existe la operación `.then()`, pero al ser Java tipado desgraciadamente es necesario separar ambos casos.

El patrón promesa simplifica no sólo el código de usuario, si no también el código de insfraestructura. Puedes comparar [el código de insfraestructura basado en *futures*](https://github.com/maballesteros/vertx3-kotlin-rest-jdbc-tutorial/blob/master/step04/src/db_utils.kt) para el acceso a BBDD con el [basado en *promesas*](https://github.com/maballesteros/vertx3-kotlin-rest-jdbc-tutorial/blob/master/step05/src/db_utils.kt). Como puedes ver, las promesas combinan muy bien con código funcional.

----

En este paso además vamos a simplificar aún más la definición del API REST:

{% highlight kotlin %}
{% raw %}
val dbConfig = JsonObject()
        .put("url", "jdbc:hsqldb:mem:test?shutdown=true")
        .put("driver_class", "org.hsqldb.jdbcDriver")
        .put("max_pool_size", 30)

object Vertx3KotlinRestJdbcTutorial {

    @JvmStatic fun main(args: Array<String>) {
        val vertx = promisedVertx()

        val client = JDBCClient.createShared(vertx, dbConfig);
        val userService = JdbcUserService(client)

        vertx.restApi(9000) {

            get("/:userId") { send(userService.getUser(param("userId"))) }

            post("/") { send(userService.addUser(bodyAs(User::class))) }

            delete("/:userId") { send(userService.remUser(param("userId"))) }

        }
    }
}
{% endraw %}
{% endhighlight %}

En esta versión tenemos hemos eliminado la gran mayoría de código *boilerplate* a métodos de extensión:

{% highlight kotlin %}
{% raw %}
fun Vertx.restApi(port: Int, body: Router.() -> Unit) {
    createHttpServer().restApi(this, body).listen(port) {
        if (it.succeeded()) println("Server listening at $port")
        else println(it.cause())
    }
}

fun HttpServer.restApi(vertx: Vertx, body: Router.() -> Unit): HttpServer {
    val router = Router.router(vertx)
    router.route().handler(BodyHandler.create())  // Required for RoutingContext.bodyAsString
    router.body()
    requestHandler { router.accept(it) }
    return this
}

fun Router.get(path: String, rctx:RoutingContext.() -> Unit) = get(path).handler { it.rctx() }
fun Router.post(path: String, rctx:RoutingContext.() -> Unit) = post(path).handler { it.rctx() }
fun Router.put(path: String, rctx:RoutingContext.() -> Unit) = put(path).handler { it.rctx() }
fun Router.delete(path: String, rctx:RoutingContext.() -> Unit) = delete(path).handler { it.rctx() }
{% endraw %}
{% endhighlight %}

### Resumiendo

En este tutorial hemos visto cómo construir un API REST asíncrono usando Vertx y Kotlin. Empezamos con un servidor HTTP simple respondiendo "Hello world!", y terminamos con un API REST asíncrono real que emplea buenas prácticas de Kotlin y el patrón Promisa para mantener un código sencillo y muy mantenible.
