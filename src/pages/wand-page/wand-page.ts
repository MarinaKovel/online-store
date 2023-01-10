import './description.scss';
import Page from '../../constants/page';

export interface Product {
    id: number;
    name: string;
    wood: string;
    core: string;
    length: string;
    ownerOfSimilarWand: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    thumbnail: string;
    images: string[];
}
export interface RootObject {
    products: Product[];
}

class WandPage extends Page {
    static TextObj = {
        addToCart: 'Add to cart',
        buyNow: 'Buy now',
    };
    constructor(id: string) {
        super(id);
    }
    renderDescription() {
        const breadcrumb = document.createElement('ul');
        const description = document.createElement('div');
        const prodImg = document.createElement('div');
        const prodDesc = document.createElement('div');
        const bigImg = document.createElement('div');
        const previewImg = document.createElement('div');
        const fullDesc = document.createElement('div');
        const addToCart = document.createElement('button');
        const buyNow = document.createElement('button');
        const big = document.createElement('img');
        const small1 = document.createElement('img');
        const small2 = document.createElement('img');

        breadcrumb.className = 'breadcrumb';
        description.className = 'description';
        prodImg.className = 'prod-img';
        prodDesc.className = 'prod-desc';
        bigImg.className = 'big-img';
        previewImg.className = 'preview-img';
        fullDesc.className = 'full-desc';
        addToCart.className = 'add-to-cart';
        buyNow.className = 'buy-now';
        big.className = 'big';
        small1.className = 'small';
        small2.className = 'small';

        addToCart.innerText = WandPage.TextObj.addToCart;
        buyNow.innerText = WandPage.TextObj.buyNow;

        prodDesc.append(fullDesc, addToCart, buyNow);
        description.append(prodImg, prodDesc);
        prodImg.append(bigImg, previewImg);
        bigImg.append(big);
        previewImg.append(small1, small2);
        this.pageView.append(breadcrumb, description);

        let requestURL = './app-data/wands.json';
        let request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();
        request.onload = function () {
            let wands: RootObject = request.response;
            fillWandDesc(wands);
        };

        function fillWandDesc(jsonObj: RootObject) {
            const number = window.location.hash.slice(1).replace(/[a-zA-Z]/gi, '');
            const n = 1;
            let i = Number(number) - n; //Relevant wand's id!! (0-29)
            let products: Product[] = jsonObj['products'];

            let breadcrumbWands = document.createElement('li');
            let breadcrumbWood = document.createElement('li');
            let breadcrumbCore = document.createElement('li');
            let breadcrumbCurrent = document.createElement('li');
            breadcrumbCurrent.className = 'current';
            breadcrumbWands.textContent = 'Wands';
            breadcrumbWood.textContent = products[i].wood;
            breadcrumbCore.textContent = products[i].core;
            breadcrumbCurrent.textContent = products[i].name;
            breadcrumb.append(breadcrumbWands, breadcrumbWood, breadcrumbCore, breadcrumbCurrent);

            let wandName = document.createElement('h1');
            let wood = document.createElement('p');
            let core = document.createElement('p');
            let length = document.createElement('p');
            let ownerOfSimilarWand = document.createElement('p');
            let description = document.createElement('p');
            let rating = document.createElement('p');
            let stock = document.createElement('p');
            let discountPercentage = document.createElement('p');
            let price = document.createElement('h2');

            big.src = products[i].images[0];
            (small1 as HTMLImageElement).src = products[i].images[0];
            (small2 as HTMLImageElement).src = products[i].images[1];
            small1.addEventListener('click', () => {
                big.src = products[i].images[0];
            });
            small2.addEventListener('click', () => {
                big.src = products[i].images[1];
            });

            wandName.textContent = products[i].wood + ' wand with ' + products[i].core;
            wood.textContent = 'Wood: ' + products[i].wood;
            core.textContent = 'Core: ' + products[i].core;
            length.textContent = 'Length: ' + products[i].length + '"';
            ownerOfSimilarWand.textContent = 'Owner of similar wand: ' + products[i].ownerOfSimilarWand;
            description.textContent = 'Description: ' + products[i].description;
            rating.textContent = 'Rating: ' + products[i].rating;
            stock.textContent = 'Stock: ' + products[i].stock;
            discountPercentage.textContent = 'Discount: ' + products[i].discountPercentage + '%';
            price.textContent = 'Price: ' + products[i].price + 'ʛ (Galleon)';

            fullDesc.append(
                wandName,
                wood,
                core,
                length,
                ownerOfSimilarWand,
                rating,
                stock,
                description,
                discountPercentage,
                price
            );
        }
    }
    render(): HTMLElement {
        this.renderDescription();
        return this.pageView;
    }
}

export default WandPage;
