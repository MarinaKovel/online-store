import './_nullstyle.scss';
import './global.scss';
// import a from './wands.json';
// console.log(a);
import { mainPageSection } from './pages/main-page/main-page';
import { renderMainPage } from './pages/main-page/main-page';
import { mainPageInnner } from './pages/main-page/main-page';

renderMainPage(mainPageSection, mainPageInnner);
