---
layout: post
title:  "Migrando código con @Deprecated + replaceWith"
category: articulos
author: soywiz
icon: /images/icons/icon-warning.svg
---

Una cosa muy interesante de Kotlin es la anotación `@Deprecated`,
que lejos de notificar al usuario que una funcionalidad está deprecada
y se desaconseja su uso, nos permite automatizar la migración del código.

Y aunque nuestra intención sea hacer el cambio directamente y no mantener
el código deprecado, esta anotación nos permitirá **ahorrarnos mucho trabajo**
haciendo dicha migración. Pues está integrada con intelliJ y permite hacer
la migración automáticamente de una característica deprecada o de todas a
la vez. 

### El problema:

Partiendo de este fragmento de código:

![](/images/deprecated/0.png)

Supongamos que ahora nos interesa que getResults en vez de devolver una
lista de enteros devuelva un objeto `Result` que ademeás de la lista contiene
más información. Pero no queremos cambiar, de momento, todos los sitios en
los que se utiliza este método.

![](/images/deprecated/1.png)

Ahora tenemos que todos los sitios en los que se llamaba a getResults,
se han roto. Con lo que en vez de hacer esto, creamos otro método que
es el que devuelve el resultado complejo, y mantenemos el método con el
comportamiento antigüo:

![](/images/deprecated/2.png)

Ahora lo que queremos es que se deje de utilizar el getResults antigüo,
y que todos los sitios donde se llama a `getResults()` de momento se 
reemplacen por `getResults().list`, al menos de momento.

Aquí es donde entra en acción la anotación `@Deprecated` y su replaceWith.

### Utilizando @Deprecated

Vamos a añadir la anotación `@Deprecated`.
En su versión más básica, acepta un único argumento
con un mensaje descriptivo sobre por qué se depreca 
o cómo avanzar.
Y en su versión más potente disponemos de dos argumentos
adicionales.
Dichos argumentos nos permiten automatizar la migración,
y elegir el comportamiento ante el uso: no compilar, warning, aviso. 

![](/images/deprecated/3.png)

En este código instamos a utilizar getFullResults
en lugar de getResults, proporcionamos un reemplazo automático
(que podría incluir this, argumentos o incluso añadir imports adicionales).
Además indicamos a Kotlin que no permita compilar el código hasta que no
se realice la migración.

Si nos colocamos encima de las llamadas a getResults,
nos encontramos con el mensaje que hemos escrito.
Y además un quickfix nos permite cambiar cada caso individualmente
de forma automátizada utilizando el patrón definido en replaceWith,
así como otro quickfix para hacer dicho reemplazo en todas las llamadas a getResults.

Si tenemos varios `@Deprecated`.

En el menú `Analyze`, disponemos de `Code Cleanup...` que nos permite hacer limpieza
de todo el código incluyendo, organización de imports el reemplazo automático de todos los `@Deprecated` con replaceWith
que sigan referenciados.

![](/images/deprecated/4.png)

`getResults` ahora se queda marcado en gris sin referencias
y ya podemos eliminarlo de forma segura (por ejemplo con alt+enter y el *quick fix* `Safe Delete...`).

![](/images/deprecated/5.png)

### Ejemplo más complejo:

Con ReplaceWith, podemos desde cambiar el orden de los parámetros,
acceder a this, añadir accesos adicionales, modificar un argumento
aplicándole transformaciones u otros cambios que se nos ocurran:

![](/images/deprecated/complex.png)

### Code Cleanup...

![](/images/deprecated/code_cleanup.png)

### Informe de deprecación
![](/images/deprecated/report.png)

### Quickfix
![](/images/deprecated/quickfix.png)

### Borrar de forma segura
![](/images/deprecated/safe_delete.png)