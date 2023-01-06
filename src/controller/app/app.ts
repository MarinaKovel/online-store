import MainPage from '../../pages/main/main';
import ShopPage from '../../pages/shop/shop';
import DevsPage from '../../pages/dev-page/dev';
import ErrorPage from '../../pages/error/error';
import Page from '../../constants/page';
import Header from '../../componets/header/header';

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
        const currentView = document.querySelector(`#${this.defaultPageClassName}`) as HTMLElement;
        if (currentView) {
            currentView.remove();
        }
        let view: Page | null = null;
        if (idPage === PageIds.MainPage) {
            window.location.hash = `#${PageIds.MainPage}`;
            view = new MainPage(idPage);
            this.defaultPageClassName = PageIds.MainPage;
        } else if (idPage === PageIds.ShopPage) {
            view = new ShopPage(idPage);
            this.defaultPageClassName = PageIds.ShopPage;
        } else if (idPage === PageIds.DevPage) {
            view = new DevsPage(idPage);
            this.defaultPageClassName = PageIds.DevPage;
        } else {
            idPage = PageIds.ErPage;
            view = new ErrorPage(idPage);

            this.defaultPageClassName = PageIds.ErPage;
        }
        if (view) {
            console.log(App.appViews);
            const viewHtml = view.render();
            viewHtml.classList.add(this.defaultPageClassName);
            App.appViews.append(viewHtml);
        }
    }

    router() {
        window.addEventListener('hashchange', () => {
            console.log('hash-change');
            const hash = window.location.hash.slice(1);
            App.renderNewView(hash);
            console.log(hash);
        });
    }

    constructor() {
        this.initialView = new MainPage('main-page');
        this.header = new Header('header', 'header');
    }
    run() {
        App.appViews.append(this.header.render());
        App.renderNewView(PageIds.DevPage); //set up start page
        this.router();
    }
}

//MainPage ShopPage DevPage 404 -List of pages
export default App;
