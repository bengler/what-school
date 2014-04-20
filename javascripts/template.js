(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("index.static", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<!DOCTYPE html><!--[if IE 6]><html id="ie6" lang="en"><![endif]--><!--[if IE 7]><html id="ie7" lang="en"><![endif]--><!--[if IE 8]><html id="ie8" lang="en"><![endif]--><!--[if IE 9]><html id="ie9" lang="en"><![endif]--><!-- if[!IE]><!--><html lang="en"><!--<![endif]--><head><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><title>Hvilken barneskole hører dere til?</title><link rel="stylesheet" href="stylesheets/app.css" type="text/css"><meta name="viewport" content="initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width"></head><body><h1>Hvilken barneskole hører dere til?</h1><div class="content"><h2>Søk etter gata deres</h2><form><label for="streetName">Hvilken gate bor dere i?</label><div class="inputWrapper"><input id="streetName" type="text" name="streetName" placeholder="Normannsgata"></div></form></div><div class="searchResults"></div><div class="content"><h2>Hvilke deler av byen hører til hvilke barneskoler?</h2></div><div id="map"></div><div class="content footer"><small> <strong>Verdt å merke seg</strong><ul><li>Kommunen forsøker å få dere inn på den nærmeste skolen eller skolen som er i området dere bor i – men kanke garantere noe</li><li>Dere kan søke om å bytte skole om dere vil</li></ul></small></div><div class="content footer"><small> <strong>Hvorfor finnes denne siden? </strong>Etter å ha sett de <a href="http://www.utdanningsetaten.oslo.kommune.no/skoletilhoerighet/">51 PDF sidene og kartene</a> Oslo Kommune hadde på sidene sine tenkte jeg det var verdt å lage en liten skisse for å se om det hele kunne forenkles litt. Om du jobber i en kommune og vil titte på kildekoden ligger den på  <a href="https://github.com/bengler/what-school">Github</a>. Vennlig hilsen <a href="http://bengler.no/even">even</a>.</small></div><script src="javascripts/vendor.js"></script><script src="javascripts/template.js"></script><script src="javascripts/app.js"></script><script>require(\'initialize\');\n</script></body></html>');
}
return buf.join("");
};
});

;require.register("templates/popup", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<h2> <a');
buf.push(attrs({ 'href':(properties.URL) }, {"href":true}));
buf.push('>');
var __val__ = properties.NAVN
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</a></h2>');
if ( properties.TLF )
{
buf.push('<small>Tel: <a');
buf.push(attrs({ 'href':(properties.TLF) }, {"href":true}));
buf.push('>');
var __val__ = properties.TLF
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</a></small>');
}
}
return buf.join("");
};
});

;require.register("templates/street_listing", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
if ( street.entireStreet == true)
{
buf.push('<li> <div class="heading"><span class="arrow"> \n➳ </span>Hele <strong>' + escape((interp = street.street) == null ? '' : interp) + '</strong> går på <strong>' + escape((interp = street.school) == null ? '' : interp) + ' skole</strong></div></li>');
}
else
{
buf.push('<li> <div class="heading"> <span class="arrow"> \n➳ </span>I <strong>' + escape((interp = street.street) == null ? '' : interp) + '</strong> kommer det an på gatenummeret<ul class="streetSide odd"><li class="sideHeading">På ene siden av gata…</li>');
// iterate odd
;(function(){
  if ('number' == typeof odd.length) {

    for (var $index = 0, $$l = odd.length; $index < $$l; $index++) {
      var stretch = odd[$index];

buf.push('<li><div class="streetNumbering"><div class="number">');
var __val__ = stretch.oddStart
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div>&nbsp;&nbsp;&nbsp;–&nbsp;&nbsp;  <div class="number">');
var __val__ = stretch.oddEnd
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div></div><div class="schoolName">');
var __val__ = stretch.school
buf.push(escape(null == __val__ ? "" : __val__));
buf.push(' skole</div></li>');
    }

  } else {
    var $$l = 0;
    for (var $index in odd) {
      $$l++;      var stretch = odd[$index];

buf.push('<li><div class="streetNumbering"><div class="number">');
var __val__ = stretch.oddStart
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div>&nbsp;&nbsp;&nbsp;–&nbsp;&nbsp;  <div class="number">');
var __val__ = stretch.oddEnd
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div></div><div class="schoolName">');
var __val__ = stretch.school
buf.push(escape(null == __val__ ? "" : __val__));
buf.push(' skole</div></li>');
    }

  }
}).call(this);

buf.push('</ul><ul class="streetSide even"><li class="sideHeading"> … og på den andre</li>');
// iterate even
;(function(){
  if ('number' == typeof even.length) {

    for (var $index = 0, $$l = even.length; $index < $$l; $index++) {
      var stretch = even[$index];

buf.push('<li><div class="streetNumbering"><div class="number">');
var __val__ = stretch.evenStart
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div>&nbsp;&nbsp;&nbsp;–&nbsp;&nbsp;  <div class="number">');
var __val__ = stretch.evenEnd
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div></div><div class="schoolName">');
var __val__ = stretch.school
buf.push(escape(null == __val__ ? "" : __val__));
buf.push(' skole</div></li>');
    }

  } else {
    var $$l = 0;
    for (var $index in even) {
      $$l++;      var stretch = even[$index];

buf.push('<li><div class="streetNumbering"><div class="number">');
var __val__ = stretch.evenStart
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div>&nbsp;&nbsp;&nbsp;–&nbsp;&nbsp;  <div class="number">');
var __val__ = stretch.evenEnd
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div></div><div class="schoolName">');
var __val__ = stretch.school
buf.push(escape(null == __val__ ? "" : __val__));
buf.push(' skole</div></li>');
    }

  }
}).call(this);

buf.push('</ul></div></li><div class="clear"></div>');
}
}
return buf.join("");
};
});

;
//# sourceMappingURL=template.js.map