module.exports = class MapControl

	constructor: ->
    @markerDict = {}
    @map = L.mapbox.map('map','evenwestvang.hp8gagn1',{
      scrollWheelZoom: false, tileLayer: {detectRetina: true}}
    )

    zoomLevel = 10
    zoomLevel = 11 if $(document).width() > 600
    @map.setView([59.9218, 10.73427], zoomLevel)
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
        marker.addEventListener "popupopen", ()=>
          $(".leaflet-popup-content a.homepage").focus()


      L.geoJson(collection,
        pointToLayer: pointToLayer
        onEachFeature: onEachFeature
        ).addTo(@map)

  focusOnSchoolName: (name)->
    $('html, body').animate({
      scrollTop: $("#mapControl").offset().top - 20
    }, 300)
    marker = @markerDict[name]
    marker.openPopup()
    @map.setView(marker._latlng, 15)
