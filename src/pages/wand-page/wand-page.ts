import './description.scss';
import Page from '../../constants/page';
import { PageIds } from '../../controller/app/app';
import { ProvidePlugin } from 'webpack';

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
interface ObjectInterface {
    [key: string]: number;
}

class WandPage extends Page {
    static TextObj = {
        addToCart: 'Add to cart',
        addToCart2: 'Add more',
        buyNow: 'Buy now',
    };
    constructor(id: string) {
        super(id);
    }
    renderDescription() {
        let productsInCart: ObjectInterface = {0: 0};
        let priceInCart: ObjectInterface = {price: 0};
        let json = localStorage.getItem("cart") as string;
        let jsonP = localStorage.getItem("totalPrice") as string;
        let cart: ObjectInterface = JSON.parse(json);
        let totalPrice: ObjectInterface = JSON.parse(jsonP);

        if (cart) { productsInCart = cart; }
        if (totalPrice) { priceInCart = totalPrice; }
        let sum = 0;
        for (let num of Object.values(productsInCart)) {
            sum += num;
        }

        let cartNum = document.querySelector('.cart__num');
        let cartPrice = document.querySelector('.cart__price');
        (cartNum as HTMLDivElement).innerHTML = sum.toString();
        if (priceInCart.price > 0) {
            (cartPrice as HTMLDivElement).innerHTML = priceInCart.price.toString() + 'ʛ';
            (cartPrice as HTMLDivElement).style.display = 'block';
        }

        const breadcrumb = document.createElement('ul');
        const description = document.createElement('div');
        const prodImg = document.createElement('div');
        const prodDesc = document.createElement('div');
        const bigImg = document.createElement('div');
        const previewImg = document.createElement('div');
        const fullDesc = document.createElement('div');
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
        big.className = 'big';
        small1.className = 'small';
        small2.className = 'small';

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
        request.onload = function() {
            let wands: RootObject = request.response;
            fillWandDesc(wands);
        }

        function fillWandDesc(jsonObj: RootObject) {
            let i = 0;    //Relevant wand's id!! (0-29)
            let products: Product[] = jsonObj['products'];

            let breadcrumbWands = document.createElement('li');
            let breadcrumbWood = document.createElement('li');
            let breadcrumbCore = document.createElement('li');
            let breadcrumbCurrent = document.createElement('li');
            breadcrumbCurrent.className = "current";
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
            const addToCart = document.createElement('button');
            const buyNow = document.createElement('button');

            addToCart.className = 'add-to-cart';
            buyNow.className = 'buy-now';

            buyNow.innerText = WandPage.TextObj.buyNow;
            if (productsInCart[i + 1]) {
                addToCart.innerText = WandPage.TextObj.addToCart2;
            } else {
                addToCart.innerText = WandPage.TextObj.addToCart;
            }

            prodDesc.append(fullDesc, addToCart, buyNow);

            big.src = products[i].images[0];
            (small1 as HTMLImageElement).src = products[i].images[0];
            (small2 as HTMLImageElement).src = products[i].images[1];
            small1.addEventListener("click", () => {
                big.src = products[i].images[0];
            });
            small2.addEventListener("click", () => {
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
            
            fullDesc.append(wandName, wood, core, length, ownerOfSimilarWand, rating, stock, description, discountPercentage, price);
            
            function addInCart() {
                let stock = products[i].stock;
                let key = (i + 1).toString();
                if (!productsInCart[key] && stock === 0) {
                    productsInCart[key] = 0;
                    (cartPrice as HTMLDivElement).style.display = 'none';
                } else if (!productsInCart[key] && stock > 0) {
                    productsInCart[key] = 1;
                    (cartPrice as HTMLDivElement).style.display = 'block';
                    (cartPrice as HTMLDivElement).innerText = (+((cartPrice as HTMLDivElement).innerText.slice(0, -1)) + products[i].price).toString() + 'ʛ';
                } else if(productsInCart[key] && productsInCart[key] < stock) {
                    productsInCart[key] = productsInCart[key] + 1;
                    (cartPrice as HTMLDivElement).innerText = (+((cartPrice as HTMLDivElement).innerText.slice(0, -1)) + products[i].price).toString() + 'ʛ';
                } else if (productsInCart[key] && productsInCart[key] > stock) {
                    productsInCart[key] = productsInCart[key];
                }
                cart = productsInCart;
                localStorage.setItem("cart", JSON.stringify(cart));
                let sum = 0;
                for (let num of Object.values(productsInCart)) {
                    sum += num;
                }
                priceInCart.price = +((cartPrice as HTMLDivElement).innerText.slice(0, -1));
                totalPrice = priceInCart;
                localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
                (cartNum as HTMLDivElement).innerHTML = sum.toString();
            }
            addToCart.addEventListener('click', addInCart);

            buyNow.addEventListener('click', () => {
                window.location.hash = PageIds.CartPage;
                setTimeout(function() {
                    let popup = document.querySelector('.order');
                    (popup as HTMLDivElement).style.display = 'flex';
                }, 1000)

                let arrKeys = [];
                let arrValues = [];
                for (let key in cart) {
                    arrKeys.push(key);
                    arrValues.push(cart[key]);
                }

                if (arrKeys.length === 0 ) {
                    addInCart()
                } else {
                    let d = (i + 1).toString();
                    if (arrKeys.includes(d)) {
                        if (cart[d] === 0) {
                            addInCart()
                        }
                    } else {
                        addInCart()
                    }
                }
            });
            }
    }
    render(): HTMLElement {
        this.renderDescription();
        return this.pageView;
    }
}

export default WandPage;