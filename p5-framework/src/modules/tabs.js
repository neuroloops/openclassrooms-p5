export default (function () {
  console.log('hello');

  const afficherOnglet = function (a, animations) {
    if (animations === undefined) {
      animations = true;
    }
    const li = a.parentNode;
    const div = a.parentNode.parentNode.parentNode.parentNode;
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

  let hashChange = function (e) {
    let hash = window.location.hash;

    let a = document.querySelector('a[href="' + hash + '"]');

    if (a !== null && !a.parentNode.classList.contains('active')) {
      afficherOnglet(a, e !== undefined);
    }
  };
  window.addEventListener('hashchange', hashChange);
  hashChange();
})();
