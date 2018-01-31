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
  const { target } = e;

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
    mainElement = document.querySelector('.gallery-main');
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
const youtube = id => `<iframe src="https://www.youtube.com/embed/${id}?autoplay=true" frameborder="0" allowfullscreen></iframe>`;
const vimeo = id => `<iframe src="https://player.vimeo.com/video/${id}?badge=0" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJfanNcXGNvbXBvbmVudHNcXGdhbGxlcnkuanMiLCJfanNcXGNvbXBvbmVudHNcXG1lbnUuanMiLCJfanNcXGNvbXBvbmVudHNcXHRlbXBsYXRlcy5qcyIsIl9qc1xcbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLE1BQU0sWUFBWSxRQUFRLGFBQVIsQ0FBbEI7O0FBRUEsSUFBSSxlQUFKO0FBQ0EsSUFBSSxXQUFKOztBQUVBLE1BQU0sWUFBYSxNQUFELElBQVk7QUFDNUIsUUFBTSxRQUFRLElBQUksS0FBSixFQUFkO0FBQ0EsY0FBWSxTQUFaLENBQXNCLE1BQXRCLENBQTZCLHFCQUE3QjtBQUNBLGNBQVksU0FBWixDQUFzQixHQUF0QixDQUEwQix1QkFBMUI7QUFDQSxRQUFNLE1BQU4sR0FBZSxNQUFNO0FBQ25CLFdBQU8sWUFBWSxVQUFuQixFQUErQjtBQUM3QixrQkFBWSxXQUFaLENBQXdCLFlBQVksVUFBcEM7QUFDRDtBQUNELGdCQUFZLFdBQVosQ0FBd0IsS0FBeEI7QUFDQSxnQkFBWSxTQUFaLENBQXNCLE1BQXRCLENBQTZCLHVCQUE3QjtBQUNELEdBTkQ7QUFPQSxRQUFNLEdBQU4sR0FBWSxPQUFPLFlBQVAsQ0FBb0IsYUFBcEIsQ0FBWjtBQUNBLFFBQU0sWUFBTixDQUFtQixLQUFuQixFQUEwQixPQUFPLFlBQVAsQ0FBb0IsV0FBcEIsQ0FBMUI7QUFDRCxDQWJEOztBQWVBLE1BQU0sWUFBWSxDQUFDLElBQUQsRUFBTyxNQUFQLEtBQWtCO0FBQ2xDLGNBQVksU0FBWixDQUFzQixHQUF0QixDQUEwQixxQkFBMUI7QUFDQSxRQUFNLEtBQUssT0FBTyxZQUFQLENBQW9CLGFBQXBCLENBQVg7QUFDQSxRQUFNLGFBQWEsVUFBVSxJQUFWLEVBQWdCLEVBQWhCLENBQW5CO0FBQ0EsU0FBTyxZQUFZLFVBQW5CLEVBQStCO0FBQzdCLGdCQUFZLFdBQVosQ0FBd0IsWUFBWSxVQUFwQztBQUNEO0FBQ0QsY0FBWSxTQUFaLEdBQXdCLFVBQXhCO0FBQ0QsQ0FSRDs7QUFVQSxNQUFNLHFCQUFzQixDQUFELElBQU87QUFDaEMsUUFBTSxFQUFFLE1BQUYsS0FBYSxDQUFuQjs7QUFFQSxVQUFRLE9BQU8sWUFBUCxDQUFvQixrQkFBcEIsQ0FBUjtBQUNFLFNBQUssS0FBTDtBQUNFLGdCQUFVLE1BQVY7QUFDQTtBQUNGLFNBQUssU0FBTDtBQUNFLGdCQUFVLFNBQVYsRUFBcUIsTUFBckI7QUFDQTtBQUNGLFNBQUssT0FBTDtBQUNFLGdCQUFVLE9BQVYsRUFBbUIsTUFBbkI7QUFDQTtBQUNGO0FBQ0U7QUFYSjtBQWFELENBaEJEOztBQWtCQSxNQUFNLGtCQUFrQixNQUFNO0FBQzVCLE9BQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxnQkFBZ0IsTUFBcEMsRUFBNEMsR0FBNUMsRUFBaUQ7QUFDL0Msb0JBQWdCLENBQWhCLEVBQW1CLGdCQUFuQixDQUFvQyxPQUFwQyxFQUE2QyxrQkFBN0M7QUFDRDtBQUNGLENBSkQ7O0FBTUEsTUFBTSxPQUFPLE1BQU07QUFDakIsTUFBSSxTQUFTLHNCQUFULENBQWdDLGNBQWhDLEVBQWdELE1BQWhELEdBQXlELENBQTdELEVBQWdFO0FBQzlELGtCQUFjLFNBQVMsYUFBVCxDQUF1QixlQUF2QixDQUFkO0FBQ0Esc0JBQWtCLFNBQVMsc0JBQVQsQ0FBZ0Msc0JBQWhDLENBQWxCO0FBQ0E7QUFDRDtBQUNGLENBTkQ7O0FBUUEsT0FBTyxPQUFQLEdBQWlCO0FBQ2Y7QUFEZSxDQUFqQjs7O0FDOURBLE9BQU8sT0FBUCxHQUFrQixTQUFTLElBQVQsR0FBZ0I7QUFDaEMsTUFBSSxPQUFKOztBQUVBLFFBQU0sa0JBQWtCLE1BQU07QUFDNUIsWUFBUSxTQUFSLENBQWtCLE1BQWxCLENBQXlCLFVBQXpCO0FBQ0QsR0FGRDs7QUFJQSxRQUFNLFdBQVcsTUFBTTtBQUNyQixVQUFNLGVBQWUsU0FBUyxjQUFULENBQXdCLG9CQUF4QixDQUFyQjtBQUNBLGNBQVUsU0FBUyxjQUFULENBQXdCLFVBQXhCLENBQVY7QUFDQSxpQkFBYSxnQkFBYixDQUE4QixPQUE5QixFQUF1QyxlQUF2QztBQUNELEdBSkQ7O0FBTUEsU0FBTztBQUNMLFVBQU07QUFERCxHQUFQO0FBR0QsQ0FoQmlCLEVBQWxCOzs7QUNBQSxNQUFNLFVBQVUsTUFBTyw4Q0FBNkMsRUFBRywyREFBdkU7QUFDQSxNQUFNLFFBQVEsTUFBTywrQ0FBOEMsRUFBRyw4RkFBdEU7O0FBRUEsT0FBTyxPQUFQLEdBQWlCO0FBQ2YsU0FEZTtBQUVmO0FBRmUsQ0FBakI7OztBQ0hBLE1BQU0sT0FBTyxRQUFRLG1CQUFSLENBQWI7QUFDQSxNQUFNLFVBQVUsUUFBUSxzQkFBUixDQUFoQjs7QUFFQSxLQUFLLElBQUw7QUFDQSxRQUFRLElBQVIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY29uc3QgdGVtcGxhdGVzID0gcmVxdWlyZSgnLi90ZW1wbGF0ZXMnKTtcblxubGV0IHByZXZpZXdFbGVtZW50cztcbmxldCBtYWluRWxlbWVudDtcblxuY29uc3QgbG9hZEltYWdlID0gKHRhcmdldCkgPT4ge1xuICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICBtYWluRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdnYWxsZXJ5LW1haW4tLXZpZGVvJyk7XG4gIG1haW5FbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2dhbGxlcnktbWFpbi0tbG9hZGluZycpO1xuICBpbWFnZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgd2hpbGUgKG1haW5FbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIG1haW5FbGVtZW50LnJlbW92ZUNoaWxkKG1haW5FbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBtYWluRWxlbWVudC5hcHBlbmRDaGlsZChpbWFnZSk7XG4gICAgbWFpbkVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZ2FsbGVyeS1tYWluLS1sb2FkaW5nJyk7XG4gIH07XG4gIGltYWdlLnNyYyA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0Jyk7XG4gIGltYWdlLnNldEF0dHJpYnV0ZSgnYWx0JywgdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1kZXNjJykpO1xufTtcblxuY29uc3QgbG9hZFZpZGVvID0gKHR5cGUsIHRhcmdldCkgPT4ge1xuICBtYWluRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdnYWxsZXJ5LW1haW4tLXZpZGVvJyk7XG4gIGNvbnN0IGlkID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQnKTtcbiAgY29uc3QgdmlkZW9mcmFtZSA9IHRlbXBsYXRlc1t0eXBlXShpZCk7XG4gIHdoaWxlIChtYWluRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgbWFpbkVsZW1lbnQucmVtb3ZlQ2hpbGQobWFpbkVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gIH1cbiAgbWFpbkVsZW1lbnQuaW5uZXJIVE1MID0gdmlkZW9mcmFtZTtcbn07XG5cbmNvbnN0IGhhbmRsZVByZXZpZXdDbGljayA9IChlKSA9PiB7XG4gIGNvbnN0IHsgdGFyZ2V0IH0gPSBlO1xuXG4gIHN3aXRjaCAodGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQtdHlwZScpKSB7XG4gICAgY2FzZSAnaW1nJzpcbiAgICAgIGxvYWRJbWFnZSh0YXJnZXQpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAneW91dHViZSc6XG4gICAgICBsb2FkVmlkZW8oJ3lvdXR1YmUnLCB0YXJnZXQpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAndmltZW8nOlxuICAgICAgbG9hZFZpZGVvKCd2aW1lbycsIHRhcmdldCk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgYnJlYWs7XG4gIH1cbn07XG5cbmNvbnN0IGF0dGFjaExpc3RlbmVycyA9ICgpID0+IHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcmV2aWV3RWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICBwcmV2aWV3RWxlbWVudHNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVQcmV2aWV3Q2xpY2spO1xuICB9XG59O1xuXG5jb25zdCBpbml0ID0gKCkgPT4ge1xuICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZ2FsbGVyeS1tYWluJykubGVuZ3RoID4gMCkge1xuICAgIG1haW5FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbGxlcnktbWFpbicpO1xuICAgIHByZXZpZXdFbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2dhbGxlcnktcHJldmlldy1pdGVtJyk7XG4gICAgYXR0YWNoTGlzdGVuZXJzKCk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpbml0LFxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uIG1lbnUoKSB7XG4gIGxldCBuYXZMaXN0O1xuXG4gIGNvbnN0IGhhbmRsZU1lbnVDbGljayA9ICgpID0+IHtcbiAgICBuYXZMaXN0LmNsYXNzTGlzdC50b2dnbGUoJ25hdl9vcGVuJyk7XG4gIH07XG5cbiAgY29uc3QgaW5pdE1lbnUgPSAoKSA9PiB7XG4gICAgY29uc3QgdG9nZ2xlYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lbnVfdG9nZ2xlX2J1dHRvbicpO1xuICAgIG5hdkxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmF2X2xpc3QnKTtcbiAgICB0b2dnbGVidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVNZW51Q2xpY2spO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgaW5pdDogaW5pdE1lbnUsXG4gIH07XG59KCkpO1xuIiwiY29uc3QgeW91dHViZSA9IGlkID0+IGA8aWZyYW1lIHNyYz1cImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2VtYmVkLyR7aWR9P2F1dG9wbGF5PXRydWVcIiBmcmFtZWJvcmRlcj1cIjBcIiBhbGxvd2Z1bGxzY3JlZW4+PC9pZnJhbWU+YDtcbmNvbnN0IHZpbWVvID0gaWQgPT4gYDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly9wbGF5ZXIudmltZW8uY29tL3ZpZGVvLyR7aWR9P2JhZGdlPTBcIiBmcmFtZWJvcmRlcj1cIjBcIiB3ZWJraXRhbGxvd2Z1bGxzY3JlZW4gbW96YWxsb3dmdWxsc2NyZWVuIGFsbG93ZnVsbHNjcmVlbj48L2lmcmFtZT5gO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgeW91dHViZSxcbiAgdmltZW8sXG59O1xuIiwiY29uc3QgbWVudSA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9tZW51Jyk7XG5jb25zdCBnYWxsZXJ5ID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL2dhbGxlcnknKTtcblxubWVudS5pbml0KCk7XG5nYWxsZXJ5LmluaXQoKTtcbiJdfQ==
