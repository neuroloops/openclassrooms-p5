/* eslint no-underscore-dangle: 0 */

const createProduct = (product) => {
  const createDiv = document.createElement('div');
  createDiv.className = 'products_polaroid flex content-start flex-wrap justify-around';
  createDiv.innerHTML = /* html */ `

  <div class="polaroid lg:w-1/2 lg:pl-4 px-4 py-4 items-center" >
    <figure>
      <a href="#product">
        <img src="https://picsum.photos/id/1020/600/400" alt="" />
        <figcaption>
          <h2>Ours</h2>
            <span class="price">400€</span>
        </figcaption>
      </a>
    </figure>
  </div>

  <div class="flex-none lg:w-1/3 lg:pr-4 px-4 py-4">
    <h2>Page produit</h2>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores ut quibusdam fugiat
      fugit, eaque aut culpa commodi. Quidem at omnis fugiat debitis pariatur doloribus sapiente
      impedit earum, quam, beatae in placeat recusandae labore officia? Tempore, esse earum.
      Molestias quos quis officiis enim quod cupiditate necessitatibus optio. Dolorum eos dolore
      adipisci, impedit quas quis saepe iure earum quod nemo culpa sint atque unde esse
      architecto amet iusto quae nam, nulla repellat voluptatum maxime! Ipsa, distinctio eius
      itaque numquam excepturi fuga facere totam nemo natus iusto provident asperiores
      praesentium ea inventore id accusamus maiores neque ratione a omnis nam minus! Dolores,
      ratione?
    </p>
    </div>
`;

  document.getElementById('product_page').appendChild(createDiv);
};
export default createProduct;
