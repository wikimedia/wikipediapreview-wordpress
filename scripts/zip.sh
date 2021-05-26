#!/bin/bash

rm -f wikipediapreview.zip
zip -r wikipediapreview.zip \
	wikipediapreview.php \
	assets \
	readme.txt \
	LICENSE \
	README.md \
	--exclude assets/banner-*
