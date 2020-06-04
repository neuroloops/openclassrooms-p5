import './styles/styles.css';
import './styles/polaroid.css';
import logoPath from './images/logo.svg';
import favicon from './images/favicon.png';
import heroPath from './images/hero.jpg';

import getProducts from './modules/fetch';

const showProducts = (data) => {
  console.log('affichage de data', data);
};

getProducts(showProducts);

const logoImg = document.getElementById('logo');
logoImg.src = logoPath;
const faviconImg = document.getElementById('favicon');
faviconImg.href = favicon;
const heroImg = document.getElementById('hero');
heroImg.style.backgroundImage = `url(${heroPath})`;

const version = 4;

document.getElementById('hero_h2').textContent = `Orinoco ${version}`;
