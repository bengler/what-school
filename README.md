what-school
===========

A single evening suggestion as to how one might formulate a service to let you find what local school your kids belong to. An alternative to this [official page](http://www.utdanningsetaten.oslo.kommune.no/skoletilhoerighet/).

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

To update the boundaries and school locations run
```
./scripts/shapshot.sh
```

To update the school addresses you need to grab the official [90 page PDF](http://www.utdanningsetaten.oslo.kommune.no/getfile.php/utdanningsetaten%20%28UDE%29/Internett%20%28UDE%29/ASA/Dokumenter/Alfabetisk%20gateregister%20skoletilh%C3%B8righet%20per%20112013.pdf) and extract the data. Yeah, I know. I used [Tabula](http://tabula.nerdpower.org/) and found it totes amaze and hassle free.

## So, um. This is a quick sketch

If you want to run this in production you might want to do some of the following.

- The school boundaries are batch converted to static files instead of being loaded directly from the WFS. Either the municipality needs to upgrade their servers to support newfangled formats like GeoJSON or there should be a small server that converts and possibly caches this.

- For street level search the entire file of 4k streets is shipped to the client and searched with regexps. It's only 120k and would shrink to 20k if gzipped on the server. You should consider doing the search server side. Remember to use fuzzy search and ranking on similarity.

- You could skip jquery and some chunks of d3 for space savings

- You should have a look at javascript and universal access

- ~~The geometry for the boundaries could be about 1/10 of the size if simplified and converted to topoJSON.~~ Fixed, and they went from 876Kb to 100Kb. Win.

