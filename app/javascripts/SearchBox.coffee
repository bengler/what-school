
module.exports = class SearchBox
	constructor: (controller) ->
    @controller = controller
    @streetTemplate = require "templates/street_listing"
    @lastFieldValue = ""

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

          # Todo: Perhaps DRY this up
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

        sortOnFirstValue = (array) ->
          return undefined unless array
          array.sort (a,b)-> a.range[0] > b.range[0]

        Object.keys(@addressDict).forEach (key) =>
          street = @addressDict[key]
          sortOnFirstValue(street.oddNumbers)
          sortOnFirstValue(street.evenNumbers)

        resolve(1)
        $("input#streetName").keydown(_.debounce( (() => @keyEvent()) , 500))
        $("input#streetName").keyup(_.debounce( (() => @keyEvent()) , 500))
        $("input#streetName").change(_.debounce( (() => @keyEvent()) , 500))

  setQuery: (string) ->
    $("input#streetName").val(string)
    @loadingPromise.then ()=>
      @updateView()

  capitaliseFirstLetter: (string) ->
    string = string.toLowerCase()
    string.charAt(0).toUpperCase() + string.slice(1);

  keyEvent: (e) =>
    @currentFieldValue = $("input#streetName").val()
    if @lastFieldValue != @currentFieldValue
      history.replaceState({}, "", "?streetName=" + encodeURI(@currentFieldValue))
      @lastFieldValue = $("input#streetName").val()

    @updateView()

  updateView: () =>
    fieldValue = $("input#streetName").val()
    result = @processInput(fieldValue)
    if result
      streets = result.matches

      html = "<ul>"
      streets.forEach (street)=>
        html += @streetTemplate(street: street, digit: result.digit)
      html = html + "</ul>"

      $(".searchResults").html(html)
      $(".searchResults .schoolName").click (e)=>
        @controller.focusOnSchoolName(e.currentTarget.innerText)
      $(".searchResults, .inputWrapper").addClass("populated")
    else
      $(".searchResults").html("")
      $(".searchResults, .inputWrapper").removeClass("populated")

	processInput: (matchString)=>
    # TODO: Add sorting on levenshtein distance
    digitMatch = matchString.match(/\d+/g)

    if digitMatch
      digit = digitMatch[0] 
      matchString = matchString.slice(0,matchString.search(/\d/))

    digit ||= 0

    matchString = matchString.replace(/\s/g, '')

    if matchString == ""
      return false

    expression = "^"
    len = matchString.length - 1
    expression += matchString.charAt(i) + "+.?" for i in [0..len]
    re = new RegExp(expression, "i")

    matches = []

    Object.keys(@addressDict).every (street)=>
      matches.push(@addressDict[street]) if re.test(street)
      return false if matches.length > 10
      return true

    matches.forEach (street)=>

      unless street.oneSchool && digit?
        if digit % 2 == 0
          side = "evenNumbers"
        else
          side = "oddNumbers"

        matchedSchool = 0
        street[side].forEach (schoolRange)->
          if digit >= schoolRange.range[0] && digit <= schoolRange.range[1]
            matchedSchool = schoolRange.school 
          street.school = matchedSchool

    return {
      digit: digit
      matches: matches 
    }

