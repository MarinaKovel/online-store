import './_nullstyle.scss';
import './global.scss';
import App from './controller/app/app';

localStorage.setItem('last-view', 'main-page');
window.location.hash = `${localStorage.getItem('last-view')}`;

const app = new App();
app.run();
