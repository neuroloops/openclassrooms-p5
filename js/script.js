/*
TODO:



[]- creer formulaire

*/

import centToEuro from "./modules/centToEuro.js";
import getProducts from "./modules/fetch.js";

// console.log(getProducts());

const products = document.getElementById("products");
let createDiv = document.createElement("div");

const dataOperation = (data) => {
  console.log("dataOperation", data);

  data.forEach(function (item, i) {
    data[i].cart = 2;
    // return item
    showItems(item);
  });
  // homePage = document.getElementById("products").innerHTML;
};

getProducts(dataOperation);

function showItems(item) {
  const { name, price, imageUrl, _id: id } = item;
  const createDiv = document.createElement("div");

  createDiv.setAttribute("class", "product");
  createDiv.setAttribute("id", `${id}`);
  products.appendChild(createDiv);

  createDiv.innerHTML = `
  <h2>${name}</h2>
  <img src="${imageUrl}" alt="image de ${name}">
    ${centToEuro(price.toString())}<br>
  </p>
  `;
  const itemId = document.getElementById(id);
  itemId.addEventListener("click", (e) => {
    showProduct(item);
  });
}
function showHomePage() {
  window.scrollTo(0, 0);
  document.getElementById("products").style.display = "grid";
  const divMain = document.getElementById("main");
  const divProduct = document.getElementById("product");

  divMain.removeChild(divProduct);
}

function showProduct(item) {
  window.scrollTo(0, 0);
  const divMain = document.getElementById("main");
  const divProducts = document.getElementById("products");
  const createDiv = document.createElement("div");
  createDiv.setAttribute("id", "product");
  divMain.insertBefore(createDiv, divProducts);

  divProducts.style.display = "none";
  createDiv.innerHTML = `
<h2>fiche produit de ${item.name}</h2>

<img src="${item.imageUrl}" alt="image de ${item.name}">
${item.description}</br>
option d'optique : <select id='lenses' > ${item.lenses
    .map((lense, index) => {
      return `<option value="${index}">${lense} </option>`;
    })
    .join("")} </select></br>
  ${centToEuro(item.price.toString())}<br>
dans le panier : ${item.cart}
</p>
`;
}

let title = document.getElementById("title");
title.addEventListener("click", () => {
  showHomePage();
});

let cartIcon = document.getElementById("panier");
cartIcon.addEventListener("click", clearPage);

function clearPage() {
  document.getElementById("products").innerHTML = "";
  console.log("clearPage");
}
