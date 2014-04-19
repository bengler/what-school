
MapControl = require 'MapControl'
SearchBox = require 'SearchBox'

module.exports = class Application
	constructor: ->
    searchBox = new SearchBox
    mapControl = new MapControl
