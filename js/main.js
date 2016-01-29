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
"use strict";

module.exports = (function slider() {
  var initSlider = function initSlider() {};

  return {
    init: initSlider
  };
})();

},{}],3:[function(require,module,exports){
'use strict';

var menu = require('./components/menu');
var slider = require('./components/slider');

menu.init();
slider.init();

},{"./components/menu":1,"./components/slider":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvdG9tL3Byb2plY3RzL3BpZWxhYi9zcmMvX2pzL2NvbXBvbmVudHMvbWVudS5qcyIsIi9Vc2Vycy90b20vcHJvamVjdHMvcGllbGFiL3NyYy9fanMvY29tcG9uZW50cy9zbGlkZXIuanMiLCIvVXNlcnMvdG9tL3Byb2plY3RzL3BpZWxhYi9zcmMvX2pzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxTQUFTLElBQUksR0FBRztBQUNoQyxNQUFJLE9BQU8sWUFBQSxDQUFDOztBQUVaLE1BQU0sZUFBZSxHQUFHLFNBQWxCLGVBQWUsR0FBUztBQUM1QixXQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztHQUN0QyxDQUFDOztBQUVGLE1BQU0sUUFBUSxHQUFHLFNBQVgsUUFBUSxHQUFTO0FBQ3JCLFFBQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUNuRSxXQUFPLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM5QyxnQkFBWSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxlQUFlLENBQUMsQ0FBQztHQUN6RCxDQUFDOztBQUVGLFNBQU87QUFDTCxRQUFJLEVBQUUsUUFBUTtHQUNmLENBQUM7Q0FDSCxDQUFBLEVBQUcsQ0FBQzs7Ozs7QUNoQkwsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLFNBQVMsTUFBTSxHQUFHO0FBQ2xDLE1BQU0sVUFBVSxHQUFHLFNBQWIsVUFBVSxHQUFTLEVBQ3hCLENBQUM7O0FBRUYsU0FBTztBQUNMLFFBQUksRUFBRSxVQUFVO0dBQ2pCLENBQUM7Q0FDSCxDQUFBLEVBQUcsQ0FBQzs7Ozs7QUNQTCxJQUFNLElBQUksR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUMxQyxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQzs7QUFFOUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ1osTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uIG1lbnUoKSB7XG4gIGxldCBuYXZMaXN0O1xuXG4gIGNvbnN0IGhhbmRsZU1lbnVDbGljayA9ICgpID0+IHtcbiAgICBuYXZMaXN0LmNsYXNzTGlzdC50b2dnbGUoJ25hdl9vcGVuJyk7XG4gIH07XG5cbiAgY29uc3QgaW5pdE1lbnUgPSAoKSA9PiB7XG4gICAgY29uc3QgdG9nZ2xlYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lbnVfdG9nZ2xlX2J1dHRvbicpO1xuICAgIG5hdkxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmF2X2xpc3QnKTtcbiAgICB0b2dnbGVidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVNZW51Q2xpY2spO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgaW5pdDogaW5pdE1lbnUsXG4gIH07XG59KSgpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gc2xpZGVyKCkge1xuICBjb25zdCBpbml0U2xpZGVyID0gKCkgPT4ge1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgaW5pdDogaW5pdFNsaWRlcixcbiAgfTtcbn0pKCk7XG4iLCJjb25zdCBtZW51ID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL21lbnUnKTtcbmNvbnN0IHNsaWRlciA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9zbGlkZXInKTtcblxubWVudS5pbml0KCk7XG5zbGlkZXIuaW5pdCgpO1xuIl19
