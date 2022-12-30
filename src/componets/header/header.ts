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
        const headerLogo = document.createElement('span') as HTMLSpanElement;
        headerLogo.classList.add('header__logo');

        headerLogo.innerText = 'Ollivanders';
        const pageNav = document.createElement('nav') as HTMLElement;
        pageNav.classList.add('header__nav');
        links.forEach((link) => {
            const pageLink = document.createElement('a') as HTMLAnchorElement;
            pageLink.href = `#${link.id}`;
            pageLink.classList.add('nav__link');
            pageLink.innerText = `${link.text}`;
            pageNav.append(pageLink);
        });
        this.container.append(headerLogo, pageNav);
    }

    render(): HTMLElement {
        this.renderPageLinks();
        return this.container;
    }
}

export default Header;
