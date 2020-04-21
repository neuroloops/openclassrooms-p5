/*
liste de todo
TODO changer le message d'erreur 500
TODO: serparer le error dans un module
TODO: faire la page panier
TODO: faire la page de confirmation
FIXME: changer l'url en fonction de l'id de l'article


*/

import centToEuro from "./modules/centToEuro.js";
import getProducts from "./modules/fetch.js";

const showProducts = (data) => {
  data.forEach(function (item) {
    const products = document.getElementById("products");
    const createDiv = document.createElement("div");

    createDiv.setAttribute("class", "");
    createDiv.setAttribute("id", `${item._id}`);
    products.appendChild(createDiv);

    createDiv.innerHTML = `
    <a href="#product" class="product">
      <div class="img-shadow">
        <img src="${item.imageUrl}" alt="image de ${item.name}">
      </div>
      <div class="textProduct">
        <h2>${item.name}</h2><p class="price">${centToEuro(
      item.price.toString()
    )}</p>
      </div>
    </a>
    `;
    const itemId = document.getElementById(item._id);
    itemId.addEventListener("click", (e) => {
      // showProduct(item);
      getProducts(showProduct, "http://127.0.0.1:3000/api/cameras/" + item._id);
    });
  });
};

const showProduct = (item) => {
  const product = document.getElementById("product");
  const createDiv = document.createElement("div");
  createDiv.setAttribute("class", "product");
  createDiv.setAttribute("id", `${item._id}`);
  product.appendChild(createDiv);

  product.innerHTML = `
  <div class="description">
    <div class="introProduit">
      <h2>${item.name}</h2>
        <img src="${item.imageUrl}" alt="image de ${item.name}">
    </div>
    <p>
      ${centToEuro(item.price.toString())}<br>
      ${item.description} <br>

    </p>
    <label for="lenses">Choix d'optique</label>
    <select id="lense">
      <option value="bonjour"> bonjour </option>
      ${item.lenses.map(
        (lense) => `<option value="${lense}"> ${lense} </option>`
      )}
    </select>

    
  `;

  for (let lense of item.lenses) {
    console.log(lense);

    `${lense}`;
  }
  `
  ${item.lenses}
</p>
`;
};

getProducts(showProducts);
