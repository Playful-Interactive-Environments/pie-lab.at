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

var menu = require('./components/menu');

menu.init();

},{"./components/menu":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDOi9Vc2Vycy9Xb2xmZ2FuZy9Eb2N1bWVudHMvR2l0SHViL3BpZS5maC1oYWdlbmJlcmcuYXQvX2pzL2NvbXBvbmVudHMvbWVudS5qcyIsIkM6L1VzZXJzL1dvbGZnYW5nL0RvY3VtZW50cy9HaXRIdWIvcGllLmZoLWhhZ2VuYmVyZy5hdC9fanMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLFNBQVMsSUFBSSxHQUFHO0FBQ2hDLE1BQUksT0FBTyxZQUFBLENBQUM7O0FBRVosTUFBTSxlQUFlLEdBQUcsU0FBbEIsZUFBZSxHQUFTO0FBQzVCLFdBQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0dBQ3RDLENBQUM7O0FBRUYsTUFBTSxRQUFRLEdBQUcsU0FBWCxRQUFRLEdBQVM7QUFDckIsUUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQ25FLFdBQU8sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzlDLGdCQUFZLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0dBQ3pELENBQUM7O0FBRUYsU0FBTztBQUNMLFFBQUksRUFBRSxRQUFRO0dBQ2YsQ0FBQztDQUNILENBQUEsRUFBRyxDQUFDOzs7OztBQ2hCTCxJQUFNLElBQUksR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQzs7QUFFMUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uIG1lbnUoKSB7XHJcbiAgbGV0IG5hdkxpc3Q7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1lbnVDbGljayA9ICgpID0+IHtcclxuICAgIG5hdkxpc3QuY2xhc3NMaXN0LnRvZ2dsZSgnbmF2X29wZW4nKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBpbml0TWVudSA9ICgpID0+IHtcclxuICAgIGNvbnN0IHRvZ2dsZWJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZW51X3RvZ2dsZV9idXR0b24nKTtcclxuICAgIG5hdkxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmF2X2xpc3QnKTtcclxuICAgIHRvZ2dsZWJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZU1lbnVDbGljayk7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGluaXQ6IGluaXRNZW51LFxyXG4gIH07XHJcbn0pKCk7XHJcbiIsImNvbnN0IG1lbnUgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvbWVudScpO1xyXG5cclxubWVudS5pbml0KCk7XHJcbiJdfQ==
