const Imageslider = require('../vendor/ideal-image-slider');

module.exports = (function slider() {

  const initSlider = () => {
    const slider = new Imageslider.Slider({
      selector: '#hero-slider',
      interval: 10000,
      transitionDuration: 750,
      previousNavSelector: '#hero-slider-prev',
      nextNavSelector: '#hero-slider-next',
    });
    slider.start();
  };

  return {
    init: initSlider,
  };
})();
