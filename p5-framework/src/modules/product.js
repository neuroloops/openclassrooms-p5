/* eslint no-underscore-dangle: 0 */

const createProduct = (product) => {
  const selectDiv = document.getElementById('product_page');
  selectDiv.innerHTML = /* html */ `
    <div class="lg:w-2/3 lg:pl-4 px-4 py-4 items-center" id="product_page_img">
    <div class="produit__photo">
      <figure class="">
        <a href="#product">
        <img src="${product.imageUrl}" alt="${product.name}" class="px-2" />
          <figcaption>
            <h2>${product.name}</h2>
          </figcaption>
        </a>
      </figure>
    </div>
  </div>

  <div class="lg:w-1/3 lg:pr-4 px-4 py-4 content-center" id="product_text">
    <h2>Page produit</h2>
    <p class="price">${(product.price / 100).toLocaleString('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    })}</p>
  <div class="w-full">
    <label
      class="block uppercase tracking-wide text-white text-xs font-bold mb-2"
      for="lenses"
    >
    option d'optique
    </label>
    <div class="relative">
    
      
      <select
        class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id="lenses"
      >
      ${product.lenses
        .map((lense, index) => {
          return `<option value="${index}">${lense}</option>${lense}`;
        })
        .join('')}
      </select>
      <div
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
      >
        <svg
          class="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
          />
        </svg>
      </div>
    </div>
  </div>
    <p>
${product.description}
    </p>
  </div>
  `;
};
export default createProduct;
