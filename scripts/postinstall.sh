#!/bin/bash

mkdir -p assets/images

cp wikipedia-preview/images/* assets/images

# rewrite the replace method in a better format
sed -i "s/inline-svg( '..\/images/url( wp-content\/plugins\/wikipediapreview-wordpress\/assets\/images/g" wikipedia-preview/style/*.less
sed -i "s/svg' )/svg )/g" wikipedia-preview/style/*.less
sed -i "s/url( '/url( /g" wikipedia-preview/style/*.less
sed -i "s/import '..\/style\/.*.less'//g" wikipedia-preview/src/*.js

# cp node_modules/wikipedia-preview/dist/wikipedia-preview.production.js assets/js
