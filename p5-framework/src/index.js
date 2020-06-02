import './styles/styles.css';
import './styles/styles.scss';
import logoPath from './images/logo.svg';
import favicon from './images/favicon.png';
import heroPath from './images/camera.jpg';
import urlServer from './modules/secret/urlServer';

const logoImg = document.getElementById('logo');
logoImg.src = logoPath;
const faviconImg = document.getElementById('favicon');
faviconImg.href = favicon;
const heroImg = document.getElementById('hero');
heroImg.style.backgroundImage = `url(${heroPath})`;

const version = 4;

document.getElementById('title').textContent = `bonjour de Webpack ${version}`;

fetch(urlServer)
  .then((response) => response.json())
  .then((commits) => alert(commits[0].author.login));
