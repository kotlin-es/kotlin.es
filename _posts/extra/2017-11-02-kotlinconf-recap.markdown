---
layout: post
title: "Repaso de la Keynote de KotlinConf"
category: releases
tags: releases
author: soywiz
original: https://blog.jetbrains.com/kotlin/2017/11/kotlinconf-keynote-recap/
icon: /images/kotlinconf_icon.png
#eap: true
kotlin_version: 1.2-rc-39
noiconinpost: true
iconinheader: true
maven_repo: http://dl.bintray.com/kotlin/kotlin-eap-1.2
excerpt: "Keynote de KotlinConf: Kotlin 1.2-RC, Kotlin/Native 0.4 + iOS + IDE, Ktor 0.9, Kotlin React y futuro"
---

Hoy es un gran día para la comunidad de Kotlin. KotlinConf, la conferencia inaugural de Kotlin, abre hoy sus puertas. Y estamos muy impresionados de que casi 1200 personas de todo el mundo se hayan unido a nosotros en San Francisco.

Durante la *keynote* de la conferencia, Andrey Breslav, el diseñador líder de Kotlin, ha anunciado varios desarrollos importantes sobre Kotlin, y ahora vamos a compartir dichas noticias con todo el mundo.

![](/images/carousel/kotlinconf.jpg)

## Kotlin 1.2 RC

