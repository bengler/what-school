module.exports = class MapControl
	constructor: ->
    @map = L.map('map')
      .setView([59.9218, 10.73427], 12)
      .addLayer(L.mapbox.tileLayer('examples.map-20v6611k', {
        detectRetina: true
    }))

    svg = d3.select(@map.getPanes().overlayPane).append("svg")
    g = svg.append("g").attr("class", "leaflet-zoom-hide")

    d3.json "data/school_boundaries.json", (collection)=> 

      projectPoint = (x,y,that)=>

        point = @map.latLngToLayerPoint(new L.LatLng(y, x))
        that.stream.point(point.x, point.y)

      reset = ()=>
        bounds = path.bounds(collection)
        console.info bounds
        topLeft = bounds[0]
        bottomRight = bounds[1]

        svg.attr("width", bottomRight[0] - topLeft[0])
          .attr("height", bottomRight[1] - topLeft[1])
          .style("left", topLeft[0] + "px")
          .style("top", topLeft[1] + "px")

        g.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")")

        feature.attr("d", path)


      transform = d3.geo.transform({point: (x,y)->projectPoint(x,y,this)})
      path = d3.geo.path().projection(transform)

      feature = g.selectAll("path")
        .data(collection.features)
        .enter().append("path")
        # .attr "foo", (d)-> console.info d.properties

      @map.on("viewreset", reset)

      reset()



	echo: ->
		console.log "Hello, #{@helloWhat}!"