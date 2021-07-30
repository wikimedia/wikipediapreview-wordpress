#!/bin/bash

# When publishing the plugin
#  1. Update the version by running `npm version`
#  2. Run this script
#  3. Commit the svn repo

# echo "usage: ./scripts/publish.sh <svn dir>"

VER=`./scripts/getversion.js`

cp ./wikipediapreview.php $1/trunk/
cp ./readme.txt $1/trunk/
cp ./assets/js/* $1/trunk/assets/js/
cp ./assets/styles/* $1/trunk/assets/styles/
cp ./build $1/build/

cd $1
svn cp trunk tags/$VER
cd -

echo "done"
