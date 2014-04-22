

module.exports = class SearchBox
	constructor: (controller) ->
    @controller = controller
    @streetTemplate = require "templates/street_listing"

    @loadingPromise = new Promise (resolve, reject) =>

      d3.csv "data/addresses.csv", (@addresses) => 
        @addressDict = {}
        @addresses.forEach (address)=>

          address.oddStart = +address.oddStart
          address.evenStart = +address.evenStart
          address.oddEnd = +address.oddEnd
          address.evenEnd = +address.evenEnd

          address.street = @capitaliseFirstLetter(address.street)
          address.school = @capitaliseFirstLetter(address.school)

          oneSchool = false
          oneSchool = true if (address.oddStart == 1) && (address.evenStart == 2) && (address.oddEnd == 9999) && (address.evenEnd == 9998)

          if !@addressDict[address.street]?
            street = {
              streetName: address.street
              oneSchool: oneSchool
            }

            if oneSchool
              street.school = address.school
            else
              street.oddNumbers = []
              street.evenNumbers = []

            @addressDict[address.street] = street

          # General ruges vei ?!

          if !oneSchool
            if address.oddStart != 0 && address.oddEnd != 0
              @addressDict[address.street].oddNumbers.push {
                school: address.school
                range: [address.oddStart, address.oddEnd]
              }

            if address.evenStart != 0 && address.evenEnd != 0
              @addressDict[address.street].evenNumbers.push {
                school: address.school
                range: [address.evenStart, address.evenEnd]
              }

        resolve(1)
        $("input#streetName").keydown(@throttle((event) => @keyEvent(event)))
        $("input#streetName").keyup(@throttle((event) => @keyEvent(event)))
        $("input#streetName").change(@updateView)

  setQuery: (string) ->
    $("input#streetName").val(string)
    @loadingPromise.then ()=>
      @updateView()

  capitaliseFirstLetter: (string) ->
    string = string.toLowerCase()
    string.charAt(0).toUpperCase() + string.slice(1);

  keyEvent: (e) =>
    # We don't want the form to submit and have application/x-www-form-urlencoded streets in our URL
    if (e.keyCode == 13)
      e.preventDefault()
      e.stopPropagation()
      return false

    @updateView()
    history.replaceState({}, "", "?streetName=" + encodeURI($("input#streetName").val()))

  updateView: () =>
    fieldValue = $("input#streetName").val()
    result = @search(fieldValue)

    streets = result.matches

    html = "<ul>"
    console.info streets
    streets.forEach (street)=>
      # TODO: Double filtering is an artefact of awkward data structure. Refactor.
      # odd = stretches.sort (a,b)-> a.oddStart > b.oddStart
      # odd = odd.filter (a)-> ! (a.oddStart == 0)

      # even = stretches.sort (a,b)-> a.evenStart > b.evenStart
      # even = even.filter (a)-> ! (a.evenStart == 0)

      html += @streetTemplate(street: street)

    html = html + "</ul>"
    $(".searchResults").html(html)
    $(".searchResults .schoolName").click (e)=>
      @controller.focusOnSchoolName(e.currentTarget.innerText)

	search: (matchString)=>
    # TODO: Add sorting on levenshtein distance

    digitMatch = matchString.match(/\d+/g)

    if digitMatch
      digit = digitMatch[0] 
      matchString = matchString.slice(0,matchString.search(/\d/))

    digit ||= 0

    # don't care about spaces
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

    return {
      digit: digit
      matches: matches 
    }
  # Simple throttling function to cut back on searches on mobile
  throttle: (fn, delay) ->
    delay ||= 300
    timer = null
    return ()->
      context = this
      args = arguments
      clearTimeout(timer)
      timer = setTimeout( ()->
        fn.apply(context, args)
      , delay)
