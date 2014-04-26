what-school
===========

A service for people in Oslo to find out what school their kids belong to. An alternative to this [official page](http://www.utdanningsetaten.oslo.kommune.no/skoletilhoerighet/).

## Features

- Simple UI, reduced complexity
- Leaflet slippy map
- Subtle retina tiles from mapbox
- Simple fuzzy front end text search
- No server side, only client side JS and static files
- Entire service 6% (350Kb/5.4Mb) of the weight of first page load of original
- Page initially loads 2-3 times faster than original (YMMV)

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

- This application is client side only – as maintaining server sides for demo applications is not really desirable. This led to it having nice bells and whistles like instant autocomplete client side search. It's better than a text field and a search button, but it's also slightly unexpected. I've done a few user tests with (also with pensioners) and fixed the things that can go wrong. But if you want to run it this way – you should do a few more.

- The school boundaries are batch converted to static files instead of being loaded directly from the WFS. Either the municipality needs to upgrade their servers to support newfangled formats like GeoJSON or there should be a small server that converts and possibly caches this.

- For street level search the entire file of 4k streets is shipped to the client and searched with regexps. It's only 120k and would shrink to about 20k if gzipped on the server. You could consider doing the search server side. Remember to use fuzzy search and rank on levenshtein or other similarity metric.

- We're feeling kinda bloated: you could skip all of jquery and some chunks of d3 to save space. Es5shim and lodash can also be stricken with some rework. On the other hand – we're at 350Kb gzipped total for the entire service with all the data, assets and JS at 1.27s total load time. The municipal service is at 537Kb for the first page only, clocking in at 4s.

- It's all keyboard navigable and color blindness proofed. It should be WCAG 2 AA, but I'd have that tested.

- Broswer test and fix bugs. Only tested on iOS, Android, Safari, Chrome, Firefox. Map buttons don't trigger properly on Android chrome. Android Chrome also strangely has latency issues with the SVG/D3. Webkit on iOS however does really well. Needs looking into.

- Currently only searches are linkable. Ideally school popup selection should replace URLs also.

- ~~The geometry for the boundaries could be about 1/10 of the size if simplified and converted to topoJSON.~~ Fixed, and they went from 876Kb to 90Kb. Gzip brought it down further to 28Kb. Win.

