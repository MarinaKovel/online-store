import MainPage from '../../pages/main/main';
import ShopPage from '../../pages/shop/shop';
import DevsPage from '../../pages/dev-page/dev';
import ErrorPage from '../../pages/error/error';
import Page from '../../constants/page';
import Header from '../../componets/header/header';

import { WandsPageIDs } from '../../constants/wandsTypes';
import WandPage from '../../componets/description/wand-page';

const WandPages = Object.values(WandsPageIDs);

function getWand(idPage: string, arr: string[]): string {
    let testSting: string = '';
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === idPage) testSting = arr[i];
    }
    return `${testSting}`;
}

function setLastView(id: string): void {
    localStorage.setItem('last-view', id);
}

export const enum PageIds {
    MainPage = 'main-page',
    ShopPage = 'shop-page',
    DevPage = 'devs-page',
    ErPage = 'error-page',
}

class App {
    static appViews: HTMLElement = document.querySelector('.app') as HTMLElement;
    initialView: MainPage;
    static defaultPageClassName: string = `${PageIds.MainPage}`;
    header: Header;

    static renderNewView(idPage: string) {
        localStorage.setItem('last-view', 'main-page');
        const currentView = document.querySelector(`#${this.defaultPageClassName}`) as HTMLElement;
        idPage = `${window.location.hash.slice(1)}`;

        if (currentView) {
            currentView.remove();
        }
        let view: Page | null = null;
        if (idPage === PageIds.MainPage) {
            window.location.hash = `#${PageIds.MainPage}`;
            view = new MainPage(idPage);
            this.defaultPageClassName = PageIds.MainPage;
            setLastView(`#${idPage}`);
            console.log(localStorage.getItem('last-view'));
        } else if (idPage === PageIds.ShopPage) {
            view = new ShopPage(idPage);
            this.defaultPageClassName = PageIds.ShopPage;
            setLastView(`#${idPage}`);
            console.log(localStorage.getItem('last-view'));
        } else if (idPage === PageIds.DevPage) {
            view = new DevsPage(idPage);
            this.defaultPageClassName = PageIds.DevPage;
            setLastView(`#${idPage}`);
        } else if (idPage === getWand(idPage, WandsPageIDs)) {
            setLastView(idPage);
            const Article = document.querySelector('article');
            idPage = getWand(idPage, WandsPageIDs);
            window.location.hash = `#${getWand(idPage, WandsPageIDs)}`;
            Article?.remove();
            view = new WandPage(idPage);
            this.defaultPageClassName = getWand(idPage, WandsPageIDs);
            setLastView(`#${idPage}`);
            console.log(localStorage.getItem('last-view'));
        } else {
            idPage = PageIds.ErPage;
            view = new ErrorPage(idPage);
            this.defaultPageClassName = PageIds.ErPage;
        }
        if (view) {
            const viewHtml = view.render();
            viewHtml.classList.add(this.defaultPageClassName);
            App.appViews.append(viewHtml);
        }
    }

    router() {
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1);
            App.renderNewView(hash);
        });
    }

    constructor() {
        this.initialView = new MainPage('main-page');
        this.header = new Header('header', 'header');
    }
    run() {
        this.router();
        App.appViews.append(this.header.render());
        App.renderNewView(localStorage.getItem('last-view')!); //set up start page
    }
}

//MainPage ShopPage DevPage 404 -List of pages
export default App;
