#!/bin/bash

mkdir libs

# wikipedia preview core script
cp node_modules/wikipedia-preview/dist/wikipedia-preview.umd.cjs libs/wikipedia-preview.js

# wikipedia preview core style
cp node_modules/wikipedia-preview/dist/wikipedia-preview.css libs/wikipedia-preview.css

# default preview link style
cp node_modules/wikipedia-preview/dist/wikipedia-preview-link.css libs/wikipedia-preview-link.css

echo ".wp-block {}" >> libs/wikipedia-preview-link.css # Needed to allow .wmf-wp-* classes to be available inside Wordpress editor
echo ".wp-gallery-fullscreen { z-index: 100000 !important; }" >> libs/wikipedia-preview-link.css # the value must greater than wordpress header to show fullscreen gallery
npm run build
