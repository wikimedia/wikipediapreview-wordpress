#!/bin/bash

mkdir libs

# wikipedia preview core script
cp node_modules/wikipedia-preview/dist/wikipedia-preview.umd.cjs libs/wikipedia-preview.js

# default preview link style
cp node_modules/wikipedia-preview/demo/css/link.css libs/wikipedia-preview-link.css

echo ".wp-block {}" >> libs/wikipedia-preview-link.css # Needed to allow .wmf-wp-* classes to be available inside Wordpress editor
npm run build
