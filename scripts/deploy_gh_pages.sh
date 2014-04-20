#!/bin/bash

rm -rf "../what-school-gh-pages/data"
rm -rf "../what-school-gh-pages/images"
rm -rf "../what-school-gh-pages/javascripts"
rm -rf "../what-school-gh-pages/stylesheets"

cp -R public/ "../what-school-gh-pages/"
cd ../what-school-gh-pages
git add -A
git commit -m "Generating new site"
git push

echo "Done"