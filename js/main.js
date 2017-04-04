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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJfanNcXGNvbXBvbmVudHNcXGdhbGxlcnkuanMiLCJfanNcXGNvbXBvbmVudHNcXG1lbnUuanMiLCJfanNcXGNvbXBvbmVudHNcXHRlbXBsYXRlcy5qcyIsIl9qc1xcbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLE1BQU0sWUFBWSxRQUFRLGFBQVIsQ0FBbEI7O0FBRUEsSUFBSSxlQUFKO0FBQ0EsSUFBSSxXQUFKOztBQUVBLE1BQU0sWUFBYSxNQUFELElBQVk7QUFDNUIsUUFBTSxRQUFRLElBQUksS0FBSixFQUFkO0FBQ0EsY0FBWSxTQUFaLENBQXNCLE1BQXRCLENBQTZCLHFCQUE3QjtBQUNBLGNBQVksU0FBWixDQUFzQixHQUF0QixDQUEwQix1QkFBMUI7QUFDQSxRQUFNLE1BQU4sR0FBZSxNQUFNO0FBQ25CLFdBQU8sWUFBWSxVQUFuQixFQUErQjtBQUM3QixrQkFBWSxXQUFaLENBQXdCLFlBQVksVUFBcEM7QUFDRDtBQUNELGdCQUFZLFdBQVosQ0FBd0IsS0FBeEI7QUFDQSxnQkFBWSxTQUFaLENBQXNCLE1BQXRCLENBQTZCLHVCQUE3QjtBQUNELEdBTkQ7QUFPQSxRQUFNLEdBQU4sR0FBWSxPQUFPLFlBQVAsQ0FBb0IsYUFBcEIsQ0FBWjtBQUNBLFFBQU0sWUFBTixDQUFtQixLQUFuQixFQUEwQixPQUFPLFlBQVAsQ0FBb0IsV0FBcEIsQ0FBMUI7QUFDRCxDQWJEOztBQWVBLE1BQU0sWUFBWSxDQUFDLElBQUQsRUFBTyxNQUFQLEtBQWtCO0FBQ2xDLGNBQVksU0FBWixDQUFzQixHQUF0QixDQUEwQixxQkFBMUI7QUFDQSxRQUFNLEtBQUssT0FBTyxZQUFQLENBQW9CLGFBQXBCLENBQVg7QUFDQSxRQUFNLGFBQWEsVUFBVSxJQUFWLEVBQWdCLEVBQWhCLENBQW5CO0FBQ0EsU0FBTyxZQUFZLFVBQW5CLEVBQStCO0FBQzdCLGdCQUFZLFdBQVosQ0FBd0IsWUFBWSxVQUFwQztBQUNEO0FBQ0QsY0FBWSxTQUFaLEdBQXdCLFVBQXhCO0FBQ0QsQ0FSRDs7QUFVQSxNQUFNLHFCQUFzQixDQUFELElBQU87QUFDaEMsUUFBTSxTQUFTLEVBQUUsTUFBakI7O0FBRUEsVUFBUSxPQUFPLFlBQVAsQ0FBb0Isa0JBQXBCLENBQVI7QUFDRSxTQUFLLEtBQUw7QUFDRSxnQkFBVSxNQUFWO0FBQ0E7QUFDRixTQUFLLFNBQUw7QUFDRSxnQkFBVSxTQUFWLEVBQXFCLE1BQXJCO0FBQ0E7QUFDRixTQUFLLE9BQUw7QUFDRSxnQkFBVSxPQUFWLEVBQW1CLE1BQW5CO0FBQ0E7QUFDRjtBQUNFO0FBWEo7QUFhRCxDQWhCRDs7QUFrQkEsTUFBTSxrQkFBa0IsTUFBTTtBQUM1QixPQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksZ0JBQWdCLE1BQXBDLEVBQTRDLEdBQTVDLEVBQWlEO0FBQy9DLG9CQUFnQixDQUFoQixFQUFtQixnQkFBbkIsQ0FBb0MsT0FBcEMsRUFBNkMsa0JBQTdDO0FBQ0Q7QUFDRixDQUpEOztBQU1BLE1BQU0sT0FBTyxNQUFNO0FBQ2pCLE1BQUksU0FBUyxzQkFBVCxDQUFnQyxjQUFoQyxFQUFnRCxNQUFoRCxHQUF5RCxDQUE3RCxFQUFnRTtBQUM5RCxrQkFBYyxTQUFTLHNCQUFULENBQWdDLGNBQWhDLEVBQWdELENBQWhELENBQWQ7QUFDQSxzQkFBa0IsU0FBUyxzQkFBVCxDQUFnQyxzQkFBaEMsQ0FBbEI7QUFDQTtBQUNEO0FBQ0YsQ0FORDs7QUFRQSxPQUFPLE9BQVAsR0FBaUI7QUFDZjtBQURlLENBQWpCOzs7QUM5REEsT0FBTyxPQUFQLEdBQWtCLFNBQVMsSUFBVCxHQUFnQjtBQUNoQyxNQUFJLE9BQUo7O0FBRUEsUUFBTSxrQkFBa0IsTUFBTTtBQUM1QixZQUFRLFNBQVIsQ0FBa0IsTUFBbEIsQ0FBeUIsVUFBekI7QUFDRCxHQUZEOztBQUlBLFFBQU0sV0FBVyxNQUFNO0FBQ3JCLFVBQU0sZUFBZSxTQUFTLGNBQVQsQ0FBd0Isb0JBQXhCLENBQXJCO0FBQ0EsY0FBVSxTQUFTLGNBQVQsQ0FBd0IsVUFBeEIsQ0FBVjtBQUNBLGlCQUFhLGdCQUFiLENBQThCLE9BQTlCLEVBQXVDLGVBQXZDO0FBQ0QsR0FKRDs7QUFNQSxTQUFPO0FBQ0wsVUFBTTtBQURELEdBQVA7QUFHRCxDQWhCaUIsRUFBbEI7OztBQ0FBLE1BQU0sVUFBVSxNQUFPLCtDQUE2QyxFQUFHLDREQUF2RTtBQUNBLE1BQU0sUUFBUSxNQUFPLGdEQUE4QyxFQUFHLCtGQUF0RTs7QUFFQSxPQUFPLE9BQVAsR0FBaUI7QUFDZixTQURlO0FBRWY7QUFGZSxDQUFqQjs7O0FDSEEsTUFBTSxPQUFPLFFBQVEsbUJBQVIsQ0FBYjtBQUNBLE1BQU0sVUFBVSxRQUFRLHNCQUFSLENBQWhCOztBQUVBLEtBQUssSUFBTDtBQUNBLFFBQVEsSUFBUiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjb25zdCB0ZW1wbGF0ZXMgPSByZXF1aXJlKCcuL3RlbXBsYXRlcycpO1xuXG5sZXQgcHJldmlld0VsZW1lbnRzO1xubGV0IG1haW5FbGVtZW50O1xuXG5jb25zdCBsb2FkSW1hZ2UgPSAodGFyZ2V0KSA9PiB7XG4gIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7XG4gIG1haW5FbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2dhbGxlcnktbWFpbi0tdmlkZW8nKTtcbiAgbWFpbkVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZ2FsbGVyeS1tYWluLS1sb2FkaW5nJyk7XG4gIGltYWdlLm9ubG9hZCA9ICgpID0+IHtcbiAgICB3aGlsZSAobWFpbkVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgbWFpbkVsZW1lbnQucmVtb3ZlQ2hpbGQobWFpbkVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIG1haW5FbGVtZW50LmFwcGVuZENoaWxkKGltYWdlKTtcbiAgICBtYWluRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdnYWxsZXJ5LW1haW4tLWxvYWRpbmcnKTtcbiAgfTtcbiAgaW1hZ2Uuc3JjID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQnKTtcbiAgaW1hZ2Uuc2V0QXR0cmlidXRlKCdhbHQnLCB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWRlc2MnKSk7XG59O1xuXG5jb25zdCBsb2FkVmlkZW8gPSAodHlwZSwgdGFyZ2V0KSA9PiB7XG4gIG1haW5FbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2dhbGxlcnktbWFpbi0tdmlkZW8nKTtcbiAgY29uc3QgaWQgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldCcpO1xuICBjb25zdCB2aWRlb2ZyYW1lID0gdGVtcGxhdGVzW3R5cGVdKGlkKTtcbiAgd2hpbGUgKG1haW5FbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICBtYWluRWxlbWVudC5yZW1vdmVDaGlsZChtYWluRWxlbWVudC5maXJzdENoaWxkKTtcbiAgfVxuICBtYWluRWxlbWVudC5pbm5lckhUTUwgPSB2aWRlb2ZyYW1lO1xufTtcblxuY29uc3QgaGFuZGxlUHJldmlld0NsaWNrID0gKGUpID0+IHtcbiAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XG5cbiAgc3dpdGNoICh0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldC10eXBlJykpIHtcbiAgICBjYXNlICdpbWcnOlxuICAgICAgbG9hZEltYWdlKHRhcmdldCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICd5b3V0dWJlJzpcbiAgICAgIGxvYWRWaWRlbygneW91dHViZScsIHRhcmdldCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICd2aW1lbyc6XG4gICAgICBsb2FkVmlkZW8oJ3ZpbWVvJywgdGFyZ2V0KTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBicmVhaztcbiAgfVxufTtcblxuY29uc3QgYXR0YWNoTGlzdGVuZXJzID0gKCkgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHByZXZpZXdFbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHByZXZpZXdFbGVtZW50c1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZVByZXZpZXdDbGljayk7XG4gIH1cbn07XG5cbmNvbnN0IGluaXQgPSAoKSA9PiB7XG4gIGlmIChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdnYWxsZXJ5LW1haW4nKS5sZW5ndGggPiAwKSB7XG4gICAgbWFpbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdnYWxsZXJ5LW1haW4nKVswXTtcbiAgICBwcmV2aWV3RWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdnYWxsZXJ5LXByZXZpZXctaXRlbScpO1xuICAgIGF0dGFjaExpc3RlbmVycygpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaW5pdCxcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiBtZW51KCkge1xuICBsZXQgbmF2TGlzdDtcblxuICBjb25zdCBoYW5kbGVNZW51Q2xpY2sgPSAoKSA9PiB7XG4gICAgbmF2TGlzdC5jbGFzc0xpc3QudG9nZ2xlKCduYXZfb3BlbicpO1xuICB9O1xuXG4gIGNvbnN0IGluaXRNZW51ID0gKCkgPT4ge1xuICAgIGNvbnN0IHRvZ2dsZWJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZW51X3RvZ2dsZV9idXR0b24nKTtcbiAgICBuYXZMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hdl9saXN0Jyk7XG4gICAgdG9nZ2xlYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlTWVudUNsaWNrKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGluaXQ6IGluaXRNZW51LFxuICB9O1xufSgpKTtcbiIsImNvbnN0IHlvdXR1YmUgPSBpZCA9PiBgPGlmcmFtZSBzcmM9XCJodHRwczovL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8ke2lkfT9hdXRvcGxheT10cnVlXCIgZnJhbWVib3JkZXI9XCIwXCIgYWxsb3dmdWxsc2NyZWVuPjwvaWZyYW1lPmA7XG5jb25zdCB2aW1lbyA9IGlkID0+IGA8aWZyYW1lIHNyYz1cImh0dHBzOi8vcGxheWVyLnZpbWVvLmNvbS92aWRlby8ke2lkfT9iYWRnZT0wXCIgZnJhbWVib3JkZXI9XCIwXCIgd2Via2l0YWxsb3dmdWxsc2NyZWVuIG1vemFsbG93ZnVsbHNjcmVlbiBhbGxvd2Z1bGxzY3JlZW4+PC9pZnJhbWU+YDtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHlvdXR1YmUsXG4gIHZpbWVvLFxufTtcbiIsImNvbnN0IG1lbnUgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvbWVudScpO1xuY29uc3QgZ2FsbGVyeSA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9nYWxsZXJ5Jyk7XG5cbm1lbnUuaW5pdCgpO1xuZ2FsbGVyeS5pbml0KCk7XG4iXX0=
