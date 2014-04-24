what-school
===========

A service for people in Oslo to find out what school their kids belong to. An alternative to this [official page](http://www.utdanningsetaten.oslo.kommune.no/skoletilhoerighet/).

## Features

- Simple UI, reduced complexity
- Interoparable maps with leaflet – can use tiles from anywhere
- Luvly retina tiles from mapbox
- School boundaries rendered client side from topojson
- Fuzzy front end text search
- No server side, only client side JS and static files
- Nominally universally accessible (map icons are keyboard navigable, etc)

## Install

```
cd what-school
npm -g install brunch topojson
npm install
brunch w -s
```

To update the boundaries and school locations run

```
brew install ogr2ogr
./scripts/shapshot.sh
```

To update the school addresses you need to grab the official [90 page PDF](http://www.utdanningsetaten.oslo.kommune.no/getfile.php/utdanningsetaten%20%28UDE%29/Internett%20%28UDE%29/ASA/Dokumenter/Alfabetisk%20gateregister%20skoletilh%C3%B8righet%20per%20112013.pdf) and extract the data. Yeah, I know. I used [Tabula](http://tabula.nerdpower.org/) and found it totes amaze and hassle free.

## So, um. This is a quick sketch

If you want to run this in production you might want to do some of the following.

- The school boundaries are batch converted to static files instead of being loaded directly from the WFS. Either the municipality needs to upgrade their servers to support newfangled formats like GeoJSON or there should be a small server that converts and possibly caches this.

- For street level search the entire file of 4k streets is shipped to the client and searched with regexps. It's only 120k and would shrink to about 20k if gzipped on the server. You could consider doing the search server side. Remember to use fuzzy search and rank on levenshtein or other similarity metric.

- We're feeling bloated: you could skip all of jquery and some chunks of d3 to save space. Es5shim and lodash can also be stricken with some rework.

- Everything is keyboard navigable and color blindness proofed. But you should probably have a look at javascript and universal access. 

- Known limitations: map buttons don't trigger properly on Android chrome. Android Chrome also has performance difficulties with the map boundaries. Webkit on iOS however does fine. Needs looking into.

- Currently only searches are linkable. Ideally school popup selection should replace URLs also.

- ~~The geometry for the boundaries could be about 1/10 of the size if simplified and converted to topoJSON.~~ Fixed, and they went from 876Kb to 90Kb. Win.

