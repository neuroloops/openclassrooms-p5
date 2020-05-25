const customer = {
  firstname: '',
  lastname: '',
  email: '',
  address: '',
  zipCode: '',
  city: ''
};

const productsList = {
  ids: [],
  names: [],
  prices: [],
  lenses: []
};

const cart = {
  contact: {
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    email: ''
  },
  products: []
};
const urlServer = 'http://158.69.243.193:3000/api/cameras/';

function getProducts(dataOperation, url = urlServer) {
  async function fetchProducts() {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        // pour afficher les data fetch dans la console
        // console.log("data", data);
        return dataOperation(data);
      } else {
        let err = response.status;
        if (err === 404) {
          console.log('error 404');
          error(err);
        } else {
          console.error('retour du serveur: ', err);
          error(err);
        }
      }
    } catch (err) {
      // console.log('error', err);
      error(err);
    }
  }

  fetchProducts();

  const error = err => {
    let divHome = '';
    const imageUrl =
      'https://image.freepik.com/vecteurs-libre/glitch-error-404-page_23-2148105404.jpg';
    divHome = document.getElementById('home');
    const createDiv = document.createElement('div');
    divHome.appendChild(createDiv);
    // console.error('pas de donnée:', err);
    createDiv.innerHTML = `
      <h2>erreur avec le serveur de donnée</h2>
      <p>${err}</p>
      <img src="${imageUrl}" alt="erreur 503" />
    `;
  };
}

function centToEuro(price) {
  const cent = price.slice(-2);
  const euro = price.slice(0, -2);
  return `${euro},${cent}€`;
}

