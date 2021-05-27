#!/bin/bash
# This script runs during the npm `version` hook.
# It updates the plugin version and readme stable tag
# and git add those files so they are included in the version update commit.

VER=`./scripts/getversion.js`

sed "s/^ \* Version:.*$/ * Version: $VER/" wikipediapreview.php > wikipediapreview.php.new && \
	mv wikipediapreview.php.new wikipediapreview.php && \
	git add wikipediapreview.php

sed "s/^Stable tag:.*$/Stable tag: $VER/" readme.txt > readme.txt.new && \
	mv readme.txt.new readme.txt && \
	git add readme.txt
