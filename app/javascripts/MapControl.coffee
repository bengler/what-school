module.exports = class MapControl
	constructor: ->

    @markerDict = {}
    @map = L.map('map',
        scrollWheelZoom: false
      )
      .setView([59.9218, 10.73427], 10)
      # .addLayer(L.mapbox.tileLayer('examples.map-20v6611k',
      .addLayer(L.mapbox.tileLayer('evenwestvang.hp8gagn1',
        detectRetina: true
    ))

    @initBoundaries()
    @initMarkers()

  initBoundaries: ->

    svg = d3.select(@map.getPanes().overlayPane).append("svg")
    g = svg.append("g").attr("class", "leaflet-zoom-hide")

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

      topo = topojson.mesh(collection, collection.objects.school_boundaries);
      transform = d3.geo.transform({point: (x,y)->projectStream(x,y,this)})
      path = d3.geo.path().projection(transform)

      feature = g.append("path")
        .datum(topo)

      @map.on("viewreset", reset)

      reset()


  initMarkers: ->
    d3.json "data/primaries.json", (collection)=> 
      smallIcon = L.icon(
          iconUrl: 'images/small_icon.png',
          iconRetinaUrl: 'images/small_icon@2x.png',
          iconSize:     [20, 20], 
          iconAnchor:   [10, 10], 
          popupAnchor:  [0, -1] 
      )

      popupTemplate = require "templates/popup"

      onEachFeature = (feature, layer)=>
        properties = feature.properties
        if properties
          layer.bindPopup(popupTemplate(properties: properties))

      pointToLayer = (feature, latlng)=>
        marker = L.marker(latlng, {icon: smallIcon})
        @markerDict[feature.properties.NAVN] = marker

      L.geoJson(collection,
        pointToLayer: pointToLayer
        onEachFeature: onEachFeature
        ).addTo(@map)

  focusOnSchoolName: (name)->
    $('html, body').animate({
      scrollTop: $("#map").offset().top
    }, 300)
    marker = @markerDict[name]
    marker.openPopup()
    @map.setView(marker._latlng, 13)