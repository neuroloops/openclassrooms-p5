export default function error(err) {
  console.error("pas de donnée:", err);
    // const imageUrl =
    // "https://image.freepik.com/vecteurs-libre/glitch-error-404-page_23-2148105404.jpg";

  const products = document.getElementById("products");
  const createDiv = document.createElement("div");
  products.appendChild(createDiv);


  createDiv.innerHTML = `
  <h2>erreur avec le serveur de donnée</h2>
  <p>${err}</p>
  <img src="${imageUrl}" alt="erreur 503">
`;
}
