

module.exports = class SearchBox
	constructor: (controller) ->
    @controller = controller
    @streetTemplate = require "templates/street_listing"

    @loadingPromise = new Promise (resolve, reject)=>

      d3.csv "data/addresses.csv", (@addresses)=> 
        @addressDict = {}
        @addresses.forEach (address)=>

          address.oddStart = +address.oddStart
          address.evenStart = +address.evenStart
          address.oddEnd = +address.oddEnd
          address.evenEnd = +address.evenEnd

          address.street = @capitaliseFirstLetter(address.street)
          address.school = @capitaliseFirstLetter(address.school)

          if (address.oddStart == 1 || address.oddStart == 0) && (address.evenStart == 2 || address.evenStart == 0) && (address.oddEnd == 9999 || address.oddEnd == 0) && (address.evenEnd == 9998 || address.evenEnd == 0)
            address.entireStreet =  true
          else
            address.entireStreet = false

          address.oddEnd = "slutten" if address.oddEnd == 9999
          address.evenEnd = "slutten" if address.evenEnd == 9998

          @addressDict[address.street] = [] if !@addressDict[address.street]?
          @addressDict[address.street].push(address)

        resolve(1)
        $("input#streetName").keyup(@keyEvent)
        $("input#streetName").change(@updateView)

  setQuery: (string) ->
    $("input#streetName").val(string)
    @loadingPromise.then ()=>
      @updateView()

  capitaliseFirstLetter: (string) ->
    string = string.toLowerCase()
    string.charAt(0).toUpperCase() + string.slice(1);

  keyEvent: (event) =>
    @updateView()
    history.pushState({}, "", "?streetName=" + $("input#streetName").val())

  updateView: () =>
    fieldValue = $("input#streetName").val()
    streets = @search(fieldValue)

    html = "<ul>"
    streets.forEach (stretches)=>

      # TODO: Double filtering is an artefact of awkward data structure. Refactor.
      odd = stretches.sort (a,b)-> a.oddStart > b.oddStart
      odd = odd.filter (a)-> ! (a.oddStart == 0)

      even = stretches.sort (a,b)-> a.evenStart > b.evenStart
      even = even.filter (a)-> ! (a.evenStart == 0)

      html += @streetTemplate(street: stretches[0], even: even, odd: odd)

    html = html + "</ul>"
    $(".searchResults").html(html)
    $(".searchResults .schoolName").click (e)=>
      @controller.focusOnSchoolName(e.currentTarget.innerText)

	search: (matchString)=>
    # TODO: Add sorting on levenshtein distance

    # HACK: For people looking down when they type. Make sure they don't overspecify their street    
    if (digitPosition = matchString.search(/\d/g)) > 0
      matchString = matchString.slice(0,digitPosition)

    matchString = matchString.replace(/\s/g, '')
    matches = []

    if matchString == ""
      return matches

    expression = ""
    len = matchString.length - 1
    expression += matchString.charAt(i) + "+.?" for i in [0..len]
    re = new RegExp(expression, "i")

    Object.keys(@addressDict).every (street)=>
      matches.push(@addressDict[street]) if re.test(street)
      return false if matches.length > 10
      return true

    return matches 

