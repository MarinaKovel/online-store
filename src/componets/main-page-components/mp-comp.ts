import PageInner from '../pageInnerTemplate';
import { PageIds } from '../../controller/app/app';
import Snow from '../../constants/snow';
import './snow.scss';
import './mp-comp.scss';
import './parallax.scss';

class MPContent extends PageInner {
    constructor(container: HTMLElement, tagName: string, className: string) {
        super(container, tagName, className);
    }
    static TextObj = {
        title: 'Welcome Wizard!',
        titleDisc: 'And now you are on Diagon Alley!',
        info: `Magic can be done without a wand, but it's difficult.
That's why it's so important to have your own wand, whether its core is made of a phoenix feather or a dragon's core. So we go to Ollivander's shop to get our own wand...`,
        info2: 'Are you ready?',
        link: 'Yes,go ahead!',
    };

    parallaxEffect() {
        const layersContainer = document.createElement('section') as HTMLElement;
        layersContainer.classList.add('layers');

        const layerBase = document.createElement('div') as HTMLElement;
        layerBase.classList.add('layer', 'layers__base');

        const layerFront = document.createElement('div') as HTMLElement;
        layerFront.classList.add('layer', 'layers__front');

        const layerMidl = document.createElement('div');
        layerMidl.classList.add('layer', 'layers__midl');

        layersContainer.append(layerBase, layerMidl, layerFront);

        this.container.append(layersContainer);

        window.addEventListener('scroll', (e) => {
            this.container.style.cssText += `--scrollTop:${window.scrollY}px`;
        });

        this.createContent();
    }

    createContent(): void {
        const firstSection = document.createElement('div') as HTMLElement;
        firstSection.classList.add('main__first');

        const firstSectionTitle = document.createElement('h1') as HTMLElement;
        firstSectionTitle.classList.add('first__title', 'title');
        firstSectionTitle.innerText = MPContent.TextObj.title;

        const firstSectionText = document.createElement('p') as HTMLElement;
        firstSectionText.classList.add('first__text');
        firstSectionText.innerText = MPContent.TextObj.titleDisc;

        firstSection.append(firstSectionTitle, firstSectionText);

        const secondSection = document.createElement('section') as HTMLElement;
        secondSection.classList.add('main__second');

        const secondSectionTitle = document.createElement('h2') as HTMLElement;
        secondSectionTitle.classList.add('second__title', 'title');
        secondSectionTitle.innerText = MPContent.TextObj.info;

        const secondSectionText = document.createElement('p') as HTMLElement;
        secondSectionText.classList.add('second__text');
        secondSectionText.innerText = MPContent.TextObj.info2;

        const shopLink = document.createElement('a') as HTMLAnchorElement;
        shopLink.classList.add('second__shop-link');
        shopLink.href = PageIds.ShopPage;
        shopLink.innerText = MPContent.TextObj.link;
        secondSection.append(secondSectionTitle, secondSectionText, shopLink);

        const layersContainer = this.container.querySelector('.layers') as HTMLElement;
        layersContainer.append(firstSection);
        this.container.append(layersContainer, secondSection);

        const snoww = new Snow(this.container, 'div', 'snows');
        snoww.renderSnow();
    }

    render(): HTMLElement {
        this.parallaxEffect();
        return this.container;
    }
}

export default MPContent;
