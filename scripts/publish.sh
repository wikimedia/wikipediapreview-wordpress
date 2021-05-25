#!/bin/bash

# When publishing the plugin
#  1. Update the version number in `wikipediapreview.php` AND the stable tag in readme.txt
#  2. Run this script
#  3. Run `svn cp trunk tags/<NEW VERSION>` in the svn repo
#  4. Commit the svn repo

# echo "usage: ./scripts/publish.sh <svn dir>"

cp ./wikipediapreview.php $1/trunk/
cp ./readme.txt $1/trunk/
cp ./assets/js/* $1/trunk/assets/js/

echo "done"
