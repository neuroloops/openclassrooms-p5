fetch("http://127.0.0.1:3000/api/cameras")
  .then((response) => {
    return response.json();
  })
  .then(dataOperation)

  .catch((err) => {
    error503(err);
  });

const error503 = (err) => {
  console.error("pas de donnée:", err);

  const imageUrl =
    "https://image.freepik.com/vecteurs-libre/glitch-error-404-page_23-2148105404.jpg";
  const divMain = document.getElementById("main");
  const createDiv = document.createElement("div");

  divMain.appendChild(createDiv);

  createDiv.innerHTML = `
  <h2>erreur avec la base de donnée</h2>
  <p>${err}</p>
  <img src="${imageUrl}" alt="erreur 503">

  `;
};
