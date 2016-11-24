(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const templates = require('./templates');
let previewElements;
let mainElement;

const loadImage = target => {
  const image = new Image();
  mainElement.classList.remove('gallery-main--video');
  mainElement.classList.add('gallery-main--loading');
  image.onload = () => {
    while (mainElement.firstChild) {
      mainElement.removeChild(mainElement.firstChild);
    }
    mainElement.appendChild(image);
    mainElement.classList.remove('gallery-main--loading');
  };
  image.src = target.getAttribute('data-target');
  image.setAttribute('alt', target.getAttribute('data-desc'));
};

const loadVideo = (type, target) => {
  mainElement.classList.add('gallery-main--video');
  const id = target.getAttribute('data-target');
  const videoframe = templates[type](id);
  while (mainElement.firstChild) {
    mainElement.removeChild(mainElement.firstChild);
  }
  mainElement.innerHTML = videoframe;
};

const handlePreviewClick = e => {
  const target = e.target;

  switch (target.getAttribute('data-target-type')) {
    case 'img':
      loadImage(target);
      break;
    case 'youtube':
      loadVideo('youtube', target);
      break;
    case 'vimeo':
      loadVideo('vimeo', target);
      break;
    default:
      break;
  }
};

const attachListeners = () => {
  for (let i = 0; i < previewElements.length; i++) {
    previewElements[i].addEventListener('click', handlePreviewClick);
  }
};

const init = () => {
  if (document.getElementsByClassName('gallery-main').length > 0) {
    mainElement = document.getElementsByClassName('gallery-main')[0];
    previewElements = document.getElementsByClassName('gallery-preview-item');
    attachListeners();
  }
};

module.exports = {
  init
};

},{"./templates":3}],2:[function(require,module,exports){
module.exports = function menu() {
  let navList;

  const handleMenuClick = () => {
    navList.classList.toggle('nav_open');
  };

  const initMenu = () => {
    const togglebutton = document.getElementById('menu_toggle_button');
    navList = document.getElementById('nav_list');
    togglebutton.addEventListener('click', handleMenuClick);
  };

  return {
    init: initMenu
  };
}();

},{}],3:[function(require,module,exports){
const youtube = id => `<iframe src="https://www.youtube.com/embed/${ id }?autoplay=true" frameborder="0" allowfullscreen></iframe>`;
const vimeo = id => `<iframe src="https://player.vimeo.com/video/${ id }?badge=0" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`;

module.exports = {
  youtube,
  vimeo
};

},{}],4:[function(require,module,exports){
const menu = require('./components/menu');
const gallery = require('./components/gallery');

menu.init();
gallery.init();

},{"./components/gallery":1,"./components/menu":2}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJfanNcXGNvbXBvbmVudHNcXGdhbGxlcnkuanMiLCJfanNcXGNvbXBvbmVudHNcXG1lbnUuanMiLCJfanNcXGNvbXBvbmVudHNcXHRlbXBsYXRlcy5qcyIsIl9qc1xcbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLE1BQU0sWUFBWSxRQUFRLGFBQVIsQ0FBbEI7QUFDQSxJQUFJLGVBQUo7QUFDQSxJQUFJLFdBQUo7O0FBRUEsTUFBTSxZQUFhLE1BQUQsSUFBWTtBQUM1QixRQUFNLFFBQVEsSUFBSSxLQUFKLEVBQWQ7QUFDQSxjQUFZLFNBQVosQ0FBc0IsTUFBdEIsQ0FBNkIscUJBQTdCO0FBQ0EsY0FBWSxTQUFaLENBQXNCLEdBQXRCLENBQTBCLHVCQUExQjtBQUNBLFFBQU0sTUFBTixHQUFlLE1BQU07QUFDbkIsV0FBTyxZQUFZLFVBQW5CLEVBQStCO0FBQzdCLGtCQUFZLFdBQVosQ0FBd0IsWUFBWSxVQUFwQztBQUNEO0FBQ0QsZ0JBQVksV0FBWixDQUF3QixLQUF4QjtBQUNBLGdCQUFZLFNBQVosQ0FBc0IsTUFBdEIsQ0FBNkIsdUJBQTdCO0FBQ0QsR0FORDtBQU9BLFFBQU0sR0FBTixHQUFZLE9BQU8sWUFBUCxDQUFvQixhQUFwQixDQUFaO0FBQ0EsUUFBTSxZQUFOLENBQW1CLEtBQW5CLEVBQTBCLE9BQU8sWUFBUCxDQUFvQixXQUFwQixDQUExQjtBQUNELENBYkQ7O0FBZUEsTUFBTSxZQUFZLENBQUMsSUFBRCxFQUFPLE1BQVAsS0FBa0I7QUFDbEMsY0FBWSxTQUFaLENBQXNCLEdBQXRCLENBQTBCLHFCQUExQjtBQUNBLFFBQU0sS0FBSyxPQUFPLFlBQVAsQ0FBb0IsYUFBcEIsQ0FBWDtBQUNBLFFBQU0sYUFBYSxVQUFVLElBQVYsRUFBZ0IsRUFBaEIsQ0FBbkI7QUFDQSxTQUFPLFlBQVksVUFBbkIsRUFBK0I7QUFDN0IsZ0JBQVksV0FBWixDQUF3QixZQUFZLFVBQXBDO0FBQ0Q7QUFDRCxjQUFZLFNBQVosR0FBd0IsVUFBeEI7QUFDRCxDQVJEOztBQVVBLE1BQU0scUJBQXNCLENBQUQsSUFBTztBQUNoQyxRQUFNLFNBQVMsRUFBRSxNQUFqQjs7QUFFQSxVQUFRLE9BQU8sWUFBUCxDQUFvQixrQkFBcEIsQ0FBUjtBQUNFLFNBQUssS0FBTDtBQUNFLGdCQUFVLE1BQVY7QUFDQTtBQUNGLFNBQUssU0FBTDtBQUNFLGdCQUFVLFNBQVYsRUFBcUIsTUFBckI7QUFDQTtBQUNGLFNBQUssT0FBTDtBQUNFLGdCQUFVLE9BQVYsRUFBbUIsTUFBbkI7QUFDQTtBQUNGO0FBQ0U7QUFYSjtBQWFELENBaEJEOztBQWtCQSxNQUFNLGtCQUFrQixNQUFNO0FBQzVCLE9BQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxnQkFBZ0IsTUFBcEMsRUFBNEMsR0FBNUMsRUFBaUQ7QUFDL0Msb0JBQWdCLENBQWhCLEVBQW1CLGdCQUFuQixDQUFvQyxPQUFwQyxFQUE2QyxrQkFBN0M7QUFDRDtBQUNGLENBSkQ7O0FBTUEsTUFBTSxPQUFPLE1BQU07QUFDakIsTUFBSSxTQUFTLHNCQUFULENBQWdDLGNBQWhDLEVBQWdELE1BQWhELEdBQXlELENBQTdELEVBQWdFO0FBQzlELGtCQUFjLFNBQVMsc0JBQVQsQ0FBZ0MsY0FBaEMsRUFBZ0QsQ0FBaEQsQ0FBZDtBQUNBLHNCQUFrQixTQUFTLHNCQUFULENBQWdDLHNCQUFoQyxDQUFsQjtBQUNBO0FBQ0Q7QUFDRixDQU5EOztBQVFBLE9BQU8sT0FBUCxHQUFpQjtBQUNmO0FBRGUsQ0FBakI7OztBQzdEQSxPQUFPLE9BQVAsR0FBa0IsU0FBUyxJQUFULEdBQWdCO0FBQ2hDLE1BQUksT0FBSjs7QUFFQSxRQUFNLGtCQUFrQixNQUFNO0FBQzVCLFlBQVEsU0FBUixDQUFrQixNQUFsQixDQUF5QixVQUF6QjtBQUNELEdBRkQ7O0FBSUEsUUFBTSxXQUFXLE1BQU07QUFDckIsVUFBTSxlQUFlLFNBQVMsY0FBVCxDQUF3QixvQkFBeEIsQ0FBckI7QUFDQSxjQUFVLFNBQVMsY0FBVCxDQUF3QixVQUF4QixDQUFWO0FBQ0EsaUJBQWEsZ0JBQWIsQ0FBOEIsT0FBOUIsRUFBdUMsZUFBdkM7QUFDRCxHQUpEOztBQU1BLFNBQU87QUFDTCxVQUFNO0FBREQsR0FBUDtBQUdELENBaEJnQixFQUFqQjs7O0FDQUEsTUFBTSxVQUFXLEVBQUQsSUFBUywrQ0FBNkMsRUFBRyw0REFBekU7QUFDQSxNQUFNLFFBQVMsRUFBRCxJQUFTLGdEQUE4QyxFQUFHLCtGQUF4RTs7QUFFQSxPQUFPLE9BQVAsR0FBaUI7QUFDZixTQURlO0FBRWY7QUFGZSxDQUFqQjs7O0FDSEEsTUFBTSxPQUFPLFFBQVEsbUJBQVIsQ0FBYjtBQUNBLE1BQU0sVUFBVSxRQUFRLHNCQUFSLENBQWhCOztBQUVBLEtBQUssSUFBTDtBQUNBLFFBQVEsSUFBUiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjb25zdCB0ZW1wbGF0ZXMgPSByZXF1aXJlKCcuL3RlbXBsYXRlcycpO1xyXG5sZXQgcHJldmlld0VsZW1lbnRzO1xyXG5sZXQgbWFpbkVsZW1lbnQ7XHJcblxyXG5jb25zdCBsb2FkSW1hZ2UgPSAodGFyZ2V0KSA9PiB7XHJcbiAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICBtYWluRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdnYWxsZXJ5LW1haW4tLXZpZGVvJyk7XHJcbiAgbWFpbkVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZ2FsbGVyeS1tYWluLS1sb2FkaW5nJyk7XHJcbiAgaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xyXG4gICAgd2hpbGUgKG1haW5FbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuICAgICAgbWFpbkVsZW1lbnQucmVtb3ZlQ2hpbGQobWFpbkVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcbiAgICB9XHJcbiAgICBtYWluRWxlbWVudC5hcHBlbmRDaGlsZChpbWFnZSk7XHJcbiAgICBtYWluRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdnYWxsZXJ5LW1haW4tLWxvYWRpbmcnKTtcclxuICB9O1xyXG4gIGltYWdlLnNyYyA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0Jyk7XHJcbiAgaW1hZ2Uuc2V0QXR0cmlidXRlKCdhbHQnLCB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWRlc2MnKSk7XHJcbn07XHJcblxyXG5jb25zdCBsb2FkVmlkZW8gPSAodHlwZSwgdGFyZ2V0KSA9PiB7XHJcbiAgbWFpbkVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZ2FsbGVyeS1tYWluLS12aWRlbycpO1xyXG4gIGNvbnN0IGlkID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQnKTtcclxuICBjb25zdCB2aWRlb2ZyYW1lID0gdGVtcGxhdGVzW3R5cGVdKGlkKTtcclxuICB3aGlsZSAobWFpbkVsZW1lbnQuZmlyc3RDaGlsZCkge1xyXG4gICAgbWFpbkVsZW1lbnQucmVtb3ZlQ2hpbGQobWFpbkVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcbiAgfVxyXG4gIG1haW5FbGVtZW50LmlubmVySFRNTCA9IHZpZGVvZnJhbWU7XHJcbn07XHJcblxyXG5jb25zdCBoYW5kbGVQcmV2aWV3Q2xpY2sgPSAoZSkgPT4ge1xyXG4gIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xyXG5cclxuICBzd2l0Y2ggKHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0LXR5cGUnKSkge1xyXG4gICAgY2FzZSAnaW1nJzpcclxuICAgICAgbG9hZEltYWdlKHRhcmdldCk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAneW91dHViZSc6XHJcbiAgICAgIGxvYWRWaWRlbygneW91dHViZScsIHRhcmdldCk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAndmltZW8nOlxyXG4gICAgICBsb2FkVmlkZW8oJ3ZpbWVvJywgdGFyZ2V0KTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICBicmVhaztcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBhdHRhY2hMaXN0ZW5lcnMgPSAoKSA9PiB7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcmV2aWV3RWxlbWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgIHByZXZpZXdFbGVtZW50c1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZVByZXZpZXdDbGljayk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgaW5pdCA9ICgpID0+IHtcclxuICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZ2FsbGVyeS1tYWluJykubGVuZ3RoID4gMCkge1xyXG4gICAgbWFpbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdnYWxsZXJ5LW1haW4nKVswXTtcclxuICAgIHByZXZpZXdFbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2dhbGxlcnktcHJldmlldy1pdGVtJyk7XHJcbiAgICBhdHRhY2hMaXN0ZW5lcnMoKTtcclxuICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBpbml0LFxyXG59O1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiBtZW51KCkge1xyXG4gIGxldCBuYXZMaXN0O1xyXG5cclxuICBjb25zdCBoYW5kbGVNZW51Q2xpY2sgPSAoKSA9PiB7XHJcbiAgICBuYXZMaXN0LmNsYXNzTGlzdC50b2dnbGUoJ25hdl9vcGVuJyk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaW5pdE1lbnUgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB0b2dnbGVidXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVudV90b2dnbGVfYnV0dG9uJyk7XHJcbiAgICBuYXZMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hdl9saXN0Jyk7XHJcbiAgICB0b2dnbGVidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVNZW51Q2xpY2spO1xyXG4gIH07XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBpbml0OiBpbml0TWVudSxcclxuICB9O1xyXG59KSgpO1xyXG4iLCJjb25zdCB5b3V0dWJlID0gKGlkKSA9PiBgPGlmcmFtZSBzcmM9XCJodHRwczovL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8ke2lkfT9hdXRvcGxheT10cnVlXCIgZnJhbWVib3JkZXI9XCIwXCIgYWxsb3dmdWxsc2NyZWVuPjwvaWZyYW1lPmA7XHJcbmNvbnN0IHZpbWVvID0gKGlkKSA9PiBgPGlmcmFtZSBzcmM9XCJodHRwczovL3BsYXllci52aW1lby5jb20vdmlkZW8vJHtpZH0/YmFkZ2U9MFwiIGZyYW1lYm9yZGVyPVwiMFwiIHdlYmtpdGFsbG93ZnVsbHNjcmVlbiBtb3phbGxvd2Z1bGxzY3JlZW4gYWxsb3dmdWxsc2NyZWVuPjwvaWZyYW1lPmA7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICB5b3V0dWJlLFxyXG4gIHZpbWVvLFxyXG59O1xyXG4iLCJjb25zdCBtZW51ID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL21lbnUnKTtcclxuY29uc3QgZ2FsbGVyeSA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9nYWxsZXJ5Jyk7XHJcblxyXG5tZW51LmluaXQoKTtcclxuZ2FsbGVyeS5pbml0KCk7XHJcbiJdfQ==
