what-school
===========

A single evening suggestion as to how one might formulate a service to let you find what local school your kids belong to.

## Features

- Lovely retina tiles from mapbox
- GeoJSON rendered directly in D3
- Fuzzy front end text search

## Requirements

- node
- brunch
- ogr2ogr (for producing new snapshots of the school locations and their boundaries from GML)

## Install

```
npm install
npm -g install brunch
brunch w -s
```

## So, um. This is a quick sketch

If you want to run this in production you might want to do some of the following.

- Geojson is batch converted to static files instead of being loaded directly from the WFS. Either the municipality needs to upgrade their servers to support newfangled formats or there should be a small server that converts and possibly caches these files.

- For street level search the entire file of 4k streets are shipped to the client and searched with regexps. This should totally be done server and queries with an efficient text indexer that does fuzzy search and ranking. [Tabula](http://tabula.nerdpower.org/) managed to extract the data from a PDF. Tabula is awesome.

- For space savings you could probably skip jquery and large chunks of d3. You should also concat these instead of loading from CDNs.

- The geometry for the boundaries could be about 1/10 of the size if simplified and converted to topoJSON. 