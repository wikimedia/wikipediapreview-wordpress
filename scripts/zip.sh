#!/bin/bash

npm run fix-lint

rm wikipediapreview.zip
zip -r wikipediapreview.zip \
	wikipediapreview.php \
	assets \
	readme.txt \
	LICENSE \
	README.md \
	--exclude assets/banner-*
