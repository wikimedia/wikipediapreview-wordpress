#!/bin/bash

# compiled wikipedia-preview
git submodule update
cd wikipedia-preview
git reset --hard
npm i
EXTERNAL_IMAGE_PATH='/wp-content/plugins/wikipediapreview-wordpress/assets/images' npm run build
cd ..

# moving assets from wikipedia-preview
mkdir -p assets/images
cp wikipedia-preview/images/* assets/images
cp wikipedia-preview/dist/wikipedia-preview.production.js assets/js

