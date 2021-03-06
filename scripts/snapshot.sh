#!/bin/bash
#
# Note: we shouldn't need to do this. Rather we should be doing this live from the data endpoints
# from the Municipality of Oslo. But they don't offer geojson on their WFS and we don't want to build
# a server side for this – as serving from github is _so_ much more maintainable for hobby projects
#


echo "Snarfing files from WFS"
mkdir tmp_snarf
cd tmp_snarf

# echo "Getting all the schools"

# curl "http://od2.pbe.oslo.kommune.no/cgi-bin/skolekretser?LAYERS=Skolekretser_l&TRANSPARENT=TRUE&SERVICE=WFS&VERSION=1.0.0&REQUEST=GetFeature&STYLES=&SRS=EPSG%3A32632&BBOX=564440.0192024,6608598.0223571,635559.9807976,6691401.9776429&WIDTH=630&HEIGHT=733&typename=alle_skoler" > schools.gml
# rm ../app/assets/data/schools.json
# ogr2ogr -f "GeoJSON"  -s_srs 'EPSG:25832' -t_srs 'EPSG:4326' ../app/assets/data/schools.json schools.gml

echo "Getting all primaries"

curl "http://od2.pbe.oslo.kommune.no/cgi-bin/skolekretser?LAYERS=Skolekretser_l&TRANSPARENT=TRUE&SERVICE=WFS&VERSION=1.0.0&REQUEST=GetFeature&STYLES=&SRS=EPSG%3A32632&BBOX=564440.0192024,6608598.0223571,635559.9807976,6691401.9776429&WIDTH=630&HEIGHT=733&typename=barnesk" > primaries.gml
rm ../app/assets/data/primaries.json
ogr2ogr -f "GeoJSON"  -s_srs 'EPSG:25832' -t_srs 'EPSG:4326' ../app/assets/data/primaries.json primaries.gml

echo "Getting the boundaries"

# We have both "Skolekretser_f" and "Skolekretser_l". Not sure yet what that means. They are the same.
curl "http://od2.pbe.oslo.kommune.no/cgi-bin/skolekretser?LAYERS=Skolekretser_l&TRANSPARENT=TRUE&SERVICE=WFS&VERSION=1.0.0&REQUEST=GetFeature&STYLES=&SRS=EPSG%3A32632&BBOX=564440.0192024,6608598.0223571,635559.9807976,6691401.9776429&WIDTH=630&HEIGHT=733&typename=Skolekretser_f&outputFormat=GML2" > school_boundaries.gml
ogr2ogr -f "GeoJSON"  -s_srs 'EPSG:25832' -t_srs 'EPSG:4326' ../app/assets/data/school_boundaries.json school_boundaries.gml
topojson -p SKRETSNAVN "../app/assets/data/school_boundaries.json" -o "../app/assets/data/school_boundaries.topo.json"
rm ../app/assets/data/school_boundaries.json
cd ..
rm -rf tmp_snarf
