import './styles/styles.css';
import logoPath from './images/logo.svg';
import favicon from './images/favicon.png';
import heroPath from './images/hero.jpg';

import allProductsModule from './modules/products';
import singleProductModule from './modules/product';
import getProducts from './modules/fetch';
import './modules/tabs';
// icons
import homeIcon from './images/home.svg';
import cartIcon from './images/shopping-cart.svg';
import productsIcon from './images/store-front.svg';

document.getElementById('homeIcon').src = homeIcon;
document.getElementById('cartIcon').src = cartIcon;
document.getElementById('productsIcon').src = productsIcon;

document.getElementById('logo').src = logoPath;
document.getElementById('favicon').href = favicon;
document.getElementById('hero').style.backgroundImage = `url(${heroPath})`;

const version = 4;

document.getElementById('hero_h2').textContent = `Orinoco ${version}`;


const o = {
  a: 'objet1',
  list: ['objet2', 'objet3'],
  panier: [],
  productList: [],

  get total() {
    return this.list.length;
  },

  set addToCart(x) {
    this.panier.push(x);
    console.log('un panier', this.panier);
  },

  get allProductsPages() {
    return allProductsModule(this.productList);
  },
  get singleProductPage() {
    // console.log(this.productList);
    return singleProductModule;
  },

  fetchProductList(x) {
    x.forEach((data) => this.productList.push(data));
    return this.allProductsPages;
  },
};

window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM entièrement chargé et analysé');
  getProducts((data) => o.fetchProductList(data));
  setTimeout(() => console.log(o.productList[0]), 3000);
  setTimeout(() => singleProductModule(o.productList[0]), 4000);
});
