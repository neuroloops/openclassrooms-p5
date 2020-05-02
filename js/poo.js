class CamerasShop {
  constructor(display, tab = {}) {
    this.display = display;
    this.tab = Object.assign(
      {},
      {
        page: "home",
      },
      tab
    );
  }

  /**
   *
   * @param {function} dataOperation
   * @param {string} url
   * @returns {Promise}
   */

  getProducts(dataOperation, url = "http://127.0.0.1:3000/api/cameras") {
    const fetchProducts = async function () {
      try {
        let response = await fetch(url);
        if (response.ok) {
          let data = await response.json();
          // pour afficher les data fetch dans la console
          console.log("data", data);
          return dataOperation(data);
        } else {
          let err = response.status;
          if (err == 404) {
            console.log("error 404");
            error(err);
          } else {
            console.error("retour du serveur: ", err);
            error(err);
          }
        }
      } catch (err) {
        console.log("error", err);
        error(err);
      }
    };
    fetchProducts();

    const error = (err) => {
      let divHome = "";
      if ((err = 500)) {
        divHome = document.getElementById("product");
      } else {
        divHome = document.getElementById("home");
      }
      console.error("pas de donnée:", err);
      const imageUrl =
        "https://image.freepik.com/vecteurs-libre/glitch-error-404-page_23-2148105404.jpg";
      const createDiv = document.createElement("div");
      divHome.appendChild(createDiv);
      createDiv.innerHTML = `
        <h2>erreur avec le serveur de donnée</h2>
        <p>${err}</p>
        <img src="${imageUrl}" alt="erreur 503">
      `;
    };
  }
  /**
   *
   * @param {string} targetIdDiv
   * @param {string} 'url de l'api'
   * @returns
   */

  createDivWithId = (targetIdDiv, id, html) => {
    const target = document.getElementById(targetIdDiv);
    const createDiv = document.createElement("div");
    createDiv.setAttribute("class", targetIdDiv);
    createDiv.setAttribute("id", `${id}`);
    createDiv.innerHTML = html;
    target.appendChild(createDiv);
  };

  showProducts = (data) => {
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
        getProducts(
          showProduct,
          "http://127.0.0.1:3000/api/cameras/" + item._id
        );
      });
    });
  };
}
