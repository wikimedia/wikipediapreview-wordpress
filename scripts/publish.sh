#!/bin/bash

# When publishing the plugin
#  1. Update the version by running `npm version <major|minor|patch>`
#  2. Run this script
#  3. Commit the svn repo

# echo "usage: ./scripts/publish.sh <svn dir>"

VER=`./scripts/getversion.js`

npm install
npm run build

# todo: try to split list of files needed in output
# from process of copying them so it's easier to see
# that list and maintain it

cp ./wikipediapreview.php $1/trunk/
cp ./banner.php $1/trunk/
cp ./intro.php $1/trunk/
cp ./intro.css $1/trunk/
cp ./tooltip.php $1/trunk/
cp ./readme.txt $1/trunk/

mkdir $1/trunk/build
cp ./build/{index.js,init.js,style-index.css} $1/trunk/build

mkdir $1/trunk/libs
cp ./libs/{wikipedia-preview-link.css,wikipedia-preview.css,wikipedia-preview.js} $1/trunk/libs

cp ./assets/* $1/assets/

mkdir $1/trunk/images
cp ./images/* $1/trunk/images/

cd $1
svn cp trunk tags/$VER
cd -

echo "done"
