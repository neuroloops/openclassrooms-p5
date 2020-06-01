import './styles/styles.css';
import './styles/styles.scss';
import logoPath from './images/logo.svg';

const logoImg = document.getElementById('logo');
logoImg.src = logoPath;


const version = 4;

document.getElementById('#title').html(`bonjour de Webpack ${version}`);


