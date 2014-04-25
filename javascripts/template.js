!function(){"use strict";var e="undefined"!=typeof window?window:global;if("function"!=typeof e.require){var t={},r={},s=function(e,t){return{}.hasOwnProperty.call(e,t)},i=function(e,t){var r,s,i=[];r=/^\.\.?(\/|$)/.test(t)?[e,t].join("/").split("/"):t.split("/");for(var n=0,o=r.length;o>n;n++)s=r[n],".."===s?i.pop():"."!==s&&""!==s&&i.push(s);return i.join("/")},n=function(e){return e.split("/").slice(0,-1).join("/")},o=function(t){return function(r){var s=n(t),o=i(s,r);return e.require(o,t)}},a=function(e,t){var s={id:e,exports:{}};return r[e]=s,t(s.exports,o(e),s),s.exports},l=function(e,n){var o=i(e,".");if(null==n&&(n="/"),s(r,o))return r[o].exports;if(s(t,o))return a(o,t[o]);var l=i(o,"./index");if(s(r,l))return r[l].exports;if(s(t,l))return a(l,t[l]);throw new Error('Cannot find module "'+e+'" from "'+n+'"')},p=function(e,r){if("object"==typeof e)for(var i in e)s(e,i)&&(t[i]=e[i]);else t[e]=r},u=function(){var e=[];for(var r in t)s(t,r)&&e.push(r);return e};e.require=l,e.require.define=p,e.require.register=p,e.require.list=u,e.require.brunch=!0}}(),require.register("index.static",function(exports,require,module){module.exports=function anonymous(locals,attrs,escape,rethrow,merge){attrs=attrs||jade.attrs,escape=escape||jade.escape,rethrow=rethrow||jade.rethrow,merge=merge||jade.merge;var buf=[];with(locals||{}){buf.push('<!DOCTYPE html><!--[if IE 6]><html id="ie6" lang="en"><![endif]--><!--[if IE 7]><html id="ie7" lang="en"><![endif]--><!--[if IE 8]><html id="ie8" lang="en"><![endif]--><!--[if IE 9]><html id="ie9" lang="en"><![endif]--><!-- if[!IE]><!--><html lang="en"><!--<![endif]--><head><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><title>Hvilken barneskole hører dere til?</title><link href="https://api.tiles.mapbox.com/mapbox.js/v1.6.2/mapbox.css" rel="stylesheet"><script src="https://api.tiles.mapbox.com/mapbox.js/v1.6.2/mapbox.js"></script><meta name="viewport" content="initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width"><link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Lato:300,400" type="text/css"><link rel="stylesheet" href="stylesheets/app.css" type="text/css"></head><body><h1>Hvilken barneskole hører dere til?</h1><h2>Søk på adressen din</h2><form onsubmit="return false;" autocomplete="off" enctype="application/x-www-form-urlencoded" method="get"><label for="streetName">Hvor er det du bor?</label><div class="inputWrapper"><input id="streetName" autocomplete="off" type="text" name="streetName" placeholder="Skriv adressen for å søke"></div></form><div class="searchResults"></div><div class="mapControl"><h2>Skolene på kartet</h2></div><div id="map"></div><div class="footer"><small> <strong>Verdt å merke seg</strong><ul><li>Kommunen forsøker å få dere inn på den nærmeste skolen eller skolen som er i området dere bor i – men kan ikke garantere noe.</li><li>Dere kan søke om å bytte skole om dere vil</li></ul></small></div><div class="footer"><small> <strong>Vi kan få bedre og billigere offentlige tjenester bygd på delt kildekode.</strong> Etter å ha sett <a href="http://www.utdanningsetaten.oslo.kommune.no/getfile.php/utdanningsetaten%20%28UDE%29/Internett%20%28UDE%29/ASA/Dokumenter/Alfabetisk%20gateregister%20skoletilh%C3%B8righet%20per%20112013.pdf">de 51 PDF sidene </a> og  <a href="http://od2.pbe.oslo.kommune.no/xkart/skoler/#cp=600000,6650000,0">kartene</a> Oslo kommune hadde på <a href="http://www.utdanningsetaten.oslo.kommune.no/skoletilhoerighet/">siden sine</a> tenkte jeg det var verdt å lage en liten skisse for å se om det hele kunne forenkles litt. Om du jobber i en kommune og vil gjenbruke noe av dette ligger det på  <a href="https://github.com/bengler/what-school">Github</a>.<p> Vennlig hilsen <a href="http://bengler.no/even">even</a>.</p></small></div><script src="javascripts/vendor.js"></script><script src="javascripts/template.js"></script><script src="javascripts/app.js"></script><script>require(\'initialize\');\n</script></body></html>')}return buf.join("")}}),require.register("templates/popup",function(exports,require,module){module.exports=function anonymous(locals,attrs,escape,rethrow,merge){attrs=attrs||jade.attrs,escape=escape||jade.escape,rethrow=rethrow||jade.rethrow,merge=merge||jade.merge;var buf=[];with(locals||{}){buf.push("<h2> ");var __val__=properties.NAVN;if(buf.push(escape(null==__val__?"":__val__)),buf.push("</h2><p> <small> <a"),buf.push(attrs({href:properties.URL},{href:!0})),buf.push(">Skolens hjemmeside</a></small></p>"),properties.TLF){buf.push("<small>Tel: <a"),buf.push(attrs({href:"tel:"+properties.TLF},{href:!0})),buf.push(">");var __val__=properties.TLF;buf.push(escape(null==__val__?"":__val__)),buf.push("</a></small>")}}return buf.join("")}}),require.register("templates/street_listing",function(exports,require,module){module.exports=function anonymous(locals,attrs,escape,rethrow,merge){attrs=attrs||jade.attrs,escape=escape||jade.escape,rethrow=rethrow||jade.rethrow,merge=merge||jade.merge;var buf=[];with(locals||{}){var interp;buf.push(street.oneSchool?"<li> \nHele <strong>"+escape(null==(interp=street.streetName)?"":interp)+'</strong> går på <div class="schoolName">'+escape(null==(interp=street.school)?"":interp)+" skole</div></li>":digit?street.school?"<li>I <strong>"+escape(null==(interp=street.streetName)?"":interp)+" "+escape(null==(interp=digit)?"":interp)+'</strong> går de på <div class="schoolName">'+escape(null==(interp=street.school)?"":interp)+" skole</div></li>":'<li class="notAnAddress">I <strong>'+escape(null==(interp=street.streetName)?"":interp)+" "+escape(null==(interp=digit)?"":interp)+"</strong> ser det ikke ut som det bor noen</li>":'<li class="missingDigit">For <strong>'+escape(null==(interp=street.streetName)?"":interp)+"</strong> må du skrive gatenummeret også</li>")}return buf.join("")}});