---
layout: post
title:  "El camino de Gradle Script Kotlin hacia la 1.0"
category: articulos
author: soywiz
icon: /images/icons/gradle.png
original: https://blog.gradle.org/kotlin-scripting-update
---

Hace cinco meses anunciamos la primera preview de Gradle Script Kotlin,
y creemos que ahora es un buen momento para revisar el progreso que ha
habido desde entonces. El camino hacia la 1.0 es ahora bastante más claro.
Así que echemos un vistazo a lo que llevamos ya recorrido, y lo que nos
queda por delante.

### v0.1.0

Puede que recordéis cómo era el [ejemplo `hello-world`](https://github.com/gradle/gradle-script-kotlin/blob/cc14d3/samples/hello-world/build.gradle.kts)
de nuestra primera versión:

{% highlight kotlin %}
import org.gradle.api.plugins.*
import org.gradle.script.lang.kotlin.*

apply<ApplicationPlugin>()

configure<ApplicationPluginConvention> {
    mainClassName = "samples.HelloWorld"
}

repositories {
    jcenter()
}

dependencies {
    "testCompile"("junit:junit:4.12")
}
{% endhighlight %}

Algo incómodo ese import de `org.gradle.script.lang.kotlin.*`!
Y ese `"testCompile"` como cadena bastante poco amigable con los IDEs.
Y sin olvidarnos, para aquellos primeros valientes que pudieron probarla,
de las tareas `generateKtsConfig` y `patchIdeaConfig` que hacían falta
para que las builds basadas e Kotlin funcionasen en IDEA.

Pero a pesar de todo, el lenguaje de programación y la experiencia del IDE
era tan buena que ya nos tenía enganchados. Y en relación a las cosas por
pulir, ya íbamos viendo cómo refinarlas, lo que nos llevó a la versión
[0.2.0](https://github.com/gradle/gradle-script-kotlin/releases/tag/v0.2.0) que liberamos un mes después.

### v0.2.0

Con [imports implícitos](https://github.com/gradle/gradle-script-kotlin/issues/33) y una 
alternativa amigable con el tooling para las configuraciones de dependencias, el `hello-world`
de la 0.2.0 ya empezaba a ser bastante limpio y conciso.

{% highlight kotlin %}
apply<ApplicationPlugin>()

configure<ApplicationPluginConvention> {
    mainClassName = "samples.HelloWorld"
}

repositories {
    jcenter()
}

dependencies {
    testCompile("junit:junit:4.12")
}
{% endhighlight %}

Tener [imports de proyectos sin costuras](https://github.com/gradle/gradle-script-kotlin/issues/26)
significaba que las builds basadas en Kotlin en IDEA empezaban a funcionar de serie, y así
se acabaron los días de escribir mal `generateKtsConfig` y `patchIdeaConfig`.

Quizá más importante, la 0.2.0 introdujo [soporte para dependencias de build scripts y plugins externos](https://github.com/gradle/gradle-script-kotlin/issues/29)
que hizo que Gradle Script Kotlin fuese una opción viable para muchos proyectos reales.

### v0.3.0

La [0.3.0](https://github.com/gradle/gradle-script-kotlin/releases/tag/v0.3.0) fue un hito mayor para el proyecto, ya que fue la primera versión incluída en una distribución
de Gradle. ¡En [Gradle 3.0](https://github.com/gradle/gradle/releases/tag/v3.0.0), ni más ni menos!

¡Y la 0.3.0 era todo sobre ese [Kotlin](https://kotlin.link/)!
El [nuevo compilador 1.1-M01 de Kotlin](https://blog.jetbrains.com/kotlin/2016/07/first-glimpse-of-kotlin-1-1-coroutines-type-aliases-and-more/),
soportando [plugins basados en Kotlin](https://github.com/gradle/gradle-script-kotlin/issues/84) y
[directorios `buildSrc`](https://github.com/gradle/gradle-script-kotlin/issues/86) además de algo
de azúcar para esas primitivas de [interoperabilidad Kotlin-Groovy](https://github.com/gradle/gradle-script-kotlin/issues/103):

{% highlight kotlin %}
gradle.buildFinished(closureOf<BuildResult> {
    println("$action finished") // $action refers to BuildResult.getAction()
})
{% endhighlight %}

Con Gradle 3.0 recién salido del horno, el canal #gradle del [Slack de Kotlin](http://kotlinslackin.herokuapp.com/) público vio un incremento
en la participación que nos ayudó enormemente a priorizar los siguientes pasos.

### v0.3.1

Nos dimos cuenta de que la gente peleaba con la falta de algo más de seguridad tipada y formas más
amigables con el IDE para configurar dependencias, así que con la [0.3.1](https://github.com/gradle/gradle-script-kotlin/releases/tag/v0.3.1)
introdujimos un [DSL para dependencias muy mejorado](https://github.com/gradle/gradle-script-kotlin/issues/107).

{% highlight kotlin %}
dependencies {

    default(group = "org.gradle", name = "foo", version = "1.0") {
        isForce = true
    }

    compile(group = "org.gradle", name = "bar") {
        exclude(module = "foo")
    }

    runtime("org.gradle:baz:1.0-SNAPSHOT") {
        isChanging = true
        isTransitive = false
    }

    testCompile(group = "junit", name = "junit")

    testRuntime(project(path = ":core")) {
        exclude(group = "org.gradle")
    }
}
{% endhighlight %}


[Actualizar a Kotlin 1.1-dev-2053](https://github.com/gradle/gradle-script-kotlin/issues/108) mejoró notablemente el rendimiento y la asistencia de código
dentro de IDEA gracias a un [valioso miembro de la comunidad](https://github.com/tyvsmith), y se publicó el primer
[ejemplo de Script de Gradle hecho en Kotlin para Android](https://github.com/gradle/gradle-script-kotlin/tree/96b6fe/samples/hello-android).

### v0.3.2

Con la 0.3.2 decidimos solucionar [el temido problema del `it`](https://www.youtube.com/watch?v=vv4zh_oPBTw&feature=youtu.be&t=1387)
via la [generación en runtime de código de las extensiones de Kotlin](https://github.com/gradle/gradle-script-kotlin/issues/117).
¿Cuál es el temido problema del `it`? Tomad el uso de `copySpec` como ejemplo. Antes de la 0.3.2,
hubiésemos escrito:

{% highlight kotlin %}
copySpec {
    it.from("src/data")
    it.include("*.properties")
}
{% endhighlight %}

La sintaxis no se leía muy bien, y nos alejaba un poco de la fluidez y legibilidad que el DSL de Gradle
ha mantenido siempre. Pero no temáis. Con la 0.3.2 el `it` desapareció:

{% highlight kotlin %}
copySpec {
    from("src/data")
    include("*.properties")
}
{% endhighlight %}

### v0.3.3 and v0.4.0

La versión [0.3.3](https://github.com/gradle/gradle-script-kotlin/releases/tag/v0.3.3)
y la [0.4.0](https://github.com/gradle/gradle-script-kotlin/releases/tag/v0.4.0)
liberadas recientemente han traído consigo la [primera](https://github.com/gradle/gradle-script-kotlin/issues/137)
de una plétora de mejoras a las [builds de multiproyectos](https://github.com/gradle/gradle-script-kotlin/issues/112)
incluyendo la habilidad de [definir lógica personalizada usando Kotlin en `buildSrc`](https://github.com/gradle/gradle-script-kotlin/blob/7c74044cd84c4c426f1bca9af9f48bf332620c73/samples/multi-project-with-buildSrc/README.md).

La [0.4.0](https://github.com/gradle/gradle-script-kotlin/releases/tag/v0.4.0) está disponible ya y estará incluída en la distribución de Gradle 3.2 que está por venir.   

### Hacia la v1.0.0

¿Qué es lo siguiente?, os preguntaréis. Y estas son algunas de las cosas destacadas de las próximas versiones en tres áreas clave:

1. [Rendimiento](https://github.com/gradle/gradle-script-kotlin/issues/160): Configuraciones de proyectos más rápidas via cachés de build scripts compilados ([#31](https://github.com/gradle/gradle-script-kotlin/issues/31))
2. [Usabilidad](https://github.com/gradle/gradle-script-kotlin/issues/54): Accesores con seguridad tipada para extensiones y convenciones contribuidas por plugins ([#159](https://github.com/gradle/gradle-script-kotlin/issues/159)); Documentación exhaustiva ([#106](https://github.com/gradle/gradle-script-kotlin/issues/106))
3. [Conveniencia](https://github.com/gradle/gradle-script-kotlin/issues/30): Aplicación de plugins declarativ y amigable con herramientas (también conocidos como bloque `plugins`) ([#168](https://github.com/gradle/gradle-script-kotlin/issues/168))

Y con todo, así es como tenemos previsto que sea el ejemplo de `hello-world` en Gradle Script Kotlin 1.0:

{% highlight kotlin %}
plugins {
    application
}

application {
    mainClassName = "samples.HelloWorld"
}

repositories {
    jcenter()
}

dependencies {
    testCompile("junit:junit:4.12")
}
{% endhighlight %}

¿Cómo lo véis? Nos encantaría saber lo que pensáis.

Muchas gracias a todos los que habéis embarcado en esta aventura. Y a los que acabéis de uniros
a Gradle Script Kotlin, ¡bienvenidos!
