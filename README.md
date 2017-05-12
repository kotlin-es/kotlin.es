kotlin.es utiliza Jekyll para el blog y este es el repositorio de la página oficial que contiene los artículos y el template de la web.

Si quieres colaborar con alguna corrección o escribiendo algún artículo, basta con que hagas un fork de este repositorio y hagas los cambios pertinentes.

## Artículos:
Los artículos están escritos en markdown. Puedes informarte sobre markdown aquí: https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet
Para crear un nuevo artículo edita el archivo: _data/authors.yml añadiéndote como autor y añade un artículo en la carpeta _posts manteniendo la estructura original de archivos.

## Template:
El sistema de templates de jekyll es liquid. Puedes ver los filtros y tags disponibles aquí: https://github.com/Shopify/liquid/wiki/Liquid-for-Designers

## Ejecutar este blog en tu ordenador (mac)
```
sudo gem install jekyll 
sudo gem install jekyll-mentions jemoji jekyll-redirect-from jekyll-sitemap jekyll-feed jekyll-paginate jekyll-sitemap jekyll-feed
git clone git@github.com:kotlin-es/kotlin.es.git
cd kotlin.es.git
jekyll s
open http://127.0.0.1:4000/
```

## Ejecutar este blog en tu ordenador (windows)

Descargar e instalar ruby (probado con 2.2.3) para windows: [http://rubyinstaller.org/downloads/](http://rubyinstaller.org/downloads/)
```
gem install jekyll
gem install jekyll-mentions jemoji jekyll-redirect-from jekyll-sitemap jekyll-feed 
```
