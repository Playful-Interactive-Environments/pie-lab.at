module.exports = (function menu() {
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
    init: initMenu,
  };
}());
