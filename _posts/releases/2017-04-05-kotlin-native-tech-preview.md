---
layout: post
title: "Preview técnica de Kotlin/Native: Kotlin sin Máquina Virtual"
category: releases
tags: releases
author: soywiz
original: https://blog.jetbrains.com/kotlin/2017/04/kotlinnative-tech-preview-kotlin-without-a-vm/
icon: /images/native/KotlinNative.png
---

Nos complace anunciar la primera Preview Técnica de **Kotlin/Native** que compila Kotlin directamente
a código máquina. El compilador de Kotlin/Native produce ejecutables autónomos que pueden ejecutarse
sin ninguna máquina virtual.

Todavía no es completamente funcional, pero pero ya podéis jugar con la tecnología y echar un vistazo
al código fuente. El compilador está disponible bajo la licencia OpenSource Apache 2.

![](/images/native/KotlinNative.png)

### Misión

Kotlin/Native es otro paso hacia hacer Kotlin usable en aplicaciones modernas.
En algún momento, será posible usar Kotlin para escribir cualquier componente,
desde el back-end de un servidor hasta la web o clientes móviles. Compartir
el conjunto de habilidades es una gran motivación para este escenario. El otro,
es poder compartir código.

Nuestra visión para la reutilización de código es la siguiente: uno puedo escribir
módulos enteros en Kotlin de forma independiente de la plataforma y compilarlos a cualquier
plataforma soportada (actualmente tenemos Kotlin/JVM, Kotlin/JS y el próximo Kotlin/Native).
A estos lo llamamos ***módulos comunes***.
Partes de módulos comunes pueden requerir implementaciones específicas por plataforma, que se pueden
desarrollar independientemente para cada plataforma. Los módulos proporcionan un API común para todos los
clientes, pero otros módulos (específicos por plataforma) pueden extender esta API
para proporcionar capacidades exclusivas en sus plataformas.

Nótese que no tenemos la intención de que se puedan ejecutar programas arbitrarios de Kotlin/JVM
en Kotlin/Native o Kotlin/JS. Eso sería lo mismo que implementar otro equivalente a la JVM,
que es por una parte un montón de trabajo y un montón de limitaciones con el runtime.
Nuestra aproximación es diferente: proporcionar un lenguaje común para todas las plataformas a la vez
que habilitamos la creación de librerías comunes a través de interoperabilidad sin costuras
con código específico de cada plataforma.

### Tecnología

Kotlin/Native usa la infraestructura de compilación de LLVM para generar código máquina.
En esta vista preeliminar, soportamos las siguientes [plataformas destino](https://github.com/JetBrains/kotlin-native/blob/v0.1.0/RELEASE_NOTES.md#supported-platforms):

* Mac OS X 10.10 y posteriores (x86-64)
* x86-64 Ubuntu Linux (14.04, 16.04 y posteriores), puede que funcioen en otros sabores de Linux
* Apple iOS (arm64), con compilación cruzada en host MacOS X
* Raspberry Pi, con compilación cruzada en un host Linux
Se pueden añadir más plataformas relativamente fácil, siempre y cuando LLVM soporte dichas plataformas.
Posiblemente soportaremos más plataformas directamente en el futuro.

Como de costumbre, la interoperabilidad es una de nuestras prioridades más altas, y Kotlin/Native
puede llamar a funciones de C de forma eficiente y pasar/obtener datos de/hacia ellos.
Puedes generar bindings de Kotlin desde cabeceras C en tiempo de compilación y obtener
acceso rápido y con seguridad tipada a cualquiera API nativa de la plataforma destino.
Las instrucciones detalladas [aquí](https://github.com/JetBrains/kotlin-native/blob/v0.1.0/INTEROP.md).

### Gestión de memoria

Hemos diseñado Kotlin/Native de forma que puede ofrecer diferentes soluciones de gestión de memoria
según la plataforma destino. Por ejemplo, en el futuro puede que tenga sentido tener un
tracing GC para plataformas de servidor/escritorio, mientras que ARC tiene mucho más sentido en iOS.
Algunas plataformas pueden necesitar solo una gestión manual de la memoria,
a la vez que obtienen un *runtime* aún más ligero de Kotlin/Native.

Esta preview tecnologíca ofrece un sistema de conteo de referencias junto a un colector de ciclos
encima. Pero en este punto todavía desconocemos cómo terminará siendo la gestión de memoria al final.

### Limitaciones actuales

Como hemos mencionado, Kotlin/Native está lejos de estar completo. Así que esta preview tecnológica
tiene una serie de limitaciones que se eliminarán en fases posteriores:

* No hemos hecho optimizaciones de rendimiento todavía, así que hacer *benchmarking* de Kotlin/Nativo
no tiene sentido en esta fase.
* La librería estándar y el soporte de reflexión todavía necesitan mucho trabajo, y añadiremos más APIs
más adelante.
* [Leer más sobre la *release*](https://github.com/JetBrains/kotlin-native/blob/v0.1.0/RELEASE_NOTES.md).

### Planes futuros

Actualmente estamos trabajando en el núcleo tecnológico de Kotlin/Native que es el mismo para todas las plataformas destino (compilador, núcleo de runtime y librería). Algunas posibles ideas que tenemos para
desarrollar cubren los siguientes posibles casos de uso:

* Aplicaciones iOS (reutilización de código con Android)
* Sistemas embebidos/IoT (e.g., Arduino y similares)
* Análisis de dato y computación científica
* Lado del servidor y Microservices (ejecutables con muy pocos requisitos, utilizando el poder de las corrutinas)
* Desarrollo de juegos

### ¿Cómo probar?

Hemos preparado dos archivos con el compilador, ejemplos y documentación:
[para Mac y iOS](http://download.jetbrains.com/kotlin/native/kotlin-native-macos-0.1.tar.gz) y [para Linux y Raspberry Pi](http://download.jetbrains.com/kotlin/native/kotlin-native-linux-0.1.tar.gz).

Echad un ojo al proyecto de Github y a las [Notas de la *release*](https://github.com/JetBrains/kotlin-native/blob/v0.1.0/RELEASE_NOTES.md) para más instrucciones.

**Vuestro *feedback* es muy bienvenido** en el canal de #kotlin-native en nuestro [Slack público](https://kotlinlang.slack.com/)
(Obtener invitación [aquí](http://slack.kotl.in/)).
