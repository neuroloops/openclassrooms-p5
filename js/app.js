/*
liste de todo
TODO changer le message d'erreur 500
TODO: serparer le error dans un module
TODO: faire la page panier
TODO: faire la page de confirmation
FIXME: changer l'url en fonction de l'id de l'article


*/

const createDivWithId = (targetIdDiv, id, html) => {
  const target = document.getElementById(targetIdDiv);
  const createDiv = document.createElement("div");
  createDiv.setAttribute("class", targetIdDiv);
  createDiv.setAttribute("id", `${id}`);
  createDiv.innerHTML = html;
  target.appendChild(createDiv);
};

const showProducts = (data) => {
  data.forEach(function (item) {
    html = `
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
    <hr>
    `;
    createDivWithId("products", item._id, html);
    const itemId = document.getElementById(item._id);
    itemId.addEventListener("click", (e) => {
      getProducts(showProduct, "http://127.0.0.1:3000/api/cameras/" + item._id);
    });
  });
};

const showProduct = (item) => {
  // supprime les precendent produit
  document.getElementById("product").innerHTML = "";

  html = `
  <div class="description">
    <div class="introProduit ">
      <h2>${item.name}</h2>
        <img src="${item.imageUrl}" alt="image de ${item.name}">
    </div>
    <p>
      ${centToEuro(item.price.toString())}<br>
      ${item.description} <br>
      <form id="addToCart">

    option d'optique: <select id='lenses' > ${item.lenses
      .map((lense, index) => {
        return `<option value="${index}">${lense}</option> ${lense}`;
      })
      .join("")} </select>
      </select>
      <button type="submit" name="submit" value="submit">Ajouter au panier</button>
      </form>
    </p>
  `;
  createDivWithId("product", item._id, html);
};

getProducts(showProducts);
