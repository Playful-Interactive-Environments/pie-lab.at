const Imageslider = require('../vendor/ideal-image-slider');

module.exports = (function slider() {

  const initSlider = () => {
    new Imageslider.Slider('#heroslider');
  };

  return {
    init: initSlider,
  };
})();
