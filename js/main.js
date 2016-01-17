(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = (function menu() {
  var navList = undefined;

  var handleMenuClick = function handleMenuClick() {
    navList.classList.toggle('nav_open');
  };

  var initMenu = function initMenu() {
    var togglebutton = document.getElementById('menu_toggle_button');
    navList = document.getElementById('nav_list');
    togglebutton.addEventListener('click', handleMenuClick);
  };

  return {
    init: initMenu
  };
})();

},{}],2:[function(require,module,exports){
'use strict';

var Imageslider = require('../vendor/ideal-image-slider');

module.exports = (function slider() {

  var initSlider = function initSlider() {
    var slider = new Imageslider.Slider({
      selector: '#hero-slider',
      interval: 10000,
      transitionDuration: 750,
      previousNavSelector: '#hero-slider-prev',
      nextNavSelector: '#hero-slider-next'
    });
    slider.start();
  };

  return {
    init: initSlider
  };
})();

},{"../vendor/ideal-image-slider":4}],3:[function(require,module,exports){
'use strict';

var menu = require('./components/menu');
var slider = require('./components/slider');

menu.init();
slider.init();

},{"./components/menu":1,"./components/slider":2}],4:[function(require,module,exports){
/*
 * Ideal Image Slider v1.5.0
 *
 * By Gilbert Pellegrom
 * http://gilbert.pellegrom.me
 *
 * Copyright (C) 2014 Dev7studios
 * https://raw.githubusercontent.com/gilbitron/Ideal-Image-Slider/master/LICENSE
 */

"use strict";

module.exports = (function () {
	"use strict";

	/*
  * requestAnimationFrame polyfill
  */
	var _requestAnimationFrame = (function (win, t) {
		return win["r" + t] || win["webkitR" + t] || win["mozR" + t] || win["msR" + t] || function (fn) {
			setTimeout(fn, 1000 / 60);
		};
	})(window, 'equestAnimationFrame');

	/**
  * Behaves the same as setTimeout except uses requestAnimationFrame() where possible for better performance
  * @param {function} fn The callback function
  * @param {int} delay The delay in milliseconds
  */
	var _requestTimeout = function _requestTimeout(fn, delay) {
		var start = new Date().getTime(),
		    handle = {};

		function loop() {
			var current = new Date().getTime(),
			    delta = current - start;

			if (delta >= delay) {
				fn.call();
			} else {
				handle.value = _requestAnimationFrame(loop);
			}
		}

		handle.value = _requestAnimationFrame(loop);
		return handle;
	};

	/*
  * Helper functions
  */
	var _isType = function _isType(type, obj) {
		var _class = Object.prototype.toString.call(obj).slice(8, -1);
		return obj !== undefined && obj !== null && _class === type;
	};

	var _isInteger = function _isInteger(x) {
		return Math.round(x) === x;
	};

	var _deepExtend = function _deepExtend(out) {
		out = out || {};
		for (var i = 1; i < arguments.length; i++) {
			var obj = arguments[i];
			if (!obj) continue;
			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					if (_isType('Object', obj[key]) && obj[key] !== null) _deepExtend(out[key], obj[key]);else out[key] = obj[key];
				}
			}
		}
		return out;
	};

	var _hasClass = function _hasClass(el, className) {
		if (!className) return false;
		if (el.classList) {
			return el.classList.contains(className);
		} else {
			return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
		}
	};

	var _addClass = function _addClass(el, className) {
		if (!className) return;
		if (el.classList) {
			el.classList.add(className);
		} else {
			el.className += ' ' + className;
		}
	};

	var _removeClass = function _removeClass(el, className) {
		if (!className) return;
		if (el.classList) {
			el.classList.remove(className);
		} else {
			el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
		}
	};

	var _toArray = function _toArray(obj) {
		return Array.prototype.slice.call(obj);
	};

	var _arrayRemove = function _arrayRemove(array, from, to) {
		var rest = array.slice((to || from) + 1 || array.length);
		array.length = from < 0 ? array.length + from : from;
		return array.push.apply(array, rest);
	};

	var _addEvent = function _addEvent(object, type, callback) {
		if (object === null || typeof object === 'undefined') return;

		if (object.addEventListener) {
			object.addEventListener(type, callback, false);
		} else if (object.attachEvent) {
			object.attachEvent("on" + type, callback);
		} else {
			object["on" + type] = callback;
		}
	};

	var _loadImg = function _loadImg(slide, callback) {
		if (!slide.style.backgroundImage) {
			var img = new Image();
			img.setAttribute('src', slide.getAttribute('data-src'));
			img.onload = function () {
				slide.style.backgroundImage = 'url(' + slide.getAttribute('data-src') + ')';
				slide.setAttribute('data-actual-width', this.naturalWidth);
				slide.setAttribute('data-actual-height', this.naturalHeight);
				if (typeof callback === 'function') callback(this);
			};
		}
	};

	var _isHighDPI = function _isHighDPI() {
		var mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),(min--moz-device-pixel-ratio: 1.5),(-o-min-device-pixel-ratio: 3/2),(min-resolution: 1.5dppx)";
		if (window.devicePixelRatio > 1) return true;
		if (window.matchMedia && window.matchMedia(mediaQuery).matches) return true;
		return false;
	};

	var _translate = function _translate(slide, dist, speed) {
		slide.style.webkitTransitionDuration = slide.style.MozTransitionDuration = slide.style.msTransitionDuration = slide.style.OTransitionDuration = slide.style.transitionDuration = speed + 'ms';

		slide.style.webkitTransform = slide.style.MozTransform = slide.style.msTransform = slide.style.OTransform = 'translateX(' + dist + 'px)';
	};

	var _unTranslate = function _unTranslate(slide) {
		slide.style.removeProperty('-webkit-transition-duration');
		slide.style.removeProperty('transition-duration');

		slide.style.removeProperty('-webkit-transform');
		slide.style.removeProperty('-ms-transform');
		slide.style.removeProperty('transform');
	};

	var _animate = function _animate(item) {
		var duration = item.time,
		    end = +new Date() + duration;

		var step = function step() {
			var current = +new Date(),
			    remaining = end - current;

			if (remaining < 60) {
				item.run(1); //1 = progress is at 100%
				return;
			} else {
				var progress = 1 - remaining / duration;
				item.run(progress);
			}

			_requestAnimationFrame(step);
		};
		step();
	};

	var _setContainerHeight = function _setContainerHeight(slider, shouldAnimate) {
		if (typeof shouldAnimate === 'undefined') {
			shouldAnimate = true;
		}

		// If it's a fixed height then don't change the height
		if (_isInteger(slider.settings.height)) {
			return;
		}

		var currentHeight = Math.round(slider._attributes.container.offsetHeight),
		    newHeight = currentHeight;

		if (slider._attributes.aspectWidth && slider._attributes.aspectHeight) {
			// Aspect ratio
			newHeight = slider._attributes.aspectHeight / slider._attributes.aspectWidth * slider._attributes.container.offsetWidth;
		} else {
			// Auto
			var width = slider._attributes.currentSlide.getAttribute('data-actual-width');
			var height = slider._attributes.currentSlide.getAttribute('data-actual-height');

			if (width && height) {
				newHeight = height / width * slider._attributes.container.offsetWidth;
			}
		}

		var maxHeight = parseInt(slider.settings.maxHeight, 10);
		if (maxHeight && newHeight > maxHeight) {
			newHeight = maxHeight;
		}

		newHeight = Math.round(newHeight);
		if (newHeight === currentHeight) {
			return;
		}

		if (shouldAnimate) {
			_animate({
				time: slider.settings.transitionDuration,
				run: function run(progress) {
					slider._attributes.container.style.height = Math.round(progress * (newHeight - currentHeight) + currentHeight) + 'px';
				}
			});
		} else {
			slider._attributes.container.style.height = newHeight + 'px';
		}
	};

	var _touch = {

		vars: {
			start: {},
			delta: {},
			isScrolling: undefined,
			direction: null
		},

		start: function start(event) {
			if (_hasClass(this._attributes.container, this.settings.classes.animating)) return;

			var touches = event.touches[0];
			_touch.vars.start = {
				x: touches.pageX,
				y: touches.pageY,
				time: +new Date()
			};
			_touch.vars.delta = {};
			_touch.vars.isScrolling = undefined;
			_touch.vars.direction = null;

			this.stop(); // Stop slider

			this.settings.beforeChange.apply(this);
			_addClass(this._attributes.container, this.settings.classes.touching);
		},

		move: function move(event) {
			if (_hasClass(this._attributes.container, this.settings.classes.animating)) return;
			// Ensure swiping with one touch and not pinching
			if (event.touches.length > 1 || event.scale && event.scale !== 1) return;

			var touches = event.touches[0];
			_touch.vars.delta = {
				x: touches.pageX - _touch.vars.start.x,
				y: touches.pageY - _touch.vars.start.y
			};

			if (typeof _touch.vars.isScrolling == 'undefined') {
				_touch.vars.isScrolling = !!(_touch.vars.isScrolling || Math.abs(_touch.vars.delta.x) < Math.abs(_touch.vars.delta.y));
			}

			// If user is not trying to scroll vertically
			if (!_touch.vars.isScrolling) {
				event.preventDefault(); // Prevent native scrolling

				_translate(this._attributes.previousSlide, _touch.vars.delta.x - this._attributes.previousSlide.offsetWidth, 0);
				_translate(this._attributes.currentSlide, _touch.vars.delta.x, 0);
				_translate(this._attributes.nextSlide, _touch.vars.delta.x + this._attributes.currentSlide.offsetWidth, 0);
			}
		},

		end: function end(event) {
			if (_hasClass(this._attributes.container, this.settings.classes.animating)) return;

			var duration = +new Date() - _touch.vars.start.time;

			// Determine if slide attempt triggers next/prev slide
			var isChangeSlide = Number(duration) < 250 && Math.abs(_touch.vars.delta.x) > 20 || Math.abs(_touch.vars.delta.x) > this._attributes.currentSlide.offsetWidth / 2;

			var direction = _touch.vars.delta.x < 0 ? 'next' : 'previous';
			var speed = this.settings.transitionDuration ? this.settings.transitionDuration / 2 : 0;

			// If not scrolling vertically
			if (!_touch.vars.isScrolling) {
				if (isChangeSlide) {
					_touch.vars.direction = direction;

					if (_touch.vars.direction == 'next') {
						_translate(this._attributes.currentSlide, -this._attributes.currentSlide.offsetWidth, speed);
						_translate(this._attributes.nextSlide, 0, speed);
					} else {
						_translate(this._attributes.previousSlide, 0, speed);
						_translate(this._attributes.currentSlide, this._attributes.currentSlide.offsetWidth, speed);
					}

					_requestTimeout(_touch.transitionEnd.bind(this), speed);
				} else {
					// Slides return to original position
					if (direction == 'next') {
						_translate(this._attributes.currentSlide, 0, speed);
						_translate(this._attributes.nextSlide, this._attributes.currentSlide.offsetWidth, speed);
					} else {
						_translate(this._attributes.previousSlide, -this._attributes.previousSlide.offsetWidth, speed);
						_translate(this._attributes.currentSlide, 0, speed);
					}
				}

				if (speed) {
					_addClass(this._attributes.container, this.settings.classes.animating);
					_requestTimeout((function () {
						_removeClass(this._attributes.container, this.settings.classes.animating);
					}).bind(this), speed);
				}
			}
		},

		transitionEnd: function transitionEnd(event) {
			if (_touch.vars.direction) {
				_unTranslate(this._attributes.previousSlide);
				_unTranslate(this._attributes.currentSlide);
				_unTranslate(this._attributes.nextSlide);
				_removeClass(this._attributes.container, this.settings.classes.touching);

				_removeClass(this._attributes.previousSlide, this.settings.classes.previousSlide);
				_removeClass(this._attributes.currentSlide, this.settings.classes.currentSlide);
				_removeClass(this._attributes.nextSlide, this.settings.classes.nextSlide);
				this._attributes.currentSlide.setAttribute('aria-hidden', 'true');

				var slides = this._attributes.slides,
				    index = slides.indexOf(this._attributes.currentSlide);

				if (_touch.vars.direction == 'next') {
					this._attributes.previousSlide = this._attributes.currentSlide;
					this._attributes.currentSlide = slides[index + 1];
					this._attributes.nextSlide = slides[index + 2];
					if (typeof this._attributes.currentSlide === 'undefined' && typeof this._attributes.nextSlide === 'undefined') {
						this._attributes.currentSlide = slides[0];
						this._attributes.nextSlide = slides[1];
					} else {
						if (typeof this._attributes.nextSlide === 'undefined') {
							this._attributes.nextSlide = slides[0];
						}
					}

					_loadImg(this._attributes.nextSlide);
				} else {
					this._attributes.nextSlide = this._attributes.currentSlide;
					this._attributes.previousSlide = slides[index - 2];
					this._attributes.currentSlide = slides[index - 1];
					if (typeof this._attributes.currentSlide === 'undefined' && typeof this._attributes.previousSlide === 'undefined') {
						this._attributes.currentSlide = slides[slides.length - 1];
						this._attributes.previousSlide = slides[slides.length - 2];
					} else {
						if (typeof this._attributes.previousSlide === 'undefined') {
							this._attributes.previousSlide = slides[slides.length - 1];
						}
					}

					_loadImg(this._attributes.previousSlide);
				}

				_addClass(this._attributes.previousSlide, this.settings.classes.previousSlide);
				_addClass(this._attributes.currentSlide, this.settings.classes.currentSlide);
				_addClass(this._attributes.nextSlide, this.settings.classes.nextSlide);
				this._attributes.currentSlide.setAttribute('aria-hidden', 'false');

				_setContainerHeight(this);
				this.settings.afterChange.apply(this);
			}
		}

	};

	/*
  * Slider class
  */
	var Slider = function Slider(args) {
		// Defaults
		this.settings = {
			selector: '',
			height: 'auto', // "auto" | px value (e.g. 400) | aspect ratio (e.g. "16:9")
			initialHeight: 400, // for "auto" and aspect ratio
			maxHeight: null, // for "auto" and aspect ratio
			interval: 4000,
			transitionDuration: 700,
			effect: 'slide',
			disableNav: false,
			keyboardNav: true,
			previousNavSelector: '',
			nextNavSelector: '',
			classes: {
				container: 'ideal-image-slider',
				slide: 'iis-slide',
				previousSlide: 'iis-previous-slide',
				currentSlide: 'iis-current-slide',
				nextSlide: 'iis-next-slide',
				previousNav: 'iis-previous-nav',
				nextNav: 'iis-next-nav',
				animating: 'iis-is-animating',
				touchEnabled: 'iis-touch-enabled',
				touching: 'iis-is-touching',
				directionPrevious: 'iis-direction-previous',
				directionNext: 'iis-direction-next'
			},
			onInit: function onInit() {},
			onStart: function onStart() {},
			onStop: function onStop() {},
			onDestroy: function onDestroy() {},
			beforeChange: function beforeChange() {},
			afterChange: function afterChange() {}
		};

		// Parse args
		if (typeof args === 'string') {
			this.settings.selector = args;
		} else if (typeof args === 'object') {
			_deepExtend(this.settings, args);
		}

		// Slider (container) element
		var sliderEl = document.querySelector(this.settings.selector);
		if (!sliderEl) return null;

		// Slides
		var origChildren = _toArray(sliderEl.children),
		    validSlides = [];
		sliderEl.innerHTML = '';
		Array.prototype.forEach.call(origChildren, (function (slide, i) {
			if (slide instanceof HTMLImageElement || slide instanceof HTMLAnchorElement) {
				var slideEl = document.createElement('a'),
				    href = '',
				    target = '';

				if (slide instanceof HTMLAnchorElement) {
					href = slide.getAttribute('href');
					target = slide.getAttribute('target');

					var img = slide.querySelector('img');
					if (img !== null) {
						slide = img;
					} else {
						return;
					}
				}

				if (typeof slide.dataset !== 'undefined') {
					_deepExtend(slideEl.dataset, slide.dataset);
					if (slide.dataset.src) {
						// Use data-src for on-demand loading
						slideEl.dataset.src = slide.dataset.src;
					} else {
						slideEl.dataset.src = slide.src;
					}

					// HiDPI support
					if (_isHighDPI() && slide.dataset['src-2x']) {
						slideEl.dataset.src = slide.dataset['src-2x'];
					}
				} else {
					// IE
					if (slide.getAttribute('data-src')) {
						slideEl.setAttribute('data-src', slide.getAttribute('data-src'));
					} else {
						slideEl.setAttribute('data-src', slide.getAttribute('src'));
					}
				}

				if (href) slideEl.setAttribute('href', href);
				if (target) slideEl.setAttribute('target', target);
				if (slide.getAttribute('className')) _addClass(slideEl, slide.getAttribute('className'));
				if (slide.getAttribute('id')) slideEl.setAttribute('id', slide.getAttribute('id'));
				if (slide.getAttribute('title')) slideEl.setAttribute('title', slide.getAttribute('title'));
				if (slide.getAttribute('alt')) slideEl.innerHTML = slide.getAttribute('alt');
				slideEl.setAttribute('role', 'tabpanel');
				slideEl.setAttribute('aria-hidden', 'true');

				slideEl.style.cssText += '-webkit-transition-duration:' + this.settings.transitionDuration + 'ms;-moz-transition-duration:' + this.settings.transitionDuration + 'ms;-o-transition-duration:' + this.settings.transitionDuration + 'ms;transition-duration:' + this.settings.transitionDuration + 'ms;';

				sliderEl.appendChild(slideEl);
				validSlides.push(slideEl);
			}
		}).bind(this));

		var slides = validSlides;
		if (slides.length <= 1) {
			sliderEl.innerHTML = '';
			Array.prototype.forEach.call(origChildren, function (child, i) {
				sliderEl.appendChild(child);
			});
			return null;
		}

		// Create navigation
		if (!this.settings.disableNav) {
			var previousNav, nextNav;
			if (this.settings.previousNavSelector) {
				previousNav = document.querySelector(this.settings.previousNavSelector);
			} else {
				previousNav = document.createElement('a');
				sliderEl.appendChild(previousNav);
			}
			if (this.settings.nextNavSelector) {
				nextNav = document.querySelector(this.settings.nextNavSelector);
			} else {
				nextNav = document.createElement('a');
				sliderEl.appendChild(nextNav);
			}

			_addClass(previousNav, this.settings.classes.previousNav);
			_addClass(nextNav, this.settings.classes.nextNav);
			_addEvent(previousNav, 'click', (function () {
				if (_hasClass(this._attributes.container, this.settings.classes.animating)) return false;
				this.stop();
				this.previousSlide();
			}).bind(this));
			_addEvent(nextNav, 'click', (function () {
				if (_hasClass(this._attributes.container, this.settings.classes.animating)) return false;
				this.stop();
				this.nextSlide();
			}).bind(this));

			// Touch Navigation
			if ('ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch) {
				this.settings.effect = 'slide';
				previousNav.style.display = 'none';
				nextNav.style.display = 'none';
				_addClass(sliderEl, this.settings.classes.touchEnabled);

				_addEvent(sliderEl, 'touchstart', _touch.start.bind(this), false);
				_addEvent(sliderEl, 'touchmove', _touch.move.bind(this), false);
				_addEvent(sliderEl, 'touchend', _touch.end.bind(this), false);
			}

			// Keyboard Navigation
			if (this.settings.keyboardNav) {
				_addEvent(document, 'keyup', (function (e) {
					e = e || window.event;
					var button = typeof e.which == 'number' ? e.which : e.keyCode;
					if (button == 37) {
						if (_hasClass(this._attributes.container, this.settings.classes.animating)) return false;
						this.stop();
						this.previousSlide();
					} else if (button == 39) {
						if (_hasClass(this._attributes.container, this.settings.classes.animating)) return false;
						this.stop();
						this.nextSlide();
					}
				}).bind(this));
			}
		}

		// Create internal attributes
		this._attributes = {
			container: sliderEl,
			slides: slides,
			previousSlide: typeof slides[slides.length - 1] !== 'undefined' ? slides[slides.length - 1] : slides[0],
			currentSlide: slides[0],
			nextSlide: typeof slides[1] !== 'undefined' ? slides[1] : slides[0],
			timerId: 0,
			origChildren: origChildren, // Used in destroy()
			aspectWidth: 0,
			aspectHeight: 0
		};

		// Set height
		if (_isInteger(this.settings.height)) {
			this._attributes.container.style.height = this.settings.height + 'px';
		} else {
			if (_isInteger(this.settings.initialHeight)) {
				this._attributes.container.style.height = this.settings.initialHeight + 'px';
			}

			// If aspect ratio parse and store
			if (this.settings.height.indexOf(':') > -1) {
				var aspectRatioParts = this.settings.height.split(':');
				if (aspectRatioParts.length == 2 && _isInteger(parseInt(aspectRatioParts[0], 10)) && _isInteger(parseInt(aspectRatioParts[1], 10))) {
					this._attributes.aspectWidth = parseInt(aspectRatioParts[0], 10);
					this._attributes.aspectHeight = parseInt(aspectRatioParts[1], 10);
				}
			}

			_addEvent(window, 'resize', (function () {
				_setContainerHeight(this, false);
			}).bind(this));
		}

		// Add classes
		_addClass(sliderEl, this.settings.classes.container);
		_addClass(sliderEl, 'iis-effect-' + this.settings.effect);
		Array.prototype.forEach.call(this._attributes.slides, (function (slide, i) {
			_addClass(slide, this.settings.classes.slide);
		}).bind(this));
		_addClass(this._attributes.previousSlide, this.settings.classes.previousSlide);
		_addClass(this._attributes.currentSlide, this.settings.classes.currentSlide);
		_addClass(this._attributes.nextSlide, this.settings.classes.nextSlide);

		// ARIA
		this._attributes.currentSlide.setAttribute('aria-hidden', 'false');

		// Load first image
		_loadImg(this._attributes.currentSlide, (function () {
			this.settings.onInit.apply(this);
			_setContainerHeight(this, false);
		}).bind(this));
		// Preload next images
		_loadImg(this._attributes.previousSlide);
		_loadImg(this._attributes.nextSlide);
	};

	Slider.prototype.get = function (attribute) {
		if (!this._attributes) return null;
		if (this._attributes.hasOwnProperty(attribute)) {
			return this._attributes[attribute];
		}
	};

	Slider.prototype.set = function (attribute, value) {
		if (!this._attributes) return null;
		return this._attributes[attribute] = value;
	};

	Slider.prototype.start = function () {
		if (!this._attributes) return;
		this._attributes.timerId = setInterval(this.nextSlide.bind(this), this.settings.interval);
		this.settings.onStart.apply(this);

		// Stop if window blur
		window.onblur = (function () {
			this.stop();
		}).bind(this);
	};

	Slider.prototype.stop = function () {
		if (!this._attributes) return;
		clearInterval(this._attributes.timerId);
		this._attributes.timerId = 0;
		this.settings.onStop.apply(this);
	};

	Slider.prototype.previousSlide = function () {
		this.settings.beforeChange.apply(this);
		_removeClass(this._attributes.previousSlide, this.settings.classes.previousSlide);
		_removeClass(this._attributes.currentSlide, this.settings.classes.currentSlide);
		_removeClass(this._attributes.nextSlide, this.settings.classes.nextSlide);
		this._attributes.currentSlide.setAttribute('aria-hidden', 'true');

		var slides = this._attributes.slides,
		    index = slides.indexOf(this._attributes.currentSlide);
		this._attributes.nextSlide = this._attributes.currentSlide;
		this._attributes.previousSlide = slides[index - 2];
		this._attributes.currentSlide = slides[index - 1];
		if (typeof this._attributes.currentSlide === 'undefined' && typeof this._attributes.previousSlide === 'undefined') {
			this._attributes.currentSlide = slides[slides.length - 1];
			this._attributes.previousSlide = slides[slides.length - 2];
		} else {
			if (typeof this._attributes.previousSlide === 'undefined') {
				this._attributes.previousSlide = slides[slides.length - 1];
			}
		}

		// Preload next image
		_loadImg(this._attributes.previousSlide);

		_addClass(this._attributes.previousSlide, this.settings.classes.previousSlide);
		_addClass(this._attributes.currentSlide, this.settings.classes.currentSlide);
		_addClass(this._attributes.nextSlide, this.settings.classes.nextSlide);
		this._attributes.currentSlide.setAttribute('aria-hidden', 'false');

		_addClass(this._attributes.container, this.settings.classes.directionPrevious);
		_requestTimeout((function () {
			_removeClass(this._attributes.container, this.settings.classes.directionPrevious);
		}).bind(this), this.settings.transitionDuration);

		if (this.settings.transitionDuration) {
			_addClass(this._attributes.container, this.settings.classes.animating);
			_requestTimeout((function () {
				_removeClass(this._attributes.container, this.settings.classes.animating);
			}).bind(this), this.settings.transitionDuration);
		}

		_setContainerHeight(this);
		this.settings.afterChange.apply(this);
	};

	Slider.prototype.nextSlide = function () {
		this.settings.beforeChange.apply(this);
		_removeClass(this._attributes.previousSlide, this.settings.classes.previousSlide);
		_removeClass(this._attributes.currentSlide, this.settings.classes.currentSlide);
		_removeClass(this._attributes.nextSlide, this.settings.classes.nextSlide);
		this._attributes.currentSlide.setAttribute('aria-hidden', 'true');

		var slides = this._attributes.slides,
		    index = slides.indexOf(this._attributes.currentSlide);
		this._attributes.previousSlide = this._attributes.currentSlide;
		this._attributes.currentSlide = slides[index + 1];
		this._attributes.nextSlide = slides[index + 2];
		if (typeof this._attributes.currentSlide === 'undefined' && typeof this._attributes.nextSlide === 'undefined') {
			this._attributes.currentSlide = slides[0];
			this._attributes.nextSlide = slides[1];
		} else {
			if (typeof this._attributes.nextSlide === 'undefined') {
				this._attributes.nextSlide = slides[0];
			}
		}

		// Preload next image
		_loadImg(this._attributes.nextSlide);

		_addClass(this._attributes.previousSlide, this.settings.classes.previousSlide);
		_addClass(this._attributes.currentSlide, this.settings.classes.currentSlide);
		_addClass(this._attributes.nextSlide, this.settings.classes.nextSlide);
		this._attributes.currentSlide.setAttribute('aria-hidden', 'false');

		_addClass(this._attributes.container, this.settings.classes.directionNext);
		_requestTimeout((function () {
			_removeClass(this._attributes.container, this.settings.classes.directionNext);
		}).bind(this), this.settings.transitionDuration);

		if (this.settings.transitionDuration) {
			_addClass(this._attributes.container, this.settings.classes.animating);
			_requestTimeout((function () {
				_removeClass(this._attributes.container, this.settings.classes.animating);
			}).bind(this), this.settings.transitionDuration);
		}

		_setContainerHeight(this);
		this.settings.afterChange.apply(this);
	};

	Slider.prototype.gotoSlide = function (index) {
		this.settings.beforeChange.apply(this);
		this.stop();

		_removeClass(this._attributes.previousSlide, this.settings.classes.previousSlide);
		_removeClass(this._attributes.currentSlide, this.settings.classes.currentSlide);
		_removeClass(this._attributes.nextSlide, this.settings.classes.nextSlide);
		this._attributes.currentSlide.setAttribute('aria-hidden', 'true');

		index--; // Index should be 1-indexed
		var slides = this._attributes.slides,
		    oldIndex = slides.indexOf(this._attributes.currentSlide);
		this._attributes.previousSlide = slides[index - 1];
		this._attributes.currentSlide = slides[index];
		this._attributes.nextSlide = slides[index + 1];
		if (typeof this._attributes.previousSlide === 'undefined') {
			this._attributes.previousSlide = slides[slides.length - 1];
		}
		if (typeof this._attributes.nextSlide === 'undefined') {
			this._attributes.nextSlide = slides[0];
		}

		// Load images
		_loadImg(this._attributes.previousSlide);
		_loadImg(this._attributes.currentSlide);
		_loadImg(this._attributes.nextSlide);

		_addClass(this._attributes.previousSlide, this.settings.classes.previousSlide);
		_addClass(this._attributes.currentSlide, this.settings.classes.currentSlide);
		_addClass(this._attributes.nextSlide, this.settings.classes.nextSlide);
		this._attributes.currentSlide.setAttribute('aria-hidden', 'false');

		if (index < oldIndex) {
			_addClass(this._attributes.container, this.settings.classes.directionPrevious);
			_requestTimeout((function () {
				_removeClass(this._attributes.container, this.settings.classes.directionPrevious);
			}).bind(this), this.settings.transitionDuration);
		} else {
			_addClass(this._attributes.container, this.settings.classes.directionNext);
			_requestTimeout((function () {
				_removeClass(this._attributes.container, this.settings.classes.directionNext);
			}).bind(this), this.settings.transitionDuration);
		}

		if (this.settings.transitionDuration) {
			_addClass(this._attributes.container, this.settings.classes.animating);
			_requestTimeout((function () {
				_removeClass(this._attributes.container, this.settings.classes.animating);
			}).bind(this), this.settings.transitionDuration);
		}

		_setContainerHeight(this);
		this.settings.afterChange.apply(this);
	};

	Slider.prototype.destroy = function () {
		clearInterval(this._attributes.timerId);
		this._attributes.timerId = 0;

		this._attributes.container.innerHTML = '';
		Array.prototype.forEach.call(this._attributes.origChildren, (function (child, i) {
			this._attributes.container.appendChild(child);
		}).bind(this));

		_removeClass(this._attributes.container, this.settings.classes.container);
		_removeClass(this._attributes.container, 'iis-effect-' + this.settings.effect);
		this._attributes.container.style.height = '';

		this.settings.onDestroy.apply(this);
	};

	return {
		_hasClass: _hasClass,
		_addClass: _addClass,
		_removeClass: _removeClass,
		Slider: Slider
	};
})();

},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvdG9tL3Byb2plY3RzL3BpZWxhYi9zcmMvX2pzL2NvbXBvbmVudHMvbWVudS5qcyIsIi9Vc2Vycy90b20vcHJvamVjdHMvcGllbGFiL3NyYy9fanMvY29tcG9uZW50cy9zbGlkZXIuanMiLCIvVXNlcnMvdG9tL3Byb2plY3RzL3BpZWxhYi9zcmMvX2pzL21haW4uanMiLCIvVXNlcnMvdG9tL3Byb2plY3RzL3BpZWxhYi9zcmMvX2pzL3ZlbmRvci9pZGVhbC1pbWFnZS1zbGlkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxTQUFTLElBQUksR0FBRztBQUNoQyxNQUFJLE9BQU8sWUFBQSxDQUFDOztBQUVaLE1BQU0sZUFBZSxHQUFHLFNBQWxCLGVBQWUsR0FBUztBQUM1QixXQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztHQUN0QyxDQUFDOztBQUVGLE1BQU0sUUFBUSxHQUFHLFNBQVgsUUFBUSxHQUFTO0FBQ3JCLFFBQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUNuRSxXQUFPLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM5QyxnQkFBWSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxlQUFlLENBQUMsQ0FBQztHQUN6RCxDQUFDOztBQUVGLFNBQU87QUFDTCxRQUFJLEVBQUUsUUFBUTtHQUNmLENBQUM7Q0FDSCxDQUFBLEVBQUcsQ0FBQzs7Ozs7QUNoQkwsSUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7O0FBRTVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxTQUFTLE1BQU0sR0FBRzs7QUFFbEMsTUFBTSxVQUFVLEdBQUcsU0FBYixVQUFVLEdBQVM7QUFD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QUFTLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDMUUsY0FBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQy9FLE1BQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDOztBQUU3QyxNQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7RUFDcEMsQ0FBQzs7QUFFRixRQUFPO0FBQ04sV0FBUyxFQUFFLFNBQVM7QUFDcEIsV0FBUyxFQUFFLFNBQVM7QUFDcEIsY0FBWSxFQUFFLFlBQVk7QUFDMUIsUUFBTSxFQUFFLE1BQU07RUFDZCxDQUFDO0NBRUYsQ0FBQSxFQUFHLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gbWVudSgpIHtcbiAgbGV0IG5hdkxpc3Q7XG5cbiAgY29uc3QgaGFuZGxlTWVudUNsaWNrID0gKCkgPT4ge1xuICAgIG5hdkxpc3QuY2xhc3NMaXN0LnRvZ2dsZSgnbmF2X29wZW4nKTtcbiAgfTtcblxuICBjb25zdCBpbml0TWVudSA9ICgpID0+IHtcbiAgICBjb25zdCB0b2dnbGVidXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVudV90b2dnbGVfYnV0dG9uJyk7XG4gICAgbmF2TGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXZfbGlzdCcpO1xuICAgIHRvZ2dsZWJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZU1lbnVDbGljayk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0OiBpbml0TWVudSxcbiAgfTtcbn0pKCk7XG4iLCJjb25zdCBJbWFnZXNsaWRlciA9IHJlcXVpcmUoJy4uL3ZlbmRvci9pZGVhbC1pbWFnZS1zbGlkZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gc2xpZGVyKCkge1xuXG4gIGNvbnN0IGluaXRTbGlkZXIgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2xpZGVyID0gbmV3IEltYWdlc2xpZGVyLlNsaWRlcih7XG4gICAgICBzZWxlY3RvcjogJyNoZXJvLXNsaWRlcicsXG4gICAgICBpbnRlcnZhbDogMTAwMDAsXG4gICAgICB0cmFuc2l0aW9uRHVyYXRpb246IDc1MCxcbiAgICAgIHByZXZpb3VzTmF2U2VsZWN0b3I6ICcjaGVyby1zbGlkZXItcHJldicsXG4gICAgICBuZXh0TmF2U2VsZWN0b3I6ICcjaGVyby1zbGlkZXItbmV4dCcsXG4gICAgfSk7XG4gICAgc2xpZGVyLnN0YXJ0KCk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0OiBpbml0U2xpZGVyLFxuICB9O1xufSkoKTtcbiIsImNvbnN0IG1lbnUgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvbWVudScpO1xuY29uc3Qgc2xpZGVyID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL3NsaWRlcicpO1xuXG5tZW51LmluaXQoKTtcbnNsaWRlci5pbml0KCk7XG4iLCIvKlxuICogSWRlYWwgSW1hZ2UgU2xpZGVyIHYxLjUuMFxuICpcbiAqIEJ5IEdpbGJlcnQgUGVsbGVncm9tXG4gKiBodHRwOi8vZ2lsYmVydC5wZWxsZWdyb20ubWVcbiAqXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTQgRGV2N3N0dWRpb3NcbiAqIGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9naWxiaXRyb24vSWRlYWwtSW1hZ2UtU2xpZGVyL21hc3Rlci9MSUNFTlNFXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdC8qXG5cdCAqIHJlcXVlc3RBbmltYXRpb25GcmFtZSBwb2x5ZmlsbFxuXHQgKi9cblx0dmFyIF9yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbih3aW4sIHQpIHtcblx0XHRyZXR1cm4gd2luW1wiclwiICsgdF0gfHwgd2luW1wid2Via2l0UlwiICsgdF0gfHwgd2luW1wibW96UlwiICsgdF0gfHwgd2luW1wibXNSXCIgKyB0XSB8fCBmdW5jdGlvbihmbikge1xuXHRcdFx0c2V0VGltZW91dChmbiwgMTAwMCAvIDYwKTtcblx0XHR9O1xuXHR9KHdpbmRvdywgJ2VxdWVzdEFuaW1hdGlvbkZyYW1lJyk7XG5cblx0LyoqXG5cdCAqIEJlaGF2ZXMgdGhlIHNhbWUgYXMgc2V0VGltZW91dCBleGNlcHQgdXNlcyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKSB3aGVyZSBwb3NzaWJsZSBmb3IgYmV0dGVyIHBlcmZvcm1hbmNlXG5cdCAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuIFRoZSBjYWxsYmFjayBmdW5jdGlvblxuXHQgKiBAcGFyYW0ge2ludH0gZGVsYXkgVGhlIGRlbGF5IGluIG1pbGxpc2Vjb25kc1xuXHQgKi9cblx0dmFyIF9yZXF1ZXN0VGltZW91dCA9IGZ1bmN0aW9uKGZuLCBkZWxheSkge1xuXHRcdHZhciBzdGFydCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxuXHRcdFx0aGFuZGxlID0ge307XG5cblx0XHRmdW5jdGlvbiBsb29wKCkge1xuXHRcdFx0dmFyIGN1cnJlbnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcblx0XHRcdFx0ZGVsdGEgPSBjdXJyZW50IC0gc3RhcnQ7XG5cblx0XHRcdGlmIChkZWx0YSA+PSBkZWxheSkge1xuXHRcdFx0XHRmbi5jYWxsKCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRoYW5kbGUudmFsdWUgPSBfcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGhhbmRsZS52YWx1ZSA9IF9yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XG5cdFx0cmV0dXJuIGhhbmRsZTtcblx0fTtcblxuXHQvKlxuXHQgKiBIZWxwZXIgZnVuY3Rpb25zXG5cdCAqL1xuXHR2YXIgX2lzVHlwZSA9IGZ1bmN0aW9uKHR5cGUsIG9iaikge1xuXHRcdHZhciBfY2xhc3MgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKS5zbGljZSg4LCAtMSk7XG5cdFx0cmV0dXJuIG9iaiAhPT0gdW5kZWZpbmVkICYmIG9iaiAhPT0gbnVsbCAmJiBfY2xhc3MgPT09IHR5cGU7XG5cdH07XG5cblx0dmFyIF9pc0ludGVnZXIgPSBmdW5jdGlvbih4KSB7XG5cdFx0cmV0dXJuIE1hdGgucm91bmQoeCkgPT09IHg7XG5cdH07XG5cblx0dmFyIF9kZWVwRXh0ZW5kID0gZnVuY3Rpb24ob3V0KSB7XG5cdFx0b3V0ID0gb3V0IHx8IHt9O1xuXHRcdGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgb2JqID0gYXJndW1lbnRzW2ldO1xuXHRcdFx0aWYgKCFvYmopXG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0Zm9yICh2YXIga2V5IGluIG9iaikge1xuXHRcdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRpZiAoX2lzVHlwZSgnT2JqZWN0Jywgb2JqW2tleV0pICYmIG9ialtrZXldICE9PSBudWxsKVxuXHRcdFx0XHRcdFx0X2RlZXBFeHRlbmQob3V0W2tleV0sIG9ialtrZXldKTtcblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRvdXRba2V5XSA9IG9ialtrZXldO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBvdXQ7XG5cdH07XG5cblx0dmFyIF9oYXNDbGFzcyA9IGZ1bmN0aW9uKGVsLCBjbGFzc05hbWUpIHtcblx0XHRpZiAoIWNsYXNzTmFtZSkgcmV0dXJuIGZhbHNlO1xuXHRcdGlmIChlbC5jbGFzc0xpc3QpIHtcblx0XHRcdHJldHVybiBlbC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIG5ldyBSZWdFeHAoJyhefCApJyArIGNsYXNzTmFtZSArICcoIHwkKScsICdnaScpLnRlc3QoZWwuY2xhc3NOYW1lKTtcblx0XHR9XG5cdH07XG5cblx0dmFyIF9hZGRDbGFzcyA9IGZ1bmN0aW9uKGVsLCBjbGFzc05hbWUpIHtcblx0XHRpZiAoIWNsYXNzTmFtZSkgcmV0dXJuO1xuXHRcdGlmIChlbC5jbGFzc0xpc3QpIHtcblx0XHRcdGVsLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZWwuY2xhc3NOYW1lICs9ICcgJyArIGNsYXNzTmFtZTtcblx0XHR9XG5cdH07XG5cblx0dmFyIF9yZW1vdmVDbGFzcyA9IGZ1bmN0aW9uKGVsLCBjbGFzc05hbWUpIHtcblx0XHRpZiAoIWNsYXNzTmFtZSkgcmV0dXJuO1xuXHRcdGlmIChlbC5jbGFzc0xpc3QpIHtcblx0XHRcdGVsLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLnJlcGxhY2UobmV3IFJlZ0V4cCgnKF58XFxcXGIpJyArIGNsYXNzTmFtZS5zcGxpdCgnICcpLmpvaW4oJ3wnKSArICcoXFxcXGJ8JCknLCAnZ2knKSwgJyAnKTtcblx0XHR9XG5cdH07XG5cblx0dmFyIF90b0FycmF5ID0gZnVuY3Rpb24ob2JqKSB7XG5cdFx0cmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKG9iaik7XG5cdH07XG5cblx0dmFyIF9hcnJheVJlbW92ZSA9IGZ1bmN0aW9uKGFycmF5LCBmcm9tLCB0bykge1xuXHRcdHZhciByZXN0ID0gYXJyYXkuc2xpY2UoKHRvIHx8IGZyb20pICsgMSB8fCBhcnJheS5sZW5ndGgpO1xuXHRcdGFycmF5Lmxlbmd0aCA9IGZyb20gPCAwID8gYXJyYXkubGVuZ3RoICsgZnJvbSA6IGZyb207XG5cdFx0cmV0dXJuIGFycmF5LnB1c2guYXBwbHkoYXJyYXksIHJlc3QpO1xuXHR9O1xuXG5cdHZhciBfYWRkRXZlbnQgPSBmdW5jdGlvbihvYmplY3QsIHR5cGUsIGNhbGxiYWNrKSB7XG5cdFx0aWYgKG9iamVjdCA9PT0gbnVsbCB8fCB0eXBlb2Yob2JqZWN0KSA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcblxuXHRcdGlmIChvYmplY3QuYWRkRXZlbnRMaXN0ZW5lcikge1xuXHRcdFx0b2JqZWN0LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgY2FsbGJhY2ssIGZhbHNlKTtcblx0XHR9IGVsc2UgaWYgKG9iamVjdC5hdHRhY2hFdmVudCkge1xuXHRcdFx0b2JqZWN0LmF0dGFjaEV2ZW50KFwib25cIiArIHR5cGUsIGNhbGxiYWNrKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0b2JqZWN0W1wib25cIiArIHR5cGVdID0gY2FsbGJhY2s7XG5cdFx0fVxuXHR9O1xuXG5cdHZhciBfbG9hZEltZyA9IGZ1bmN0aW9uKHNsaWRlLCBjYWxsYmFjaykge1xuXHRcdGlmICghc2xpZGUuc3R5bGUuYmFja2dyb3VuZEltYWdlKSB7XG5cdFx0XHR2YXIgaW1nID0gbmV3IEltYWdlKCk7XG5cdFx0XHRpbWcuc2V0QXR0cmlidXRlKCdzcmMnLCBzbGlkZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJykpO1xuXHRcdFx0aW1nLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRzbGlkZS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAndXJsKCcgKyBzbGlkZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJykgKyAnKSc7XG5cdFx0XHRcdHNsaWRlLnNldEF0dHJpYnV0ZSgnZGF0YS1hY3R1YWwtd2lkdGgnLCB0aGlzLm5hdHVyYWxXaWR0aCk7XG5cdFx0XHRcdHNsaWRlLnNldEF0dHJpYnV0ZSgnZGF0YS1hY3R1YWwtaGVpZ2h0JywgdGhpcy5uYXR1cmFsSGVpZ2h0KTtcblx0XHRcdFx0aWYgKHR5cGVvZihjYWxsYmFjaykgPT09ICdmdW5jdGlvbicpIGNhbGxiYWNrKHRoaXMpO1xuXHRcdFx0fTtcblx0XHR9XG5cdH07XG5cblx0dmFyIF9pc0hpZ2hEUEkgPSBmdW5jdGlvbigpIHtcblx0XHR2YXIgbWVkaWFRdWVyeSA9IFwiKC13ZWJraXQtbWluLWRldmljZS1waXhlbC1yYXRpbzogMS41KSwobWluLS1tb3otZGV2aWNlLXBpeGVsLXJhdGlvOiAxLjUpLCgtby1taW4tZGV2aWNlLXBpeGVsLXJhdGlvOiAzLzIpLChtaW4tcmVzb2x1dGlvbjogMS41ZHBweClcIjtcblx0XHRpZiAod2luZG93LmRldmljZVBpeGVsUmF0aW8gPiAxKVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0aWYgKHdpbmRvdy5tYXRjaE1lZGlhICYmIHdpbmRvdy5tYXRjaE1lZGlhKG1lZGlhUXVlcnkpLm1hdGNoZXMpXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH07XG5cblx0dmFyIF90cmFuc2xhdGUgPSBmdW5jdGlvbihzbGlkZSwgZGlzdCwgc3BlZWQpIHtcblx0XHRzbGlkZS5zdHlsZS53ZWJraXRUcmFuc2l0aW9uRHVyYXRpb24gPVxuXHRcdFx0c2xpZGUuc3R5bGUuTW96VHJhbnNpdGlvbkR1cmF0aW9uID1cblx0XHRcdHNsaWRlLnN0eWxlLm1zVHJhbnNpdGlvbkR1cmF0aW9uID1cblx0XHRcdHNsaWRlLnN0eWxlLk9UcmFuc2l0aW9uRHVyYXRpb24gPVxuXHRcdFx0c2xpZGUuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gc3BlZWQgKyAnbXMnO1xuXG5cdFx0c2xpZGUuc3R5bGUud2Via2l0VHJhbnNmb3JtID1cblx0XHRcdHNsaWRlLnN0eWxlLk1velRyYW5zZm9ybSA9XG5cdFx0XHRzbGlkZS5zdHlsZS5tc1RyYW5zZm9ybSA9XG5cdFx0XHRzbGlkZS5zdHlsZS5PVHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoJyArIGRpc3QgKyAncHgpJztcblx0fTtcblxuXHR2YXIgX3VuVHJhbnNsYXRlID0gZnVuY3Rpb24oc2xpZGUpIHtcblx0XHRzbGlkZS5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnLXdlYmtpdC10cmFuc2l0aW9uLWR1cmF0aW9uJyk7XG5cdFx0c2xpZGUuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3RyYW5zaXRpb24tZHVyYXRpb24nKTtcblxuXHRcdHNsaWRlLnN0eWxlLnJlbW92ZVByb3BlcnR5KCctd2Via2l0LXRyYW5zZm9ybScpO1xuXHRcdHNsaWRlLnN0eWxlLnJlbW92ZVByb3BlcnR5KCctbXMtdHJhbnNmb3JtJyk7XG5cdFx0c2xpZGUuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3RyYW5zZm9ybScpO1xuXHR9O1xuXG5cdHZhciBfYW5pbWF0ZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcblx0XHR2YXIgZHVyYXRpb24gPSBpdGVtLnRpbWUsXG5cdFx0XHRlbmQgPSArbmV3IERhdGUoKSArIGR1cmF0aW9uO1xuXG5cdFx0dmFyIHN0ZXAgPSBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBjdXJyZW50ID0gK25ldyBEYXRlKCksXG5cdFx0XHRcdHJlbWFpbmluZyA9IGVuZCAtIGN1cnJlbnQ7XG5cblx0XHRcdGlmIChyZW1haW5pbmcgPCA2MCkge1xuXHRcdFx0XHRpdGVtLnJ1bigxKTsgLy8xID0gcHJvZ3Jlc3MgaXMgYXQgMTAwJVxuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR2YXIgcHJvZ3Jlc3MgPSAxIC0gcmVtYWluaW5nIC8gZHVyYXRpb247XG5cdFx0XHRcdGl0ZW0ucnVuKHByb2dyZXNzKTtcblx0XHRcdH1cblxuXHRcdFx0X3JlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwKTtcblx0XHR9O1xuXHRcdHN0ZXAoKTtcblx0fTtcblxuXHR2YXIgX3NldENvbnRhaW5lckhlaWdodCA9IGZ1bmN0aW9uKHNsaWRlciwgc2hvdWxkQW5pbWF0ZSkge1xuXHRcdGlmICh0eXBlb2Ygc2hvdWxkQW5pbWF0ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHNob3VsZEFuaW1hdGUgPSB0cnVlO1xuXHRcdH1cblxuXHRcdC8vIElmIGl0J3MgYSBmaXhlZCBoZWlnaHQgdGhlbiBkb24ndCBjaGFuZ2UgdGhlIGhlaWdodFxuXHRcdGlmIChfaXNJbnRlZ2VyKHNsaWRlci5zZXR0aW5ncy5oZWlnaHQpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dmFyIGN1cnJlbnRIZWlnaHQgPSBNYXRoLnJvdW5kKHNsaWRlci5fYXR0cmlidXRlcy5jb250YWluZXIub2Zmc2V0SGVpZ2h0KSxcblx0XHRcdG5ld0hlaWdodCA9IGN1cnJlbnRIZWlnaHQ7XG5cblx0XHRpZiAoc2xpZGVyLl9hdHRyaWJ1dGVzLmFzcGVjdFdpZHRoICYmIHNsaWRlci5fYXR0cmlidXRlcy5hc3BlY3RIZWlnaHQpIHtcblx0XHRcdC8vIEFzcGVjdCByYXRpb1xuXHRcdFx0bmV3SGVpZ2h0ID0gKHNsaWRlci5fYXR0cmlidXRlcy5hc3BlY3RIZWlnaHQgLyBzbGlkZXIuX2F0dHJpYnV0ZXMuYXNwZWN0V2lkdGgpICogc2xpZGVyLl9hdHRyaWJ1dGVzLmNvbnRhaW5lci5vZmZzZXRXaWR0aDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gQXV0b1xuXHRcdFx0dmFyIHdpZHRoID0gc2xpZGVyLl9hdHRyaWJ1dGVzLmN1cnJlbnRTbGlkZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0dWFsLXdpZHRoJyk7XG5cdFx0XHR2YXIgaGVpZ2h0ID0gc2xpZGVyLl9hdHRyaWJ1dGVzLmN1cnJlbnRTbGlkZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0dWFsLWhlaWdodCcpO1xuXG5cdFx0XHRpZiAod2lkdGggJiYgaGVpZ2h0KSB7XG5cdFx0XHRcdG5ld0hlaWdodCA9IChoZWlnaHQgLyB3aWR0aCkgKiBzbGlkZXIuX2F0dHJpYnV0ZXMuY29udGFpbmVyLm9mZnNldFdpZHRoO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHZhciBtYXhIZWlnaHQgPSBwYXJzZUludChzbGlkZXIuc2V0dGluZ3MubWF4SGVpZ2h0LCAxMCk7XG5cdFx0aWYgKG1heEhlaWdodCAmJiBuZXdIZWlnaHQgPiBtYXhIZWlnaHQpIHtcblx0XHRcdG5ld0hlaWdodCA9IG1heEhlaWdodDtcblx0XHR9XG5cblx0XHRuZXdIZWlnaHQgPSBNYXRoLnJvdW5kKG5ld0hlaWdodCk7XG5cdFx0aWYgKG5ld0hlaWdodCA9PT0gY3VycmVudEhlaWdodCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmIChzaG91bGRBbmltYXRlKSB7XG5cdFx0XHRfYW5pbWF0ZSh7XG5cdFx0XHRcdHRpbWU6IHNsaWRlci5zZXR0aW5ncy50cmFuc2l0aW9uRHVyYXRpb24sXG5cdFx0XHRcdHJ1bjogZnVuY3Rpb24ocHJvZ3Jlc3MpIHtcblx0XHRcdFx0XHRzbGlkZXIuX2F0dHJpYnV0ZXMuY29udGFpbmVyLnN0eWxlLmhlaWdodCA9IE1hdGgucm91bmQocHJvZ3Jlc3MgKiAobmV3SGVpZ2h0IC0gY3VycmVudEhlaWdodCkgKyBjdXJyZW50SGVpZ2h0KSArICdweCc7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzbGlkZXIuX2F0dHJpYnV0ZXMuY29udGFpbmVyLnN0eWxlLmhlaWdodCA9IG5ld0hlaWdodCArICdweCc7XG5cdFx0fVxuXHR9O1xuXG5cdHZhciBfdG91Y2ggPSB7XG5cblx0XHR2YXJzOiB7XG5cdFx0XHRzdGFydDoge30sXG5cdFx0XHRkZWx0YToge30sXG5cdFx0XHRpc1Njcm9sbGluZzogdW5kZWZpbmVkLFxuXHRcdFx0ZGlyZWN0aW9uOiBudWxsXG5cdFx0fSxcblxuXHRcdHN0YXJ0OiBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0aWYgKF9oYXNDbGFzcyh0aGlzLl9hdHRyaWJ1dGVzLmNvbnRhaW5lciwgdGhpcy5zZXR0aW5ncy5jbGFzc2VzLmFuaW1hdGluZykpIHJldHVybjtcblxuXHRcdFx0dmFyIHRvdWNoZXMgPSBldmVudC50b3VjaGVzWzBdO1xuXHRcdFx0X3RvdWNoLnZhcnMuc3RhcnQgPSB7XG5cdFx0XHRcdHg6IHRvdWNoZXMucGFnZVgsXG5cdFx0XHRcdHk6IHRvdWNoZXMucGFnZVksXG5cdFx0XHRcdHRpbWU6ICtuZXcgRGF0ZSgpXG5cdFx0XHR9O1xuXHRcdFx0X3RvdWNoLnZhcnMuZGVsdGEgPSB7fTtcblx0XHRcdF90b3VjaC52YXJzLmlzU2Nyb2xsaW5nID0gdW5kZWZpbmVkO1xuXHRcdFx0X3RvdWNoLnZhcnMuZGlyZWN0aW9uID0gbnVsbDtcblxuXHRcdFx0dGhpcy5zdG9wKCk7IC8vIFN0b3Agc2xpZGVyXG5cblx0XHRcdHRoaXMuc2V0dGluZ3MuYmVmb3JlQ2hhbmdlLmFwcGx5KHRoaXMpO1xuXHRcdFx0X2FkZENsYXNzKHRoaXMuX2F0dHJpYnV0ZXMuY29udGFpbmVyLCB0aGlzLnNldHRpbmdzLmNsYXNzZXMudG91Y2hpbmcpO1xuXHRcdH0sXG5cblx0XHRtb3ZlOiBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0aWYgKF9oYXNDbGFzcyh0aGlzLl9hdHRyaWJ1dGVzLmNvbnRhaW5lciwgdGhpcy5zZXR0aW5ncy5jbGFzc2VzLmFuaW1hdGluZykpIHJldHVybjtcblx0XHRcdC8vIEVuc3VyZSBzd2lwaW5nIHdpdGggb25lIHRvdWNoIGFuZCBub3QgcGluY2hpbmdcblx0XHRcdGlmIChldmVudC50b3VjaGVzLmxlbmd0aCA+IDEgfHwgZXZlbnQuc2NhbGUgJiYgZXZlbnQuc2NhbGUgIT09IDEpIHJldHVybjtcblxuXHRcdFx0dmFyIHRvdWNoZXMgPSBldmVudC50b3VjaGVzWzBdO1xuXHRcdFx0X3RvdWNoLnZhcnMuZGVsdGEgPSB7XG5cdFx0XHRcdHg6IHRvdWNoZXMucGFnZVggLSBfdG91Y2gudmFycy5zdGFydC54LFxuXHRcdFx0XHR5OiB0b3VjaGVzLnBhZ2VZIC0gX3RvdWNoLnZhcnMuc3RhcnQueVxuXHRcdFx0fTtcblxuXHRcdFx0aWYgKHR5cGVvZiBfdG91Y2gudmFycy5pc1Njcm9sbGluZyA9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRfdG91Y2gudmFycy5pc1Njcm9sbGluZyA9ICEhKF90b3VjaC52YXJzLmlzU2Nyb2xsaW5nIHx8IE1hdGguYWJzKF90b3VjaC52YXJzLmRlbHRhLngpIDwgTWF0aC5hYnMoX3RvdWNoLnZhcnMuZGVsdGEueSkpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBJZiB1c2VyIGlzIG5vdCB0cnlpbmcgdG8gc2Nyb2xsIHZlcnRpY2FsbHlcblx0XHRcdGlmICghX3RvdWNoLnZhcnMuaXNTY3JvbGxpbmcpIHtcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gUHJldmVudCBuYXRpdmUgc2Nyb2xsaW5nXG5cblx0XHRcdFx0X3RyYW5zbGF0ZSh0aGlzLl9hdHRyaWJ1dGVzLnByZXZpb3VzU2xpZGUsIF90b3VjaC52YXJzLmRlbHRhLnggLSB0aGlzLl9hdHRyaWJ1dGVzLnByZXZpb3VzU2xpZGUub2Zmc2V0V2lkdGgsIDApO1xuXHRcdFx0XHRfdHJhbnNsYXRlKHRoaXMuX2F0dHJpYnV0ZXMuY3VycmVudFNsaWRlLCBfdG91Y2gudmFycy5kZWx0YS54LCAwKTtcblx0XHRcdFx0X3RyYW5zbGF0ZSh0aGlzLl9hdHRyaWJ1dGVzLm5leHRTbGlkZSwgX3RvdWNoLnZhcnMuZGVsdGEueCArIHRoaXMuX2F0dHJpYnV0ZXMuY3VycmVudFNsaWRlLm9mZnNldFdpZHRoLCAwKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0ZW5kOiBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0aWYgKF9oYXNDbGFzcyh0aGlzLl9hdHRyaWJ1dGVzLmNvbnRhaW5lciwgdGhpcy5zZXR0aW5ncy5jbGFzc2VzLmFuaW1hdGluZykpIHJldHVybjtcblxuXHRcdFx0dmFyIGR1cmF0aW9uID0gK25ldyBEYXRlKCkgLSBfdG91Y2gudmFycy5zdGFydC50aW1lO1xuXG5cdFx0XHQvLyBEZXRlcm1pbmUgaWYgc2xpZGUgYXR0ZW1wdCB0cmlnZ2VycyBuZXh0L3ByZXYgc2xpZGVcblx0XHRcdHZhciBpc0NoYW5nZVNsaWRlID0gTnVtYmVyKGR1cmF0aW9uKSA8IDI1MCAmJiBNYXRoLmFicyhfdG91Y2gudmFycy5kZWx0YS54KSA+IDIwIHx8IE1hdGguYWJzKF90b3VjaC52YXJzLmRlbHRhLngpID4gdGhpcy5fYXR0cmlidXRlcy5jdXJyZW50U2xpZGUub2Zmc2V0V2lkdGggLyAyO1xuXG5cdFx0XHR2YXIgZGlyZWN0aW9uID0gX3RvdWNoLnZhcnMuZGVsdGEueCA8IDAgPyAnbmV4dCcgOiAncHJldmlvdXMnO1xuXHRcdFx0dmFyIHNwZWVkID0gdGhpcy5zZXR0aW5ncy50cmFuc2l0aW9uRHVyYXRpb24gPyB0aGlzLnNldHRpbmdzLnRyYW5zaXRpb25EdXJhdGlvbiAvIDIgOiAwO1xuXG5cdFx0XHQvLyBJZiBub3Qgc2Nyb2xsaW5nIHZlcnRpY2FsbHlcblx0XHRcdGlmICghX3RvdWNoLnZhcnMuaXNTY3JvbGxpbmcpIHtcblx0XHRcdFx0aWYgKGlzQ2hhbmdlU2xpZGUpIHtcblx0XHRcdFx0XHRfdG91Y2gudmFycy5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG5cblx0XHRcdFx0XHRpZiAoX3RvdWNoLnZhcnMuZGlyZWN0aW9uID09ICduZXh0Jykge1xuXHRcdFx0XHRcdFx0X3RyYW5zbGF0ZSh0aGlzLl9hdHRyaWJ1dGVzLmN1cnJlbnRTbGlkZSwgLXRoaXMuX2F0dHJpYnV0ZXMuY3VycmVudFNsaWRlLm9mZnNldFdpZHRoLCBzcGVlZCk7XG5cdFx0XHRcdFx0XHRfdHJhbnNsYXRlKHRoaXMuX2F0dHJpYnV0ZXMubmV4dFNsaWRlLCAwLCBzcGVlZCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdF90cmFuc2xhdGUodGhpcy5fYXR0cmlidXRlcy5wcmV2aW91c1NsaWRlLCAwLCBzcGVlZCk7XG5cdFx0XHRcdFx0XHRfdHJhbnNsYXRlKHRoaXMuX2F0dHJpYnV0ZXMuY3VycmVudFNsaWRlLCB0aGlzLl9hdHRyaWJ1dGVzLmN1cnJlbnRTbGlkZS5vZmZzZXRXaWR0aCwgc3BlZWQpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdF9yZXF1ZXN0VGltZW91dChfdG91Y2gudHJhbnNpdGlvbkVuZC5iaW5kKHRoaXMpLCBzcGVlZCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gU2xpZGVzIHJldHVybiB0byBvcmlnaW5hbCBwb3NpdGlvblxuXHRcdFx0XHRcdGlmIChkaXJlY3Rpb24gPT0gJ25leHQnKSB7XG5cdFx0XHRcdFx0XHRfdHJhbnNsYXRlKHRoaXMuX2F0dHJpYnV0ZXMuY3VycmVudFNsaWRlLCAwLCBzcGVlZCk7XG5cdFx0XHRcdFx0XHRfdHJhbnNsYXRlKHRoaXMuX2F0dHJpYnV0ZXMubmV4dFNsaWRlLCB0aGlzLl9hdHRyaWJ1dGVzLmN1cnJlbnRTbGlkZS5vZmZzZXRXaWR0aCwgc3BlZWQpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRfdHJhbnNsYXRlKHRoaXMuX2F0dHJpYnV0ZXMucHJldmlvdXNTbGlkZSwgLXRoaXMuX2F0dHJpYnV0ZXMucHJldmlvdXNTbGlkZS5vZmZzZXRXaWR0aCwgc3BlZWQpO1xuXHRcdFx0XHRcdFx0X3RyYW5zbGF0ZSh0aGlzLl9hdHRyaWJ1dGVzLmN1cnJlbnRTbGlkZSwgMCwgc3BlZWQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChzcGVlZCkge1xuXHRcdFx0XHRcdF9hZGRDbGFzcyh0aGlzLl9hdHRyaWJ1dGVzLmNvbnRhaW5lciwgdGhpcy5zZXR0aW5ncy5jbGFzc2VzLmFuaW1hdGluZyk7XG5cdFx0XHRcdFx0X3JlcXVlc3RUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0X3JlbW92ZUNsYXNzKHRoaXMuX2F0dHJpYnV0ZXMuY29udGFpbmVyLCB0aGlzLnNldHRpbmdzLmNsYXNzZXMuYW5pbWF0aW5nKTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcyksIHNwZWVkKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHR0cmFuc2l0aW9uRW5kOiBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0aWYgKF90b3VjaC52YXJzLmRpcmVjdGlvbikge1xuXHRcdFx0XHRfdW5UcmFuc2xhdGUodGhpcy5fYXR0cmlidXRlcy5wcmV2aW91c1NsaWRlKTtcblx0XHRcdFx0X3VuVHJhbnNsYXRlKHRoaXMuX2F0dHJpYnV0ZXMuY3VycmVudFNsaWRlKTtcblx0XHRcdFx0X3VuVHJhbnNsYXRlKHRoaXMuX2F0dHJpYnV0ZXMubmV4dFNsaWRlKTtcblx0XHRcdFx0X3JlbW92ZUNsYXNzKHRoaXMuX2F0dHJpYnV0ZXMuY29udGFpbmVyLCB0aGlzLnNldHRpbmdzLmNsYXNzZXMudG91Y2hpbmcpO1xuXG5cdFx0XHRcdF9yZW1vdmVDbGFzcyh0aGlzLl9hdHRyaWJ1dGVzLnByZXZpb3VzU2xpZGUsIHRoaXMuc2V0dGluZ3MuY2xhc3Nlcy5wcmV2aW91c1NsaWRlKTtcblx0XHRcdFx0X3JlbW92ZUNsYXNzKHRoaXMuX2F0dHJpYnV0ZXMuY3VycmVudFNsaWRlLCB0aGlzLnNldHRpbmdzLmNsYXNzZXMuY3VycmVudFNsaWRlKTtcblx0XHRcdFx0X3JlbW92ZUNsYXNzKHRoaXMuX2F0dHJpYnV0ZXMubmV4dFNsaWRlLCB0aGlzLnNldHRpbmdzLmNsYXNzZXMubmV4dFNsaWRlKTtcblx0XHRcdFx0dGhpcy5fYXR0cmlidXRlcy5jdXJyZW50U2xpZGUuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cblx0XHRcdFx0dmFyIHNsaWRlcyA9IHRoaXMuX2F0dHJpYnV0ZXMuc2xpZGVzLFxuXHRcdFx0XHRcdGluZGV4ID0gc2xpZGVzLmluZGV4T2YodGhpcy5fYXR0cmlidXRlcy5jdXJyZW50U2xpZGUpO1xuXG5cdFx0XHRcdGlmIChfdG91Y2gudmFycy5kaXJlY3Rpb24gPT0gJ25leHQnKSB7XG5cdFx0XHRcdFx0dGhpcy5fYXR0cmlidXRlcy5wcmV2aW91c1NsaWRlID0gdGhpcy5fYXR0cmlidXRlcy5jdXJyZW50U2xpZGU7XG5cdFx0XHRcdFx0dGhpcy5fYXR0cmlidXRlcy5jdXJyZW50U2xpZGUgPSBzbGlkZXNbaW5kZXggKyAxXTtcblx0XHRcdFx0XHR0aGlzLl9hdHRyaWJ1dGVzLm5leHRTbGlkZSA9IHNsaWRlc1tpbmRleCArIDJdO1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgdGhpcy5fYXR0cmlidXRlcy5jdXJyZW50U2xpZGUgPT09ICd1bmRlZmluZWQnICYmXG5cdFx0XHRcdFx0XHR0eXBlb2YgdGhpcy5fYXR0cmlidXRlcy5uZXh0U2xpZGUgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9hdHRyaWJ1dGVzLmN1cnJlbnRTbGlkZSA9IHNsaWRlc1swXTtcblx0XHRcdFx0XHRcdHRoaXMuX2F0dHJpYnV0ZXMubmV4dFNsaWRlID0gc2xpZGVzWzFdO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mIHRoaXMuX2F0dHJpYnV0ZXMubmV4dFNsaWRlID09PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9hdHRyaWJ1dGVzLm5leHRTbGlkZSA9IHNsaWRlc1swXTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRfbG9hZEltZyh0aGlzLl9hdHRyaWJ1dGVzLm5leHRTbGlkZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5fYXR0cmlidXRlcy5uZXh0U2xpZGUgPSB0aGlzLl9hdHRyaWJ1dGVzLmN1cnJlbnRTbGlkZTtcblx0XHRcdFx0XHR0aGlzLl9hdHRyaWJ1dGVzLnByZXZpb3VzU2xpZGUgPSBzbGlkZXNbaW5kZXggLSAyXTtcblx0XHRcdFx0XHR0aGlzLl9hdHRyaWJ1dGVzLmN1cnJlbnRTbGlkZSA9IHNsaWRlc1tpbmRleCAtIDFdO1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgdGhpcy5fYXR0cmlidXRlcy5jdXJyZW50U2xpZGUgPT09ICd1bmRlZmluZWQnICYmXG5cdFx0XHRcdFx0XHR0eXBlb2YgdGhpcy5fYXR0cmlidXRlcy5wcmV2aW91c1NsaWRlID09PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRcdFx0dGhpcy5fYXR0cmlidXRlcy5jdXJyZW50U2xpZGUgPSBzbGlkZXNbc2xpZGVzLmxlbmd0aCAtIDFdO1xuXHRcdFx0XHRcdFx0dGhpcy5fYXR0cmlidXRlcy5wcmV2aW91c1NsaWRlID0gc2xpZGVzW3NsaWRlcy5sZW5ndGggLSAyXTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0aWYgKHR5cGVvZiB0aGlzLl9hdHRyaWJ1dGVzLnByZXZpb3VzU2xpZGUgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX2F0dHJpYnV0ZXMucHJldmlvdXNTbGlkZSA9IHNsaWRlc1tzbGlkZXMubGVuZ3RoIC0gMV07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0X2xvYWRJbWcodGhpcy5fYXR0cmlidXRlcy5wcmV2aW91c1NsaWRlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdF9hZGRDbGFzcyh0aGlzLl9hdHRyaWJ1dGVzLnByZXZpb3VzU2xpZGUsIHRoaXMuc2V0dGluZ3MuY2xhc3Nlcy5wcmV2aW91c1NsaWRlKTtcblx0XHRcdFx0X2FkZENsYXNzKHRoaXMuX2F0dHJpYnV0ZXMuY3VycmVudFNsaWRlLCB0aGlzLnNldHRpbmdzLmNsYXNzZXMuY3VycmVudFNsaWRlKTtcblx0XHRcdFx0X2FkZENsYXNzKHRoaXMuX2F0dHJpYnV0ZXMubmV4dFNsaWRlLCB0aGlzLnNldHRpbmdzLmNsYXNzZXMubmV4dFNsaWRlKTtcblx0XHRcdFx0dGhpcy5fYXR0cmlidXRlcy5jdXJyZW50U2xpZGUuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG5cdFx0XHRcdF9zZXRDb250YWluZXJIZWlnaHQodGhpcyk7XG5cdFx0XHRcdHRoaXMuc2V0dGluZ3MuYWZ0ZXJDaGFuZ2UuYXBwbHkodGhpcyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdH07XG5cblx0Lypcblx0ICogU2xpZGVyIGNsYXNzXG5cdCAqL1xuXHR2YXIgU2xpZGVyID0gZnVuY3Rpb24oYXJncykge1xuXHRcdC8vIERlZmF1bHRzXG5cdFx0dGhpcy5zZXR0aW5ncyA9IHtcblx0XHRcdHNlbGVjdG9yOiAnJyxcblx0XHRcdGhlaWdodDogJ2F1dG8nLCAvLyBcImF1dG9cIiB8IHB4IHZhbHVlIChlLmcuIDQwMCkgfCBhc3BlY3QgcmF0aW8gKGUuZy4gXCIxNjo5XCIpXG5cdFx0XHRpbml0aWFsSGVpZ2h0OiA0MDAsIC8vIGZvciBcImF1dG9cIiBhbmQgYXNwZWN0IHJhdGlvXG5cdFx0XHRtYXhIZWlnaHQ6IG51bGwsIC8vIGZvciBcImF1dG9cIiBhbmQgYXNwZWN0IHJhdGlvXG5cdFx0XHRpbnRlcnZhbDogNDAwMCxcblx0XHRcdHRyYW5zaXRpb25EdXJhdGlvbjogNzAwLFxuXHRcdFx0ZWZmZWN0OiAnc2xpZGUnLFxuXHRcdFx0ZGlzYWJsZU5hdjogZmFsc2UsXG5cdFx0XHRrZXlib2FyZE5hdjogdHJ1ZSxcblx0XHRcdHByZXZpb3VzTmF2U2VsZWN0b3I6ICcnLFxuXHRcdFx0bmV4dE5hdlNlbGVjdG9yOiAnJyxcblx0XHRcdGNsYXNzZXM6IHtcblx0XHRcdFx0Y29udGFpbmVyOiAnaWRlYWwtaW1hZ2Utc2xpZGVyJyxcblx0XHRcdFx0c2xpZGU6ICdpaXMtc2xpZGUnLFxuXHRcdFx0XHRwcmV2aW91c1NsaWRlOiAnaWlzLXByZXZpb3VzLXNsaWRlJyxcblx0XHRcdFx0Y3VycmVudFNsaWRlOiAnaWlzLWN1cnJlbnQtc2xpZGUnLFxuXHRcdFx0XHRuZXh0U2xpZGU6ICdpaXMtbmV4dC1zbGlkZScsXG5cdFx0XHRcdHByZXZpb3VzTmF2OiAnaWlzLXByZXZpb3VzLW5hdicsXG5cdFx0XHRcdG5leHROYXY6ICdpaXMtbmV4dC1uYXYnLFxuXHRcdFx0XHRhbmltYXRpbmc6ICdpaXMtaXMtYW5pbWF0aW5nJyxcblx0XHRcdFx0dG91Y2hFbmFibGVkOiAnaWlzLXRvdWNoLWVuYWJsZWQnLFxuXHRcdFx0XHR0b3VjaGluZzogJ2lpcy1pcy10b3VjaGluZycsXG5cdFx0XHRcdGRpcmVjdGlvblByZXZpb3VzOiAnaWlzLWRpcmVjdGlvbi1wcmV2aW91cycsXG5cdFx0XHRcdGRpcmVjdGlvbk5leHQ6ICdpaXMtZGlyZWN0aW9uLW5leHQnXG5cdFx0XHR9LFxuXHRcdFx0b25Jbml0OiBmdW5jdGlvbigpIHt9LFxuXHRcdFx0b25TdGFydDogZnVuY3Rpb24oKSB7fSxcblx0XHRcdG9uU3RvcDogZnVuY3Rpb24oKSB7fSxcblx0XHRcdG9uRGVzdHJveTogZnVuY3Rpb24oKSB7fSxcblx0XHRcdGJlZm9yZUNoYW5nZTogZnVuY3Rpb24oKSB7fSxcblx0XHRcdGFmdGVyQ2hhbmdlOiBmdW5jdGlvbigpIHt9XG5cdFx0fTtcblxuXHRcdC8vIFBhcnNlIGFyZ3Ncblx0XHRpZiAodHlwZW9mIGFyZ3MgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHR0aGlzLnNldHRpbmdzLnNlbGVjdG9yID0gYXJncztcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiBhcmdzID09PSAnb2JqZWN0Jykge1xuXHRcdFx0X2RlZXBFeHRlbmQodGhpcy5zZXR0aW5ncywgYXJncyk7XG5cdFx0fVxuXG5cdFx0Ly8gU2xpZGVyIChjb250YWluZXIpIGVsZW1lbnRcblx0XHR2YXIgc2xpZGVyRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuc2V0dGluZ3Muc2VsZWN0b3IpO1xuXHRcdGlmICghc2xpZGVyRWwpIHJldHVybiBudWxsO1xuXG5cdFx0Ly8gU2xpZGVzXG5cdFx0dmFyIG9yaWdDaGlsZHJlbiA9IF90b0FycmF5KHNsaWRlckVsLmNoaWxkcmVuKSxcblx0XHRcdHZhbGlkU2xpZGVzID0gW107XG5cdFx0c2xpZGVyRWwuaW5uZXJIVE1MID0gJyc7XG5cdFx0QXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChvcmlnQ2hpbGRyZW4sIGZ1bmN0aW9uKHNsaWRlLCBpKSB7XG5cdFx0XHRpZiAoc2xpZGUgaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50IHx8IHNsaWRlIGluc3RhbmNlb2YgSFRNTEFuY2hvckVsZW1lbnQpIHtcblx0XHRcdFx0dmFyIHNsaWRlRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyksXG5cdFx0XHRcdFx0aHJlZiA9ICcnLFxuXHRcdFx0XHRcdHRhcmdldCA9ICcnO1xuXG5cdFx0XHRcdGlmIChzbGlkZSBpbnN0YW5jZW9mIEhUTUxBbmNob3JFbGVtZW50KSB7XG5cdFx0XHRcdFx0aHJlZiA9IHNsaWRlLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuXHRcdFx0XHRcdHRhcmdldCA9IHNsaWRlLmdldEF0dHJpYnV0ZSgndGFyZ2V0Jyk7XG5cblx0XHRcdFx0XHR2YXIgaW1nID0gc2xpZGUucXVlcnlTZWxlY3RvcignaW1nJyk7XG5cdFx0XHRcdFx0aWYgKGltZyAhPT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0c2xpZGUgPSBpbWc7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodHlwZW9mIHNsaWRlLmRhdGFzZXQgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdFx0X2RlZXBFeHRlbmQoc2xpZGVFbC5kYXRhc2V0LCBzbGlkZS5kYXRhc2V0KTtcblx0XHRcdFx0XHRpZiAoc2xpZGUuZGF0YXNldC5zcmMpIHtcblx0XHRcdFx0XHRcdC8vIFVzZSBkYXRhLXNyYyBmb3Igb24tZGVtYW5kIGxvYWRpbmdcblx0XHRcdFx0XHRcdHNsaWRlRWwuZGF0YXNldC5zcmMgPSBzbGlkZS5kYXRhc2V0LnNyYztcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0c2xpZGVFbC5kYXRhc2V0LnNyYyA9IHNsaWRlLnNyYztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBIaURQSSBzdXBwb3J0XG5cdFx0XHRcdFx0aWYgKF9pc0hpZ2hEUEkoKSAmJiBzbGlkZS5kYXRhc2V0WydzcmMtMngnXSkge1xuXHRcdFx0XHRcdFx0c2xpZGVFbC5kYXRhc2V0LnNyYyA9IHNsaWRlLmRhdGFzZXRbJ3NyYy0yeCddO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyBJRVxuXHRcdFx0XHRcdGlmIChzbGlkZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJykpIHtcblx0XHRcdFx0XHRcdHNsaWRlRWwuc2V0QXR0cmlidXRlKCdkYXRhLXNyYycsIHNsaWRlLmdldEF0dHJpYnV0ZSgnZGF0YS1zcmMnKSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHNsaWRlRWwuc2V0QXR0cmlidXRlKCdkYXRhLXNyYycsIHNsaWRlLmdldEF0dHJpYnV0ZSgnc3JjJykpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChocmVmKSBzbGlkZUVsLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuXHRcdFx0XHRpZiAodGFyZ2V0KSBzbGlkZUVsLnNldEF0dHJpYnV0ZSgndGFyZ2V0JywgdGFyZ2V0KTtcblx0XHRcdFx0aWYgKHNsaWRlLmdldEF0dHJpYnV0ZSgnY2xhc3NOYW1lJykpIF9hZGRDbGFzcyhzbGlkZUVsLCBzbGlkZS5nZXRBdHRyaWJ1dGUoJ2NsYXNzTmFtZScpKTtcblx0XHRcdFx0aWYgKHNsaWRlLmdldEF0dHJpYnV0ZSgnaWQnKSkgc2xpZGVFbC5zZXRBdHRyaWJ1dGUoJ2lkJywgc2xpZGUuZ2V0QXR0cmlidXRlKCdpZCcpKTtcblx0XHRcdFx0aWYgKHNsaWRlLmdldEF0dHJpYnV0ZSgndGl0bGUnKSkgc2xpZGVFbC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgc2xpZGUuZ2V0QXR0cmlidXRlKCd0aXRsZScpKTtcblx0XHRcdFx0aWYgKHNsaWRlLmdldEF0dHJpYnV0ZSgnYWx0JykpIHNsaWRlRWwuaW5uZXJIVE1MID0gc2xpZGUuZ2V0QXR0cmlidXRlKCdhbHQnKTtcblx0XHRcdFx0c2xpZGVFbC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAndGFicGFuZWwnKTtcblx0XHRcdFx0c2xpZGVFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcblxuXHRcdFx0XHRzbGlkZUVsLnN0eWxlLmNzc1RleHQgKz0gJy13ZWJraXQtdHJhbnNpdGlvbi1kdXJhdGlvbjonICsgdGhpcy5zZXR0aW5ncy50cmFuc2l0aW9uRHVyYXRpb24gKyAnbXM7LW1vei10cmFuc2l0aW9uLWR1cmF0aW9uOicgKyB0aGlzLnNldHRpbmdzLnRyYW5zaXRpb25EdXJhdGlvbiArICdtczstby10cmFuc2l0aW9uLWR1cmF0aW9uOicgKyB0aGlzLnNldHRpbmdzLnRyYW5zaXRpb25EdXJhdGlvbiArICdtczt0cmFuc2l0aW9uLWR1cmF0aW9uOicgKyB0aGlzLnNldHRpbmdzLnRyYW5zaXRpb25EdXJhdGlvbiArICdtczsnO1xuXG5cdFx0XHRcdHNsaWRlckVsLmFwcGVuZENoaWxkKHNsaWRlRWwpO1xuXHRcdFx0XHR2YWxpZFNsaWRlcy5wdXNoKHNsaWRlRWwpO1xuXHRcdFx0fVxuXHRcdH0uYmluZCh0aGlzKSk7XG5cblx0XHR2YXIgc2xpZGVzID0gdmFsaWRTbGlkZXM7XG5cdFx0aWYgKHNsaWRlcy5sZW5ndGggPD0gMSkge1xuXHRcdFx0c2xpZGVyRWwuaW5uZXJIVE1MID0gJyc7XG5cdFx0XHRBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKG9yaWdDaGlsZHJlbiwgZnVuY3Rpb24oY2hpbGQsIGkpIHtcblx0XHRcdFx0c2xpZGVyRWwuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cblx0XHQvLyBDcmVhdGUgbmF2aWdhdGlvblxuXHRcdGlmICghdGhpcy5zZXR0aW5ncy5kaXNhYmxlTmF2KSB7XG5cdFx0XHR2YXIgcHJldmlvdXNOYXYsIG5leHROYXY7XG5cdFx0XHRpZiAodGhpcy5zZXR0aW5ncy5wcmV2aW91c05hdlNlbGVjdG9yKSB7XG5cdFx0XHRcdHByZXZpb3VzTmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnNldHRpbmdzLnByZXZpb3VzTmF2U2VsZWN0b3IpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cHJldmlvdXNOYXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5cdFx0XHRcdHNsaWRlckVsLmFwcGVuZENoaWxkKHByZXZpb3VzTmF2KTtcblx0XHRcdH1cblx0XHRcdGlmICh0aGlzLnNldHRpbmdzLm5leHROYXZTZWxlY3Rvcikge1xuXHRcdFx0XHRuZXh0TmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnNldHRpbmdzLm5leHROYXZTZWxlY3Rvcik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRuZXh0TmF2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuXHRcdFx0XHRzbGlkZXJFbC5hcHBlbmRDaGlsZChuZXh0TmF2KTtcblx0XHRcdH1cblxuXHRcdFx0X2FkZENsYXNzKHByZXZpb3VzTmF2LCB0aGlzLnNldHRpbmdzLmNsYXNzZXMucHJldmlvdXNOYXYpO1xuXHRcdFx0X2FkZENsYXNzKG5leHROYXYsIHRoaXMuc2V0dGluZ3MuY2xhc3Nlcy5uZXh0TmF2KTtcblx0XHRcdF9hZGRFdmVudChwcmV2aW91c05hdiwgJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmIChfaGFzQ2xhc3ModGhpcy5fYXR0cmlidXRlcy5jb250YWluZXIsIHRoaXMuc2V0dGluZ3MuY2xhc3Nlcy5hbmltYXRpbmcpKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdHRoaXMuc3RvcCgpO1xuXHRcdFx0XHR0aGlzLnByZXZpb3VzU2xpZGUoKTtcblx0XHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0XHRfYWRkRXZlbnQobmV4dE5hdiwgJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmIChfaGFzQ2xhc3ModGhpcy5fYXR0cmlidXRlcy5jb250YWluZXIsIHRoaXMuc2V0dGluZ3MuY2xhc3Nlcy5hbmltYXRpbmcpKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdHRoaXMuc3RvcCgpO1xuXHRcdFx0XHR0aGlzLm5leHRTbGlkZSgpO1xuXHRcdFx0fS5iaW5kKHRoaXMpKTtcblxuXHRcdFx0Ly8gVG91Y2ggTmF2aWdhdGlvblxuXHRcdFx0aWYgKCgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpIHx8IHdpbmRvdy5Eb2N1bWVudFRvdWNoICYmIGRvY3VtZW50IGluc3RhbmNlb2YgRG9jdW1lbnRUb3VjaCkge1xuXHRcdFx0XHR0aGlzLnNldHRpbmdzLmVmZmVjdCA9ICdzbGlkZSc7XG5cdFx0XHRcdHByZXZpb3VzTmF2LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0XHRcdG5leHROYXYuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRcdFx0X2FkZENsYXNzKHNsaWRlckVsLCB0aGlzLnNldHRpbmdzLmNsYXNzZXMudG91Y2hFbmFibGVkKTtcblxuXHRcdFx0XHRfYWRkRXZlbnQoc2xpZGVyRWwsICd0b3VjaHN0YXJ0JywgX3RvdWNoLnN0YXJ0LmJpbmQodGhpcyksIGZhbHNlKTtcblx0XHRcdFx0X2FkZEV2ZW50KHNsaWRlckVsLCAndG91Y2htb3ZlJywgX3RvdWNoLm1vdmUuYmluZCh0aGlzKSwgZmFsc2UpO1xuXHRcdFx0XHRfYWRkRXZlbnQoc2xpZGVyRWwsICd0b3VjaGVuZCcsIF90b3VjaC5lbmQuYmluZCh0aGlzKSwgZmFsc2UpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBLZXlib2FyZCBOYXZpZ2F0aW9uXG5cdFx0XHRpZiAodGhpcy5zZXR0aW5ncy5rZXlib2FyZE5hdikge1xuXHRcdFx0XHRfYWRkRXZlbnQoZG9jdW1lbnQsICdrZXl1cCcsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0XHRlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XG5cdFx0XHRcdFx0dmFyIGJ1dHRvbiA9ICh0eXBlb2YgZS53aGljaCA9PSAnbnVtYmVyJykgPyBlLndoaWNoIDogZS5rZXlDb2RlO1xuXHRcdFx0XHRcdGlmIChidXR0b24gPT0gMzcpIHtcblx0XHRcdFx0XHRcdGlmIChfaGFzQ2xhc3ModGhpcy5fYXR0cmlidXRlcy5jb250YWluZXIsIHRoaXMuc2V0dGluZ3MuY2xhc3Nlcy5hbmltYXRpbmcpKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR0aGlzLnN0b3AoKTtcblx0XHRcdFx0XHRcdHRoaXMucHJldmlvdXNTbGlkZSgpO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoYnV0dG9uID09IDM5KSB7XG5cdFx0XHRcdFx0XHRpZiAoX2hhc0NsYXNzKHRoaXMuX2F0dHJpYnV0ZXMuY29udGFpbmVyLCB0aGlzLnNldHRpbmdzLmNsYXNzZXMuYW5pbWF0aW5nKSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0dGhpcy5zdG9wKCk7XG5cdFx0XHRcdFx0XHR0aGlzLm5leHRTbGlkZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fS5iaW5kKHRoaXMpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBDcmVhdGUgaW50ZXJuYWwgYXR0cmlidXRlc1xuXHRcdHRoaXMuX2F0dHJpYnV0ZXMgPSB7XG5cdFx0XHRjb250YWluZXI6IHNsaWRlckVsLFxuXHRcdFx0c2xpZGVzOiBzbGlkZXMsXG5cdFx0XHRwcmV2aW91c1NsaWRlOiB0eXBlb2Ygc2xpZGVzW3NsaWRlcy5sZW5ndGggLSAxXSAhPT0gJ3VuZGVmaW5lZCcgPyBzbGlkZXNbc2xpZGVzLmxlbmd0aCAtIDFdIDogc2xpZGVzWzBdLFxuXHRcdFx0Y3VycmVudFNsaWRlOiBzbGlkZXNbMF0sXG5cdFx0XHRuZXh0U2xpZGU6IHR5cGVvZiBzbGlkZXNbMV0gIT09ICd1bmRlZmluZWQnID8gc2xpZGVzWzFdIDogc2xpZGVzWzBdLFxuXHRcdFx0dGltZXJJZDogMCxcblx0XHRcdG9yaWdDaGlsZHJlbjogb3JpZ0NoaWxkcmVuLCAvLyBVc2VkIGluIGRlc3Ryb3koKVxuXHRcdFx0YXNwZWN0V2lkdGg6IDAsXG5cdFx0XHRhc3BlY3RIZWlnaHQ6IDBcblx0XHR9O1xuXG5cdFx0Ly8gU2V0IGhlaWdodFxuXHRcdGlmIChfaXNJbnRlZ2VyKHRoaXMuc2V0dGluZ3MuaGVpZ2h0KSkge1xuXHRcdFx0dGhpcy5fYXR0cmlidXRlcy5jb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gdGhpcy5zZXR0aW5ncy5oZWlnaHQgKyAncHgnO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoX2lzSW50ZWdlcih0aGlzLnNldHRpbmdzLmluaXRpYWxIZWlnaHQpKSB7XG5cdFx0XHRcdHRoaXMuX2F0dHJpYnV0ZXMuY29udGFpbmVyLnN0eWxlLmhlaWdodCA9IHRoaXMuc2V0dGluZ3MuaW5pdGlhbEhlaWdodCArICdweCc7XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIGFzcGVjdCByYXRpbyBwYXJzZSBhbmQgc3RvcmVcblx0XHRcdGlmICh0aGlzLnNldHRpbmdzLmhlaWdodC5pbmRleE9mKCc6JykgPiAtMSkge1xuXHRcdFx0XHR2YXIgYXNwZWN0UmF0aW9QYXJ0cyA9IHRoaXMuc2V0dGluZ3MuaGVpZ2h0LnNwbGl0KCc6Jyk7XG5cdFx0XHRcdGlmIChhc3BlY3RSYXRpb1BhcnRzLmxlbmd0aCA9PSAyICYmIF9pc0ludGVnZXIocGFyc2VJbnQoYXNwZWN0UmF0aW9QYXJ0c1swXSwgMTApKSAmJiBfaXNJbnRlZ2VyKHBhcnNlSW50KGFzcGVjdFJhdGlvUGFydHNbMV0sIDEwKSkpIHtcblx0XHRcdFx0XHR0aGlzLl9hdHRyaWJ1dGVzLmFzcGVjdFdpZHRoID0gcGFyc2VJbnQoYXNwZWN0UmF0aW9QYXJ0c1swXSwgMTApO1xuXHRcdFx0XHRcdHRoaXMuX2F0dHJpYnV0ZXMuYXNwZWN0SGVpZ2h0ID0gcGFyc2VJbnQoYXNwZWN0UmF0aW9QYXJ0c1sxXSwgMTApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdF9hZGRFdmVudCh3aW5kb3csICdyZXNpemUnLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0X3NldENvbnRhaW5lckhlaWdodCh0aGlzLCBmYWxzZSk7XG5cdFx0XHR9LmJpbmQodGhpcykpO1xuXHRcdH1cblxuXHRcdC8vIEFkZCBjbGFzc2VzXG5cdFx0X2FkZENsYXNzKHNsaWRlckVsLCB0aGlzLnNldHRpbmdzLmNsYXNzZXMuY29udGFpbmVyKTtcblx0XHRfYWRkQ2xhc3Moc2xpZGVyRWwsICdpaXMtZWZmZWN0LScgKyB0aGlzLnNldHRpbmdzLmVmZmVjdCk7XG5cdFx0QXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbCh0aGlzLl9hdHRyaWJ1dGVzLnNsaWRlcywgZnVuY3Rpb24oc2xpZGUsIGkpIHtcblx0XHRcdF9hZGRDbGFzcyhzbGlkZSwgdGhpcy5zZXR0aW5ncy5jbGFzc2VzLnNsaWRlKTtcblx0XHR9LmJpbmQodGhpcykpO1xuXHRcdF9hZGRDbGFzcyh0aGlzLl9hdHRyaWJ1dGVzLnByZXZpb3VzU2xpZGUsIHRoaXMuc2V0dGluZ3MuY2xhc3Nlcy5wcmV2aW91c1NsaWRlKTtcblx0XHRfYWRkQ2xhc3ModGhpcy5fYXR0cmlidXRlcy5jdXJyZW50U2xpZGUsIHRoaXMuc2V0dGluZ3MuY2xhc3Nlcy5jdXJyZW50U2xpZGUpO1xuXHRcdF9hZGRDbGFzcyh0aGlzLl9hdHRyaWJ1dGVzLm5leHRTbGlkZSwgdGhpcy5zZXR0aW5ncy5jbGFzc2VzLm5leHRTbGlkZSk7XG5cblx0XHQvLyBBUklBXG5cdFx0dGhpcy5fYXR0cmlidXRlcy5jdXJyZW50U2xpZGUuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG5cdFx0Ly8gTG9hZCBmaXJzdCBpbWFnZVxuXHRcdF9sb2FkSW1nKHRoaXMuX2F0dHJpYnV0ZXMuY3VycmVudFNsaWRlLCAoZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLnNldHRpbmdzLm9uSW5pdC5hcHBseSh0aGlzKTtcblx0XHRcdF9zZXRDb250YWluZXJIZWlnaHQodGhpcywgZmFsc2UpO1xuXHRcdH0pLmJpbmQodGhpcykpO1xuXHRcdC8vIFByZWxvYWQgbmV4dCBpbWFnZXNcblx0XHRfbG9hZEltZyh0aGlzLl9hdHRyaWJ1dGVzLnByZXZpb3VzU2xpZGUpO1xuXHRcdF9sb2FkSW1nKHRoaXMuX2F0dHJpYnV0ZXMubmV4dFNsaWRlKTtcblx0fTtcblxuXHRTbGlkZXIucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKGF0dHJpYnV0ZSkge1xuXHRcdGlmICghdGhpcy5fYXR0cmlidXRlcykgcmV0dXJuIG51bGw7XG5cdFx0aWYgKHRoaXMuX2F0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoYXR0cmlidXRlKSkge1xuXHRcdFx0cmV0dXJuIHRoaXMuX2F0dHJpYnV0ZXNbYXR0cmlidXRlXTtcblx0XHR9XG5cdH07XG5cblx0U2xpZGVyLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbihhdHRyaWJ1dGUsIHZhbHVlKSB7XG5cdFx0aWYgKCF0aGlzLl9hdHRyaWJ1dGVzKSByZXR1cm4gbnVsbDtcblx0XHRyZXR1cm4gKHRoaXMuX2F0dHJpYnV0ZXNbYXR0cmlidXRlXSA9IHZhbHVlKTtcblx0fTtcblxuXHRTbGlkZXIucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24oKSB7XG5cdFx0aWYgKCF0aGlzLl9hdHRyaWJ1dGVzKSByZXR1cm47XG5cdFx0dGhpcy5fYXR0cmlidXRlcy50aW1lcklkID0gc2V0SW50ZXJ2YWwodGhpcy5uZXh0U2xpZGUuYmluZCh0aGlzKSwgdGhpcy5zZXR0aW5ncy5pbnRlcnZhbCk7XG5cdFx0dGhpcy5zZXR0aW5ncy5vblN0YXJ0LmFwcGx5KHRoaXMpO1xuXG5cdFx0Ly8gU3RvcCBpZiB3aW5kb3cgYmx1clxuXHRcdHdpbmRvdy5vbmJsdXIgPSBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuc3RvcCgpO1xuXHRcdH0uYmluZCh0aGlzKTtcblx0fTtcblxuXHRTbGlkZXIucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbigpIHtcblx0XHRpZiAoIXRoaXMuX2F0dHJpYnV0ZXMpIHJldHVybjtcblx0XHRjbGVhckludGVydmFsKHRoaXMuX2F0dHJpYnV0ZXMudGltZXJJZCk7XG5cdFx0dGhpcy5fYXR0cmlidXRlcy50aW1lcklkID0gMDtcblx0XHR0aGlzLnNldHRpbmdzLm9uU3RvcC5hcHBseSh0aGlzKTtcblx0fTtcblxuXHRTbGlkZXIucHJvdG90eXBlLnByZXZpb3VzU2xpZGUgPSBmdW5jdGlvbigpIHtcblx0XHR0aGlzLnNldHRpbmdzLmJlZm9yZUNoYW5nZS5hcHBseSh0aGlzKTtcblx0XHRfcmVtb3ZlQ2xhc3ModGhpcy5fYXR0cmlidXRlcy5wcmV2aW91c1NsaWRlLCB0aGlzLnNldHRpbmdzLmNsYXNzZXMucHJldmlvdXNTbGlkZSk7XG5cdFx0X3JlbW92ZUNsYXNzKHRoaXMuX2F0dHJpYnV0ZXMuY3VycmVudFNsaWRlLCB0aGlzLnNldHRpbmdzLmNsYXNzZXMuY3VycmVudFNsaWRlKTtcblx0XHRfcmVtb3ZlQ2xhc3ModGhpcy5fYXR0cmlidXRlcy5uZXh0U2xpZGUsIHRoaXMuc2V0dGluZ3MuY2xhc3Nlcy5uZXh0U2xpZGUpO1xuXHRcdHRoaXMuX2F0dHJpYnV0ZXMuY3VycmVudFNsaWRlLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXG5cdFx0dmFyIHNsaWRlcyA9IHRoaXMuX2F0dHJpYnV0ZXMuc2xpZGVzLFxuXHRcdFx0aW5kZXggPSBzbGlkZXMuaW5kZXhPZih0aGlzLl9hdHRyaWJ1dGVzLmN1cnJlbnRTbGlkZSk7XG5cdFx0dGhpcy5fYXR0cmlidXRlcy5uZXh0U2xpZGUgPSB0aGlzLl9hdHRyaWJ1dGVzLmN1cnJlbnRTbGlkZTtcblx0XHR0aGlzLl9hdHRyaWJ1dGVzLnByZXZpb3VzU2xpZGUgPSBzbGlkZXNbaW5kZXggLSAyXTtcblx0XHR0aGlzLl9hdHRyaWJ1dGVzLmN1cnJlbnRTbGlkZSA9IHNsaWRlc1tpbmRleCAtIDFdO1xuXHRcdGlmICh0eXBlb2YgdGhpcy5fYXR0cmlidXRlcy5jdXJyZW50U2xpZGUgPT09ICd1bmRlZmluZWQnICYmXG5cdFx0XHR0eXBlb2YgdGhpcy5fYXR0cmlidXRlcy5wcmV2aW91c1NsaWRlID09PSAndW5kZWZpbmVkJykge1xuXHRcdFx0dGhpcy5fYXR0cmlidXRlcy5jdXJyZW50U2xpZGUgPSBzbGlkZXNbc2xpZGVzLmxlbmd0aCAtIDFdO1xuXHRcdFx0dGhpcy5fYXR0cmlidXRlcy5wcmV2aW91c1NsaWRlID0gc2xpZGVzW3NsaWRlcy5sZW5ndGggLSAyXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKHR5cGVvZiB0aGlzLl9hdHRyaWJ1dGVzLnByZXZpb3VzU2xpZGUgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdHRoaXMuX2F0dHJpYnV0ZXMucHJldmlvdXNTbGlkZSA9IHNsaWRlc1tzbGlkZXMubGVuZ3RoIC0gMV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gUHJlbG9hZCBuZXh0IGltYWdlXG5cdFx0X2xvYWRJbWcodGhpcy5fYXR0cmlidXRlcy5wcmV2aW91c1NsaWRlKTtcblxuXHRcdF9hZGRDbGFzcyh0aGlzLl9hdHRyaWJ1dGVzLnByZXZpb3VzU2xpZGUsIHRoaXMuc2V0dGluZ3MuY2xhc3Nlcy5wcmV2aW91c1NsaWRlKTtcblx0XHRfYWRkQ2xhc3ModGhpcy5fYXR0cmlidXRlcy5jdXJyZW50U2xpZGUsIHRoaXMuc2V0dGluZ3MuY2xhc3Nlcy5jdXJyZW50U2xpZGUpO1xuXHRcdF9hZGRDbGFzcyh0aGlzLl9hdHRyaWJ1dGVzLm5leHRTbGlkZSwgdGhpcy5zZXR0aW5ncy5jbGFzc2VzLm5leHRTbGlkZSk7XG5cdFx0dGhpcy5fYXR0cmlidXRlcy5jdXJyZW50U2xpZGUuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG5cdFx0X2FkZENsYXNzKHRoaXMuX2F0dHJpYnV0ZXMuY29udGFpbmVyLCB0aGlzLnNldHRpbmdzLmNsYXNzZXMuZGlyZWN0aW9uUHJldmlvdXMpO1xuXHRcdF9yZXF1ZXN0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdF9yZW1vdmVDbGFzcyh0aGlzLl9hdHRyaWJ1dGVzLmNvbnRhaW5lciwgdGhpcy5zZXR0aW5ncy5jbGFzc2VzLmRpcmVjdGlvblByZXZpb3VzKTtcblx0XHR9LmJpbmQodGhpcyksIHRoaXMuc2V0dGluZ3MudHJhbnNpdGlvbkR1cmF0aW9uKTtcblxuXHRcdGlmICh0aGlzLnNldHRpbmdzLnRyYW5zaXRpb25EdXJhdGlvbikge1xuXHRcdFx0X2FkZENsYXNzKHRoaXMuX2F0dHJpYnV0ZXMuY29udGFpbmVyLCB0aGlzLnNldHRpbmdzLmNsYXNzZXMuYW5pbWF0aW5nKTtcblx0XHRcdF9yZXF1ZXN0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0X3JlbW92ZUNsYXNzKHRoaXMuX2F0dHJpYnV0ZXMuY29udGFpbmVyLCB0aGlzLnNldHRpbmdzLmNsYXNzZXMuYW5pbWF0aW5nKTtcblx0XHRcdH0uYmluZCh0aGlzKSwgdGhpcy5zZXR0aW5ncy50cmFuc2l0aW9uRHVyYXRpb24pO1xuXHRcdH1cblxuXHRcdF9zZXRDb250YWluZXJIZWlnaHQodGhpcyk7XG5cdFx0dGhpcy5zZXR0aW5ncy5hZnRlckNoYW5nZS5hcHBseSh0aGlzKTtcblx0fTtcblxuXHRTbGlkZXIucHJvdG90eXBlLm5leHRTbGlkZSA9IGZ1bmN0aW9uKCkge1xuXHRcdHRoaXMuc2V0dGluZ3MuYmVmb3JlQ2hhbmdlLmFwcGx5KHRoaXMpO1xuXHRcdF9yZW1vdmVDbGFzcyh0aGlzLl9hdHRyaWJ1dGVzLnByZXZpb3VzU2xpZGUsIHRoaXMuc2V0dGluZ3MuY2xhc3Nlcy5wcmV2aW91c1NsaWRlKTtcblx0XHRfcmVtb3ZlQ2xhc3ModGhpcy5fYXR0cmlidXRlcy5jdXJyZW50U2xpZGUsIHRoaXMuc2V0dGluZ3MuY2xhc3Nlcy5jdXJyZW50U2xpZGUpO1xuXHRcdF9yZW1vdmVDbGFzcyh0aGlzLl9hdHRyaWJ1dGVzLm5leHRTbGlkZSwgdGhpcy5zZXR0aW5ncy5jbGFzc2VzLm5leHRTbGlkZSk7XG5cdFx0dGhpcy5fYXR0cmlidXRlcy5jdXJyZW50U2xpZGUuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cblx0XHR2YXIgc2xpZGVzID0gdGhpcy5fYXR0cmlidXRlcy5zbGlkZXMsXG5cdFx0XHRpbmRleCA9IHNsaWRlcy5pbmRleE9mKHRoaXMuX2F0dHJpYnV0ZXMuY3VycmVudFNsaWRlKTtcblx0XHR0aGlzLl9hdHRyaWJ1dGVzLnByZXZpb3VzU2xpZGUgPSB0aGlzLl9hdHRyaWJ1dGVzLmN1cnJlbnRTbGlkZTtcblx0XHR0aGlzLl9hdHRyaWJ1dGVzLmN1cnJlbnRTbGlkZSA9IHNsaWRlc1tpbmRleCArIDFdO1xuXHRcdHRoaXMuX2F0dHJpYnV0ZXMubmV4dFNsaWRlID0gc2xpZGVzW2luZGV4ICsgMl07XG5cdFx0aWYgKHR5cGVvZiB0aGlzLl9hdHRyaWJ1dGVzLmN1cnJlbnRTbGlkZSA9PT0gJ3VuZGVmaW5lZCcgJiZcblx0XHRcdHR5cGVvZiB0aGlzLl9hdHRyaWJ1dGVzLm5leHRTbGlkZSA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHRoaXMuX2F0dHJpYnV0ZXMuY3VycmVudFNsaWRlID0gc2xpZGVzWzBdO1xuXHRcdFx0dGhpcy5fYXR0cmlidXRlcy5uZXh0U2xpZGUgPSBzbGlkZXNbMV07XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICh0eXBlb2YgdGhpcy5fYXR0cmlidXRlcy5uZXh0U2xpZGUgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdHRoaXMuX2F0dHJpYnV0ZXMubmV4dFNsaWRlID0gc2xpZGVzWzBdO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFByZWxvYWQgbmV4dCBpbWFnZVxuXHRcdF9sb2FkSW1nKHRoaXMuX2F0dHJpYnV0ZXMubmV4dFNsaWRlKTtcblxuXHRcdF9hZGRDbGFzcyh0aGlzLl9hdHRyaWJ1dGVzLnByZXZpb3VzU2xpZGUsIHRoaXMuc2V0dGluZ3MuY2xhc3Nlcy5wcmV2aW91c1NsaWRlKTtcblx0XHRfYWRkQ2xhc3ModGhpcy5fYXR0cmlidXRlcy5jdXJyZW50U2xpZGUsIHRoaXMuc2V0dGluZ3MuY2xhc3Nlcy5jdXJyZW50U2xpZGUpO1xuXHRcdF9hZGRDbGFzcyh0aGlzLl9hdHRyaWJ1dGVzLm5leHRTbGlkZSwgdGhpcy5zZXR0aW5ncy5jbGFzc2VzLm5leHRTbGlkZSk7XG5cdFx0dGhpcy5fYXR0cmlidXRlcy5jdXJyZW50U2xpZGUuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG5cdFx0X2FkZENsYXNzKHRoaXMuX2F0dHJpYnV0ZXMuY29udGFpbmVyLCB0aGlzLnNldHRpbmdzLmNsYXNzZXMuZGlyZWN0aW9uTmV4dCk7XG5cdFx0X3JlcXVlc3RUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0X3JlbW92ZUNsYXNzKHRoaXMuX2F0dHJpYnV0ZXMuY29udGFpbmVyLCB0aGlzLnNldHRpbmdzLmNsYXNzZXMuZGlyZWN0aW9uTmV4dCk7XG5cdFx0fS5iaW5kKHRoaXMpLCB0aGlzLnNldHRpbmdzLnRyYW5zaXRpb25EdXJhdGlvbik7XG5cblx0XHRpZiAodGhpcy5zZXR0aW5ncy50cmFuc2l0aW9uRHVyYXRpb24pIHtcblx0XHRcdF9hZGRDbGFzcyh0aGlzLl9hdHRyaWJ1dGVzLmNvbnRhaW5lciwgdGhpcy5zZXR0aW5ncy5jbGFzc2VzLmFuaW1hdGluZyk7XG5cdFx0XHRfcmVxdWVzdFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdF9yZW1vdmVDbGFzcyh0aGlzLl9hdHRyaWJ1dGVzLmNvbnRhaW5lciwgdGhpcy5zZXR0aW5ncy5jbGFzc2VzLmFuaW1hdGluZyk7XG5cdFx0XHR9LmJpbmQodGhpcyksIHRoaXMuc2V0dGluZ3MudHJhbnNpdGlvbkR1cmF0aW9uKTtcblx0XHR9XG5cblx0XHRfc2V0Q29udGFpbmVySGVpZ2h0KHRoaXMpO1xuXHRcdHRoaXMuc2V0dGluZ3MuYWZ0ZXJDaGFuZ2UuYXBwbHkodGhpcyk7XG5cdH07XG5cblx0U2xpZGVyLnByb3RvdHlwZS5nb3RvU2xpZGUgPSBmdW5jdGlvbihpbmRleCkge1xuXHRcdHRoaXMuc2V0dGluZ3MuYmVmb3JlQ2hhbmdlLmFwcGx5KHRoaXMpO1xuXHRcdHRoaXMuc3RvcCgpO1xuXG5cdFx0X3JlbW92ZUNsYXNzKHRoaXMuX2F0dHJpYnV0ZXMucHJldmlvdXNTbGlkZSwgdGhpcy5zZXR0aW5ncy5jbGFzc2VzLnByZXZpb3VzU2xpZGUpO1xuXHRcdF9yZW1vdmVDbGFzcyh0aGlzLl9hdHRyaWJ1dGVzLmN1cnJlbnRTbGlkZSwgdGhpcy5zZXR0aW5ncy5jbGFzc2VzLmN1cnJlbnRTbGlkZSk7XG5cdFx0X3JlbW92ZUNsYXNzKHRoaXMuX2F0dHJpYnV0ZXMubmV4dFNsaWRlLCB0aGlzLnNldHRpbmdzLmNsYXNzZXMubmV4dFNsaWRlKTtcblx0XHR0aGlzLl9hdHRyaWJ1dGVzLmN1cnJlbnRTbGlkZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcblxuXHRcdGluZGV4LS07IC8vIEluZGV4IHNob3VsZCBiZSAxLWluZGV4ZWRcblx0XHR2YXIgc2xpZGVzID0gdGhpcy5fYXR0cmlidXRlcy5zbGlkZXMsXG5cdFx0XHRvbGRJbmRleCA9IHNsaWRlcy5pbmRleE9mKHRoaXMuX2F0dHJpYnV0ZXMuY3VycmVudFNsaWRlKTtcblx0XHR0aGlzLl9hdHRyaWJ1dGVzLnByZXZpb3VzU2xpZGUgPSBzbGlkZXNbaW5kZXggLSAxXTtcblx0XHR0aGlzLl9hdHRyaWJ1dGVzLmN1cnJlbnRTbGlkZSA9IHNsaWRlc1tpbmRleF07XG5cdFx0dGhpcy5fYXR0cmlidXRlcy5uZXh0U2xpZGUgPSBzbGlkZXNbaW5kZXggKyAxXTtcblx0XHRpZiAodHlwZW9mIHRoaXMuX2F0dHJpYnV0ZXMucHJldmlvdXNTbGlkZSA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHRoaXMuX2F0dHJpYnV0ZXMucHJldmlvdXNTbGlkZSA9IHNsaWRlc1tzbGlkZXMubGVuZ3RoIC0gMV07XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YgdGhpcy5fYXR0cmlidXRlcy5uZXh0U2xpZGUgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHR0aGlzLl9hdHRyaWJ1dGVzLm5leHRTbGlkZSA9IHNsaWRlc1swXTtcblx0XHR9XG5cblx0XHQvLyBMb2FkIGltYWdlc1xuXHRcdF9sb2FkSW1nKHRoaXMuX2F0dHJpYnV0ZXMucHJldmlvdXNTbGlkZSk7XG5cdFx0X2xvYWRJbWcodGhpcy5fYXR0cmlidXRlcy5jdXJyZW50U2xpZGUpO1xuXHRcdF9sb2FkSW1nKHRoaXMuX2F0dHJpYnV0ZXMubmV4dFNsaWRlKTtcblxuXHRcdF9hZGRDbGFzcyh0aGlzLl9hdHRyaWJ1dGVzLnByZXZpb3VzU2xpZGUsIHRoaXMuc2V0dGluZ3MuY2xhc3Nlcy5wcmV2aW91c1NsaWRlKTtcblx0XHRfYWRkQ2xhc3ModGhpcy5fYXR0cmlidXRlcy5jdXJyZW50U2xpZGUsIHRoaXMuc2V0dGluZ3MuY2xhc3Nlcy5jdXJyZW50U2xpZGUpO1xuXHRcdF9hZGRDbGFzcyh0aGlzLl9hdHRyaWJ1dGVzLm5leHRTbGlkZSwgdGhpcy5zZXR0aW5ncy5jbGFzc2VzLm5leHRTbGlkZSk7XG5cdFx0dGhpcy5fYXR0cmlidXRlcy5jdXJyZW50U2xpZGUuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG5cdFx0aWYgKGluZGV4IDwgb2xkSW5kZXgpIHtcblx0XHRcdF9hZGRDbGFzcyh0aGlzLl9hdHRyaWJ1dGVzLmNvbnRhaW5lciwgdGhpcy5zZXR0aW5ncy5jbGFzc2VzLmRpcmVjdGlvblByZXZpb3VzKTtcblx0XHRcdF9yZXF1ZXN0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0X3JlbW92ZUNsYXNzKHRoaXMuX2F0dHJpYnV0ZXMuY29udGFpbmVyLCB0aGlzLnNldHRpbmdzLmNsYXNzZXMuZGlyZWN0aW9uUHJldmlvdXMpO1xuXHRcdFx0fS5iaW5kKHRoaXMpLCB0aGlzLnNldHRpbmdzLnRyYW5zaXRpb25EdXJhdGlvbik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdF9hZGRDbGFzcyh0aGlzLl9hdHRyaWJ1dGVzLmNvbnRhaW5lciwgdGhpcy5zZXR0aW5ncy5jbGFzc2VzLmRpcmVjdGlvbk5leHQpO1xuXHRcdFx0X3JlcXVlc3RUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRfcmVtb3ZlQ2xhc3ModGhpcy5fYXR0cmlidXRlcy5jb250YWluZXIsIHRoaXMuc2V0dGluZ3MuY2xhc3Nlcy5kaXJlY3Rpb25OZXh0KTtcblx0XHRcdH0uYmluZCh0aGlzKSwgdGhpcy5zZXR0aW5ncy50cmFuc2l0aW9uRHVyYXRpb24pO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLnNldHRpbmdzLnRyYW5zaXRpb25EdXJhdGlvbikge1xuXHRcdFx0X2FkZENsYXNzKHRoaXMuX2F0dHJpYnV0ZXMuY29udGFpbmVyLCB0aGlzLnNldHRpbmdzLmNsYXNzZXMuYW5pbWF0aW5nKTtcblx0XHRcdF9yZXF1ZXN0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0X3JlbW92ZUNsYXNzKHRoaXMuX2F0dHJpYnV0ZXMuY29udGFpbmVyLCB0aGlzLnNldHRpbmdzLmNsYXNzZXMuYW5pbWF0aW5nKTtcblx0XHRcdH0uYmluZCh0aGlzKSwgdGhpcy5zZXR0aW5ncy50cmFuc2l0aW9uRHVyYXRpb24pO1xuXHRcdH1cblxuXHRcdF9zZXRDb250YWluZXJIZWlnaHQodGhpcyk7XG5cdFx0dGhpcy5zZXR0aW5ncy5hZnRlckNoYW5nZS5hcHBseSh0aGlzKTtcblx0fTtcblxuXHRTbGlkZXIucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcblx0XHRjbGVhckludGVydmFsKHRoaXMuX2F0dHJpYnV0ZXMudGltZXJJZCk7XG5cdFx0dGhpcy5fYXR0cmlidXRlcy50aW1lcklkID0gMDtcblxuXHRcdHRoaXMuX2F0dHJpYnV0ZXMuY29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuXHRcdEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwodGhpcy5fYXR0cmlidXRlcy5vcmlnQ2hpbGRyZW4sIGZ1bmN0aW9uKGNoaWxkLCBpKSB7XG5cdFx0XHR0aGlzLl9hdHRyaWJ1dGVzLmNvbnRhaW5lci5hcHBlbmRDaGlsZChjaGlsZCk7XG5cdFx0fS5iaW5kKHRoaXMpKTtcblxuXHRcdF9yZW1vdmVDbGFzcyh0aGlzLl9hdHRyaWJ1dGVzLmNvbnRhaW5lciwgdGhpcy5zZXR0aW5ncy5jbGFzc2VzLmNvbnRhaW5lcik7XG5cdFx0X3JlbW92ZUNsYXNzKHRoaXMuX2F0dHJpYnV0ZXMuY29udGFpbmVyLCAnaWlzLWVmZmVjdC0nICsgdGhpcy5zZXR0aW5ncy5lZmZlY3QpO1xuXHRcdHRoaXMuX2F0dHJpYnV0ZXMuY29udGFpbmVyLnN0eWxlLmhlaWdodCA9ICcnO1xuXG5cdFx0dGhpcy5zZXR0aW5ncy5vbkRlc3Ryb3kuYXBwbHkodGhpcyk7XG5cdH07XG5cblx0cmV0dXJuIHtcblx0XHRfaGFzQ2xhc3M6IF9oYXNDbGFzcyxcblx0XHRfYWRkQ2xhc3M6IF9hZGRDbGFzcyxcblx0XHRfcmVtb3ZlQ2xhc3M6IF9yZW1vdmVDbGFzcyxcblx0XHRTbGlkZXI6IFNsaWRlclxuXHR9O1xuXG59KSgpO1xuIl19
