import './main-page.scss';

import { app } from '../../constants/constants';

export interface IElement {
    className: string;
    text: string;
    tag: string;
    id?: string;
}

type MainPageInner = IElement[];

export const mainPageSection: IElement = {
    className: 'main-page',
    text: '',
    tag: 'div',
};
export const mainPageTitle: IElement = {
    className: 'main-page__title',
    text: 'There is Ollivander store',
    tag: 'h1',
};

const mainPageText: IElement = {
    className: 'main-page__text',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi laborum in sapiente a et facere iure, commodi quia delectus natus distinctio adipisci cupiditate architecto asperiores nostrum repellendus. Magnam, libero illum.',
    tag: 'p',
};

const mainPageLinks: IElement = {
    className: 'main-page__links',
    text: `
    <a href="#" class="links__link shop-link" >ShopPage < </a>  
    <a href="#" class="links__link copyrights-link" >Developers < </a>  
  `,
    tag: 'div',
};

export const mainPageInnner: MainPageInner = [mainPageTitle, mainPageText, mainPageLinks];

export function renderMainPage(data: IElement, childnodes?: MainPageInner): void {
    const { className, text, tag } = data;
    let newElement = document.createElement(tag);
    newElement.classList.add(className);
    newElement.innerText = `${text}`;
    app?.append(newElement);
    if (childnodes) {
        childnodes.forEach((childNode) => {
            const { className, text, tag } = childNode;
            let innerEl = document.createElement(tag);
            innerEl.classList.add(className);
            innerEl.innerHTML = `${text}`;
            return newElement.append(innerEl);
        });
    }
}