class CreateElWithId {
  /**
   * @param {string} targetIdDiv  Div parent
   * @param {string} id - Id de la div crée
   * @param {string} html - l'element html
   * @param {Object} options
   * @param {Object} options.el nom de la balise de l'el à créer
   * @param {Object} options.append true or false (default = false)
   */
  constructor(targetIdDiv, id, html, options = {}) {
    this.targetIdDiv = targetIdDiv;
    this.id = id;
    this.html = html;
    this.options = Object.assign(
      {},
      {
        el: 'div',
        append: false
      },
      options
    );
    this.target = document.getElementById(targetIdDiv);
    this.createEl = document.createElement(this.options.el);
    this.createEl.setAttribute('class', targetIdDiv);
    this.createEl.setAttribute('id', id);
    this.createEl.innerHTML = html;
    this.create();
  }
  create() {
    // append uniquement si  true ou si l'element n'existe pas
    if (this.target.childNodes[0] != null && this.options.append === false) {
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

const showProducts = data => {
  let html = '';
  new CreateElWithId('home', 'polaroid', html);
  data.forEach(function(item) {
    html = /*html*/ `
      <a href="#product">
        <img src="${item.imageUrl}" alt="image de ${item.name}" />
        <figcaption>
          <h2>${item.name}</h2>
          <span class="price">${centToEuro(item.price.toString())}</span>
        </figcaption>
      </a>
    `;
    let divIdItem = 'id_' + item._id;
    new CreateElWithId('polaroid', divIdItem, html, {
      el: 'figure',
      append: true
    });
    document.getElementById(divIdItem).addEventListener('click', () => {
      // console.log(urlServer + item._id);

      getProducts(showProduct, urlServer + item._id);
    });
  });
};

const showProduct = item => {
  /**
   *
   * @param {json} item réponse de fetch avec les infos du produits.
   */
  let lense = 0;
  let html = `
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
        option d'optique:
        <select id="lenses">
          ${item.lenses
            .map((lense, index) => {
              return `<option value="${index}">${lense}</option>${lense}`;
            })
            .join('')}</select
        >
      </p>

      <button
        class="btn"
        id="btn_addToCart"
        onclick="location.href='#cart'"
        type="button"
      >
        <span>Ajouter au panier</span>
      </button>
    </div>
  `;

  new CreateElWithId('product', item._id, html);
  // ecoute le changement dans le menu déroulant
  addEventListener('change', event => {
    lense = event.target.value;
  });
  document.getElementById('menu__cart').addEventListener('click', () => {
    displayCart();
  });

  const addToCart = () => {
    productsList.names.push(item.name);
    productsList.ids.push(item._id);
    productsList.prices.push(item.price);
    productsList.lenses.push(item.lenses[lense]);
  };

  document.getElementById('btn_addToCart').addEventListener('click', () => {
    event.preventDefault();
    addToCart();
    displayCart();
  });
};

const ZipCheck = zipCode => {
  const zipCheck = /\d{5}/;
  zipCheck.test(zipCode) ? (customer.zipCode = zipCode) : console.log('mauvais zip', zipCode);
};
const EmailCheck = email => {
  const emailCheck = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  emailCheck.test(email) ? (customer.email = email) : console.log('mauvais email');
};
const addToCustomer = field => {
  customer[field.name] = field.value;
  console.log(customer);
};
const displayCart = () => {
  let total = 0;

  if (productsList.ids[0] == undefined) {
    let html = /* html */ ` <div class="form_order">
      <h2 class="form_title">panier vide</h2>
    </div>`;
  } else {
    let html = /* html */ `<div class="form">
      <div class="form_order">
        <h2 class="form_title">Votre Commande</h2>
        <table>
          <tr>
            <th scope="col">nom</th>
            <th scope="col">option</th>
            <th scope="col">prix</th>
          </tr>
        </table>
      </div>
    </div> `;

    productsList.ids.forEach((value, i) => {
      html += `
      <tr><td>${productsList.names[i]}</td><td> ${productsList.lenses[i]} </td><td> ${centToEuro(
        productsList.prices[i].toString()
      )}</td></tr>`;
      total += productsList.prices[i];
    });
    html += /* html */ `</table>
              <p class="total">
                Total ${centToEuro(total.toString())} TTC
              </p>
            </div>`;
  }
  html += /* html */ `<div class="form">
    <form onsubmit="event.preventDefault();confirmation();">
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
        <span class="wrap-inputs__label">adresse</span>
        <textarea
          class="wrap-inputs__input"
          required
          name="address"
          onblur="addToCustomer(address)"
          placeholder="20 rue de la taverne du village"
        ></textarea>
      </div>
      <div class="wrap-inputs validate-input">
        <span class="wrap-inputs__label">code postal</span>
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
      <div
        class="wrap-inp
      uts validate-input"
      >
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
  </div>`;
  new CreateElWithId('cart', 'form_wrapper', html);
};

const confirmation = () => {
  document.getElementById('cart').classList.remove('active');
  document.getElementById('confirm').classList.add('active');
  cart.contact.firstName = customer.firstname;
  cart.contact.lastName = customer.lastname;
  cart.contact.address = customer.address;
  cart.contact.city = customer.zipCode + customer.city;
  cart.contact.email = customer.email;
  cart.products = productsList.ids;

  /* eslint-disable */
  console.log('page confirmation');
  console.log(cart);
  /* eslint-enable */

  const insertPost = async function(data) {
    const response = await fetch(urlServer + 'order', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(data)
    });
    let html = /* html */ `<div class="wrapper">
      <h2 class="form_title">Page de confirmation</h2>
      <p>
      commande bien prise en compte <br />
        numéro de commande : ${responseData.orderId}
        récapitulatif <br />
        e-mail :${cart.contact.email} <br />
        Nom : ${cart.contact.lastName} ${cart.contact.firstName} <br />
        adresse : ${cart.contact.address} <br />
        ${cart.contact.city} <br />
        <b>merci pour votre commande</b>
      </p>
      </div>
    `;
    new CreateElWithId('confirm', 'confirm_content', html);
  };

  insertPost(cart);
};

document.getElementById('menu__cart').addEventListener('click', () => {
  displayCart();
});

getProducts(showProducts);
