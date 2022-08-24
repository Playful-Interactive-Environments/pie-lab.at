(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
  const {
    target
  } = e;

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
const youtube = id => `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1" frameborder="0" allow="autoplay" allowfullscreen></iframe>`;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJfanMvY29tcG9uZW50cy9nYWxsZXJ5LmpzIiwiX2pzL2NvbXBvbmVudHMvbWVudS5qcyIsIl9qcy9jb21wb25lbnRzL3RlbXBsYXRlcy5qcyIsIl9qcy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLGFBQUQsQ0FBekI7O0FBRUEsSUFBSSxlQUFKO0FBQ0EsSUFBSSxXQUFKOztBQUVBLE1BQU0sU0FBUyxHQUFJLE1BQUQsSUFBWTtFQUM1QixNQUFNLEtBQUssR0FBRyxJQUFJLEtBQUosRUFBZDtFQUNBLFdBQVcsQ0FBQyxTQUFaLENBQXNCLE1BQXRCLENBQTZCLHFCQUE3QjtFQUNBLFdBQVcsQ0FBQyxTQUFaLENBQXNCLEdBQXRCLENBQTBCLHVCQUExQjs7RUFDQSxLQUFLLENBQUMsTUFBTixHQUFlLE1BQU07SUFDbkIsT0FBTyxXQUFXLENBQUMsVUFBbkIsRUFBK0I7TUFDN0IsV0FBVyxDQUFDLFdBQVosQ0FBd0IsV0FBVyxDQUFDLFVBQXBDO0lBQ0Q7O0lBQ0QsV0FBVyxDQUFDLFdBQVosQ0FBd0IsS0FBeEI7SUFDQSxXQUFXLENBQUMsU0FBWixDQUFzQixNQUF0QixDQUE2Qix1QkFBN0I7RUFDRCxDQU5EOztFQU9BLEtBQUssQ0FBQyxHQUFOLEdBQVksTUFBTSxDQUFDLFlBQVAsQ0FBb0IsYUFBcEIsQ0FBWjtFQUNBLEtBQUssQ0FBQyxZQUFOLENBQW1CLEtBQW5CLEVBQTBCLE1BQU0sQ0FBQyxZQUFQLENBQW9CLFdBQXBCLENBQTFCO0FBQ0QsQ0FiRDs7QUFlQSxNQUFNLFNBQVMsR0FBRyxDQUFDLElBQUQsRUFBTyxNQUFQLEtBQWtCO0VBQ2xDLFdBQVcsQ0FBQyxTQUFaLENBQXNCLEdBQXRCLENBQTBCLHFCQUExQjtFQUNBLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxZQUFQLENBQW9CLGFBQXBCLENBQVg7RUFDQSxNQUFNLFVBQVUsR0FBRyxTQUFTLENBQUMsSUFBRCxDQUFULENBQWdCLEVBQWhCLENBQW5COztFQUNBLE9BQU8sV0FBVyxDQUFDLFVBQW5CLEVBQStCO0lBQzdCLFdBQVcsQ0FBQyxXQUFaLENBQXdCLFdBQVcsQ0FBQyxVQUFwQztFQUNEOztFQUNELFdBQVcsQ0FBQyxTQUFaLEdBQXdCLFVBQXhCO0FBQ0QsQ0FSRDs7QUFVQSxNQUFNLGtCQUFrQixHQUFJLENBQUQsSUFBTztFQUNoQyxNQUFNO0lBQUU7RUFBRixJQUFhLENBQW5COztFQUVBLFFBQVEsTUFBTSxDQUFDLFlBQVAsQ0FBb0Isa0JBQXBCLENBQVI7SUFDRSxLQUFLLEtBQUw7TUFDRSxTQUFTLENBQUMsTUFBRCxDQUFUO01BQ0E7O0lBQ0YsS0FBSyxTQUFMO01BQ0UsU0FBUyxDQUFDLFNBQUQsRUFBWSxNQUFaLENBQVQ7TUFDQTs7SUFDRixLQUFLLE9BQUw7TUFDRSxTQUFTLENBQUMsT0FBRCxFQUFVLE1BQVYsQ0FBVDtNQUNBOztJQUNGO01BQ0U7RUFYSjtBQWFELENBaEJEOztBQWtCQSxNQUFNLGVBQWUsR0FBRyxNQUFNO0VBQzVCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBYixFQUFnQixDQUFDLEdBQUcsZUFBZSxDQUFDLE1BQXBDLEVBQTRDLENBQUMsRUFBN0MsRUFBaUQ7SUFDL0MsZUFBZSxDQUFDLENBQUQsQ0FBZixDQUFtQixnQkFBbkIsQ0FBb0MsT0FBcEMsRUFBNkMsa0JBQTdDO0VBQ0Q7QUFDRixDQUpEOztBQU1BLE1BQU0sSUFBSSxHQUFHLE1BQU07RUFDakIsSUFBSSxRQUFRLENBQUMsc0JBQVQsQ0FBZ0MsY0FBaEMsRUFBZ0QsTUFBaEQsR0FBeUQsQ0FBN0QsRUFBZ0U7SUFDOUQsV0FBVyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLGVBQXZCLENBQWQ7SUFDQSxlQUFlLEdBQUcsUUFBUSxDQUFDLHNCQUFULENBQWdDLHNCQUFoQyxDQUFsQjtJQUNBLGVBQWU7RUFDaEI7QUFDRixDQU5EOztBQVFBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCO0VBQ2Y7QUFEZSxDQUFqQjs7O0FDOURBLE1BQU0sQ0FBQyxPQUFQLEdBQWtCLFNBQVMsSUFBVCxHQUFnQjtFQUNoQyxJQUFJLE9BQUo7O0VBRUEsTUFBTSxlQUFlLEdBQUcsTUFBTTtJQUM1QixPQUFPLENBQUMsU0FBUixDQUFrQixNQUFsQixDQUF5QixVQUF6QjtFQUNELENBRkQ7O0VBSUEsTUFBTSxRQUFRLEdBQUcsTUFBTTtJQUNyQixNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsY0FBVCxDQUF3QixvQkFBeEIsQ0FBckI7SUFDQSxPQUFPLEdBQUcsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsVUFBeEIsQ0FBVjtJQUNBLFlBQVksQ0FBQyxnQkFBYixDQUE4QixPQUE5QixFQUF1QyxlQUF2QztFQUNELENBSkQ7O0VBTUEsT0FBTztJQUNMLElBQUksRUFBRTtFQURELENBQVA7QUFHRCxDQWhCaUIsRUFBbEI7OztBQ0FBLE1BQU0sT0FBTyxHQUFJLEVBQUQsSUFBUyw4Q0FBNkMsRUFBRyx5RUFBekU7O0FBQ0EsTUFBTSxLQUFLLEdBQUksRUFBRCxJQUFTLCtDQUE4QyxFQUFHLDhGQUF4RTs7QUFFQSxNQUFNLENBQUMsT0FBUCxHQUFpQjtFQUNmLE9BRGU7RUFFZjtBQUZlLENBQWpCOzs7QUNIQSxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsbUJBQUQsQ0FBcEI7O0FBQ0EsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLHNCQUFELENBQXZCOztBQUVBLElBQUksQ0FBQyxJQUFMO0FBQ0EsT0FBTyxDQUFDLElBQVIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCB0ZW1wbGF0ZXMgPSByZXF1aXJlKCcuL3RlbXBsYXRlcycpO1xuXG5sZXQgcHJldmlld0VsZW1lbnRzO1xubGV0IG1haW5FbGVtZW50O1xuXG5jb25zdCBsb2FkSW1hZ2UgPSAodGFyZ2V0KSA9PiB7XG4gIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7XG4gIG1haW5FbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2dhbGxlcnktbWFpbi0tdmlkZW8nKTtcbiAgbWFpbkVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZ2FsbGVyeS1tYWluLS1sb2FkaW5nJyk7XG4gIGltYWdlLm9ubG9hZCA9ICgpID0+IHtcbiAgICB3aGlsZSAobWFpbkVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgbWFpbkVsZW1lbnQucmVtb3ZlQ2hpbGQobWFpbkVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIG1haW5FbGVtZW50LmFwcGVuZENoaWxkKGltYWdlKTtcbiAgICBtYWluRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdnYWxsZXJ5LW1haW4tLWxvYWRpbmcnKTtcbiAgfTtcbiAgaW1hZ2Uuc3JjID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQnKTtcbiAgaW1hZ2Uuc2V0QXR0cmlidXRlKCdhbHQnLCB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWRlc2MnKSk7XG59O1xuXG5jb25zdCBsb2FkVmlkZW8gPSAodHlwZSwgdGFyZ2V0KSA9PiB7XG4gIG1haW5FbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2dhbGxlcnktbWFpbi0tdmlkZW8nKTtcbiAgY29uc3QgaWQgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldCcpO1xuICBjb25zdCB2aWRlb2ZyYW1lID0gdGVtcGxhdGVzW3R5cGVdKGlkKTtcbiAgd2hpbGUgKG1haW5FbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICBtYWluRWxlbWVudC5yZW1vdmVDaGlsZChtYWluRWxlbWVudC5maXJzdENoaWxkKTtcbiAgfVxuICBtYWluRWxlbWVudC5pbm5lckhUTUwgPSB2aWRlb2ZyYW1lO1xufTtcblxuY29uc3QgaGFuZGxlUHJldmlld0NsaWNrID0gKGUpID0+IHtcbiAgY29uc3QgeyB0YXJnZXQgfSA9IGU7XG5cbiAgc3dpdGNoICh0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldC10eXBlJykpIHtcbiAgICBjYXNlICdpbWcnOlxuICAgICAgbG9hZEltYWdlKHRhcmdldCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICd5b3V0dWJlJzpcbiAgICAgIGxvYWRWaWRlbygneW91dHViZScsIHRhcmdldCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICd2aW1lbyc6XG4gICAgICBsb2FkVmlkZW8oJ3ZpbWVvJywgdGFyZ2V0KTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBicmVhaztcbiAgfVxufTtcblxuY29uc3QgYXR0YWNoTGlzdGVuZXJzID0gKCkgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHByZXZpZXdFbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHByZXZpZXdFbGVtZW50c1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZVByZXZpZXdDbGljayk7XG4gIH1cbn07XG5cbmNvbnN0IGluaXQgPSAoKSA9PiB7XG4gIGlmIChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdnYWxsZXJ5LW1haW4nKS5sZW5ndGggPiAwKSB7XG4gICAgbWFpbkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1tYWluJyk7XG4gICAgcHJldmlld0VsZW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZ2FsbGVyeS1wcmV2aWV3LWl0ZW0nKTtcbiAgICBhdHRhY2hMaXN0ZW5lcnMoKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGluaXQsXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gbWVudSgpIHtcbiAgbGV0IG5hdkxpc3Q7XG5cbiAgY29uc3QgaGFuZGxlTWVudUNsaWNrID0gKCkgPT4ge1xuICAgIG5hdkxpc3QuY2xhc3NMaXN0LnRvZ2dsZSgnbmF2X29wZW4nKTtcbiAgfTtcblxuICBjb25zdCBpbml0TWVudSA9ICgpID0+IHtcbiAgICBjb25zdCB0b2dnbGVidXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVudV90b2dnbGVfYnV0dG9uJyk7XG4gICAgbmF2TGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXZfbGlzdCcpO1xuICAgIHRvZ2dsZWJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZU1lbnVDbGljayk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0OiBpbml0TWVudSxcbiAgfTtcbn0oKSk7XG4iLCJjb25zdCB5b3V0dWJlID0gKGlkKSA9PiBgPGlmcmFtZSBzcmM9XCJodHRwczovL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8ke2lkfT9hdXRvcGxheT0xXCIgZnJhbWVib3JkZXI9XCIwXCIgYWxsb3c9XCJhdXRvcGxheVwiIGFsbG93ZnVsbHNjcmVlbj48L2lmcmFtZT5gO1xuY29uc3QgdmltZW8gPSAoaWQpID0+IGA8aWZyYW1lIHNyYz1cImh0dHBzOi8vcGxheWVyLnZpbWVvLmNvbS92aWRlby8ke2lkfT9iYWRnZT0wXCIgZnJhbWVib3JkZXI9XCIwXCIgd2Via2l0YWxsb3dmdWxsc2NyZWVuIG1vemFsbG93ZnVsbHNjcmVlbiBhbGxvd2Z1bGxzY3JlZW4+PC9pZnJhbWU+YDtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHlvdXR1YmUsXG4gIHZpbWVvLFxufTtcbiIsImNvbnN0IG1lbnUgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvbWVudScpO1xuY29uc3QgZ2FsbGVyeSA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9nYWxsZXJ5Jyk7XG5cbm1lbnUuaW5pdCgpO1xuZ2FsbGVyeS5pbml0KCk7XG4iXX0=
