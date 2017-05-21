---
layout: post
title: "Gradle Script Kotlin 0.9.0"
category: releases-tools
tags: releases-tools
author: soywiz
original: https://github.com/gradle/gradle-script-kotlin/releases/tag/v0.9.0
icon: /images/icons/gradle.png
---

Hace un par de días salió [Gradle Script Kotlin 0.9.0](https://github.com/gradle/gradle-script-kotlin/releases/tag/v0.9.0).

Y he aquí la traducción de las *Release Notes*:

Gradle Script Kotlin v0.9.0 es otro paso grande en usabilidad, mejorando el DSL, la experiencia en intelliJ, rendimiento y por fin, detección automática de las builds en Kotlin.

Se espera que la v0.9.0  se incluya en el próximo Gradle 4.0 RC1.

Las características de esta versión se pueden usar de inmediato con el último snapshot de la distribución de Gradle Script Kotlin. Para usarlo, actualizad vuestro wrapper de Gradle de la siguiente forma:

{% highlight bash %}
$ cd $YOUR_PROJECT_ROOT
$ gradle wrapper --gradle-distribution-url https://repo.gradle.org/gradle/dist-snapshots/gradle-script-kotlin-4.0-20170518042627+0000-all.zip
{% endhighlight %}

## Actualizaciones desde la v0.8.0

* **Detección automática de las builds basadas en Kotlin** ([#37](https://github.com/gradle/gradle-script-kotlin/issues/37), [#80](https://github.com/gradle/gradle-script-kotlin/issues/80)). Tras algo más de un año desde que se añadiera la incidencia en nuestro tablón, ¡por fin tenemos esta gran mejora de usabilidad!

Se acabó la coletilla de `rootProject.buildFileName = 'build.gradle.kts'` en el archivo `settings.gradle` para habilitar el script de construcción en Kotlin! 🎉

* **Imports por defecto en todo el API de gradle** ([#215](https://github.com/gradle/gradle-script-kotlin/issues/215), [#347](https://github.com/gradle/gradle-script-kotlin/issues/347)). Para construir scripts de construcción más concisos, el conjunto de imports por defecto ahora incluyen todo el API de Gradle como se documenta en [a sección de imports por defecto de la guía de uso de Gradle](https://docs.gradle.org/current/userguide/writing_build_scripts.html#script-default-imports).

* **API de Gradle mejorada con getters con seguridad tipada** ([#341](https://github.com/gradle/gradle-script-kotlin/issues/341)). Kotlin reconoce propiedades de JavaBean mutables solo cuando tanto el getter como al menos un setter se ponen de acuerdo en el tipo de la propiedad.

Se han añadido recientemente más de 50 setters fuertemente tipados al api de Gradle para permitir migrar build scripts a partir de configuración de sintaxis mucho más verbosas como:

{% highlight kotlin %}
val someBuild by tasks.creating(GradleBuild::class) {
    setDir(file("some/path"))      // NOT RECOGNIZED AS PROPERTY BECAUSE OF UNTYPED SETTER
    setTasks(listOf("foo", "bar")) // NOT RECOGNIZED AS PROPERTY BECAUSE OF UNTYPED SETTER
}
{% endhighlight %}

a otras mucho más declarativas:

{% highlight kotlin %}
val someBuild by tasks.creating(GradleBuild::class) {
    dir = file("some/path")
    tasks = listOf("foo", "bar")
}
{% endhighlight %}

* **Mejorados los acesos de extensión de proyecto mediante propiedades** ([#330](https://github.com/gradle/gradle-script-kotlin/issues/330)). De forma que ahora podéis escribir `java.sourceSets` en vez de `java().sourceSets` como ocurría en la 0.8.0.

* **Documentación del API** ([#209](https://github.com/gradle/gradle-script-kotlin/issues/209)). Primera aproximación a esta parte importante de la documentación, generada usando [Dokka](https://kotlinlang.org/docs/reference/kotlin-doc.html) y disponible desde ya en [https://gradle.github.io/gradle-script-kotlin-docs/api/](https://gradle.github.io/gradle-script-kotlin-docs/api/).

* **Mejoras en intelliJ**

** **El cómputo de los classpath es ahora asíncrono** ([#249](https://github.com/gradle/gradle-script-kotlin/issues/249)). Así que ya no debería bloquear más la UI (pendiente de una [corrección en intelliJ](https://youtrack.jetbrains.com/issue/KT-17771))

** **Los *accesors* tipados se incluyen correctamente en el classpath pasado a intelliJ** ([#340](https://github.com/gradle/gradle-script-kotlin/issues/340)). Sobre los cambios al bloque `plugins` (pendiente de una [corrección en intellij](https://youtrack.jetbrains.com/issue/KT-17770))

** **La navegación de código fuente ahora funciona con todo en Gradle** ([#281](https://github.com/gradle/gradle-script-kotlin/issues/281))

![](/images/gradle-kotlin-0.9-screenshot1.gif)

** **Navegación en código de librerías Kotlin incluídas** ([#96](https://github.com/gradle/gradle-script-kotlin/issues/96)). Siempre y cuando haya al menos un repositorio en el `buildscript` configurado para resolver artefactos de código fuente de Kotlin.

* **Variado**

** **Pulido ejemplo de Android** ([#351](https://github.com/gradle/gradle-script-kotlin/issues/351)). Con todas las mejoras en esta versión, nuestro [ejemplo hello-android](https://github.com/gradle/gradle-script-kotlin/tree/master/samples/hello-android) ya está libre de morralla:

{% highlight kotlin %}
buildscript {
    dependencies {
        classpath("com.android.tools.build:gradle:2.3.1")
        classpath(kotlinModule("gradle-plugin"))
    }
    repositories {
        jcenter()
    }
}

apply {
    plugin("com.android.application")
    plugin("kotlin-android")
}

android {
    buildToolsVersion("25.0.0")
    compileSdkVersion(23)

    defaultConfig {
        minSdkVersion(15)
        targetSdkVersion(23)

        applicationId = "com.example.kotlingradle"
        versionCode = 1
        versionName = "1.0"
    }

    buildTypes {
        getByName("release") {
            isMinifyEnabled = false
            proguardFiles("proguard-rules.pro")
        }
    }
}

dependencies {
    compile("com.android.support:appcompat-v7:23.4.0")
    compile("com.android.support.constraint:constraint-layout:1.0.0-alpha8")
    compile(kotlinModule("stdlib"))
}

repositories {
    jcenter()
}
{% endhighlight %}

Y funciona con el último Android Studio (2.3.2).

** **Eliminado el *overhead* de inicialización de Gradle** ([#320](https://github.com/gradle/gradle-script-kotlin/issues/320)). La implementación de los *accessors* tipados in `0.8.0` añadieron una carga excesiva a la configuración del proyecto, aún cuando no habían build scripts de Kotlin de por medio. Esto ya está arreglado.

** **Soporte idiomático para las propiedades `PropertyState<T>` y `ConfigurableFileCollection`** ([#344](https://github.com/gradle/gradle-script-kotlin/issues/344)). Haciendo uso de las propiedades delegadas de Kotlin:

{% highlight kotlin %}
open class GreetingPluginExtension(project: Project) {

    // Declare a `PropertyState<String>` backing field
    private
    val messageState = project.property<String>()

    // Expose `messageState` as the `message` property whose type is inferred as String
    var message by messageState

    // Can also be exposed as `Provider<String>` for additional functionality
    val messageProvider: Provider<String> get() = messageState

    // `outputFiles` property type is inferred as `ConfigurableFileCollection`
    // with the following behaviour:
    //  - getting will always return the original instance
    //  - setting will `setFrom` the source
    var outputFiles by project.files()
}
{% endhighlight %}

Echad un ojo al ejemplo [provider-properties](https://github.com/gradle/gradle-script-kotlin/blob/v0.9.0/gradle/gradle-script-kotlin/tree/master/samples/provider-properties) para más información.

** **Mejor comportamiento de cacheo para los *accesors* tipados** ([#338](https://github.com/gradle/gradle-script-kotlin/issues/338))

* **Correcciones de Bugs**

** **Poner un *Kotlin build script* inexistente en `settings.gradle` ya no causa que la build falle** ([#302](https://github.com/gradle/gradle-script-kotlin/issues/302), [#331](https://github.com/gradle/gradle-script-kotlin/issues/331)) siguiendo con el comportamiento estándar de Gradle.

** **Los accesos de extensión generadas para la extensión `publishing` ahora funcionarán como se espera** ([#327](https://github.com/gradle/gradle-script-kotlin/issues/327), [#328](https://github.com/gradle/gradle-script-kotlin/issues/328)). Y difieren configuraciones hasta ser necesario.

** **Los proyectos con build scripts de Kotlin en `buildSrc` se pueden editar con el classpath correcto en intelliJ** ([#339](https://github.com/gradle/gradle-script-kotlin/issues/339)). Los *build scripts* se ejecutarán de la mejor forma cuando se está computando el *classpath*.
