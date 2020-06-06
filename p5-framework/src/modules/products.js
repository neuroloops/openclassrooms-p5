/* eslint no-underscore-dangle: 0 */

const createProduct = (product) => {
  const createDiv = document.createElement('div');
  createDiv.className = 'products_polaroid';
  createDiv.innerHTML = /* html */ `
  <div class="products_polaroid">
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
`;

  document.getElementById('products_page').appendChild(createDiv);
};
export default (data) => {
  data.map((product) => createProduct(product));
};
