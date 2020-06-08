export default (function () {
  const pages = ['home', 'products'];

  const hashChange = function (e) {
    const { hash } = window.location;

    console.log('hash', hash);

    if (hash === '#products_page_link') {
      console.warn('poducts_page_link');
      document.getElementById('menu_link_products').classList.add('border-purple-600');
      document.getElementById('menu_link_home').classList.remove('border-purple-600');
      document.getElementById('products_page').classList.remove('hidden');
      document.getElementById('home').classList.add('hidden');
    }
    if (hash === '#product_page_link') {
      console.warn('product_page_link');

      document.getElementById('home').classList.add('hidden');
      document.getElementById('products_page').classList.add('hidden');
      document.getElementById('menu_link_home').classList.remove('border-purple-600');
      document.getElementById('menu_link_products').classList.remove('border-purple-600');
      document.getElementById('product_page').classList.remove('hidden');
    }
    if (hash === '#home') {
      console.warn('home');
      document.getElementById('home').classList.remove('hidden');
      document.getElementById('menu_link_products').classList.remove('border-purple-600');
      document.getElementById('menu_link_home').classList.add('border-purple-600');
    }
  };
  window.addEventListener('DOMContentLoaded', hashChange);
  window.addEventListener('hashchange', hashChange);
})();
