---
layout: post
title: "Kotlin/Native v0.2"
category: releases
tags: releases
author: soywiz
original: https://blog.jetbrains.com/kotlin/2017/05/kotlinnative-v0-2-is-out/
icon: /images/native/KotlinNative.png
---

Nos complace anunciar la liberación de Kotlin/Native v0.2, una actualización con características y correcciones a la preview técnica. Esta actualización añade soporte para corrutinas y soporte para funciones inline cross-módulo, así como correcciones y mejoras por todas partes.

Esta versión incluye muestras sobre cómo [usar corrutinas para hacer IO no bloqueante](https://github.com/JetBrains/kotlin-native/tree/master/samples/nonBlockingEchoServer), una [aplicación GUI usando GTK](https://github.com/JetBrains/kotlin-native/tree/master/samples/gtk) así como un [cliente del framework de *machine learning* TensorFlow](https://github.com/JetBrains/kotlin-native/tree/master/samples/tensorflow) aportado por Julius Kunze.

Por ejemplo, el código es tan fácil como:

{% highlight kotlin %}
var connectionId = 0
acceptClientsAndRun(listenFd) {
  memScoped {
    val bufferLength = 100L
    val buffer = allocArray<ByteVar>(bufferLength)
    val connectionIdString = "#${++connectionId}: ".cstr
    val connectionIdBytes = connectionIdString.getPointer(this)
    try {
      while (true) {
        val length = read(buffer, bufferLength)
        if (length == 0L) break
        write(connectionIdBytes, connectionIdString.size.toLong())
        write(buffer, length)
      }
    } catch (e: IOException) {
      println("I/O error occurred: ${e.message}")
    }
  }
}
{% endhighlight %}

que se puede usar para procesar múltiples sockets de forma concurrente con courruticorrutinas y servir cada cliente individual y concurrentemente.

Y para crear un botón GTK y un event listener, basta con:

{% highlight kotlin %}
val button = gtk_button_new_with_label("Click me!")!!
g_signal_connect(button, "clicked",
   staticCFunction { _: CPointer<GtkWidget>?, _: gpointer? -> println("Hi from Kotlin") }
)
{% endhighlight %}

Así que la versión 0.2, permite crear aplicaciones nativas, ligeras y completamente funcionales escritas en Kotlin.

Tanto el rendimiento de la compilación como del runtime ha mejorado significativamente, y también ha disminuido el tamaño de los redistribuibles.

La lista completa de cambios en esta versión se puede encontrar en el [changelog](https://github.com/JetBrains/kotlin-native/blob/v0.2.0/CHANGELOG.md).

Y hay disponible binarios precompilados tanto para [Linux](http://download.jetbrains.com/kotlin/native/kotlin-native-linux-0.2.tar.gz) como para [MacOS](http://download.jetbrains.com/kotlin/native/kotlin-native-macos-0.2.tar.gz).
