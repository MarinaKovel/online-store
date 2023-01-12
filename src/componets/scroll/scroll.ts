const simplebar = require('simplebar');
import '../../../node_modules/simplebar/dist/simplebar.min.css';
import './scroll.scss';
function customScroll() {
    document.body.setAttribute('data-simplebar', '');
    document.body.setAttribute('id', 'scroll-body');
    new simplebar(document.getElementById('scroll-body'), { autoHide: false });
}

export default customScroll;
