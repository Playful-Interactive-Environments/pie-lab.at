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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJfanNcXGNvbXBvbmVudHNcXGdhbGxlcnkuanMiLCJfanNcXGNvbXBvbmVudHNcXG1lbnUuanMiLCJfanNcXGNvbXBvbmVudHNcXHRlbXBsYXRlcy5qcyIsIl9qc1xcbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLE1BQU0sWUFBWSxRQUFRLGFBQVIsQ0FBbEI7O0FBRUEsSUFBSSxlQUFKO0FBQ0EsSUFBSSxXQUFKOztBQUVBLE1BQU0sWUFBYSxNQUFELElBQVk7QUFDNUIsUUFBTSxRQUFRLElBQUksS0FBSixFQUFkO0FBQ0EsY0FBWSxTQUFaLENBQXNCLE1BQXRCLENBQTZCLHFCQUE3QjtBQUNBLGNBQVksU0FBWixDQUFzQixHQUF0QixDQUEwQix1QkFBMUI7QUFDQSxRQUFNLE1BQU4sR0FBZSxNQUFNO0FBQ25CLFdBQU8sWUFBWSxVQUFuQixFQUErQjtBQUM3QixrQkFBWSxXQUFaLENBQXdCLFlBQVksVUFBcEM7QUFDRDtBQUNELGdCQUFZLFdBQVosQ0FBd0IsS0FBeEI7QUFDQSxnQkFBWSxTQUFaLENBQXNCLE1BQXRCLENBQTZCLHVCQUE3QjtBQUNELEdBTkQ7QUFPQSxRQUFNLEdBQU4sR0FBWSxPQUFPLFlBQVAsQ0FBb0IsYUFBcEIsQ0FBWjtBQUNBLFFBQU0sWUFBTixDQUFtQixLQUFuQixFQUEwQixPQUFPLFlBQVAsQ0FBb0IsV0FBcEIsQ0FBMUI7QUFDRCxDQWJEOztBQWVBLE1BQU0sWUFBWSxDQUFDLElBQUQsRUFBTyxNQUFQLEtBQWtCO0FBQ2xDLGNBQVksU0FBWixDQUFzQixHQUF0QixDQUEwQixxQkFBMUI7QUFDQSxRQUFNLEtBQUssT0FBTyxZQUFQLENBQW9CLGFBQXBCLENBQVg7QUFDQSxRQUFNLGFBQWEsVUFBVSxJQUFWLEVBQWdCLEVBQWhCLENBQW5CO0FBQ0EsU0FBTyxZQUFZLFVBQW5CLEVBQStCO0FBQzdCLGdCQUFZLFdBQVosQ0FBd0IsWUFBWSxVQUFwQztBQUNEO0FBQ0QsY0FBWSxTQUFaLEdBQXdCLFVBQXhCO0FBQ0QsQ0FSRDs7QUFVQSxNQUFNLHFCQUFzQixDQUFELElBQU87QUFDaEMsUUFBTSxFQUFFLE1BQUYsS0FBYSxDQUFuQjs7QUFFQSxVQUFRLE9BQU8sWUFBUCxDQUFvQixrQkFBcEIsQ0FBUjtBQUNFLFNBQUssS0FBTDtBQUNFLGdCQUFVLE1BQVY7QUFDQTtBQUNGLFNBQUssU0FBTDtBQUNFLGdCQUFVLFNBQVYsRUFBcUIsTUFBckI7QUFDQTtBQUNGLFNBQUssT0FBTDtBQUNFLGdCQUFVLE9BQVYsRUFBbUIsTUFBbkI7QUFDQTtBQUNGO0FBQ0U7QUFYSjtBQWFELENBaEJEOztBQWtCQSxNQUFNLGtCQUFrQixNQUFNO0FBQzVCLE9BQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxnQkFBZ0IsTUFBcEMsRUFBNEMsR0FBNUMsRUFBaUQ7QUFDL0Msb0JBQWdCLENBQWhCLEVBQW1CLGdCQUFuQixDQUFvQyxPQUFwQyxFQUE2QyxrQkFBN0M7QUFDRDtBQUNGLENBSkQ7O0FBTUEsTUFBTSxPQUFPLE1BQU07QUFDakIsTUFBSSxTQUFTLHNCQUFULENBQWdDLGNBQWhDLEVBQWdELE1BQWhELEdBQXlELENBQTdELEVBQWdFO0FBQzlELGtCQUFjLFNBQVMsYUFBVCxDQUF1QixlQUF2QixDQUFkO0FBQ0Esc0JBQWtCLFNBQVMsc0JBQVQsQ0FBZ0Msc0JBQWhDLENBQWxCO0FBQ0E7QUFDRDtBQUNGLENBTkQ7O0FBUUEsT0FBTyxPQUFQLEdBQWlCO0FBQ2Y7QUFEZSxDQUFqQjs7O0FDOURBLE9BQU8sT0FBUCxHQUFrQixTQUFTLElBQVQsR0FBZ0I7QUFDaEMsTUFBSSxPQUFKOztBQUVBLFFBQU0sa0JBQWtCLE1BQU07QUFDNUIsWUFBUSxTQUFSLENBQWtCLE1BQWxCLENBQXlCLFVBQXpCO0FBQ0QsR0FGRDs7QUFJQSxRQUFNLFdBQVcsTUFBTTtBQUNyQixVQUFNLGVBQWUsU0FBUyxjQUFULENBQXdCLG9CQUF4QixDQUFyQjtBQUNBLGNBQVUsU0FBUyxjQUFULENBQXdCLFVBQXhCLENBQVY7QUFDQSxpQkFBYSxnQkFBYixDQUE4QixPQUE5QixFQUF1QyxlQUF2QztBQUNELEdBSkQ7O0FBTUEsU0FBTztBQUNMLFVBQU07QUFERCxHQUFQO0FBR0QsQ0FoQmlCLEVBQWxCOzs7QUNBQSxNQUFNLFVBQVUsTUFBTyw4Q0FBNkMsRUFBRywyREFBdkU7QUFDQSxNQUFNLFFBQVEsTUFBTywrQ0FBOEMsRUFBRyw4RkFBdEU7O0FBRUEsT0FBTyxPQUFQLEdBQWlCO0FBQ2YsU0FEZTtBQUVmO0FBRmUsQ0FBakI7OztBQ0hBLE1BQU0sT0FBTyxRQUFRLG1CQUFSLENBQWI7QUFDQSxNQUFNLFVBQVUsUUFBUSxzQkFBUixDQUFoQjs7QUFFQSxLQUFLLElBQUw7QUFDQSxRQUFRLElBQVIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY29uc3QgdGVtcGxhdGVzID0gcmVxdWlyZSgnLi90ZW1wbGF0ZXMnKTtcclxuXHJcbmxldCBwcmV2aWV3RWxlbWVudHM7XHJcbmxldCBtYWluRWxlbWVudDtcclxuXHJcbmNvbnN0IGxvYWRJbWFnZSA9ICh0YXJnZXQpID0+IHtcclxuICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gIG1haW5FbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2dhbGxlcnktbWFpbi0tdmlkZW8nKTtcclxuICBtYWluRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdnYWxsZXJ5LW1haW4tLWxvYWRpbmcnKTtcclxuICBpbWFnZS5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICB3aGlsZSAobWFpbkVsZW1lbnQuZmlyc3RDaGlsZCkge1xyXG4gICAgICBtYWluRWxlbWVudC5yZW1vdmVDaGlsZChtYWluRWxlbWVudC5maXJzdENoaWxkKTtcclxuICAgIH1cclxuICAgIG1haW5FbGVtZW50LmFwcGVuZENoaWxkKGltYWdlKTtcclxuICAgIG1haW5FbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2dhbGxlcnktbWFpbi0tbG9hZGluZycpO1xyXG4gIH07XHJcbiAgaW1hZ2Uuc3JjID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQnKTtcclxuICBpbWFnZS5zZXRBdHRyaWJ1dGUoJ2FsdCcsIHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZGVzYycpKTtcclxufTtcclxuXHJcbmNvbnN0IGxvYWRWaWRlbyA9ICh0eXBlLCB0YXJnZXQpID0+IHtcclxuICBtYWluRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdnYWxsZXJ5LW1haW4tLXZpZGVvJyk7XHJcbiAgY29uc3QgaWQgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldCcpO1xyXG4gIGNvbnN0IHZpZGVvZnJhbWUgPSB0ZW1wbGF0ZXNbdHlwZV0oaWQpO1xyXG4gIHdoaWxlIChtYWluRWxlbWVudC5maXJzdENoaWxkKSB7XHJcbiAgICBtYWluRWxlbWVudC5yZW1vdmVDaGlsZChtYWluRWxlbWVudC5maXJzdENoaWxkKTtcclxuICB9XHJcbiAgbWFpbkVsZW1lbnQuaW5uZXJIVE1MID0gdmlkZW9mcmFtZTtcclxufTtcclxuXHJcbmNvbnN0IGhhbmRsZVByZXZpZXdDbGljayA9IChlKSA9PiB7XHJcbiAgY29uc3QgeyB0YXJnZXQgfSA9IGU7XHJcblxyXG4gIHN3aXRjaCAodGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQtdHlwZScpKSB7XHJcbiAgICBjYXNlICdpbWcnOlxyXG4gICAgICBsb2FkSW1hZ2UodGFyZ2V0KTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICd5b3V0dWJlJzpcclxuICAgICAgbG9hZFZpZGVvKCd5b3V0dWJlJywgdGFyZ2V0KTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICd2aW1lbyc6XHJcbiAgICAgIGxvYWRWaWRlbygndmltZW8nLCB0YXJnZXQpO1xyXG4gICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIGJyZWFrO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGF0dGFjaExpc3RlbmVycyA9ICgpID0+IHtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHByZXZpZXdFbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgcHJldmlld0VsZW1lbnRzW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlUHJldmlld0NsaWNrKTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBpbml0ID0gKCkgPT4ge1xyXG4gIGlmIChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdnYWxsZXJ5LW1haW4nKS5sZW5ndGggPiAwKSB7XHJcbiAgICBtYWluRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LW1haW4nKTtcclxuICAgIHByZXZpZXdFbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2dhbGxlcnktcHJldmlldy1pdGVtJyk7XHJcbiAgICBhdHRhY2hMaXN0ZW5lcnMoKTtcclxuICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBpbml0LFxyXG59O1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiBtZW51KCkge1xyXG4gIGxldCBuYXZMaXN0O1xyXG5cclxuICBjb25zdCBoYW5kbGVNZW51Q2xpY2sgPSAoKSA9PiB7XHJcbiAgICBuYXZMaXN0LmNsYXNzTGlzdC50b2dnbGUoJ25hdl9vcGVuJyk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaW5pdE1lbnUgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB0b2dnbGVidXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVudV90b2dnbGVfYnV0dG9uJyk7XHJcbiAgICBuYXZMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hdl9saXN0Jyk7XHJcbiAgICB0b2dnbGVidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVNZW51Q2xpY2spO1xyXG4gIH07XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBpbml0OiBpbml0TWVudSxcclxuICB9O1xyXG59KCkpO1xyXG4iLCJjb25zdCB5b3V0dWJlID0gaWQgPT4gYDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly93d3cueW91dHViZS5jb20vZW1iZWQvJHtpZH0/YXV0b3BsYXk9dHJ1ZVwiIGZyYW1lYm9yZGVyPVwiMFwiIGFsbG93ZnVsbHNjcmVlbj48L2lmcmFtZT5gO1xyXG5jb25zdCB2aW1lbyA9IGlkID0+IGA8aWZyYW1lIHNyYz1cImh0dHBzOi8vcGxheWVyLnZpbWVvLmNvbS92aWRlby8ke2lkfT9iYWRnZT0wXCIgZnJhbWVib3JkZXI9XCIwXCIgd2Via2l0YWxsb3dmdWxsc2NyZWVuIG1vemFsbG93ZnVsbHNjcmVlbiBhbGxvd2Z1bGxzY3JlZW4+PC9pZnJhbWU+YDtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIHlvdXR1YmUsXHJcbiAgdmltZW8sXHJcbn07XHJcbiIsImNvbnN0IG1lbnUgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvbWVudScpO1xyXG5jb25zdCBnYWxsZXJ5ID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL2dhbGxlcnknKTtcclxuXHJcbm1lbnUuaW5pdCgpO1xyXG5nYWxsZXJ5LmluaXQoKTtcclxuIl19
