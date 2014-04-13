
module.exports = class SearchBox
	constructor: () ->
    
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

        @addressDict[address.street] = [] if !@addressDict[address.street]?
        @addressDict[address.street].push(address)

      $("input#streetName").keyup(@updateView)
      $("input#streetName").focus ()->
        $(".searchResults").slideDown()
      $("input#streetName").blur ()->
        $(".searchResults").slideUp() unless $("input#streetName").val() != ""


  capitaliseFirstLetter: (string) ->
    string = string.toLowerCase()
    string.charAt(0).toUpperCase() + string.slice(1);

  updateView: (event) =>
    fieldValue = $("input#streetName").val()
    matches = @search(fieldValue)

    # TODO: Do this in a proper template.

    html = "<ul>"
    matches.forEach (match)=>
      if match[0].entireStreet
        html += "<li><strong>" + match[0].street + "</strong> går på <strong>" + match[0].school + " skole</strong></li>"
      else
        html += "<li>I <strong>" + match[0].street + "</strong> går de på <ul>"
        match.forEach (stretch)->
          html += "<li><strong>" + stretch.school + " skole</strong> fra nummer "
          html += stretch.oddStart + " - " + stretch.oddEnd + " på den ene siden av gaten og fra "
          html += stretch.evenStart + " - " + stretch.evenEnd + " på den andre</li>"
        html += "</ul>"

    html = html + "</ul>"
    $(".searchResults").html(html)

	search: (matchString)=>
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
      return false if matches.length > 5
      return true

    return matches 

