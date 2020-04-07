fetch("http://127.0.0.1:3000/api/cameras")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // Work with JSON data here
    console.log("les data:", data);
    for (let item of data) {
      addElement(item);
      console.log(item);
    }
    return data;
  })
  .catch((err) => {
    // Do something for an error here
    console.error("pas de data:", err);
    let item = {
      name: "erreur avec la base de donnée",
      lenses: err,
      imageUrl:
        "https://image.freepik.com/vecteurs-libre/glitch-error-404-page_23-2148105404.jpg",
    };
    addElement(item);
  });

function addElement(item) {
  let divElt = document.getElementById("main");
  const newElt = document.createElement("section");
  const nameElt = document.createElement("h2");
  const pElt = document.createElement("p");
  const articleElt = document.createElement("article");
  const lensElt = document.createElement("span");
  const priceElt = document.createElement("span");
  const descrElt = document.createElement("span");
  const imgElt = document.createElement("img");

  nameElt.textContent = item.name;
  lensElt.textContent = "Lens: " + item.lenses;
  imgElt.src = item.imageUrl;
  priceElt.textContent = item.price;
  descrElt.textContent = item.description;

  divElt.appendChild(newElt);
  newElt.appendChild(nameElt);
  newElt.appendChild(articleElt);

  articleElt.appendChild(lensElt);
  articleElt.appendChild(document.createElement("BR"));
  articleElt.appendChild(descrElt);
  articleElt.appendChild(document.createElement("BR"));
  articleElt.appendChild(priceElt);
  articleElt.appendChild(document.createElement("BR"));

  newElt.appendChild(imgElt);
}
