import './styles/styles.css';
import './styles/styles.scss';
import logoPath from './images/logo.svg';
import hamburgerPath from './images/hamburger.svg';

const logoImg = document.getElementById('logo');
logoImg.src = logoPath;

const hamburgerImg = document.getElementById('hamburger');
hamburgerImg.src = hamburgerPath;

const version = 4;

document.getElementById('#title').html(`bonjour de Webpack ${version}`);
