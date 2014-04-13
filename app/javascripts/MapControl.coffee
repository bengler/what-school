module.exports = class MapControl
	constructor: ->
    @map = L.map('map', {
      scrollWheelZoom: false
      })
      .setView([59.9218, 10.73427], 11)
      .addLayer(L.mapbox.tileLayer('examples.map-20v6611k', {
        detectRetina: true
    }))

    L.marker([59.9218, 10.73427]).addTo(@map);

    svg = d3.select(@map.getPanes().overlayPane).append("svg")
    g = svg.append("g").attr("class", "leaflet-zoom-hide")

    d3.json "data/primaries.json", (collection)=> 
      onEachFeature = (feature, layer)->
        properties = feature.properties
        if properties
          popUp = "<h2><a href=\"" + properties.URL + "\">"
          popUp += properties.NAVN + "</a></h2>"
          if properties.TLF?
            popUp += "<p>Tel: <a href=\"tel:" + properties.TLF + "\">" + properties.TLF + "</a></p>"
          layer.bindPopup(popUp)

      L.geoJson(collection, {
        onEachFeature: onEachFeature
        }).addTo(@map)

    d3.json "data/school_boundaries.json", (collection)=> 
      projectStream = (x,y,that)=>
        point = @map.latLngToLayerPoint(new L.LatLng(y, x))
        that.stream.point(point.x, point.y)

      reset = ()=>
        bounds = path.bounds(collection)
        topLeft = bounds[0]
        bottomRight = bounds[1]

        svg.attr("width", bottomRight[0] - topLeft[0])
          .attr("height", bottomRight[1] - topLeft[1])
          .style("left", topLeft[0] + "px")
          .style("top", topLeft[1] + "px")

        g.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")")

        feature.attr("d", path)

      transform = d3.geo.transform({point: (x,y)->projectStream(x,y,this)})
      path = d3.geo.path().projection(transform)

      feature = g.selectAll("path")
        .data(collection.features)
        .enter().append("path")

      @map.on("viewreset", reset)

      reset()

  project: (point)=>
    point = @map.latLngToLayerPoint(new L.LatLng(point[1], point[0])) 
    return point.x + "," + point.y
