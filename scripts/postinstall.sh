#!/bin/bash

mkdir libs
cp node_modules/wikipedia-preview/dist/wikipedia-preview.production.js libs/
cp node_modules/wikipedia-preview/dist/wikipedia-preview.css libs/wikipedia-preview-link.css
echo ".wp-block {}" >> libs/wikipedia-preview-link.css # Needed to allow .wmf-wp-* classes to be available inside Wordpress editor
npm run build
