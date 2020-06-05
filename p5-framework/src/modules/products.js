/* eslint no-return-assign: "error" */
/* eslint no-underscore-dangle: 0 */
import getProducts from './fetch';

const createProduct = (product) => {
  const createDiv = document.createElement('div');
  createDiv.class = 'products_polaroid';
  createDiv.innerHTML = /* html */ `
  <div class="products_polaroid">
  <div class="polaroid" id="polaroid">
    <figure>
      <a href="#product">
        <img src=" ${product.imageUrl}" alt="" class="px-2" />
        <figcaption>
          <h2>${product.name}</h2>
          <span class="price">${(product.price / 100).toFixed(2)}</span>
        </figcaption>
      </a>
    </figure>
  </div>
</div>
`;

  document.getElementById('products_polaroid').appendChild(createDiv);
};
export default (data) => {
  data.map((x) => createProduct(x));
};
