import './cart.scss';
import Component from '../compTemplate';


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

class Cart extends Component {
    static TextObj = {
        rightTitle: 'Products in cart',
        leftTitle: 'Summary',
        productsNumText: 'Products: ',
        productsPriceText: 'Total price: ',
        promoText: 'Promo for test: HARRY',
        buyBtn: 'Buy',
        emptyCart: 'Cart is empty',
        appliedText: 'Applied codes',
        appliedName: 'HARRY - 30%',
        appliedBtn: 'Drop',
        foundBtn: 'Add',
    };
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }
    renderCart() {
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

        let cartNum = document.querySelector('.cart__num') as HTMLDivElement;
        let cartPrice = document.querySelector('.cart__price');
        (cartNum as HTMLDivElement).innerHTML = sum.toString();
        if (priceInCart.price > 0) {
            (cartPrice as HTMLDivElement).innerHTML = priceInCart.price.toString() + 'ʛ';
            (cartPrice as HTMLDivElement).style.display = 'block';
        }

        const leftContainer = document.createElement('div');
        const rightContainer = document.createElement('div');
        const rightTitle = document.createElement('h2');
        const leftTitle = document.createElement('h2');
        const productsNum = document.createElement('div');
        const productsNumText = document.createElement('span');
        const productsNumTotal = document.createElement('span');
        const productsPrice = document.createElement('div');
        const productsPriceText = document.createElement('span');
        const productsPriceTotal = document.createElement('span');
        const productsPricePromo = document.createElement('span');
        const formPromo = document.createElement('form');
        const promoInput = document.createElement('input');
        const promoText = document.createElement('span');
        const applied = document.createElement('div');
        const appliedText = document.createElement('span');
        const appliedCode = document.createElement('div');
        const appliedName = document.createElement('span');
        const appliedBtn = document.createElement('button');
        const foundCode = document.createElement('div');
        const foundName = document.createElement('span');
        const foundBtn = document.createElement('button');
        const buyBtn = document.createElement('button');
        let n = 0;

        leftContainer.className = 'left__container';
        rightContainer.className = 'right__container';
        productsNum.className = 'products-num';
        productsNumText.className = 'products-num__text';
        productsNumTotal.className = 'products-num__total';
        productsPrice.className = 'products-price';
        productsPriceText.className = 'products-price__text';
        productsPriceTotal.className = 'products-price__total';
        productsPricePromo.className = 'products-price__promo';
        formPromo.className = 'form__promo';
        promoInput.className = 'promo__input';
        promoText.className = 'promo__text';
        buyBtn.className = 'buy__btn';
        applied.className = 'applied';
        appliedText.className = 'applied__text';
        appliedCode.className = 'applied__code';
        appliedName.className = 'applied__name';
        appliedBtn.className = 'applied__btn';
        foundCode.className = 'found__code';
        foundName.className = 'found__name';
        foundBtn.className = 'found__btn';

        formPromo.setAttribute('action', '');
        formPromo.setAttribute('method', 'GET');
        promoInput.setAttribute('type', 'search');
        promoInput.setAttribute('placeholder', 'Enter promo code');
        promoInput.setAttribute('name', 'searchCode');
        promoInput.setAttribute('autocomplete', 'off');

        rightTitle.innerText = Cart.TextObj.rightTitle;
        leftTitle.innerText = Cart.TextObj.leftTitle;
        productsNumText.innerText = Cart.TextObj.productsNumText;
        productsPriceText.innerText = Cart.TextObj.productsPriceText;
        productsNumTotal.innerText = sum.toString();
        productsPriceTotal.innerText = priceInCart.price.toString() + 'ʛ';
        promoText.innerText = Cart.TextObj.promoText;
        buyBtn.innerText = Cart.TextObj.buyBtn;
        productsPricePromo.innerHTML = '5G'
        appliedText.innerText = Cart.TextObj.appliedText;
        appliedName.innerText = Cart.TextObj.appliedName;
        appliedBtn.innerText = Cart.TextObj.appliedBtn;
        foundName.innerText = Cart.TextObj.appliedName;
        foundBtn.innerText = Cart.TextObj.foundBtn;
        promoInput.innerText = 'Code';

        leftContainer.append(leftTitle);
        rightContainer.append(rightTitle, productsNum, productsPrice, applied, formPromo, foundCode, promoText, buyBtn);
        formPromo.append(promoInput);
        foundCode.append(foundName, foundBtn);
        applied.append(appliedText, appliedCode);
        appliedCode.append(appliedName, appliedBtn);
        productsNum.append(productsNumText, productsNumTotal);
        productsPrice.append(productsPriceText, productsPriceTotal, productsPricePromo);
        this.container.append(leftContainer, rightContainer);

        let wands: RootObject;
        let wandsData: Product[];
        let requestURL = './app-data/wands.json';
        let request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();
        request.onload = function() {
            wands = request.response;
            getJson(wands);
            if (sum === 0) {
                rightContainer.style.display = 'none';
                leftContainer.innerText = Cart.TextObj.emptyCart;
            } else {
                addProduct(wandsData);
            }
            formPromo.addEventListener('keyup', getPromoCode);
            formPromo.addEventListener('submit', searchSubmit);
            foundBtn.addEventListener('click', () => {
                applied.style.display = 'flex';
                foundBtn.style.display = 'none';
                productsPriceTotal.style.textDecoration = 'line-through';
                productsPricePromo.style.display = 'inline';
                productsPricePromo.innerText = (+productsPriceTotal.innerText.slice(0, -1) * 70 / 100) + 'ʛ';
            })
            appliedBtn.addEventListener('click', () => {
                applied.style.display = 'none';
                foundBtn.style.display = 'inline';
                productsPriceTotal.style.textDecoration = 'none';
                productsPricePromo.style.display = 'none';
            })
        }

        function getPromoCode() {
            let searchCode = promoInput.value.trim().toUpperCase();

            if (searchCode === 'HARRY') {
                foundCode.style.display = 'flex';
            }
        }
        function searchSubmit(evt: Event) {
            evt.preventDefault();
        }

        function getJson(jsonObj: RootObject) {
            wandsData = jsonObj['products'];
            return wandsData;
        }

        let arrId: number[] = [];
        let arrNum: number[] = [];
        for (let key in cart) {
            arrId.push(+key);
            arrNum.push(+cart[key]);
        }

        function addProduct(wandsData: Product[]) {
            if (arrId.length > 1) {
            for (let i = 1; i < arrId.length; i++) {
                if (arrNum[i] !== 0) {
                    const productContainer = document.createElement('div');
                    const count = document.createElement('p');
                    const thumbnail = document.createElement('img');
                    const prodDesc = document.createElement('div');
                    const prodName = document.createElement('p');
                    const prodDetails = document.createElement('div');
                    const prodWood = document.createElement('span');
                    const prodCore = document.createElement('span');
                    const prodLength = document.createElement('span');
                    const prodRating = document.createElement('span');
                    const prodAmount = document.createElement('div');
                    const prodStock = document.createElement('span');
                    const manageNum = document.createElement('div');
                    const downBtn = document.createElement('button');
                    const upBtn = document.createElement('button');
                    const numInput = document.createElement('input');
                    const priceForType = document.createElement('span');


                    productContainer.className = 'prod__container';
                    count.className = 'count';
                    thumbnail.className = 'thumbnail';
                    prodDesc.className = 'prod__info';
                    prodName.className = 'prod__title';
                    prodDetails.className = 'prod__details';
                    prodWood.className = 'prod__text';
                    prodCore.className = 'prod__text';
                    prodLength.className = 'prod__text';
                    prodRating.className = 'prod__text';
                    prodAmount.className = 'prod__amount';
                    prodStock.className = 'prod__stock';
                    manageNum.className = 'manage__num';
                    downBtn.className = 'down-btn';
                    upBtn.className = 'up-btn';
                    numInput.className = 'num__input';
                    priceForType.className = 'price__type';

                    n += 1;
                    count.innerText = n.toString();
                    thumbnail.setAttribute('src', wandsData[arrId[i] - 1].thumbnail);
                    prodName.innerText = wandsData[arrId[i] - 1].name;
                    prodWood.innerText = 'Wood: ' + wandsData[arrId[i] - 1].wood;
                    prodCore.innerText = 'Core: ' + wandsData[arrId[i] - 1].core;
                    prodLength.innerText = 'Length: ' + wandsData[arrId[i] - 1].length;
                    prodRating.innerText = 'Rating: ' + wandsData[arrId[i] - 1].rating;
                    prodStock.innerText = 'Stock: ' + wandsData[arrId[i] - 1].stock;
                    numInput.innerText = arrNum[i].toString();
                    downBtn.innerText = '-';
                    upBtn.innerText = '+';
                    priceForType.innerText = 'Price ' + (wandsData[arrId[i] - 1].price * arrNum[i]) + 'ʛ';
                    downBtn.setAttribute('type', 'button');
                    downBtn.setAttribute('onclick', 'this.nextElementSibling.stepDown()');
                    upBtn.setAttribute('type', 'button');
                    upBtn.setAttribute('onclick', 'this.previousElementSibling.stepUp()');
                    numInput.setAttribute('type', 'number');
                    numInput.setAttribute('min', '0');
                    numInput.setAttribute('max', (wandsData[arrId[i] - 1].stock).toString());
                    numInput.setAttribute('value', arrNum[i].toString());
                    numInput.readOnly = true;

                    productContainer.append(count, thumbnail, prodDesc, prodAmount);
                    prodDesc.append(prodName, prodDetails);
                    prodDetails.append(prodWood, prodCore, prodLength, prodRating);
                    prodAmount.append(prodStock, manageNum, priceForType);
                    manageNum.append(downBtn, numInput, upBtn);
                    leftContainer.append(productContainer);

                    const key = wandsData[arrId[i] - 1].id;

                    downBtn.addEventListener('click', () => {
                        if (cart[key] > 0) {
                            cart[key] = cart[key] - 1;
                            localStorage.setItem("cart", JSON.stringify(cart));
                            arrNum[i] = arrNum[i] - 1;
                            priceForType.innerText = 'Price ' + (wandsData[arrId[i] - 1].price * arrNum[i]) + 'ʛ';
                            (cartPrice as HTMLDivElement).innerText = (wandsData[arrId[i] - 1].price * arrNum[i]) + 'ʛ';
                            
                            totalPrice.price = totalPrice.price - wandsData[arrId[i] - 1].price;
                            localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
                            if (totalPrice.price > 0) {
                                (cartPrice as HTMLDivElement).innerText = totalPrice.price.toString() + 'ʛ';
                                (cartPrice as HTMLDivElement).style.display = 'block';
                            } else {
                                (cartPrice as HTMLDivElement).style.display = 'none';
                            }
                            productsPriceTotal.innerText = priceInCart.price.toString() + 'ʛ';
                            console.log(cartNum.innerText)
                            console.log(totalPrice)
                        }
                        let sum = 0;
                        for (let num of Object.values(cart)) {
                        sum += num;
                        }
                        cartNum.innerText = sum.toString();
                        if (cart[key] === 0) {
                            productContainer.remove();
                        }
                        if (sum === 0) {
                            rightContainer.style.display = 'none';
                            leftContainer.innerText = Cart.TextObj.emptyCart;
                        }
                        productsNumTotal.innerText = sum.toString();
                        console.log(cart)
                        console.log(totalPrice)

                    })
                    upBtn.addEventListener('click', () => {
                        if (cart[key] < wandsData[arrId[i] - 1].stock) {
                            cart[key] = cart[key] + 1;
                            localStorage.setItem("cart", JSON.stringify(cart));
                            arrNum[i] = arrNum[i] + 1;
                            priceForType.innerText = 'Price ' + (wandsData[arrId[i] - 1].price * arrNum[i]) + 'ʛ';
                            totalPrice.price = totalPrice.price + wandsData[arrId[i] - 1].price;
                            localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
                            if (totalPrice.price > 0) {
                                (cartPrice as HTMLDivElement).innerText = totalPrice.price.toString() + 'ʛ';
                                (cartPrice as HTMLDivElement).style.display = 'block';
                            }
                            productsPriceTotal.innerText = priceInCart.price.toString() + 'ʛ';
                        }
                        
                        let sum = 0;
                        for (let num of Object.values(cart)) {
                        sum += num;
                        }
                        cartNum.innerText = sum.toString();
                        productsNumTotal.innerText = sum.toString();
                        console.log(cart)

                    })
                }
                
            }
        }
        }
        
        

    }
    render(): HTMLElement {
        this.renderCart();
        return this.container;
    }
}

export default Cart;