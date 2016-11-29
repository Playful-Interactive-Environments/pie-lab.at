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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJfanNcXGNvbXBvbmVudHNcXGdhbGxlcnkuanMiLCJfanNcXGNvbXBvbmVudHNcXG1lbnUuanMiLCJfanNcXGNvbXBvbmVudHNcXHRlbXBsYXRlcy5qcyIsIl9qc1xcbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLE1BQU0sWUFBWSxRQUFRLGFBQVIsQ0FBbEI7O0FBRUEsSUFBSSxlQUFKO0FBQ0EsSUFBSSxXQUFKOztBQUVBLE1BQU0sWUFBYSxNQUFELElBQVk7QUFDNUIsUUFBTSxRQUFRLElBQUksS0FBSixFQUFkO0FBQ0EsY0FBWSxTQUFaLENBQXNCLE1BQXRCLENBQTZCLHFCQUE3QjtBQUNBLGNBQVksU0FBWixDQUFzQixHQUF0QixDQUEwQix1QkFBMUI7QUFDQSxRQUFNLE1BQU4sR0FBZSxNQUFNO0FBQ25CLFdBQU8sWUFBWSxVQUFuQixFQUErQjtBQUM3QixrQkFBWSxXQUFaLENBQXdCLFlBQVksVUFBcEM7QUFDRDtBQUNELGdCQUFZLFdBQVosQ0FBd0IsS0FBeEI7QUFDQSxnQkFBWSxTQUFaLENBQXNCLE1BQXRCLENBQTZCLHVCQUE3QjtBQUNELEdBTkQ7QUFPQSxRQUFNLEdBQU4sR0FBWSxPQUFPLFlBQVAsQ0FBb0IsYUFBcEIsQ0FBWjtBQUNBLFFBQU0sWUFBTixDQUFtQixLQUFuQixFQUEwQixPQUFPLFlBQVAsQ0FBb0IsV0FBcEIsQ0FBMUI7QUFDRCxDQWJEOztBQWVBLE1BQU0sWUFBWSxDQUFDLElBQUQsRUFBTyxNQUFQLEtBQWtCO0FBQ2xDLGNBQVksU0FBWixDQUFzQixHQUF0QixDQUEwQixxQkFBMUI7QUFDQSxRQUFNLEtBQUssT0FBTyxZQUFQLENBQW9CLGFBQXBCLENBQVg7QUFDQSxRQUFNLGFBQWEsVUFBVSxJQUFWLEVBQWdCLEVBQWhCLENBQW5CO0FBQ0EsU0FBTyxZQUFZLFVBQW5CLEVBQStCO0FBQzdCLGdCQUFZLFdBQVosQ0FBd0IsWUFBWSxVQUFwQztBQUNEO0FBQ0QsY0FBWSxTQUFaLEdBQXdCLFVBQXhCO0FBQ0QsQ0FSRDs7QUFVQSxNQUFNLHFCQUFzQixDQUFELElBQU87QUFDaEMsUUFBTSxTQUFTLEVBQUUsTUFBakI7O0FBRUEsVUFBUSxPQUFPLFlBQVAsQ0FBb0Isa0JBQXBCLENBQVI7QUFDRSxTQUFLLEtBQUw7QUFDRSxnQkFBVSxNQUFWO0FBQ0E7QUFDRixTQUFLLFNBQUw7QUFDRSxnQkFBVSxTQUFWLEVBQXFCLE1BQXJCO0FBQ0E7QUFDRixTQUFLLE9BQUw7QUFDRSxnQkFBVSxPQUFWLEVBQW1CLE1BQW5CO0FBQ0E7QUFDRjtBQUNFO0FBWEo7QUFhRCxDQWhCRDs7QUFrQkEsTUFBTSxrQkFBa0IsTUFBTTtBQUM1QixPQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksZ0JBQWdCLE1BQXBDLEVBQTRDLEdBQTVDLEVBQWlEO0FBQy9DLG9CQUFnQixDQUFoQixFQUFtQixnQkFBbkIsQ0FBb0MsT0FBcEMsRUFBNkMsa0JBQTdDO0FBQ0Q7QUFDRixDQUpEOztBQU1BLE1BQU0sT0FBTyxNQUFNO0FBQ2pCLE1BQUksU0FBUyxzQkFBVCxDQUFnQyxjQUFoQyxFQUFnRCxNQUFoRCxHQUF5RCxDQUE3RCxFQUFnRTtBQUM5RCxrQkFBYyxTQUFTLHNCQUFULENBQWdDLGNBQWhDLEVBQWdELENBQWhELENBQWQ7QUFDQSxzQkFBa0IsU0FBUyxzQkFBVCxDQUFnQyxzQkFBaEMsQ0FBbEI7QUFDQTtBQUNEO0FBQ0YsQ0FORDs7QUFRQSxPQUFPLE9BQVAsR0FBaUI7QUFDZjtBQURlLENBQWpCOzs7QUM5REEsT0FBTyxPQUFQLEdBQWtCLFNBQVMsSUFBVCxHQUFnQjtBQUNoQyxNQUFJLE9BQUo7O0FBRUEsUUFBTSxrQkFBa0IsTUFBTTtBQUM1QixZQUFRLFNBQVIsQ0FBa0IsTUFBbEIsQ0FBeUIsVUFBekI7QUFDRCxHQUZEOztBQUlBLFFBQU0sV0FBVyxNQUFNO0FBQ3JCLFVBQU0sZUFBZSxTQUFTLGNBQVQsQ0FBd0Isb0JBQXhCLENBQXJCO0FBQ0EsY0FBVSxTQUFTLGNBQVQsQ0FBd0IsVUFBeEIsQ0FBVjtBQUNBLGlCQUFhLGdCQUFiLENBQThCLE9BQTlCLEVBQXVDLGVBQXZDO0FBQ0QsR0FKRDs7QUFNQSxTQUFPO0FBQ0wsVUFBTTtBQURELEdBQVA7QUFHRCxDQWhCaUIsRUFBbEI7OztBQ0FBLE1BQU0sVUFBVSxNQUFPLCtDQUE2QyxFQUFHLDREQUF2RTtBQUNBLE1BQU0sUUFBUSxNQUFPLGdEQUE4QyxFQUFHLCtGQUF0RTs7QUFFQSxPQUFPLE9BQVAsR0FBaUI7QUFDZixTQURlO0FBRWY7QUFGZSxDQUFqQjs7O0FDSEEsTUFBTSxPQUFPLFFBQVEsbUJBQVIsQ0FBYjtBQUNBLE1BQU0sVUFBVSxRQUFRLHNCQUFSLENBQWhCOztBQUVBLEtBQUssSUFBTDtBQUNBLFFBQVEsSUFBUiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjb25zdCB0ZW1wbGF0ZXMgPSByZXF1aXJlKCcuL3RlbXBsYXRlcycpO1xyXG5cclxubGV0IHByZXZpZXdFbGVtZW50cztcclxubGV0IG1haW5FbGVtZW50O1xyXG5cclxuY29uc3QgbG9hZEltYWdlID0gKHRhcmdldCkgPT4ge1xyXG4gIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgbWFpbkVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZ2FsbGVyeS1tYWluLS12aWRlbycpO1xyXG4gIG1haW5FbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2dhbGxlcnktbWFpbi0tbG9hZGluZycpO1xyXG4gIGltYWdlLm9ubG9hZCA9ICgpID0+IHtcclxuICAgIHdoaWxlIChtYWluRWxlbWVudC5maXJzdENoaWxkKSB7XHJcbiAgICAgIG1haW5FbGVtZW50LnJlbW92ZUNoaWxkKG1haW5FbGVtZW50LmZpcnN0Q2hpbGQpO1xyXG4gICAgfVxyXG4gICAgbWFpbkVsZW1lbnQuYXBwZW5kQ2hpbGQoaW1hZ2UpO1xyXG4gICAgbWFpbkVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZ2FsbGVyeS1tYWluLS1sb2FkaW5nJyk7XHJcbiAgfTtcclxuICBpbWFnZS5zcmMgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldCcpO1xyXG4gIGltYWdlLnNldEF0dHJpYnV0ZSgnYWx0JywgdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1kZXNjJykpO1xyXG59O1xyXG5cclxuY29uc3QgbG9hZFZpZGVvID0gKHR5cGUsIHRhcmdldCkgPT4ge1xyXG4gIG1haW5FbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2dhbGxlcnktbWFpbi0tdmlkZW8nKTtcclxuICBjb25zdCBpZCA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0Jyk7XHJcbiAgY29uc3QgdmlkZW9mcmFtZSA9IHRlbXBsYXRlc1t0eXBlXShpZCk7XHJcbiAgd2hpbGUgKG1haW5FbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuICAgIG1haW5FbGVtZW50LnJlbW92ZUNoaWxkKG1haW5FbGVtZW50LmZpcnN0Q2hpbGQpO1xyXG4gIH1cclxuICBtYWluRWxlbWVudC5pbm5lckhUTUwgPSB2aWRlb2ZyYW1lO1xyXG59O1xyXG5cclxuY29uc3QgaGFuZGxlUHJldmlld0NsaWNrID0gKGUpID0+IHtcclxuICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcclxuXHJcbiAgc3dpdGNoICh0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldC10eXBlJykpIHtcclxuICAgIGNhc2UgJ2ltZyc6XHJcbiAgICAgIGxvYWRJbWFnZSh0YXJnZXQpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ3lvdXR1YmUnOlxyXG4gICAgICBsb2FkVmlkZW8oJ3lvdXR1YmUnLCB0YXJnZXQpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ3ZpbWVvJzpcclxuICAgICAgbG9hZFZpZGVvKCd2aW1lbycsIHRhcmdldCk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgYnJlYWs7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgYXR0YWNoTGlzdGVuZXJzID0gKCkgPT4ge1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcHJldmlld0VsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBwcmV2aWV3RWxlbWVudHNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVQcmV2aWV3Q2xpY2spO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGluaXQgPSAoKSA9PiB7XHJcbiAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2dhbGxlcnktbWFpbicpLmxlbmd0aCA+IDApIHtcclxuICAgIG1haW5FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZ2FsbGVyeS1tYWluJylbMF07XHJcbiAgICBwcmV2aWV3RWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdnYWxsZXJ5LXByZXZpZXctaXRlbScpO1xyXG4gICAgYXR0YWNoTGlzdGVuZXJzKCk7XHJcbiAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgaW5pdCxcclxufTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gbWVudSgpIHtcclxuICBsZXQgbmF2TGlzdDtcclxuXHJcbiAgY29uc3QgaGFuZGxlTWVudUNsaWNrID0gKCkgPT4ge1xyXG4gICAgbmF2TGlzdC5jbGFzc0xpc3QudG9nZ2xlKCduYXZfb3BlbicpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGluaXRNZW51ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgdG9nZ2xlYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lbnVfdG9nZ2xlX2J1dHRvbicpO1xyXG4gICAgbmF2TGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXZfbGlzdCcpO1xyXG4gICAgdG9nZ2xlYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlTWVudUNsaWNrKTtcclxuICB9O1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaW5pdDogaW5pdE1lbnUsXHJcbiAgfTtcclxufSgpKTtcclxuIiwiY29uc3QgeW91dHViZSA9IGlkID0+IGA8aWZyYW1lIHNyYz1cImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2VtYmVkLyR7aWR9P2F1dG9wbGF5PXRydWVcIiBmcmFtZWJvcmRlcj1cIjBcIiBhbGxvd2Z1bGxzY3JlZW4+PC9pZnJhbWU+YDtcclxuY29uc3QgdmltZW8gPSBpZCA9PiBgPGlmcmFtZSBzcmM9XCJodHRwczovL3BsYXllci52aW1lby5jb20vdmlkZW8vJHtpZH0/YmFkZ2U9MFwiIGZyYW1lYm9yZGVyPVwiMFwiIHdlYmtpdGFsbG93ZnVsbHNjcmVlbiBtb3phbGxvd2Z1bGxzY3JlZW4gYWxsb3dmdWxsc2NyZWVuPjwvaWZyYW1lPmA7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICB5b3V0dWJlLFxyXG4gIHZpbWVvLFxyXG59O1xyXG4iLCJjb25zdCBtZW51ID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL21lbnUnKTtcclxuY29uc3QgZ2FsbGVyeSA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9nYWxsZXJ5Jyk7XHJcblxyXG5tZW51LmluaXQoKTtcclxuZ2FsbGVyeS5pbml0KCk7XHJcbiJdfQ==
