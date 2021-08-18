#!/bin/bash

npm run build
cp node_modules/wikipedia-preview/dist/wikipedia-preview.production.js assets
cp node_modules/wikipedia-preview/dist/wikipedia-preview-link.css assets
