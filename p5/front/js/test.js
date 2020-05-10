function retrieveContent() {
  const url =
    "http://127.0.0.1:3000/api/cameras/";

  const response =  fetch(url);
  return response.json();
}
// import retrieveContent from "query";



async function showContent() {
  try {
    const content = await retrieveContent();

    let elt = document.createElement("div");
    elt.innerHTML = content.join("<br />");

    document.getElementsByTagName("body")[0].appendChild(elt);
  } catch (e) {
    console.log("Error", e);
  }
}

showContent();
a = 12;
// console.log(showContent());
