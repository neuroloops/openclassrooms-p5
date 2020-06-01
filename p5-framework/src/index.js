import './styles/styles.css';
import './styles/styles.scss';
import homeIcon from './images/logo.svg';

const homeImg = document.getElementById('home');
homeImg.src = homeIcon;


const version = 4;

document.getElementById('#title').html(`bonjour de Webpack ${version}`);
