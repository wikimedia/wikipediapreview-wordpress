#!/bin/bash

npm run build
cp node_modules/wikipedia-preview/dist/wikipedia-preview.production.js assets/js
cp node_modules/wikipedia-preview/dist/wikipedia-preview-link.css assets/styles