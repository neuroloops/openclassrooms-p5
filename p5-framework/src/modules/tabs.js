export default (function () {
  console.log('hello');

  const afficherOnglet = (a, animations = true) => {
    const li = a.parentNode;
    const div = a.parentNode.parentNode;
    console.log(div);
    div.classList.add('hidden');
    document.getElementById('products_page').classList.remove('hidden');
    const activeTab = div.querySelector('.tab-content.active'); // contenu actif
    const target = div.querySelector(a.getAttribute('href')); // contenu à afficher
    // console.log(activeTab);

    if (li.classList.contains('active')) {
      return false;
    }
    // on retire la classe active de l'onglet actif
    div.querySelector('.tabs .active').classList.remove('active');
    // ajout de la class active à l'onglet actuel
    li.classList.add('active');

    if (animations) {
      activeTab.classList.add('fade');
      activeTab.classList.remove('in');
      const transitioned = function () {
        this.classList.remove('fade');
        this.classList.remove('active');
        target.classList.add('active');
        target.classList.add('fade');
        target.classList.add('in');
        activeTab.removeEventListener('transitioned', transitioned);
      };

      activeTab.addEventListener('transitioned', transitioned);
    } else {
      target.classList.add('active');
      activeTab.classList.remove('active');
    }
  };
  let tabs = document.querySelectorAll('.tabs a');
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', function () {
      afficherOnglet(this);
    });
  }

  const hashChange = function (e) {
    const { hash } = window.location;
    console.log(hash);

    if (hash === '#products_page') {
      console.log('hash', hash);

      document.getElementById('products_page_hidden').classList.remove('hidden');
      document
        .getElementById('products_page')
        .classList.add('transition', 'delay-150', 'duration-300', 'opacity-100');
      document.getElementById('hero').classList.add('hidden');
    } else {
      document.getElementById('products_page_hidden').classList.add('hidden');
      document.getElementById('hero').classList.remove('hidden');
      document
        .getElementById('products_page')
        .classList.remove('transition', 'delay-150', 'duration-300', 'opacity-100');
    }
  };
  window.addEventListener('hashchange', hashChange);

  hashChange();
})();