El primer anuncio importante de la keynote es que se ha publicado **Kotlin 1.2 Release Candidate**. Las nuevas características de dicha release incluyen el soporte experimental de [proyectos multiplataforma](http://kotlinlang.org/docs/reference/multiplatform.html), permitiendo compartir código entre módulos targeteando a JVM y JavaScript, así como **varias mejoras en el lenguaje**, incluyendo soporte para literales de array en anotaciones. Para más información sobre las nuevas características en la 1.2, por favor, echad un vistazo al [anuncio de la beta de Kotlin 1.2](https://blog.jetbrains.com/kotlin/2017/09/kotlin-1-2-beta-is-out/).

Ahora el compilador rechaza los binarios compilados con versiones preeliminares de Kotlin 1.2; tendréis que recompilarlos con esta versión. El código compilado con Kotlin 1.0.x o 1.1.x es, por supuesto, completamente válido con esta versión del compilador.

Aún cuando las corrutinas siguen marcadas como experimentales, nos gustaría clarificar el estado exacto de las mismas. Las corrutinas ya están **completamente listas para ser usadas en producción**; las estamos usando en nuestros propios desarrollos, y no tenemos constancia de ningún problema meyor con la implementación. El motivo por el que las mantenemos como experimentales es para permitirnos iterar en el diseño. Nótese que aunque hagamos cambios en el API, el API actual se va a mantener soportada, aunque puede que se marquen cosas como deprecadas y que proporcionemos las **herramientas necesarias para la migración**. Si todo sigue como está previsto, quitaremos el estado experimental de las corrutinas en la 1.3.

Y ahora es momento de **pediros vuestra ayuda**. Aunque hemos hecho un montón de pruebas sobre esta versión internamente y en otros equipos en JetBrains, el mundo real es mucho más variado del que tenemos acceso nosotros. Y por lo tanto, por favor - probad Kotlin 1.2 RC en vuestros propios proyectos y hacednos saber si os encontráis con cualquier problema. Vuestra ayuda es esencial para asegurar una versión final ideal.
¡Decidle a todo el mundo que lo pruebe!

## Soporte iOS de Kotlin/Native

La siguente gran noticia que hemos anunciado es el soporte de **Kotlin/Native para iOS**, liberado como parte de Kotlin/Native 0.4. El soporte está todavía en sus primeros días, pero ya está aquí, y es un gran paso para permitir desarrollar Kotlin en todas las plataformas.

Para mostraros lo que es posible, hemos escrito dos aplicaciones y las hemos publicado en la App Store:

* La [aplicación Spinner](https://itunes.apple.com/us/app/kotlinconf-spinner/id1291282375?mt=8) ([GitHub](https://github.com/jetbrains/kotlinconf-spinner)) es un juego sencillo escrito usando OpenGL. Se ejecuta tanto en iOS como en Android ([enlace de la playstore](https://play.google.com/store/apps/details?id=com.jetbrains.konan_activity2)), y la mayor parte del código está compartida en ambas versiones. La versión de iOS tiene varias características adicionales como integración con Game Center.
* La [aplicación de KotlinConf](https://itunes.apple.com/us/app/kotlinconf/id1299196584?mt=8) ([GitHub](https://github.com/jetbrains/kotlinconf-app)) muestra los horarios de las conferencias y tiene una UI completamente nativa de iOS escrita con UIKit.

Ambas aplicaciones de ejemplo son open-source, y podéis usarlas como template para construir vuestras aplicaciones móvil cross-plataforma en Kotlin puro.

## Soporte en el IDE de Kotlin/Native

Por supuesto, hace falta un IDE para ser productivos con cualquier lenguaje, y desde hoy, Kotlin/Native tiene soporte en el IDE también. El plugin soporta el sistema de construcción CMake. Incluye el set completo de características de edición del plugin de Kotlin de IntelliJ IDEA, así como soporte inicial para la creación de proyectos, teseteo y depuración.

![](/images/1.2/1.2-rc/clion-debugger.png)

Para probar el plugin, instalad CLion 2017.3 EAP y buscad "Kotlin/Native" en la lista de plugins de JetBrains.

En los días siguientes, publicaremos una entrada en el blog con más detalles sobre el plugin y sus características. Y por supuesto, el plugin de CLion es solo un paso más en nuestra historia sobre el soporte de IDEs de Kotlin. ¡Estad atentos sobre más anuncios el próximo año!

## Ktor 0.9

El **desarrollo en el lado del servidor** también es una parte clave en nuestra historia multiplataforma.
Y con lo que respecta a esto: anunciamos que hemos liberado la versión 0.9 de [Ktor](http://ktor.io/), un **web framework** asíncrono basado en corrutinas construido desde cero en Kotlin.

Ktor ya es utilizado tanto en proyectos propios de JetBrains como por la comunidad, y ahora estamos bastante seguros de que es una base sólida para construir aplicacionese web de alto rendimiento. Echad un ojo a las [guías de inicio rápido](http://ktor.io/quickstart/index.html) en ktor.io, probadlas y hacednos saber qué pensáis para que podamos hacer una versión 1.0 aún mejor.

## Creando aplicaciones web modernas con React y Kotlin

En lo que corresponde al desarrollo web front-end, las noticas más importantes de hoy es la liberación de [wrappers oficiales de Kotlin](https://github.com/JetBrains/kotlin-wrappers) para [React.js](https://reactjs.org/), así como [create-react-kotlin-app](https://www.npmjs.com/package/create-react-kotlin-app), una caja de herramientas para crear aplicaciones web modernas en Kotlin usando React.js. Con create-react-kotlin-app podéis generar y empezar inmediatamente a trabajar en aplicaciones del lado del cliente sin preocuparos sobre el setup del proyecto y la configuración del build. Usando los beneficios de un lenguaje estáticamente tipado y del ecosistema JavaScript.

Para empezar, ejecutad `npm install -g create-react-kotlin-app` y echad un ojo a [la guía para empezar](https://github.com/JetBrains/create-react-kotlin-app/).

## Demo de proyectos Multiplataforma

Para mostraros cómo funcionan todas las piezas de nuestra historia multiplataforma , hemos construido una app con todas las últimas piezas de nuestro *stack* tecnológico: la [app de KotlinConf](https://github.com/jetbrains/kotlinconf-app). Que consiste en los siguientes componentes:

* Backend usando [Ktor](http://ktor.io/)
* [Aplicación de navegador](https://api.kotlinconf.com/) usando React.js y los wrappers de Kotlin React
* [Aplicación Android](https://play.google.com/store/apps/details?id=com.jetbrains.kotlinconf&hl=en) usando [Anko](https://github.com/kotlin/anko) y *Android Architecture Componentes*
* [Aplicación de iOS](https://itunes.apple.com/us/app/kotlinconf/id1299196584?mt=8) (mencionada arriba) utilizando UIKit

Tanto el backend, como la aplicación de navegador y la aplicación de Android comparten código utilizando la tecnología de proyectos multiplataforma de Kotlin. Para la programación asíncrona, todos los componentes usan corrutinas. Y para intercambiar datos entre el servidor y el cliente, utilizamos la nueva [librería kotlinx.serialization](https://github.com/kotlin/kotlinx.serialization).

Encontraréis en el código fuente de la aplicación un gran tesoro de técnicas que podréis usar en vuestro propio trabajo.

## Aprendiendo Kotlin

Con todo el ruido que hay alrededor de Kotlin, hay cada vez más y más gente interesada en aprender el lenguaje. Para hacerlo más fácil, hemos liberado una nueva versión del [plugin EduTools](https://www.jetbrains.com/education/kotlin-edu/), permitiendo aprender Kotlin solucionando ejercicios interactivos en vuestro IDE favorito. La nueva versión añade soporte para Android Studio (anteriormente únicamente estaba soportado en IntelliJ IDEA), y incluye una nueva UI para construir vuestros propios cursos.

## Direcciones futuras

En relación a la evolución que tendrá el lenguaje en el futuro, nuestro objetivo principal en este momento es mejorar y ampliar la reutilización de código entre las plataformas soportadas por Kotlin. Tenemos planeado extender el conjunto de librerías disponibles en todas las plataformas con la misma API para incluir I/O, red, serialización, gestión de fechas y más.

En lo que respecta al compilador, nuestro foco principal para la 1.3 es cambios internos, y no en características visibles del lenguaje. Los cambios internos habilitarán mejor rendimiento, mejor inferencia de tipos, generación de código más eficiente para todas las plataformas destino, así como una mejor respuesta en los plugins de IDE. Y esperamos poder también endulzar la release con algunas características interesantes en el lenguaje, pero no podemos hacer promesas en este sentido de momento.

¡A Kotlinear!
