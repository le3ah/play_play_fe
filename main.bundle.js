/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	$(document).ready(function () {
	  displayFavorites();
	  $('');
	  displayPlaylists();
	  $("#artistSearchBtn").on('click', function () {
	    event.preventDefault();
	    var artistName = $("#artistName").val();
	    $.ajax({
	      url: 'https://api.musixmatch.com/ws/1.1/track.search?q_artist=' + artistName + '&page_size=30&apikey=f79ce08e6df5e9e6286edb9802eb6583',
	      type: 'GET',
	      data: {
	        format: 'jsonp',
	        callback: 'jsonp_callback'
	      },
	      dataType: 'jsonp',
	      jsonpCallback: 'jsonp_callback',
	      success: function success(data, status) {
	        var trackList = data["message"]["body"]["track_list"];
	        $('#songList').text("");
	        $('#songList').append('<h2>Rockin\' Results</h2>');

	        var _loop = function _loop() {
	          $("#songList").show();
	          $('#songList').append('<p id="songName' + i + '"><button class="btn" id="favoriteBtn' + i + '"><i class="fa fa-star status" style=\'font-size:25px\'></i></button> ' + trackList[i].track.track_name + '</p>');
	          var songTitle = trackList[i].track.track_name;
	          var songArtist = trackList[i].track.artist_name;
	          var songGenre = trackList[i].track.primary_genres.music_genre_list[0] ? trackList[i].track.primary_genres.music_genre_list[0].music_genre.music_genre_name : "Esoteric";
	          var songRating = trackList[i].track.track_rating;
	          $('#favoriteBtn' + i).click(function () {
	            event.preventDefault();
	            window.alert('You have favorited ' + songTitle + ' by ' + songArtist + '!');
	            $.ajax({
	              url: "https://protected-fortress-76604.herokuapp.com/api/v1/favorites",
	              type: 'POST',
	              data: JSON.stringify({
	                "name": songTitle,
	                "artist_name": songArtist,
	                "genre": songGenre,
	                "rating": songRating
	              }),
	              contentType: 'application/json'
	            });
	            $('#favoritesList').append('<p id="songName' + i + '"><button class="btn" id="playlistBtn' + i + '"><i class="fas fa-skull-crossbones status" style=\'font-size:30px\'></i></button> <strong>Name: </strong>' + songTitle + '<br><strong>Artist: </strong>' + songArtist + '<br><strong>Genre: </strong>' + songGenre + '<br><strong>Rating: </strong>' + songRating + '</p>');
	          });
	        };

	        for (var i = 0; i < 29; i++) {
	          _loop();
	        }
	      }
	    });
	  });
	});
	var displayFavorites = function displayFavorites() {
	  $.get('https://protected-fortress-76604.herokuapp.com/api/v1/favorites', function (data, status) {
	    var favorites = data;
	    $('#favoritesList').text("");
	    $('#favoritesList').append('<h2>Favorite Rockin\' Songs</h2>');
	    for (var i = 0; i < 29; i++) {
	      $("#favoritesList").show();
	      if (data[i]) {
	        (function () {
	          var songId = data[i].id;
	          var songName = data[i].name;
	          var songArtistName = data[i].artist_name;
	          var songGenre = data[i].genre;
	          var songRating = data[i].rating;
	          $('#favoritesList').append('<p id="songName' + i + '"><button class="btn" id="destroyBtn' + i + '"><i class="fas fa-skull-crossbones status" style=\'font-size:30px\'></i></button> <strong>Name: </strong>' + data[i].name + '<br><strong>Artist: </strong>' + data[i].artist_name + '<br><strong>Genre: </strong>' + data[i].genre + '<br><strong>Rating: </strong>' + data[i].rating + '</p>');
	          $('#destroyBtn' + i).click(function () {
	            $('#songName' + i).hide();
	            $('#destroyBtn' + i).hide();
	            event.preventDefault();
	            window.alert('You have removed ' + songName + ' by ' + songArtistName + '!');
	            $.ajax({
	              url: 'https://protected-fortress-76604.herokuapp.com/api/v1/favorites/' + songId,
	              type: 'delete',
	              sucess: function sucess(data, status) {
	                alert('Success: status code ' + status);
	              },
	              error: function error(data) {
	                console.log('Error:', data);
	              }
	            });
	          });
	        })();
	      }
	    }
	  });
	};
	var displayPlaylists = function displayPlaylists() {
	  $.get('https://protected-fortress-76604.herokuapp.com/api/v1/playlists', function (data, status) {
	    var playlists = data;
	    $('#playlistsList').text("");
	    $('#playlistsList').append('<h2>My Rockin\' Playlists</h2> ');
	    for (var i = 0; i < 29; i++) {
	      $("#playlistsList").show();
	      if (data[i]) {
	        $('#playlistsList').append('<p id="playlistName' + i + '"><button class="btn" id="playlistBtn' + i + '"><i class="fas fa-guitar status" style=\'font-size:30px\'></i></button> ' + data[i].playlist_name + '</p><p id="songsForPlaylist' + i + '"></p><br>');
	        $('#playlistBtn' + i).click(function () {
	          event.preventDefault();
	          window.alert('The songs in your playlist are already displayed, silly! You\'re welcome! \uD83D\uDE0E');
	        });
	        for (var n = -1; n < 29; n++) {
	          var songs = data[i]["favorite"];
	          if (songs[n]) {
	            $('#songsForPlaylist' + i).append('<p id="playlistSong' + n + '"> "' + songs[n]["name"] + '" by ' + songs[n]["artist_name"] + '</p>');
	          }
	        }
	      }
	    }
	  });
	};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/index.js!./styles.scss", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/index.js!./styles.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "body {\n  background-color: #DFFDFF; }\n\nh1 {\n  color: #90BEDE; }\n\nh2 {\n  color: #68EDC6; }\n\n.main {\n  display: flex;\n  justify-content: space-around; }\n\n#songList {\n  text-align: left;\n  border: 2px solid #90BEDE;\n  width: 30%;\n  padding-left: 20px;\n  font-size: 25px; }\n\n#favoritesList {\n  text-align: left;\n  border: 2px solid #90BEDE;\n  width: 30%;\n  padding-left: 20px;\n  font-size: 25px; }\n\n#playlistsList {\n  text-align: left;\n  border: 2px solid #90BEDE;\n  width: 30%;\n  padding-left: 20px;\n  font-size: 25px; }\n\n.searching {\n  text-align: center;\n  margin: 10px;\n  padding: 10px; }\n\n#artistName {\n  padding: 10px;\n  border-radius: 15px;\n  font-size: 20px; }\n\n#artistSearchBtn {\n  padding: 10px;\n  border-radius: 15px;\n  background-color: #90BEDE;\n  font-size: 20px; }\n\n#artistSearchBtn:hover {\n  background-color: #E5E1EE; }\n\n.btn {\n  padding: 10px;\n  border-radius: 20px;\n  font-size: 20px; }\n\n.btn:focus {\n  background-color: #90BEDE;\n  color: #E5E1EE; }\n", ""]);

	// exports


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ })
/******/ ]);