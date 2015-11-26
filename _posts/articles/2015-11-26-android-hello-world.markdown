---
layout: post
title:  "Hello World - Android"
date:   2015-11-26 08:00:00 +0100
category: articulos
tags: android, hello, world
author: vicboma1
icon: /images/icons/android/android.png
edit: /_posts/articles/2015-11-26-android-hello-world.markdown
permalink: /2015/11/android-hello-world/
---

Desde kotlin.es hoy vamos a mostrar cómo configurar un proyecto Android con Kotlin basado en un "Hola Mundo".
La idea de esta pequeña entrada es acercar un poco más el alcance de Kotlin en los dispositivos móviles e ir iterando sobre pequeños proyectos poco a poco.

## Tutorial
Lo primero que necesitamos es descargarnos la versión de [Android Studio](https://developer.android.com/sdk/index.html) de la web oficial.
Una vez instalado, hacemos doble click en el icono principal de la App. Observaremos en pantalla un "pop-up" de entrada, aquí seleccionamos la primera opción para la creación de un nuevo proyecto.

![](/images/android/helloWorld/00.png)

Configuramos el nombre de la aplicación, su dominio y el nombre del paquete.

![](/images/android/helloWorld/01.png)

Seleccionamos la opción "Phone and Tablet" y especificamos la versión mínima de la SDK de Android. 
Abajo hay un pequeño enlace "help me choose" que nos permite visualizar un gráfico con el alcance de la SDK seleccionada.
Esto permite saber en que dispositivos funcionará nuestra aplicación.

![](/images/android/helloWorld/03.png)

Añadimos una actividad en blanco a nuesta aplicación móvil.

![](/images/android/helloWorld/04.png)

Seguidamente le damos a "Finish".

![](/images/android/helloWorld/05.png)

A partir de aquí, podremos ver la autogeneración el proyecto en Android Studio

![](/images/android/helloWorld/06.png)

En esta imagen vemos que añade el framework "Gradle" automáticamente.

![](/images/android/helloWorld/07.png)

Una vez generado el proyecto, veremos algo parecido a esta imagen.

![](/images/android/helloWorld/08.png)

Ahora debemos descarganos los plugins de "Kotlin" y "Kotlin Extension for Android". 
Pulsamos el botón de "Preferencias" localizado en la barra superior del IDLE. Cuando salga la ventana modal, vamos al apartado "Plugins" y en la busqueda ponemos el token "Kotlin".
Encontraremos dos plugins, los seleccionamos y le damos a "Ok". Para que Android Studio reconozca los plugins debemos reiniciar el IDLE.

![](/images/android/helloWorld/09.png)

Abrimos el proyecto creado y seleccionamos la carpeta "java/es/kotlin/vicboma/holaMundo" en nuestro caso. Aquí tenemos un fichero llamado "MainActivity.java" que es la entrada de nuestra aplicación.
Lo seleccionamos y en la parte derecha visualizaremos su código en Java.
Ahora llega el punto donde necesitaremos decirle al proyecto que queremos trabajar con Kotlin con este fichero de java. 
Usamos la "short-cut" siguiente tanto para Windows o para Mac y abrimos una pequeño contenedor de acciones.

![](/images/android/helloWorld/19.png)

Aquí escribimos "Convert Java File to Kotlin file" y le damos aceptar.

![](/images/android/helloWorld/10.png)

Pulsamos el botón de "Ok" y automáticamente se generará el código correspondiente de Java a Kotlin .

![](/images/android/helloWorld/11.png)

Desde este momento el fichero "MainActivity.java" ha pasado a ser un fichero Kotlin llamado "MainActivity.kt".
Si nos fijamos la sintaxis que tenemos en dicho fichero es perteneciente a Kotlin.
Ahora hay que decirle a Android Studio que nuestro projecto generado tiene que ser configurado con Kotlin.
Para ello, utilizamos la misma "short-cut" que antes y escribimos "Configure Project with Kotlin". Lo seleccionamos y pulsamos "enter".

![](/images/android/helloWorld/20.png)

Nos aparecera una pequeña ventana modal. Seleccionamos la primera opción y la versión más reciente del plugin.

![](/images/android/helloWorld/21.png)

Una vez tengamos todas las configuraciones del proyecto, solamente queda lanzar nuestra App "Hola Mundo" que Android Studio nos ha autogenerado.
Seleccionamos el botón "Run" que se localiza en la parte superior del IDLE. 
Nos aparecerá una ventana modal para seleccionar nuestro móvil o un dispositivo virtual. En nuestro caso vamos a lanzar la App por el emulador.
Pulsamos el icono de la parte inferior derecha en la opcion "Android virtual device".

![](/images/android/helloWorld/12.png)

Pulsamos el botón "Create virtual device" y seleccionamos uno cualquiera de la lista que nos sale en pantalla.

![](/images/android/helloWorld/13.png)

En el caso de clonar un dispositivo, visualizaremos esta imagen. Deseleccionamos todas las opciones que estan en el recuadro rojo.
Esto permitirá que el emulador vaya un poquito más rápido.
Pulsamos "next" para salir de la configuración y otra vez "next" para terminar de editar el dispositivo virtual.

![](/images/android/helloWorld/14.png)

Seguidamente se nos muestra una ventana con el sistema de imagen que queremos para nuesta versión. Lo más recomendable para no tener errores es seleccionar la misma versión que pusimos en la configuración del proyecto inicial.
En nuestro caso pusimos la "Api 22, lollipop 5.1". Si nos fijamos debemos de seleccionar una de estas tres versiones dependiendo de la finalidad de nuestra App. En nuestro caso "x86". Pulsamos "Next" y en la siguiente ventana "Finish".

![](/images/android/helloWorld/15.png)

![](/images/android/helloWorld/16.png)

Ahora cerramos la ventana modal de nuestros dispositivos virtuales. Observaremos que podemos arrancar nuestra aplicación con el dispositivo conectado en modo debug al ordenador o con el emulador creado.
Nosotros optamos por la opción "Launch emulator" y elegimos nuestro emulador.

![](/images/android/helloWorld/17.png)

A continuación se activará el dispositivo y aparecerá arriba automáticamente. Lo seleccionamos y le damos al botón "Ok".

![](/images/android/helloWorld/18.png)

Seguidamente se arrancará el emulador reiniciando el sistema operativo de android (esta operación puede tardar unos minutos).
Finálmente nuestra aplicación "Hola Mundo" aparecerá en el display del dispositivo emulado.

![](/images/android/helloWorld/22.png)

## Conclusiones

La creación de un proyecto Android con Kotlin no requiere de conocimientos avanzados. En este tutorial se ha intentado dar pequeños pasos para llegar a la solución final de manera simple. La configuración manual de Kotlin dentro del proyecto esperemos que se pueda automatizar en el futuro con una opción directa en el "pop-up" de entrada.

Como añadido se os deja un video de la ejecución de la aplicación en un dispositivo físico y una captura de pantalla del "logcat".

<iframe width="560" height="315" src="https://www.youtube.com/embed/vDVITRFEyCc" frameborder="0" allowfullscreen></iframe>

![](/images/android/helloWorld/23.png)


Aquí podéis obtener el repositorio del proyecto: https://github.com/kotlin-es/kotlin-hello.world-android


# Referencias :

* Android Studio, [https://developer.android.com/sdk/index.html](https://developer.android.com/sdk/index.html)
* Gradle, [http://gradle.org/](http://gradle.org/)
* Convert Java to Kotlin, [http://try.kotlinlang.org](http://try.kotlinlang.org)
* Kotlin Android Extensions, [https://kotlinlang.org/docs/tutorials/android-plugin.html](https://kotlinlang.org/docs/tutorials/android-plugin.html)
