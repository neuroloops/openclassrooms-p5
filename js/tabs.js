(function () {
  let afficherOnglet = function (a, animations) {
    if (animations === undefined) {
      animations = true;
    }
    let li = a.parentNode;
    let div = a.parentNode.parentNode.parentNode;
    let activeTab = div.querySelector(".tab-content.active"); // contenu actif
    let target = div.querySelector(a.getAttribute("href")); // contenu à afficher

    if (li.classList.contains("active")) {
      return false;
    }
    // on retire la classe active de l'onglet atif
    div.querySelector(".tabs .active").classList.remove("active");
    // ajout de la class active à l'onglet actuel
    li.classList.add("active");

    if (animations) {
      activeTab.classList.add("fade");
      activeTab.classList.remove("in");
      let transitionend = function () {
        this.classList.remove("fade");
        this.classList.remove("active");
        target.classList.add("active");
        target.classList.add("fade");
        target.offsetWidth;
        target.classList.add("in");
        activeTab.removeEventListener("transitionend", transitionend);
      };

      activeTab.addEventListener("transitionend", transitionend);
    } else {
      target.classList.add("active");
      activeTab.classList.remove("active");
    }
  };
  tabs = document.querySelectorAll(".tabs a");
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function (e) {
      afficherOnglet(this);
    });
  }

  let hashChange = function (e) {
    let hash = window.location.hash;
    let a = document.querySelector('a[href="' + hash + '"]');
    if (a !== null && !a.parentNode.classList.contains("active")) {
      afficherOnglet(a, e !== undefined);
    }
  };
  window.addEventListener("hashchange", hashChange);
  hashChange();
})();
