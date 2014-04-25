#!/bin/bash

echo "Removing old files"

rm -rf "../what-school-gh-pages/data"
rm -rf "../what-school-gh-pages/images"
rm -rf "../what-school-gh-pages/javascripts"
rm -rf "../what-school-gh-pages/stylesheets"

echo "Building compressed project"
brunch b -P
cat tracking.js >> public/index.html

cp -R public/ "../what-school-gh-pages/"

cd ../what-school-gh-pages

git add -A
git commit -m "Generating new site"
git push

echo "Done"