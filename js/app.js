/*
liste de todo
TODO changer le message d'erreur 500
  fdsfdsfdsf
TODO: serparer le error dans un module
FIXME: test 2
TOD:[]- creer formulaire

*/

import centToEuro from "./modules/centToEuro.js";
import getProducts from "./modules/fetch.js";

const showProducts = (data) => {
  data.forEach(function (item) {
    const products = document.getElementById("products");
    const createDiv = document.createElement("div");

    createDiv.setAttribute("class", "product");
    createDiv.setAttribute("id", `${item._id}`);
    products.appendChild(createDiv);

    createDiv.innerHTML = `
    <a href="#product">
  <h2>${item.name}</h2>

  <img src="${item.imageUrl}" alt="image de ${item.name}">
    ${centToEuro(item.price.toString())}<br>
  </p></a>
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
<h2>${item.name}</h2>
<img src="${item.imageUrl}" alt="image de ${item.name}">
  ${centToEuro(item.price.toString())}<br>
  ${item.description}
  `;
  document.addEventListener("DOMContentLoaded", function () {
    var elems = document.querySelectorAll(".materialboxed");
    var instances = M.Materialbox.init(elems, option);
    instances();
  });

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
