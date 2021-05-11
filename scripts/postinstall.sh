#!/bin/bash

# compiled wikipedia-preview
git submodule update
cd wikipedia-preview
git reset --hard
npm i
EXTERNAL_IMAGE_PATH='images' EXCLUDE_STYLE=true npm run build
cd ..

# moving assets from wikipedia-preview
mkdir -p assets/styles/images
cp wikipedia-preview/images/* assets/styles/images
cp wikipedia-preview/dist/wikipedia-preview.production.js assets/js
cp wikipedia-preview/dist/wikipedia-preview-style.css assets/styles
