const templates = require('./templates');

let previewElements;
let mainElement;

const loadImage = (target) => {
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

const handlePreviewClick = (e) => {
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
  init,
};
