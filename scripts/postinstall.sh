#!/bin/bash

mkdir -p assets/images
cp wikipedia-preview/images/* assets/images

# rewrite the replace method in a better format
cd wikipedia-preview
git reset --hard
npm i
sed -i "s/inline-svg( '..\/images/url( wp-content\/plugins\/wikipediapreview-wordpress\/assets\/images/g" style/*.less
sed -i "s/svg' )/svg )/g" style/*.less
sed -i "s/url( '/url( /g" style/*.less
sed -i "s/import '.*\/style\/.*'//g" src/**.js
sed -i "s/import '.*\/style\/.*'//g" src/gallery/**.js
# end of the replace method

npm run build
cd ..
cp wikipedia-preview/dist/wikipedia-preview.production.js assets/js
