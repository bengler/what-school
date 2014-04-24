
MapControl = require 'MapControl'
SearchBox = require 'SearchBox'

module.exports = class Application
	constructor: ->
    @searchBox = new SearchBox(this)
    @mapControl = new MapControl()

    $(document).ready ()=>
      query = location.pathname.split("/")
      if query[1] == "gate"
        @searchBox.setQuery(decodeURI(query[2]))

  focusOnSchoolName: (name)->
    @mapControl.focusOnSchoolName(name)

