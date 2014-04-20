
MapControl = require 'MapControl'
SearchBox = require 'SearchBox'

module.exports = class Application
	constructor: ->
    @searchBox = new SearchBox(this)
    @mapControl = new MapControl()

  focusOnSchoolName: (name)->
    @mapControl.focusOnSchoolName(name)
