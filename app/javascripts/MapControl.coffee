module.exports = class MapControl
	constructor: ->
    @map = L.map('map', {
      scrollWheelZoom: false
      })
      .setView([59.9218, 10.73427], 11)
      .addLayer(L.mapbox.tileLayer('examples.map-20v6611k', {
        detectRetina: true
    }))

    svg = d3.select(@map.getPanes().overlayPane).append("svg")
    g = svg.append("g").attr("class", "leaflet-zoom-hide")

    d3.json "data/primaries.json", (collection)=> 

      smallIcon = L.icon({
          iconUrl: 'images/small_icon.png',
          iconRetinaUrl: 'images/small_icon@2x.png',
          iconSize:     [20, 20], 
          iconAnchor:   [10, 10], 
          popupAnchor:  [0, -1] 
      })

      onEachFeature = (feature, layer)->
        properties = feature.properties
        if properties
          popUp = "<h2><a href=\"" + properties.URL + "\">"
          popUp += properties.NAVN + "</a></h2>"
          if properties.TLF?
            popUp += "<small>Tel: <a href=\"tel:" + properties.TLF + "\">" + properties.TLF + "</a></small>"
          layer.bindPopup(popUp)


      pointToLayer = (feature, latlng)->
        console.info smallIcon
        marker = L.marker(latlng, {icon: smallIcon});


      L.geoJson(collection, {
        pointToLayer: pointToLayer,
        onEachFeature: onEachFeature,
        }).addTo(@map)

    d3.json "data/school_boundaries.topo.json", (collection)=> 
    
      projectStream = (x,y,that)=>
        point = @map.latLngToLayerPoint(new L.LatLng(y, x))
        that.stream.point(point.x, point.y)

      reset = ()=>
        bounds = path.bounds(topo)
        topLeft = bounds[0]
        bottomRight = bounds[1]

        svg.attr("width", bottomRight[0] - topLeft[0])
          .attr("height", bottomRight[1] - topLeft[1])
          .style("left", topLeft[0] + "px")
          .style("top", topLeft[1] + "px")

        g.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")")

        feature.attr("d", path)

      topo = topojson.feature(collection, collection.objects.school_boundaries);
      transform = d3.geo.transform({point: (x,y)->projectStream(x,y,this)})
      path = d3.geo.path().projection(transform)

      feature = g.selectAll("path")
        .data(topo.features)
        .enter().append("path")

      @map.on("viewreset", reset)

      reset()

  project: (point)=>
    point = @map.latLngToLayerPoint(new L.LatLng(point[1], point[0])) 
    return point.x + "," + point.y
