!function(){"use strict";var e="undefined"!=typeof window?window:global;if("function"!=typeof e.require){var t={},r={},n=function(e,t){return{}.hasOwnProperty.call(e,t)},o=function(e,t){var r,n,o=[];r=/^\.\.?(\/|$)/.test(t)?[e,t].join("/").split("/"):t.split("/");for(var i=0,s=r.length;s>i;i++)n=r[i],".."===n?o.pop():"."!==n&&""!==n&&o.push(n);return o.join("/")},i=function(e){return e.split("/").slice(0,-1).join("/")},s=function(t){return function(r){var n=i(t),s=o(n,r);return e.require(s,t)}},a=function(e,t){var n={id:e,exports:{}};return r[e]=n,t(n.exports,s(e),n),n.exports},u=function(e,i){var s=o(e,".");if(null==i&&(i="/"),n(r,s))return r[s].exports;if(n(t,s))return a(s,t[s]);var u=o(s,"./index");if(n(r,u))return r[u].exports;if(n(t,u))return a(u,t[u]);throw new Error('Cannot find module "'+e+'" from "'+i+'"')},c=function(e,r){if("object"==typeof e)for(var o in e)n(e,o)&&(t[o]=e[o]);else t[e]=r},p=function(){var e=[];for(var r in t)n(t,r)&&e.push(r);return e};e.require=u,e.require.define=c,e.require.register=c,e.require.list=p,e.require.brunch=!0}}(),require.register("initialize",function(e,t){var r,n;r=t("application"),n=new r}),require.register("MapControl",function(e,t,r){var n;r.exports=n=function(){function e(){this.markerDict={},this.map=L.map("map",{scrollWheelZoom:!1}).setView([59.9218,10.73427],10).addLayer(L.mapbox.tileLayer("evenwestvang.hp8gagn1",{detectRetina:!0})),this.initBoundaries(),this.initMarkers()}return e.prototype.initBoundaries=function(){var e,t,r=this;return t=d3.select(this.map.getPanes().overlayPane).append("svg"),e=t.append("g").attr("class","leaflet-zoom-hide"),d3.json("data/school_boundaries.topo.json",function(n){var o,i,s,a,u,c;return s=function(e,t,n){var o;return o=r.map.latLngToLayerPoint(new L.LatLng(t,e)),n.stream.point(o.x,o.y)},a=function(){var r,n,s;return n=i.bounds(u),s=n[0],r=n[1],t.attr("width",r[0]-s[0]).attr("height",r[1]-s[1]).style("left",s[0]+"px").style("top",s[1]+"px"),e.attr("transform","translate("+-s[0]+","+-s[1]+")"),o.attr("d",i)},u=topojson.mesh(n,n.objects.school_boundaries),c=d3.geo.transform({point:function(e,t){return s(e,t,this)}}),i=d3.geo.path().projection(c),o=e.append("path").datum(u),r.map.on("viewreset",a),a()})},e.prototype.initMarkers=function(){var e=this;return d3.json("data/primaries.json",function(r){var n,o,i,s;return s=L.icon({iconUrl:"images/small_icon.png",iconRetinaUrl:"images/small_icon@2x.png",iconSize:[20,20],iconAnchor:[10,10],popupAnchor:[0,-1]}),i=t("templates/popup"),n=function(e,t){var r;return r=e.properties,r?t.bindPopup(i({properties:r})):void 0},o=function(t,r){var n;return n=L.marker(r,{icon:s}),e.markerDict[t.properties.NAVN]=n},L.geoJson(r,{pointToLayer:o,onEachFeature:n}).addTo(e.map)})},e.prototype.focusOnSchoolName=function(e){var t;return $("html, body").animate({scrollTop:$("#map").offset().top},300),t=this.markerDict[e],t.openPopup(),this.map.setView(t._latlng,13)},e}()}),require.register("SearchBox",function(e,t,r){var n,o=function(e,t){return function(){return e.apply(t,arguments)}};r.exports=n=function(){function e(e){this.processInput=o(this.processInput,this),this.updateView=o(this.updateView,this),this.keyEvent=o(this.keyEvent,this);var r=this;this.controller=e,this.streetTemplate=t("templates/street_listing"),this.lastFieldValue="",this.loadingPromise=new Promise(function(e){return d3.csv("data/addresses.csv",function(t){var n;return r.addresses=t,r.addressDict={},r.addresses.forEach(function(e){var t,n;return e.oddStart=+e.oddStart,e.evenStart=+e.evenStart,e.oddEnd=+e.oddEnd,e.evenEnd=+e.evenEnd,e.street=r.capitaliseFirstLetter(e.street),e.school=r.capitaliseFirstLetter(e.school),t=!1,1===e.oddStart&&2===e.evenStart&&9999===e.oddEnd&&9998===e.evenEnd&&(t=!0),null==r.addressDict[e.street]&&(n={streetName:e.street,oneSchool:t},t?n.school=e.school:(n.oddNumbers=[],n.evenNumbers=[]),r.addressDict[e.street]=n),t||(0!==e.oddStart&&0!==e.oddEnd&&r.addressDict[e.street].oddNumbers.push({school:e.school,range:[e.oddStart,e.oddEnd]}),0===e.evenStart||0===e.evenEnd)?void 0:r.addressDict[e.street].evenNumbers.push({school:e.school,range:[e.evenStart,e.evenEnd]})}),n=function(e){return e?e.sort(function(e,t){return e.range[0]>t.range[0]}):void 0},Object.keys(r.addressDict).forEach(function(e){var t;return t=r.addressDict[e],n(t.oddNumbers),n(t.evenNumbers)}),e(1),$("input#streetName").keydown(_.throttle(function(){return r.keyEvent()},1e3)),$("input#streetName").keyup(_.throttle(function(){return r.keyEvent()},1e3))})})}return e.prototype.setQuery=function(e){var t=this;return $("input#streetName").val(e),this.loadingPromise.then(function(){return t.updateView()})},e.prototype.capitaliseFirstLetter=function(e){return e=e.toLowerCase(),e.charAt(0).toUpperCase()+e.slice(1)},e.prototype.keyEvent=function(){return this.currentFieldValue=$("input#streetName").val(),this.lastFieldValue!==this.currentFieldValue&&(history.replaceState({},"","?streetName="+encodeURI(this.currentFieldValue)),this.lastFieldValue=$("input#streetName").val()),this.updateView()},e.prototype.updateView=function(){var e,t,r,n,o=this;return e=$("input#streetName").val(),r=this.processInput(e),r?(n=r.matches,t="<ul>",n.forEach(function(e){return t+=o.streetTemplate({street:e,digit:r.digit})}),t+="</ul>",$(".searchResults").html(t),$(".searchResults .schoolName").click(function(e){return o.controller.focusOnSchoolName(e.currentTarget.innerText)}),$(".searchResults, .inputWrapper").addClass("populated")):($(".searchResults").html(""),$(".searchResults, .inputWrapper").removeClass("populated"))},e.prototype.processInput=function(e){var t,r,n,o,i,s,a,u,c=this;if(r=e.match(/\d+/g),r&&(t=r[0],e=e.slice(0,e.search(/\d/))),t||(t=0),e=e.replace(/\s/g,""),""===e)return!1;for(n="",i=e.length-1,o=u=0;i>=0?i>=u:u>=i;o=i>=0?++u:--u)n+=e.charAt(o)+"+.?";return a=new RegExp(n,"i"),s=[],Object.keys(this.addressDict).every(function(e){return a.test(e)&&s.push(c.addressDict[e]),s.length>10?!1:!0}),s.forEach(function(e){var r,n;return e.oneSchool&&null!=t?void 0:(n=t%2===0?"evenNumbers":"oddNumbers",r=0,e[n].forEach(function(n){return t>=n.range[0]&&t<=n.range[1]&&(r=n.school),e.school=r}))}),{digit:t,matches:s}},e}()}),require.register("application",function(e,t,r){var n,o,i;o=t("MapControl"),i=t("SearchBox"),r.exports=n=function(){function e(){var e=this;this.searchBox=new i(this),this.mapControl=new o,$(document).ready(function(){var t;return t=location.search.split("="),"?streetName"===t[0]?e.searchBox.setQuery(decodeURI(t[1])):void 0})}return e.prototype.focusOnSchoolName=function(e){return this.mapControl.focusOnSchoolName(e)},e}()});