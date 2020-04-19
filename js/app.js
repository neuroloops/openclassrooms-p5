// verification des donnée sinon
// fectch
// appel de la home page

// au click envoie sur le pannier
/*
TODO:



[]- creer formulaire

*/

import centToEuro from "./modules/centToEuro.js";
import getProducts from "./modules/fetch.js";

const showProducts = (data) => {
  data.forEach(function (item, i) {
    data[i].cart = 2;
    const { name, price, imageUrl, _id: id } = item;
    const products = document.getElementById("products");
    const createDiv = document.createElement("div");

    createDiv.setAttribute("class", "product");
    createDiv.setAttribute("id", `${id}`);
    products.appendChild(createDiv);

    createDiv.innerHTML = `
    <a href="#product">
  <h2>${name}</h2>
  ${item._id}
  <img src="${imageUrl}" alt="image de ${name}">
    ${centToEuro(price.toString())}<br>
  </p></a>
  `;
    const itemId = document.getElementById(id);
    itemId.addEventListener("click", (e) => {
      showProduct(item);
    });
  });
};

getProducts(showProducts);

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
</p>
`;
};
