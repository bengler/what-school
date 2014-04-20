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
require.register("initialize", function(exports, require, module) {
var Application, app;

Application = require('application');

app = new Application;
});

;require.register("MapControl", function(exports, require, module) {
var MapControl;

module.exports = MapControl = (function() {
  function MapControl() {
    var g, svg,
      _this = this;
    this.map = L.map('map', {
      scrollWheelZoom: false
    }).setView([59.9218, 10.73427], 11).addLayer(L.mapbox.tileLayer('examples.map-20v6611k', {
      detectRetina: true
    }));
    svg = d3.select(this.map.getPanes().overlayPane).append("svg");
    g = svg.append("g").attr("class", "leaflet-zoom-hide");
    d3.json("data/primaries.json", function(collection) {
      var onEachFeature, pointToLayer, popupTemplate, smallIcon;
      smallIcon = L.icon({
        iconUrl: 'images/small_icon.png',
        iconRetinaUrl: 'images/small_icon@2x.png',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        popupAnchor: [0, -1]
      });
      popupTemplate = require("templates/popup");
      onEachFeature = function(feature, layer) {
        var properties;
        properties = feature.properties;
        if (properties) {
          return layer.bindPopup(popupTemplate({
            properties: properties
          }));
        }
      };
      pointToLayer = function(feature, latlng) {
        var marker;
        return marker = L.marker(latlng, {
          icon: smallIcon
        });
      };
      return L.geoJson(collection, {
        pointToLayer: pointToLayer,
        onEachFeature: onEachFeature
      }).addTo(_this.map);
    });
    d3.json("data/school_boundaries.topo.json", function(collection) {
      var feature, path, projectStream, reset, topo, transform;
      projectStream = function(x, y, that) {
        var point;
        point = _this.map.latLngToLayerPoint(new L.LatLng(y, x));
        return that.stream.point(point.x, point.y);
      };
      reset = function() {
        var bottomRight, bounds, topLeft;
        bounds = path.bounds(topo);
        topLeft = bounds[0];
        bottomRight = bounds[1];
        svg.attr("width", bottomRight[0] - topLeft[0]).attr("height", bottomRight[1] - topLeft[1]).style("left", topLeft[0] + "px").style("top", topLeft[1] + "px");
        g.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");
        return feature.attr("d", path);
      };
      topo = topojson.mesh(collection, collection.objects.school_boundaries);
      transform = d3.geo.transform({
        point: function(x, y) {
          return projectStream(x, y, this);
        }
      });
      path = d3.geo.path().projection(transform);
      console.info(topo);
      feature = g.append("path").datum(topo);
      _this.map.on("viewreset", reset);
      return reset();
    });
  }

  return MapControl;

})();
});

;require.register("SearchBox", function(exports, require, module) {
var SearchBox,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

module.exports = SearchBox = (function() {
  function SearchBox() {
    this.search = __bind(this.search, this);
    this.updateView = __bind(this.updateView, this);
    var _this = this;
    this.streetTemplate = require("templates/street_listing");
    d3.csv("data/addresses.csv", function(addresses) {
      _this.addresses = addresses;
      _this.addressDict = {};
      _this.addresses.forEach(function(address) {
        address.oddStart = +address.oddStart;
        address.evenStart = +address.evenStart;
        address.oddEnd = +address.oddEnd;
        address.evenEnd = +address.evenEnd;
        address.street = _this.capitaliseFirstLetter(address.street);
        address.school = _this.capitaliseFirstLetter(address.school);
        if ((address.oddStart === 1 || address.oddStart === 0) && (address.evenStart === 2 || address.evenStart === 0) && (address.oddEnd === 9999 || address.oddEnd === 0) && (address.evenEnd === 9998 || address.evenEnd === 0)) {
          address.entireStreet = true;
        } else {
          address.entireStreet = false;
        }
        if (address.oddEnd === 9999) {
          address.oddEnd = "slutten";
        }
        if (address.evenEnd === 9998) {
          address.evenEnd = "slutten";
        }
        if (_this.addressDict[address.street] == null) {
          _this.addressDict[address.street] = [];
        }
        return _this.addressDict[address.street].push(address);
      });
      return $("input#streetName").keyup(_this.updateView);
    });
  }

  SearchBox.prototype.capitaliseFirstLetter = function(string) {
    string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  SearchBox.prototype.updateView = function(event) {
    var fieldValue, html, streets,
      _this = this;
    fieldValue = $("input#streetName").val();
    streets = this.search(fieldValue);
    html = "<ul>";
    streets.forEach(function(stretches) {
      var even, odd;
      odd = stretches.sort(function(a, b) {
        return a.oddStart > b.oddStart;
      });
      odd = odd.filter(function(a) {
        return !(a.oddStart === 0);
      });
      even = stretches.sort(function(a, b) {
        return a.evenStart > b.evenStart;
      });
      even = even.filter(function(a) {
        return !(a.evenStart === 0);
      });
      return html += _this.streetTemplate({
        street: stretches[0],
        even: even,
        odd: odd
      });
    });
    html = html + "</ul>";
    return $(".searchResults").html(html);
  };

  SearchBox.prototype.search = function(matchString) {
    var expression, i, len, matches, re, _i,
      _this = this;
    matchString = matchString.replace(/\s/g, '');
    matches = [];
    if (matchString === "") {
      return matches;
    }
    expression = "";
    len = matchString.length - 1;
    for (i = _i = 0; 0 <= len ? _i <= len : _i >= len; i = 0 <= len ? ++_i : --_i) {
      expression += matchString.charAt(i) + "+.?";
    }
    re = new RegExp(expression, "i");
    Object.keys(this.addressDict).every(function(street) {
      if (re.test(street)) {
        matches.push(_this.addressDict[street]);
      }
      if (matches.length > 10) {
        return false;
      }
      return true;
    });
    return matches;
  };

  return SearchBox;

})();
});

;require.register("application", function(exports, require, module) {
var Application, MapControl, SearchBox;

MapControl = require('MapControl');

SearchBox = require('SearchBox');

module.exports = Application = (function() {
  function Application() {
    var mapControl, searchBox;
    searchBox = new SearchBox;
    mapControl = new MapControl;
  }

  return Application;

})();
});

;
//# sourceMappingURL=app.js.map