#!/bin/bash

mkdir -p assets
mkdir -p assets/js
mkdir -p assets/css

cp node_modules/wikipedia-preview/dist/wikipedia-preview.production.js assets/js
cp node_modules/wikipedia-preview/dist/wikipedia-preview.css assets/css