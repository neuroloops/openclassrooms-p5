/* eslint no-underscore-dangle: 0 */

const createProduct = (product) => {
  const selectDiv = document.getElementById('product_page');
  selectDiv.innerHTML = /* html */ `
    <div class="lg:w-2/3 lg:pl-4 px-4 py-4 items-center" id="product_page_img">
    <div class="polaroid">
      <figure>
        <a href="#product">
        <img src="${product.imageUrl}" alt="${product.name}" class="px-2" />
          <figcaption>
            <h2>${product.name}</h2>
            <span class="price">${(product.price / 100).toLocaleString('fr-FR', {
              style: 'currency',
              currency: 'EUR',
            })}</span>
          </figcaption>
        </a>
      </figure>
    </div>
  </div>

  <div class="flex-none lg:w-1/3 lg:pr-4 px-4 py-4" id="product_text">
    <h2>Page produit</h2>

    <p>
${product.description}
    </p>
  </div>
  `;
};
export default createProduct;
