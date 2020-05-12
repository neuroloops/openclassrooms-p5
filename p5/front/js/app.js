/*
liste de todo
TODO changer le message d'erreur 500
TODO: serparer le error dans un module
TODO: email
TODO: index db
TODO: verification
TODO: code postal script api?
FIXME: changer l'url en fonction de l'id de l'article
*/

let check = () => console.log(parentNode);

const customer = {
  first_name: "",
  last_name: "",
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
      console.log(urlServer + item._id);

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
      <p class="produit">
        ${centToEuro(item.price.toString())}<br />
        ${item.description} </p>
        <p>
        option d'optique:
        <select id="lenses">
          ${item.lenses
            .map((lense, index) => {
              return `<option value="${index}">${lense}</option>${lense}`;
            })
            .join("")}</select>
      </p>
      <button class="btn">
      <span>Ajouter au panier</span>
    </button>
    </div>
  `;

  new CreateElWithId("product", item._id, html);
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
let firstRun = true;

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
    });
    html += `</table>
    <p class="total">
    Total ${centToEuro(total.toString())} TTC
  </p>
    `;
  }
  html += html`<div>
      <form id="form">
        <input id="first_name" type="text" class="validate" />
        <label for="first_name">Prénom</label>
        <br />
        <input id="last_name" type="text" class="validate" />
        <label for="last_name">Nom</label><br />
        <input
          id="email"
          class="validate"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$"
        /><span id="spanEmail" class="check"></span>
        <label for="email">Email</label><span class="check"></span> <br />
        <input id="address" type="text" class="validate" />
        <label for="address">Adresse</label><br />
        <input
          id="zipCode"
          type="text"
          maxlength="5"
          class="validate"
          pattern="[0-9]{5,}$"
        /><span class="check" id="spanZipCode"></span>
        <label for="zipCode">Code postal</label> <br />
        <input id="city" type="text" class="validate" />
        <label for="city">Ville</label> <br />

        <a class="btn" href="#confirm" id="btn-confirmation">Confirmation</a>
        <button type="submit">Log in</button>
      </form>
    </div>
    <div class="container-contact100">
      <div class="wrap-contact100">
        <form class="contact100-form validate-form">
          <span class="contact100-form-title">
            Say Hello!
          </span>

          <div
            class="wrap-input100 validate-input"
            data-validate="Name is required"
          >
            <span class="label-input100">Your Name</span>
            <input
              class="input100"
              type="text"
              name="name"
              placeholder="Enter your name"
            />
            <span class="focus-input100"></span>
          </div>

          <div
            class="wrap-input100 validate-input"
            data-validate="Valid email is required: ex@abc.xyz"
          >
            <span class="label-input100">Email</span>
            <input
              class="input100"
              type="text"
              name="email"
              placeholder="Enter your email addess"
            />
            <span class="focus-input100"></span>
          </div>

          <div class="wrap-input100 input100-select">
            <span class="label-input100">Needed Services</span>
            <div>
              <select class="selection-2" name="service">
                <option>Choose Services</option>
                <option>Online Store</option>
                <option>eCommerce Bussiness</option>
                <option>UI/UX Design</option>
                <option>Online Services</option>
              </select>
            </div>
            <span class="focus-input100"></span>
          </div>

          <div class="wrap-input100 input100-select">
            <span class="label-input100">Budget</span>
            <div>
              <select class="selection-2" name="budget">
                <option>Select Budget</option>
                <option>1500 $</option>
                <option>2000 $</option>
                <option>2500 $</option>
              </select>
            </div>
            <span class="focus-input100"></span>
          </div>

          <div
            class="wrap-input100 validate-input"
            data-validate="Message is required"
          >
            <span class="label-input100">Message</span>
            <textarea
              class="input100"
              name="message"
              placeholder="Your message here..."
            ></textarea>
            <span class="focus-input100"></span>
          </div>

          <div class="container-contact100-form-btn">
            <div class="wrap-contact100-form-btn">
              <div class="contact100-form-bgbtn"></div>
              <button class="contact100-form-btn">
                <span>
                  Submit
                  <i
                    class="fa fa-long-arrow-right m-l-7"
                    aria-hidden="true"
                  ></i>
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div id="dropDownSelect1"></div> `;
  new CreateElWithId("cart", "cart_content", html);

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
        ZipCheck(customer.zipCode);
        EmailCheck(customer.email);
      };

      // arrayIds.forEach((id) =>
      //   document.getElementById(id).addEventListener("input", updateValue)
      // );
    })();
  }
  const ZipCheck = (zipCode) => {
    let zipCheck = /\d{5}/;
    zipCheck.test(zipCode)
      ? (document.getElementById("spanZipCode").innerHTML = "✔️")
      : console.log("mauvais zip");
  };
  const EmailCheck = (email) => {
    let emailCheck = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    emailCheck.test(email)
      ? (document.getElementById("spanEmail").innerHTML = "✔️")
      : console.log("mauvais email");
  };
};

const confirmation = () => {
  cart.contact.firstName = customer.first_name;
  cart.contact.lastName = customer.last_name;
  cart.contact.address = customer.address;
  cart.contact.city = customer.zipCode + customer.city;
  cart.contact.email = customer.email;
  cart.products = productsList.ids;

  const insertPost = async function (data) {
    let response = await fetch(urlServer + "order", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(data),
    });
    let responseData = await response.json();
    html = `
      <h2>Page de confirmation</h2>
      <p>
        numero de commande : ${responseData.orderId} commande bien prise en
        compte <br />
        recapitulatif <br />
        e-mail :${cart.contact.email} <br />
        Nom : ${cart.contact.lastName} ${cart.contact.firstName} <br />
        addresse : ${cart.contact.address} <br />
        ${cart.contact.city} <br />
        merci pour votre commande
      </p>
    `;
    new CreateElWithId("confirm", "confirm_content", html);
  };

  insertPost(cart);
};

document.getElementById("menu__cart").addEventListener("click", () => {
  displayCart();
});

getProducts(showProducts);
