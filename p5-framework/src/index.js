import './styles/styles.css';
import './styles/polaroid.css';
import logoPath from './images/logo.svg';
import favicon from './images/favicon.png';
import heroPath from './images/hero.jpg';
import allProductsModule from './modules/products';
import singleProductModule from './modules/product';
import getProducts from './modules/fetch';

const logoImg = document.getElementById('logo');
logoImg.src = logoPath;
const faviconImg = document.getElementById('favicon');
faviconImg.href = favicon;
const heroImg = document.getElementById('hero');
heroImg.style.backgroundImage = `url(${heroPath})`;

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
  },

  get allProductsPages() {
    return allProductsModule(this.productList);
  },
  get singleProductPage() {
    return singleProductModule();
  },

  fetchProductList(x) {
    x.map((data) => this.productList.push(data));
    return this.allProductsPages;
  },
};

getProducts((data) => o.fetchProductList(data));


