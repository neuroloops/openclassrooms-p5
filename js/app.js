/*
liste de todo
TODO changer le message d'erreur 500
TODO: serparer le error dans un module
TODO: faire la page panier
TODO: faire la page de confirmation
FIXME: changer l'url en fonction de l'id de l'article
*/

const customer = {
  first_name: "",
  last_name: "",
  email_inline: "",
  address: "",
  zipCode: "",
  city: "",
};

/**
 *
 * @param {string} targetIdDiv Div parent
 * @param {string} id Id de la div crée
 * @param {string} html l'element html
 * @param {string} append
 * @param {string} el nome de la balise de l'el à creer
 */

const createElWithId = (targetIdDiv, id, html, append = 0, el = 'div') => {
  const target = document.getElementById(targetIdDiv);
  const createEl = document.createElement(el);
  createEl.setAttribute("class", targetIdDiv);
  createEl.setAttribute("id", `${id}`);
  createEl.innerHTML = html;
  // append uniquement si append == 0 ou si l'element n'existe pas
  if (append == 0 || document.getElementById(id) == undefined) {
    target.appendChild(createEl);
  }
};

/**
 *
 * @param {json} data retour du fecth
 */

const showProducts = (data) => {
  data.forEach(function (item) {
    html = `
            <img src="${item.imageUrl}" alt="image de ${item.name}"/>
            <figcaption>
              ${item.name} </br>
              <span class="price">${centToEuro(item.price.toString())}</span>
            </figcaption>
    `;
    divIdItem = "id_" + item._id;
    createElWithId("polaroid", divIdItem, html, 1, "figure" );
    // const itemId = document.getElementById(divIdItem);
    // itemId.addEventListener("click", () => {
    //   getProducts(showProduct, "http://127.0.0.1:3000/api/cameras/" + item._id);
    // });
  });
};

/**
 *
 * @param {json} item reponse de fetch avec les infos du produits.
 */

const showProduct = (item) => {
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
  let cartItem = [];
  createElWithId("product", item._id, html, 1);

  addEventListener("change", (event) => {
    const result = document.querySelector(".result");
    lense = event.target.value;
    cartItem.push(item.name, item.price);
    result.textContent = `vous avez choisis ${event.target.value}`;
  });
};

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
  createElWithId("cart", "cart", html);
};
let firstRun = true;
const formulaire = () => {
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
      <a class="" href="#confirm">valider</a>
      <a class="btn" href="#confirm" id="btn-confirmation">Confirmation</a>
    </form>
    <div id="name"></div>
  `;
  createElWithId("user", "formulaireUser", html, 1);
  document.getElementById("btn-confirmation").addEventListener("click", () => {
    confirmation();
  });
  if (firstRun == true) {
    (function () {
      const inputTag = document.querySelectorAll("input");
      const arrayIds = [...inputTag].map((item) => item.id);

      firstRun = false;
      console.log(arrayIds);

      updateValue = (e) => {
        customer[e.target.id] = e.target.value;
      };

      arrayIds.forEach((id) =>
        document.getElementById(id).addEventListener("input", updateValue)
      );
    })();
  }
};
const confirmation = () => {
  html = `<h2> Page de confirmation </h2><p> salut
${customer.first_name}
</p>
  `;

  createElWithId("confirm", "confirma", html, 1);
};

document.getElementById("btn-user").addEventListener("click", () => {
  formulaire();
});

getProducts(showProducts);

// verification

//email

//code postal script api?
