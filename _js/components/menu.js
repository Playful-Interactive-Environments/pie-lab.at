const $ = require('jQuery');

module.exports = (function menu() {
  let navList;

  const handleMenuClick = () => {
    navList.toggleClass('nav_open');
  };

  const initMenu = () => {
    $(document).ready(() => {
      $('.menu_toggle_button').on('click', handleMenuClick);
    });
    navList = $('.nav_list');
  };

  return {
    init: initMenu,
  };
})();
