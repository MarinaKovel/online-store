import './_nullstyle.scss';
import './global.scss';
import App from './controller/app/app';

import { SETVIEW } from './constants/functions';

SETVIEW();

const app = new App();
app.run();
