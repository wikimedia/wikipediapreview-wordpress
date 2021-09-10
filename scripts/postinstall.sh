#!/bin/bash

npm run build
mkdir libs
cp node_modules/wikipedia-preview/dist/wikipedia-preview.production.js libs/
cp node_modules/wikipedia-preview/dist/wikipedia-preview-link.css libs/
