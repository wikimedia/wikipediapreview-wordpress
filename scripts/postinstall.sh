#!/bin/bash

# preparing compiled js and css file
git submodule update
cd wikipedia-preview
git reset --hard
npm i

# compiled js
sed -i "/import '.*\/style\/.*'/d" src/*.js
sed -i "/import '.*\/style\/.*'/d" src/**/*.js
npm run build

# compiled css
sed -i "s|inline-svg( '../images/\(.*\)' )|url( /wp-content/plugins/wikipediapreview-wordpress/assets/images/\1 )|g" style/*.less
sed -i "s|url( '\(.*\)' )|url( \1 )|g" style/*.less
echo '@import "gallery.less";@import "popup.less";@import "preview.less";' > style/index.less
node node_modules/less/bin/lessc style/index.less dist/wikipedia-preview.production.css

cd ..

# moving assets from wikipedia-preview
mkdir -p assets/{images,styles}
cp wikipedia-preview/images/* assets/images
cp wikipedia-preview/dist/wikipedia-preview.production.js assets/js
cp wikipedia-preview/dist/wikipedia-preview.production.css assets/styles

