import { header } from './components/header/header';
import { footer } from './components/footer/footer';

const body = document.body as HTMLBodyElement;

body.append(header);
body.append(footer);
