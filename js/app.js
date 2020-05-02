/*
liste de todo
TODO changer le message d'erreur 500
TODO: serparer le error dans un module
TODO: faire la page panier
TODO: faire la page de confirmation
FIXME: changer l'url en fonction de l'id de l'article
*/

/**
 *
 * @param {string} targetIdDiv Div parent
 * @param {string} id Id de la div crée
 * @param {string} html l'element html
 * @param {string} append
 */

const createDivWithId = (targetIdDiv, id, html, append = 0) => {
  const target = document.getElementById(targetIdDiv);
  const createDiv = document.createElement("div");
  createDiv.setAttribute("class", targetIdDiv);
  createDiv.setAttribute("id", `${id}`);
  createDiv.innerHTML = html;
  // append uniquement si append == 0 ou si l'element n'existe pas
  if (append == 0 || document.getElementById(id) == undefined) {
    target.appendChild(createDiv);
  } else {
    // console.log(document.getElementById(id));
  }
};

/**
 *
 * @param {json} data retour du fecth
 */

const showProducts = (data) => {
  data.forEach(function (item) {
    html = `
      <a href="#product" class="product">
        <div class="picture">
          <img src="${item.imageUrl}" alt="image de ${item.name}" />
        </div>
        <div class="textProduct">
          <h2>${item.name}</h2>
          <p class="price">${centToEuro(item.price.toString())}</p>
        </div>
      </a>
      <hr />
    `;
    divIdItem = "id_" + item._id;
    createDivWithId("home", divIdItem, html);
    // console.log(item._id);
    const itemId = document.getElementById(divIdItem);
    itemId.addEventListener("click", (e) => {
      getProducts(showProduct, "http://127.0.0.1:3000/api/cameras/" + item._id);
    });
  });
};

/**
 *
 * @param {json} item reponse de fetch avec les infos du produits.
 */

const showProduct = (item) => {
  // supprime les precendent produit
  // document.getElementById("product").innerHTML = ``;

  html = `
    <div class="description">
      <div class="introProduit ">
        <h2>${item.name}</h2>
        <img src="${item.imageUrl}" alt="image de ${item.name}" />
      </div>
      <p>
        ${centToEuro(item.price.toString())}<br />
        ${item.description} <br />
      </p>
      option d'optique:
      <select id="lenses">
        ${item.lenses
          .map((lense, index) => {
            return `<option value="${index}">${lense}</option> ${lense}`;
          })
          .join("")}</select
      >
      <div class="result"></div>
      <div>
        <p>
          <a href="#cart" class="btn">
            <span id="btn">Ajouter au panier</span>
          </a>
        </p>
      </div>
    </div>
  `;
  let lense = 0;
  let cartItem = [];
  createDivWithId("product", item._id, html, 1);

  addEventListener("change", (event) => {
    const result = document.querySelector(".result");
    lense = event.target.value;
    cartItem.push(item.name, item.price);
    result.textContent = `vous avez choisis ${event.target.value}`;
  });
};

getProducts(showProducts);
const displayCart = (lense, name, cartItem) => {
  html = `
  <div>
    <p>vous avez choisis ${name} avec ${lense}</p>
    <p>resumé ${cartItem}</p>
  </div>
  ${cartItem
    .map((lense, index) => {
      return `<option value="${index}">${lense}</option> ${lense}`;
    })
    .join("")}
  `;
  createDivWithId("cart", "cart", html);
};
let firstRun = true;
const formulaire = () => {
  html = `
    <form id="form">
      <input id="first_name" type="text" class="validate" />
      <label for="first_name">Prénom</label>
      <br />
      <input id="last_name" type="text" class="validate" />

      <label for="last_name">Nom</label><br />
      <input id="email_inline" type="email" class="validate" />
      <label for="email_inline">Email</label><br />
      <span class="helper-text" data-error="email incorrect"></span>
      <input id="address" type="text" class="validate" />
      <label for="address">Adresse</label><br />
      <input id="zipCode" type="text" maxlength="5" class="validate" />
      <label for="zipCode">Code postal</label> <br />
      <input id="city" type="text" class="validate" />
      <label for="city">Ville</label> <br />
      <a class="" href="#">valider</a>
    </form>
    <div id="name"></div>
  `;
  createDivWithId("user", "formulaireUser", html, 1);

  if (firstRun == true) {
    (function () {
      const inputTag = document.querySelectorAll("input");
      const arrayIds = [...inputTag].map((item) => item.id);
      const customer = {
        first_name: "",
        last_name: "",
        email_inline: "",
        address: "",
        zipCode: "",
        city: "",
      };
      firstRun = false;
      console.log(arrayIds);

      arrayIds.forEach(function (id) {
        const input = document.getElementById(id);
        input.addEventListener("input", updateValue);
        function updateValue(e) {
          function test() {
            customer[e.target.id] = e.target.value;
            console.log(customer);
          }
          setInterval(test(e), 3000);
        }
      });
    })();
  }
};
document.getElementById("btn-user").addEventListener("click", () => {
  formulaire();
});
