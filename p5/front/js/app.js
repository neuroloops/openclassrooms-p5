const customer = {
  firstname: "",
  lastname: "",
  email: "",
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

class CreateElWithId {
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
      //innerhtml
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
  html = "";
  new CreateElWithId("home", "polaroid", html);
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
    new CreateElWithId("polaroid", divIdItem, html, {
      el: "figure",
      append: true,
    });
    document.getElementById(divIdItem).addEventListener("click", () => {
      // console.log(urlServer + item._id);

      getProducts(showProduct, urlServer + item._id);
    });
  });
};

const showProduct = (item) => {
  /**
   *
   * @param {json} item reponse de fetch avec les infos du produits.
   */
  let lense = 0;
  html = `
    <div class="produit__photo">
      <figure class="polaroid">
        <img src="${item.imageUrl}" alt="image de ${item.name}" />
        <figcaption>
          <h2>${item.name}</h2>
        </figcaption>
      </figure>
    </div>
    <div class="produit__text">
      <p>
        ${item.description}
      </p>
      <p class="price">
        ${centToEuro(item.price.toString())}
      </p>
      <p>
        Option d'optique:

        <select id="lenses">
          ${item.lenses
            .map((lense, index) => {
              return `<option value="${index}">${lense}</option>${lense}`;
            })
            .join("")}</select
        >
      </p>

        <button class="btn" id="btn_addToCart" onclick="location.href='#cart'" type="button">
          <span>Ajouter au panier</span>
        </button>

    </div>
  `;

  new CreateElWithId("product", item._id, html);
  // ecoute le changement dans le menu déroulant
  addEventListener("change", (event) => {
    lense = event.target.value;
  });
  document.getElementById("menu__cart").addEventListener("click", () => {
    displayCart();
  });

  addToCart = () => {
    productsList.names.push(item.name);
    productsList.ids.push(item._id);
    productsList.prices.push(item.price);
    productsList.lenses.push(item.lenses[lense]);
  };

  document.getElementById("btn_addToCart").addEventListener("click", () => {
    event.preventDefault();
    addToCart();
    displayCart();
  });
};
let firstRun = true;

const ZipCheck = (zipCode) => {
  let zipCheck = /\d{5}/;
  zipCheck.test(zipCode)
    ? (customer.zipCode = zipCode)
    : console.log("mauvais zip", zipCode);
};
const EmailCheck = (email) => {
  let emailCheck = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  emailCheck.test(email)
    ? (customer.email = email)
    : console.log("mauvais email");
};
const addToCustomer = (field) => {
  customer[field.name] = field.value;
  console.log(customer);
};
const displayCart = () => {
  let total = 0;

  if (productsList.ids[0] == undefined) {
    html = `
    <div class="form_order">
      <h2 class="form_title">Panier vide </h2>
    </div>`;
  } else {
    html = `
    <div class="form_order">
    <h2 class="form_title">Votre Commande</h2>
    <table>
      <tr>
        <th scope="col">Nom</th>
        <th scope="col">Option</th>
        <th scope="col">Prix</th>
      </tr>
    `;

    productsList.ids.forEach((value, i) => {
      html += `
      <tr><td>${productsList.names[i]}</td><td> ${
        productsList.lenses[i]
      } </td><td> ${centToEuro(productsList.prices[i].toString())}</td></tr>`;
      total += productsList.prices[i];
    });
    html += `</table>
              <p class="total">
                Total ${centToEuro(total.toString())} TTC
              </p>
            </div>`;
  }
  html += `<div class="form">
    <form onsubmit=event.preventDefault();confirmation();>
      <div class="wrap-inputs alert-validate">
        <span class="wrap-inputs__label">Nom</span>
        <input
          class="wrap-inputs__input"
          type="text"
          name="firstname"
          placeholder="Le Gallois"
          onblur="addToCustomer(firstname)"
          required
        />
      </div>
      <div
        class="wrap-inputs alert-validate"
        data-validate="Le prénom est obligatoire"
      >
        <span class="wrap-inputs__label">Prénom</span>
        <input
          class="wrap-inputs__input"
          type="text"
          name="lastname"
          onblur="addToCustomer(lastname)"
          required
          placeholder="Perceval"
        />
      </div>
      <div
        class="wrap-inputs validate-input"
        data-validate="un email valide est requis: ex@abc.xyz"
      >
        <span class="wrap-inputs__label">Email</span>
        <input
          class="wrap-inputs__input"
          type="email"
          name="email"
          placeholder="exemple@abc.xyz"
          onblur="EmailCheck(email.value)"
          required
        />
        <span id="spanEmail"></span>
      </div>
      <div class="wrap-inputs validate-input">
        <span class="wrap-inputs__label">Adresse</span>
        <textarea
          class="wrap-inputs__input"
          required
          name="address"
          onblur="addToCustomer(address)"
          placeholder="20 rue de la taverne du village"
        ></textarea>
      </div>
      <div class="wrap-inputs validate-input">
        <span class="wrap-inputs__label">Code postal</span>
        <input
          class="wrap-inputs__input"
          type="text"
          name="zip"
          required
          onblur="ZipCheck(zip.value)"
          placeholder="00000"
          pattern="[0-9]{5,}$"
          maxlength="5"
        />
      </div>
      <div class="wrap-inputs validate-input">
        <span class="wrap-inputs__label">Ville</span>
        <input
          class="wrap-inputs__input"
          type="text"
          name="city"
          required
          onblur="addToCustomer(city)"
          placeholder="Kaamelott"
        />
      </div>

      <input
        type="submit"
        value="Commander"
        id="btn-confirmation"
        class="form__btn"

      />
    </form>
  </div> `;
  new CreateElWithId("cart", "form_wrapper", html);
};

const confirmation = () => {
  document.getElementById("cart").classList.remove("active");
  document.getElementById("confirm").classList.add("active");
  cart.contact.firstName = customer.firstname;
  cart.contact.lastName = customer.lastname;
  cart.contact.address = customer.address;
  cart.contact.city = customer.zipCode + customer.city;
  cart.contact.email = customer.email;
  cart.products = productsList.ids;
  console.log("page confirmation");
  console.log(cart);

  const insertPost = async function (data) {
    let response = await fetch(urlServer + "order", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(data),
    });
    let responseData = await response.json();
    html = `<div class="wrapper">
      <h2 class="form_title">Page de confirmation</h2>
      <p>
      commande bien prise en compte <br />
        numero de commande : ${responseData.orderId}
        recapitulatif <br />
        e-mail :${cart.contact.email} <br />
        Nom : ${cart.contact.lastName} ${cart.contact.firstName} <br />
        addresse : ${cart.contact.address} <br />
        ${cart.contact.city} <br />
        <b>merci pour votre commande</b>
      </p>
      </div>
    `;
    new CreateElWithId("confirm", "confirm_content", html);
  };

  insertPost(cart);
};

document.getElementById("menu__cart").addEventListener("click", () => {
  displayCart();
});

getProducts(showProducts);
