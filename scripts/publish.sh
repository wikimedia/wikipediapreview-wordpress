#!/bin/bash

# When publishing the plugin
#  1. Update the version by running `npm version`
#  2. Run this script
#  3. Commit the svn repo

# echo "usage: ./scripts/publish.sh <svn dir>"

VER=`./scripts/getversion.js`

sed -i "s/'build\/'/'assets\/'/g" wikipediapreview.php
cp ./wikipediapreview.php $1/trunk/
cp ./readme.txt $1/trunk/
cp ./build/{index.js,init.js,style-index.css} $1/trunk/assets
cp ./build/{wikipedia-preview.link.css,wikipedia-preview.production.js} $1/trunk/assets

cd $1
svn cp trunk tags/$VER
cd -

echo "done"
