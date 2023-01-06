import './header.scss';
import Component from '../compTemplate';
import { PageIds } from '../../controller/app/app';

const links = [
    {
        id: PageIds.MainPage,
        text: 'About',
    },
    {
        id: PageIds.ShopPage,
        text: 'Shop',
    },
    {
        id: PageIds.DevPage,
        text: 'Developers',
    },
];

class Header extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    renderPageLinks() {
        const headerLogo = document.createElement('div') as HTMLSpanElement;
        headerLogo.classList.add('header__logo');

        const pageNav = document.createElement('nav') as HTMLElement;
        pageNav.classList.add('header__nav');
        links.forEach((link) => {
            const pageLink = document.createElement('a') as HTMLAnchorElement;
            pageLink.href = `#${link.id}`;
            pageLink.classList.add('nav__link');
            pageLink.innerText = `${link.text}`;
            pageNav.append(pageLink);
        });
        const cartContainer = document.createElement('div');
        cartContainer.className = 'cart__container';
        let cartNum = document.createElement('div');
        cartNum.classList.add('cart__num');
        cartNum.innerText = '0';
        let cartPrice = document.createElement('div');
        cartPrice.classList.add('cart__price');
        cartContainer.append(cartNum, cartPrice);
        this.container.append(headerLogo, pageNav, cartContainer);
    }

    render(): HTMLElement {
        this.renderPageLinks();
        return this.container;
    }
}

export default Header;
