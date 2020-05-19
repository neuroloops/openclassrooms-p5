urlServer = "http://158.69.243.193:3000/api/cameras/";
// urlServer = "http://127.0.0.1:3000/api/cameras/";
function getProducts(dataOperation, url = urlServer) {
  const fetchProducts = async function () {
    try {
      let response = await fetch(url);
      if (response.ok) {
        let data = await response.json();
        // pour afficher les data fetch dans la console
        // console.log("data", data);
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
    const imageUrl =
      "https://image.freepik.com/vecteurs-libre/glitch-error-404-page_23-2148105404.jpg";
    divHome = document.getElementById("home");
    const createDiv = document.createElement("div");
    divHome.appendChild(createDiv);
    console.error("pas de donnée:", err);
    createDiv.innerHTML = `
      <h2>erreur avec le serveur de donnée</h2>
      <p>${err}</p>
      <img src="${imageUrl}" alt="erreur 503" />
    `;
  };
}
