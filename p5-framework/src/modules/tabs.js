export default (function () {
  console.log('hello');

  const hashChange = function (e) {
    const { hash } = window.location;
    console.log(hash);

    if (hash === '#products_page') {
      console.log('hash', hash);

      document.getElementById('hero').classList.add('hidden');
      document.getElementById('menu_link_products').classList.add('border-purple-600');
      document.getElementById('menu_link_home').classList.remove('border-purple-600');
    } else {
      document.getElementById('hero').classList.remove('hidden');
      document.getElementById('menu_link_products').classList.remove('border-purple-600');
      document.getElementById('menu_link_home').classList.add('border-purple-600');
    }
  };
  window.addEventListener('hashchange', hashChange);

  hashChange();
})();
