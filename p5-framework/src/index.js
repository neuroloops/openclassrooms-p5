import './styles/styles.css';
import './styles/polaroid.css';
import logoPath from './images/logo.svg';
import favicon from './images/favicon.png';
import heroPath from './images/hero.jpg';
// import { getProducts } from './modules/fetch';
// import { f1 } from './modules/fetch';

async function f0() {
  const thenable = {
    then: function (resolve, _reject) {
      resolve('résolu :)');
    },
  };
  console.log(await thenable); // résolu :)
}
f0();

async function fetchProducts() {
  const response = await fetch('http://158.69.243.193:3000/api/cameras/');
  if (response.ok) {
    const json = await response.json();
    console.log(await json);
  } else {
    console.log(`HTTP-Error: $(response2.status)`);
  }
}
fetchProducts();

const logoImg = document.getElementById('logo');
logoImg.src = logoPath;
const faviconImg = document.getElementById('favicon');
faviconImg.href = favicon;
const heroImg = document.getElementById('hero');
heroImg.style.backgroundImage = `url(${heroPath})`;

const version = 4;

document.getElementById('hero_h2').textContent = `Orinoco ${version}`;
