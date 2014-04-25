
MapControl = require 'MapControl'
SearchBox = require 'SearchBox'

module.exports = class Application
	constructor: ->
    @searchBox = new SearchBox(this)
    @mapControl = new MapControl()

    $(document).ready ()=>
      query = location.search.split("=")
      if query[0] == "?streetName" && query[1]?
        @searchBox.setQuery(decodeURI(query[1]))

  focusOnSchoolName: (name)->
    @mapControl.focusOnSchoolName(name)

