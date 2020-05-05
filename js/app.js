/*
liste de todo
TODO changer le message d'erreur 500
TODO: serparer le error dans un module
TODO: faire la page panier
TODO: faire la page de confirmation
FIXME: changer l'url en fonction de l'id de l'article
*/
let lense = 0;
let firstRun = true;

const customer = {
  first_name: "",
  last_name: "",
  email_inline: "",
  address: "",
  zipCode: "",
  city: "",
};

const productsList = {
  ids: [],
  names: [],
  prices: [],
  lenses: [],
};

const cart = {
  contact: {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    email: "",
  },
  products: [],
};

class createElWithId {
  /**
   * @param {string} targetIdDiv Div parent
   * @param {string} id Id de la div crée
   * @param {string} html l'element html
   * @param {Object} options
   * @param {Object} options.el nome de la balise de l'el à creer
   * @param {Object} options.append true or false (default = false)
   */
  constructor(targetIdDiv, id, html, options = {}) {
    this.targetIdDiv = targetIdDiv;
    this.id = id;
    this.html = html;
    this.options = Object.assign(
      {},
      {
        el: "div",
        append: false,
      },
      options
    );
    this.target = document.getElementById(targetIdDiv);
    this.createEl = document.createElement(this.options.el);
    this.createEl.setAttribute("class", targetIdDiv);
    this.createEl.setAttribute("id", id);
    this.createEl.innerHTML = html;
    this.create();
  }
  create() {
    // append uniquement si  true ou si l'element n'existe pas
    if (this.target.childNodes[0] != null && this.options.append == false) {
      this.target.removeChild(this.target.childNodes[0]);
      this.target.appendChild(this.createEl);
    } else {
      this.target.appendChild(this.createEl);
    }
  }
}

/**
 *
 * @param {json} data retour du fecth
 */

const showProducts = (data) => {
  data.forEach(function (item) {
    html = `
      <a href="#product">
        <img src="${item.imageUrl}" alt="image de ${item.name}" />
        <figcaption>
          <h2>${item.name}</h2>
          <span class="price">${centToEuro(item.price.toString())}</span>
        </figcaption>
      </a>
    `;
    let divIdItem = "id_" + item._id;
    new createElWithId("polaroid", divIdItem, html, {
      el: "figure",
      append: true,
    });
    document.getElementById(divIdItem).addEventListener("click", () => {
      getProducts(showProduct, "http://127.0.0.1:3000/api/cameras/" + item._id);
    });
  });
};

const showProduct = (item) => {
  /**
   *
   * @param {json} item reponse de fetch avec les infos du produits.
   */
  html = `
    <div class="description>
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

  new createElWithId("product", item._id, html);
  // ecoute le changement dans le menu déroulant
  addEventListener("change", (event) => {
    lense = event.target.value;
  });

  document.getElementById("btn").addEventListener("click", () => {
    productsList.names.push(item.name);
    productsList.ids.push(item._id);
    productsList.prices.push(item.price);
    productsList.lenses.push(item.lenses[lense]);
    displayCart();
  });
};

const displayCart = () => {
  let total = 0;
  if (productsList.ids[0] == undefined) {
    html = `<h3 class="total"> panier vide </h3>`;
  } else {
    html = `<table>
    <tr>
      <th scope="col">nom</th>
      <th scope="col">option</th>
      <th scope="col">prix</th>
    </tr>
  `;

    productsList.ids.forEach((value, i) => {
      html += `<tr><td>${productsList.names[i]}</td><td> ${
        productsList.lenses[i]
      } </td><td> ${centToEuro(productsList.prices[i].toString())}</td></tr>`;
      total += productsList.prices[i];
      i++;
    });
    html += `</table>
    <p class="total">
    Total ${centToEuro(total.toString())} TTC
  </p>
    `;
  }
  html += ` <div>

    <form id="form">
      <input id="first_name" type="text" class="validate" />
      <label for="first_name">Prénom</label>
      <br />
      <input id="last_name" type="text" class="validate" />
      <label for="last_name">Nom</label><br />
      <input id="email_inline" type="email" class="validate" />
      <label for="email_inline">Email</label><br />
      <input id="address" type="text" class="validate" />
      <label for="address">Adresse</label><br />
      <input id="zipCode" type="text" maxlength="5" class="validate" />
      <label for="zipCode">Code postal</label> <br />
      <input id="city" type="text" class="validate" />
      <label for="city">Ville</label> <br />

      <a class="btn" href="#confirm" id="btn-confirmation">Confirmation</a>
    </form>
  </div>`;
  new createElWithId("cart", "cart_content", html);

  document.getElementById("btn-confirmation").addEventListener("click", () => {
    confirmation();
  });

  if (firstRun == true) {
    (function () {
      const inputTag = document.querySelectorAll("input");
      const arrayIds = [...inputTag].map((item) => item.id);

      firstRun = false;
      updateValue = (e) => {
        customer[e.target.id] = e.target.value;
      };

      arrayIds.forEach((id) =>
        document.getElementById(id).addEventListener("input", updateValue)
      );
    })();
  }
};
// const cart = {
//   contact: {
//     firstName: "",
//     lastName: "",
//     address: "",
//     city: "",
//     email: "",
//   },
//   products: [],
// };

const confirmation = () => {
  cart.contact.firstName = customer.first_name;
  cart.contact.lastName = customer.last_name;
  cart.contact.address = customer.address;
  cart.contact.city = customer.zipCode + customer.city;
  cart.contact.email = customer.email_inline;

  cart.products = productsList.ids;

  const insertPost = async function (data) {
    let response = await fetch("http://localhost:3000/api/cameras/order/", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(data),
    });
    let responseData = await response.json();
    console.log(responseData);
  };

  insertPost(cart);
  html = `<h2>Page de confirmation</h2>
    <p>
      commande bien prise en compte <br />
      recapitulatif <br />

      e-mail :${customer.email_inline} <br />
      Nom : ${customer.last_name} ${customer.first_name} <br />
      addresse : ${customer.address} <br />
      ${customer.zipCode}, ${customer.city} <br />
      ${productsList.ids}
      merci pour votre commande
    </p>`;

  new createElWithId("confirm", "confirm_content", html);
};

document.getElementById("menu__cart").addEventListener("click", () => {
  displayCart();
});

getProducts(showProducts);

// verification

//email

//code postal script api?
