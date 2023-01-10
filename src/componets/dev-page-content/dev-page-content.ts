import PageInner from '../pageInnerTemplate';
import './dev-page-content.scss';

class DevPageInner extends PageInner {
    constructor(container: HTMLElement, tagName: string, className: string) {
        super(container, tagName, className);
    }

    static TextObj = {
        title: 'About the App',
        disc: `
        This application is designed for educational purposes only,
and may not be used as a commercial application. The code is written in native TypeScript without the use of third-party libraries.
Webpack, SaSS, Node.js,Git were used to develop it.
It is built on MVC architecture with a component approach . App components are implemented with the help of classes.
Page navigation is based on Window.location.hash.`,

        devLinkM: 'https://github.com/MarinaKovel',
        devLinkC: 'https://github.com/Cibulya',
        schoolLink: 'https://rs.school/js/',
        schoolLogo: 'https://rs.school/images/rs_school_js.svg',
    };
    renderComponents() {
        const devsTitle = document.createElement('h1') as HTMLElement;
        devsTitle.classList.add('devs__title');
        devsTitle.innerHTML = DevPageInner.TextObj.title;

        const devsDicsription = document.createElement('p') as HTMLElement;
        devsDicsription.classList.add('devs__dicription');
        devsDicsription.innerText = DevPageInner.TextObj.disc;

        const toolsIconsContainer = document.createElement('div') as HTMLDivElement;
        toolsIconsContainer.classList.add('devs__icons');

        const githubLogo = document.createElement('div') as HTMLDivElement;

        githubLogo.classList.add('icons__logo', 'git__logo');

        const nodeJsLogo = document.createElement('div') as HTMLDivElement;

        nodeJsLogo.classList.add('icons__logo', 'nodejs__logo');

        const webpackLogo = document.createElement('div') as HTMLDivElement;

        webpackLogo.classList.add('icons__logo', 'webpack__logo');

        const sassLogo = document.createElement('div') as HTMLDivElement;

        sassLogo.classList.add('icons__logo', 'sass__logo');

        const typeScriptLogo = document.createElement('div') as HTMLDivElement;

        typeScriptLogo.classList.add('icons__logo', 'type__logo');

        toolsIconsContainer.append(githubLogo, typeScriptLogo, nodeJsLogo, webpackLogo, sassLogo, webpackLogo);

        const devsContainer = document.createElement('div') as HTMLDivElement;
        devsContainer.classList.add('devs__links');

        const Cibulya = document.createElement('a') as HTMLAnchorElement;
        Cibulya.href = DevPageInner.TextObj.devLinkC;
        Cibulya.classList.add('links__link');

        const githubLogoC = document.createElement('div') as HTMLDivElement;
        githubLogoC.classList.add('icons__logo', 'git__logo');

        const linkDisriptionC = document.createElement('p') as HTMLParagraphElement;
        linkDisriptionC.innerText = 'C:dev';
        linkDisriptionC.classList.add('link__disrcription');

        Cibulya.append(githubLogoC, linkDisriptionC);

        const MarinaKovel = document.createElement('a') as HTMLAnchorElement;
        MarinaKovel.href = DevPageInner.TextObj.devLinkM;
        MarinaKovel.classList.add('links__link');

        const linkDisriptionM = document.createElement('p') as HTMLParagraphElement;
        linkDisriptionM.innerText = 'Marina Kovel';
        linkDisriptionM.classList.add('link__disrcription');

        const githubLogoM = document.createElement('div') as HTMLDivElement;
        githubLogoM.classList.add('icons__logo', 'git__logo');
        MarinaKovel.append(githubLogoM, linkDisriptionM);

        devsContainer.append(Cibulya, MarinaKovel);

        const footer = document.createElement('footer') as HTMLElement;
        footer.classList.add('footer');

        const schoolLink = document.createElement('a') as HTMLAnchorElement;
        schoolLink.classList.add('school-link');
        schoolLink.href = DevPageInner.TextObj.schoolLink;

        const year = document.createElement('span') as HTMLSpanElement;
        year.classList.add('footer__year');
        year.innerText = '2023';

        footer.append(schoolLink, year);

        this.container.append(devsTitle, devsDicsription, toolsIconsContainer, devsContainer, footer);
    }
    render(): HTMLElement {
        this.renderComponents();
        return this.container;
    }
}

export default DevPageInner;
