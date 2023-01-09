import './products.scss';
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

class Products extends Component {
    static TextObj = {
        reset: 'Reset Filters',
        copy: 'Copy Link',
        filterWoodName: 'Choose by Wood',
        filterCoreName: 'Choose by Core',
        filterLengthName: 'Choose by Length',
        filterPriceName: 'Choose by Price',
        sortText: 'Sort',
        resultText: 'Results: ',
        searchText: 'Search',
        addToCartBtn: 'Add to cart',
        addToCartBtn2: 'Add more',
        detailsBtn: 'Details',
        sortRandom: 'Sort options:',
        sortByRatingDescText: 'Sort by Rating ↓',
        sortByRatingAscText: 'Sort by Rating ↑',
        sortByPriceAscText: 'Sort by Price ↑',
        sortByPriceDescText: 'Sort by Price ↓',
    };
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    renderProductList() {
        let productsInCart: ObjectInterface = { 0: 0 };
        let priceInCart: ObjectInterface = { price: 0 };
        let json = localStorage.getItem('cart') as string;
        let jsonP = localStorage.getItem('totalPrice') as string;
        let cart: ObjectInterface = JSON.parse(json);
        let totalPrice: ObjectInterface = JSON.parse(jsonP);

        if (cart) {
            productsInCart = cart;
        }
        if (totalPrice) {
            priceInCart = totalPrice;
        }
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

        const filtersContainer = document.createElement('div') as HTMLDivElement;
        const resetCopyContainer = document.createElement('div') as HTMLDivElement;
        const reset = document.createElement('button') as HTMLButtonElement;
        const copy = document.createElement('button') as HTMLButtonElement;
        const filters = document.createElement('div') as HTMLDivElement;
        const filterWood = document.createElement('div') as HTMLDivElement;
        const filterWoodName = document.createElement('div') as HTMLDivElement;
        const filterWoodContent = document.createElement('div') as HTMLDivElement;
        const filterCore = document.createElement('div') as HTMLDivElement;
        const filterCoreName = document.createElement('div') as HTMLDivElement;
        const filterCoreContent = document.createElement('div') as HTMLDivElement;
        const filterLength = document.createElement('div') as HTMLDivElement;
        const filterLengthName = document.createElement('div') as HTMLDivElement;
        const filterLengthContent = document.createElement('div') as HTMLDivElement;
        const filterPrice = document.createElement('div') as HTMLDivElement;
        const filterPriceName = document.createElement('div') as HTMLDivElement;
        const filterPriceContent = document.createElement('div') as HTMLDivElement;
        const productContainer = document.createElement('div') as HTMLDivElement;
        const viewSettings = document.createElement('div') as HTMLDivElement;
        const productList = document.createElement('div') as HTMLDivElement;
        const sort = document.createElement('select') as HTMLSelectElement;
        const sortRandom = document.createElement('option') as HTMLOptionElement;
        const sortChoiceByRatingDesc = document.createElement('option') as HTMLOptionElement;
        const sortChoiceByRatingAsc = document.createElement('option') as HTMLOptionElement;
        const sortChoiceByPriceAsc = document.createElement('option') as HTMLOptionElement;
        const sortChoiceByPriceDesc = document.createElement('option') as HTMLOptionElement;
        const results = document.createElement('div') as HTMLDivElement;
        const searchForm = document.createElement('form') as HTMLFormElement;
        const search = document.createElement('input') as HTMLInputElement;
        const view = document.createElement('div') as HTMLDivElement;
        const lengthMinInput = document.createElement('input') as HTMLInputElement;
        const lengthMaxInput = document.createElement('input') as HTMLInputElement;
        const priceMinInput = document.createElement('input') as HTMLInputElement;
        const priceMaxInput = document.createElement('input') as HTMLInputElement;

        filtersContainer.className = 'filters__container';
        resetCopyContainer.className = 'reset__container';
        reset.className = 'reset';
        copy.className = 'copy';
        filterWood.className = 'filter-wood';
        filterWoodName.className = 'filter-wood__name';
        filterWoodContent.className = 'filter-wood__content';
        filterCore.className = 'filter-core';
        filterCoreName.className = 'filter-core__name';
        filterCoreContent.className = 'filter-core__content';
        filterLength.className = 'filter-length';
        filterLengthName.className = 'filter-length__name';
        filterLengthContent.className = 'filter-length__content';
        filterPrice.className = 'filter-price';
        filterPriceName.className = 'filter-price__name';
        filterPriceContent.className = 'filter-price__content';
        productContainer.className = 'product__container';
        viewSettings.className = 'view__settings';
        productList.className = 'product__list';
        sort.className = 'sort__menu';
        results.className = 'settings__text';
        searchForm.className = 'search__form';
        search.className = 'search__menu';
        view.className = 'view';

        sortRandom.setAttribute('value', 'sortRandom');
        sortChoiceByRatingDesc.setAttribute('value', 'sortByRatingDesc');
        sortChoiceByRatingAsc.setAttribute('value', 'sortByRatingAsc');
        sortChoiceByPriceAsc.setAttribute('value', 'sortByPriceAsc');
        sortChoiceByPriceDesc.setAttribute('value', 'sortByPriceDesc');
        searchForm.setAttribute('action', '');
        searchForm.setAttribute('method', 'GET');
        search.setAttribute('type', 'search');
        search.setAttribute('placeholder', 'Search your wand');
        search.setAttribute('name', 'search');
        search.setAttribute('autocomplete', 'off');

        reset.innerText = Products.TextObj.reset;
        copy.innerText = Products.TextObj.copy;
        filterWoodName.innerText = Products.TextObj.filterWoodName;
        filterCoreName.innerText = Products.TextObj.filterCoreName;
        filterLengthName.innerText = Products.TextObj.filterLengthName;
        filterPriceName.innerText = Products.TextObj.filterPriceName;
        sort.innerText = Products.TextObj.sortText;
        search.innerText = Products.TextObj.searchText;
        sortRandom.innerText = Products.TextObj.sortRandom;
        sortChoiceByRatingDesc.innerText = Products.TextObj.sortByRatingDescText;
        sortChoiceByRatingAsc.innerText = Products.TextObj.sortByRatingAscText;
        sortChoiceByPriceAsc.innerText = Products.TextObj.sortByPriceAscText;
        sortChoiceByPriceDesc.innerText = Products.TextObj.sortByPriceDescText;

        filtersContainer.append(resetCopyContainer, filters);
        filters.append(filterWood, filterCore, filterLength, filterPrice);
        filterWood.append(filterWoodName, filterWoodContent);
        filterCore.append(filterCoreName, filterCoreContent);
        filterLength.append(filterLengthName, filterLengthContent);
        filterPrice.append(filterPriceName, filterPriceContent);
        resetCopyContainer.append(reset, copy);
        productContainer.append(viewSettings, productList);
        viewSettings.append(sort, results, searchForm, view);
        sort.append(
            sortRandom,
            sortChoiceByRatingAsc,
            sortChoiceByRatingDesc,
            sortChoiceByPriceAsc,
            sortChoiceByPriceDesc
        );
        searchForm.append(search);
        this.container.append(filtersContainer, productContainer);

        let filtered: Product[] = [];
        let sortResult: string, viewResult: string, searchResult: string, wands: RootObject;
        let wandsData: Product[];
        let requestURL = './app-data/wands.json';
        let request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();

        request.onload = function () {
            wands = request.response;
            getJson(wands);
            sortProd();
            addFilterWood();
            addFilterCore();
            addFilterLength();
            addFilterPrice();

            sort.addEventListener('change', filter);
            reset.addEventListener('click', resetFilters);
            copy.addEventListener('click', copyLink);
            view.addEventListener('click', changeView);
            searchForm.addEventListener('change', setLengthPrice);
            searchForm.addEventListener('keyup', filter);
            searchForm.addEventListener('submit', searchSubmit);
        };

        function getJson(jsonObj: RootObject) {
            wandsData = jsonObj['products'];
            return wandsData;
        }

        function sortProd() {
            productList.innerHTML = '';
            if (sort.value === 'sortByPriceAsc') {
                sortByPriceAsc(wands);
            } else if (sort.value === 'sortByPriceDesc') {
                sortByPriceDesc(wands);
            } else if (sort.value === 'sortByRatingAsc') {
                sortByRatingAsc(wands);
            } else if (sort.value === 'sortByRatingDesc') {
                sortByRatingDesc(wands);
            }
            chooseView();
        }

        function addFilterWood() {
            let arrWood: string[] = [];
            wandsData.forEach((elem) => arrWood.push(elem.wood));
            let woodCategories = Array.from(new Set(arrWood));
            let woodCategoriesLowerCase = woodCategories.map((elem) => elem.toLowerCase().split(' ').join(''));

            for (let i = 0; i < woodCategories.length; i++) {
                const woodDiv = document.createElement('div') as HTMLDivElement;
                const woodInput = document.createElement('input') as HTMLInputElement;
                const woodLabel = document.createElement('label') as HTMLLabelElement;
                woodDiv.className = 'categoryDiv';
                woodInput.className = 'category wood';
                woodInput.setAttribute('type', 'checkbox');
                woodInput.setAttribute('name', woodCategories[i]);
                woodInput.setAttribute('id', woodCategoriesLowerCase[i]);
                woodLabel.setAttribute('for', woodCategoriesLowerCase[i]);
                woodLabel.innerText = woodCategories[i];
                woodDiv.append(woodInput, woodLabel);
                filterWoodContent.append(woodDiv);

                woodInput.addEventListener('change', setLengthPrice);
                woodInput.addEventListener('change', filter);
            }
        }

        function addFilterCore() {
            let arrCore: string[] = [];
            wandsData.forEach((elem) => arrCore.push(elem.core));
            let coreCategories = Array.from(new Set(arrCore));
            let coreCategoriesLowerCase = coreCategories.map((elem) => elem.toLowerCase().split(' ').join(''));

            for (let i = 0; i < coreCategories.length; i++) {
                const coreDiv = document.createElement('div') as HTMLDivElement;
                let coreInput = document.createElement('input') as HTMLInputElement;
                const coreLabel = document.createElement('label') as HTMLLabelElement;
                coreDiv.className = 'categoryDiv';
                coreInput.className = 'category core';
                coreInput.setAttribute('type', 'checkbox');
                coreInput.setAttribute('name', coreCategories[i]);
                coreInput.setAttribute('id', coreCategoriesLowerCase[i]);
                coreLabel.setAttribute('for', coreCategoriesLowerCase[i]);
                coreLabel.innerText = coreCategories[i];
                coreDiv.append(coreInput, coreLabel);
                filterCoreContent.append(coreDiv);

                coreInput.addEventListener('change', setLengthPrice);
                coreInput.addEventListener('change', filter);
            }
        }

        function addFilterLength() {
            let arrLength: number[] = [];
            wandsData.forEach((elem) => arrLength.push(+elem.length));
            const minDiv = document.createElement('div') as HTMLDivElement;
            const maxDiv = document.createElement('div') as HTMLDivElement;
            const lengthSpan = document.createElement('span') as HTMLSpanElement;

            lengthSpan.className = 'multi-range';
            minDiv.className = 'minL__label';
            maxDiv.className = 'maxL__label';
            lengthMinInput.className = 'category length min';
            lengthMaxInput.className = 'category length max';
            lengthMinInput.setAttribute('type', 'range');
            lengthMinInput.setAttribute('min', '9');
            lengthMinInput.setAttribute('max', '18');
            lengthMinInput.setAttribute('value', '9');
            lengthMinInput.setAttribute('step', '1');
            lengthMaxInput.setAttribute('type', 'range');
            lengthMaxInput.setAttribute('min', '9');
            lengthMaxInput.setAttribute('max', '18');
            lengthMaxInput.setAttribute('value', '18');
            lengthMaxInput.setAttribute('step', '1');

            let min = lengthMinInput.getAttribute('min');
            if (min) {
                minDiv.innerText = min.toString() + '"';
            }

            let max = lengthMaxInput.getAttribute('max');
            if (max) {
                maxDiv.innerText = max.toString() + '"';
            }

            lengthSpan.append(lengthMinInput, lengthMaxInput);
            filterLengthContent.append(minDiv, lengthSpan, maxDiv);

            const rangeInput = document.querySelectorAll('.length');
            rangeInput.forEach((input) => {
                input.addEventListener('input', (e) => {
                    let minRange = parseInt(lengthMinInput.value);
                    let maxRange = parseInt(lengthMaxInput.value);
                    if (maxRange > minRange) {
                        lengthMinInput.setAttribute('value', minRange.toString());
                        minDiv.innerText = minRange.toString() + '"';
                        lengthMaxInput.setAttribute('value', maxRange.toString());
                        maxDiv.innerText = maxRange.toString() + '"';
                    } else {
                        minDiv.innerText = maxRange.toString() + '"';
                        maxDiv.innerText = minRange.toString() + '"';
                    }
                });
            });
            lengthMinInput.addEventListener('change', filter);
            lengthMaxInput.addEventListener('change', filter);
        }

        function addFilterPrice() {
            let arrPrice: number[] = [];
            wandsData.forEach((elem) => arrPrice.push(+elem.price));
            const minDiv = document.createElement('div') as HTMLDivElement;
            const maxDiv = document.createElement('div') as HTMLDivElement;
            const priceSpan = document.createElement('span') as HTMLSpanElement;

            priceSpan.className = 'multi-range2';
            minDiv.className = 'minP__label';
            maxDiv.className = 'maxP__label';
            priceMinInput.className = 'category price min';
            priceMaxInput.className = 'category price max';
            priceMinInput.setAttribute('type', 'range');
            priceMinInput.setAttribute('min', '5');
            priceMinInput.setAttribute('max', '30');
            priceMinInput.setAttribute('value', '5');
            priceMinInput.setAttribute('step', '1');
            priceMaxInput.setAttribute('type', 'range');
            priceMaxInput.setAttribute('min', '5');
            priceMaxInput.setAttribute('max', '30');
            priceMaxInput.setAttribute('value', '30');
            priceMaxInput.setAttribute('step', '1');
            minDiv.innerText = '5ʛ';
            maxDiv.innerText = '30ʛ';

            priceSpan.append(priceMinInput, priceMaxInput);
            filterPriceContent.append(minDiv, priceSpan, maxDiv);

            const rangeInput = document.querySelectorAll('.price');
            rangeInput.forEach((input) => {
                input.addEventListener('input', (e) => {
                    let minRange = parseInt(priceMinInput.value);
                    let maxRange = parseInt(priceMaxInput.value);
                    if (maxRange > minRange) {
                        priceMinInput.setAttribute('value', minRange.toString());
                        minDiv.innerText = minRange.toString() + 'ʛ';
                        priceMaxInput.setAttribute('value', maxRange.toString());
                        maxDiv.innerText = maxRange.toString() + '"';
                    } else {
                        minDiv.innerText = maxRange.toString() + 'ʛ';
                        maxDiv.innerText = minRange.toString() + 'ʛ';
                    }
                });
            });
            priceMinInput.addEventListener('change', filter);
            priceMaxInput.addEventListener('change', filter);
        }

        function setLengthPrice() {
            lengthMinInput.setAttribute('value', '9');
            lengthMaxInput.setAttribute('value', '18');
            priceMinInput.setAttribute('value', '5');
            priceMaxInput.setAttribute('value', '30');
        }

        function filter() {
            sortProd();
            productList.innerHTML = '';
            filtered = [];
            let inputValue: string[] = []; // Length min, length max, Price min, Price max
            let inputWood: string[] = []; // Wood
            let inputCore: string[] = []; // Core

            inputValue.push(lengthMinInput.value, lengthMaxInput.value);
            inputValue.sort((a, b) => +a - +b);

            if (+priceMinInput.value <= +priceMaxInput.value) {
                inputValue.push(priceMinInput.value, priceMaxInput.value);
            } else {
                inputValue.push(priceMaxInput.value, priceMinInput.value);
            }

            let inputsWood = document.getElementsByClassName('wood');
            for (let i = 0; i < inputsWood.length; i++) {
                if ((inputsWood[i] as HTMLInputElement).checked) {
                    inputWood.push(inputsWood[i].getAttribute('name') as string);
                }
            }

            let inputsCore = document.getElementsByClassName('core');
            for (let i = 0; i < inputsCore.length; i++) {
                if ((inputsCore[i] as HTMLInputElement).checked) {
                    inputCore.push(inputsCore[i].getAttribute('name') as string);
                }
            }

            let minL = 18;
            let maxL = 9;
            let minP = 30;
            let maxP = 5;

            wandsData.forEach(function getMatch(elem) {
                let searchContent1 = elem.wood;
                let searchContent2 = elem.core;
                let searchContent3 = elem.length;
                let searchContent4 = elem.price;
                let searchContent5 = (
                    elem.name +
                    elem.wood +
                    elem.core +
                    elem.length +
                    elem.stock +
                    elem.rating +
                    elem.discountPercentage +
                    elem.price +
                    elem.ownerOfSimilarWand +
                    elem.description
                ).toUpperCase();

                let inp1 = inputWood.join();
                let inp2 = inputCore.join();
                searchResult = search.value.trim().toUpperCase();

                if (
                    (inp1.includes(searchContent1) || inp1 === '') &&
                    (inp2.includes(searchContent2) || inp2 === '') &&
                    +searchContent3 >= +inputValue[0] &&
                    +searchContent3 <= +inputValue[1] &&
                    +searchContent4 >= +inputValue[2] &&
                    +searchContent4 <= +inputValue[3] &&
                    (searchContent5.includes(searchResult) || searchResult === undefined)
                ) {
                    filtered.push(elem);
                    if (+elem.length < minL) {
                        minL = +elem.length;
                    }
                    if (+elem.length > maxL) {
                        maxL = +elem.length;
                    }
                    if (+elem.price < minP) {
                        minP = +elem.price;
                    }
                    if (+elem.price > maxP) {
                        maxP = +elem.price;
                    }
                }
            });

            lengthMinInput.setAttribute('value', minL.toString());
            lengthMaxInput.setAttribute('value', maxL.toString());
            let setMinL = document.querySelector('.minL__label');
            let setMaxL = document.querySelector('.maxL__label');
            (setMinL as HTMLDivElement).innerText = minL.toString() + '"';
            (setMaxL as HTMLDivElement).innerText = maxL.toString() + '"';
            priceMinInput.setAttribute('value', minP.toString());
            priceMaxInput.setAttribute('value', maxP.toString());
            let setMinP = document.querySelector('.minP__label');
            let setMaxP = document.querySelector('.maxP__label');
            (setMaxP as HTMLDivElement).innerText = maxP.toString() + 'ʛ';
            (setMinP as HTMLDivElement).innerText = minP.toString() + 'ʛ';

            addWandsGrid(filtered);
            results.innerText = Products.TextObj.resultText + ' ' + productList.childNodes.length;
        }

        function addWandsGrid(wandsData: Product[]) {
            results.innerText = Products.TextObj.resultText + ' ' + wandsData.length;
            for (let i = 0; i < wandsData.length; i++) {
                const prodItem = document.createElement('div') as HTMLDivElement;
                prodItem.style.backgroundImage = 'url(' + wandsData[i].thumbnail + ')';
                const prodName = document.createElement('div') as HTMLDivElement;
                const wood = document.createElement('div') as HTMLDivElement;
                const core = document.createElement('div') as HTMLDivElement;
                const length = document.createElement('div') as HTMLDivElement;
                const rating = document.createElement('div') as HTMLDivElement;
                const stock = document.createElement('div') as HTMLDivElement;
                const discount = document.createElement('div') as HTMLDivElement;
                const price = document.createElement('div') as HTMLDivElement;
                const addToCartBtn = document.createElement('button') as HTMLButtonElement;
                const detailsBtn = document.createElement('button') as HTMLButtonElement;

                detailsBtn.addEventListener('click', () => {
                    const ARTICLE = document.querySelector('article');
                    ARTICLE?.setAttribute('id', prodItem.getAttribute('data-link') as string);
                    window.location.hash = `${ARTICLE?.getAttribute('id')}`;
                });

                prodItem.className = 'product__item';
                prodName.className = 'prod__name';
                wood.className = 'prod__desc';
                core.className = 'prod__desc';
                length.className = 'prod__desc';
                rating.className = 'prod__desc';
                stock.className = 'prod__desc';
                discount.className = 'prod__desc';
                price.className = 'prod__desc';
                addToCartBtn.classList.add('buy__btn', wandsData[i].id.toString());
                detailsBtn.className = 'buy__btn';
                prodItem.setAttribute('id', wandsData[i].id.toString());
                prodItem.setAttribute('data-link', `Wand${wandsData[i].id.toString()}`);

                prodName.textContent = wandsData[i].name;
                core.textContent = 'Core: ' + wandsData[i].core;
                wood.textContent = 'Wood: ' + wandsData[i].wood;
                length.textContent = 'Length: ' + wandsData[i].length + '"';
                rating.textContent = 'Rating: ' + wandsData[i].rating;
                stock.textContent = 'Stock: ' + wandsData[i].stock;
                discount.textContent = 'Discount: ' + wandsData[i].discountPercentage + '%';
                price.textContent = 'Price: ' + wandsData[i].price + 'ʛ';
                detailsBtn.innerText = Products.TextObj.detailsBtn;
                if (productsInCart[i + 1] > 0) {
                    addToCartBtn.innerText = Products.TextObj.addToCartBtn2;
                } else {
                    addToCartBtn.innerText = Products.TextObj.addToCartBtn;
                }

                productList.append(prodItem);
                prodItem.append(prodName, core, wood, length, rating, stock, discount, price, addToCartBtn, detailsBtn);

                addToCartBtn.addEventListener('click', () => {
                    let stock = wandsData[i].stock;
                    let key = (i + 1).toString();
                    if (!productsInCart[key] && stock === 0) {
                        productsInCart[key] = 0;
                        (cartPrice as HTMLDivElement).style.display = 'none';
                    } else if (!productsInCart[key] && stock > 0) {
                        productsInCart[key] = 1;
                        (cartPrice as HTMLDivElement).style.display = 'block';
                        (cartPrice as HTMLDivElement).innerText =
                            (+(cartPrice as HTMLDivElement).innerText.slice(0, -1) + wandsData[i].price).toString() +
                            'ʛ';
                        addToCartBtn.innerText = Products.TextObj.addToCartBtn2;
                    } else if (productsInCart[key] && productsInCart[key] < stock) {
                        productsInCart[key] = productsInCart[key] + 1;
                        (cartPrice as HTMLDivElement).innerText =
                            (+(cartPrice as HTMLDivElement).innerText.slice(0, -1) + wandsData[i].price).toString() +
                            'ʛ';
                        addToCartBtn.innerText = Products.TextObj.addToCartBtn2;
                    } else if (productsInCart[key] && productsInCart[key] > stock) {
                        productsInCart[key] = productsInCart[key];
                    }
                    cart = productsInCart;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    let sum = 0;
                    for (let num of Object.values(productsInCart)) {
                        sum += num;
                    }
                    priceInCart.price = +(cartPrice as HTMLDivElement).innerText.slice(0, -1);
                    totalPrice = priceInCart;
                    localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
                    (cartNum as HTMLDivElement).innerHTML = sum.toString();
                });
            }
        }

        function addWandsList(wandsData: Product[]) {
            results.innerText = Products.TextObj.resultText + ' ' + wandsData.length;
            for (let i = 0; i < wandsData.length; i++) {
                const prodItem = document.createElement('div') as HTMLDivElement;
                prodItem.style.backgroundImage = 'url(' + wandsData[i].thumbnail + ')';
                const prodName = document.createElement('div') as HTMLDivElement;
                const price = document.createElement('div') as HTMLDivElement;
                const addToCartBtn = document.createElement('button') as HTMLButtonElement;
                const detailsBtn = document.createElement('button') as HTMLButtonElement;

                // detailsBtn.addEventListener('click',())

                productList.style.flexDirection = 'column';
                prodName.style.height = 'auto';
                price.style.fontSize = '2rem';
                prodItem.className = 'product__itemlist';
                prodName.className = 'prod__name';
                price.className = 'prod__desc';
                addToCartBtn.className = 'buy__btn';
                detailsBtn.className = 'buy__btn';
                prodItem.setAttribute('link', 'wand');
                prodItem.setAttribute('id', wandsData[i].id.toString());

                prodName.textContent = wandsData[i].name;
                price.textContent = wandsData[i].price + 'ʛ (Galleon)';
                detailsBtn.innerText = Products.TextObj.detailsBtn;
                if (productsInCart[i + 1] > 0) {
                    addToCartBtn.innerText = Products.TextObj.addToCartBtn2;
                } else {
                    addToCartBtn.innerText = Products.TextObj.addToCartBtn;
                }

                productList.append(prodItem);
                prodItem.append(prodName, price, addToCartBtn, detailsBtn);

                addToCartBtn.addEventListener('click', () => {
                    let stock = wandsData[i].stock;
                    let key = (i + 1).toString();
                    if (!productsInCart[key] && stock === 0) {
                        productsInCart[key] = 0;
                        (cartPrice as HTMLDivElement).style.display = 'none';
                    } else if (!productsInCart[key] && stock > 0) {
                        productsInCart[key] = 1;
                        (cartPrice as HTMLDivElement).style.display = 'block';
                        (cartPrice as HTMLDivElement).innerText =
                            (+(cartPrice as HTMLDivElement).innerText.slice(0, -1) + wandsData[i].price).toString() +
                            'ʛ';
                        addToCartBtn.innerText = Products.TextObj.addToCartBtn2;
                    } else if (productsInCart[key] && productsInCart[key] < stock) {
                        productsInCart[key] = productsInCart[key] + 1;
                        (cartPrice as HTMLDivElement).innerText =
                            (+(cartPrice as HTMLDivElement).innerText.slice(0, -1) + wandsData[i].price).toString() +
                            'ʛ';
                        addToCartBtn.innerText = Products.TextObj.addToCartBtn2;
                    } else if (productsInCart[key] && productsInCart[key] > stock) {
                        productsInCart[key] = productsInCart[key];
                    }
                    cart = productsInCart;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    let sum = 0;
                    for (let num of Object.values(productsInCart)) {
                        sum += num;
                    }
                    priceInCart.price = +(cartPrice as HTMLDivElement).innerText.slice(0, -1);
                    totalPrice = priceInCart;
                    localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
                    (cartNum as HTMLDivElement).innerHTML = sum.toString();
                });
            }
        }

        function sortByPriceAsc(jsonObj: RootObject) {
            let wandsData: Product[] = jsonObj['products'];
            sortResult = 'sortByPriceAsc';

            wandsData.sort((a, b) => {
                let priceElA = a.price.toString();
                let priceElB = b.price.toString();
                let numA = parseInt(priceElA);
                let numB = parseInt(priceElB);
                if (numA > numB) {
                    return 1;
                }
                if (numA < numB) {
                    return -1;
                }
                return 0;
            });
        }

        function sortByPriceDesc(jsonObj: RootObject) {
            let wandsData: Product[] = jsonObj['products'];
            sortResult = 'sortByPriceDesc';

            wandsData.sort((a, b) => {
                let priceElA = a.price.toString();
                let priceElB = b.price.toString();
                let numA = parseInt(priceElA);
                let numB = parseInt(priceElB);
                if (numA < numB) {
                    return 1;
                }
                if (numA > numB) {
                    return -1;
                }
                return 0;
            });
        }

        function sortByRatingAsc(jsonObj: RootObject) {
            let wandsData: Product[] = jsonObj['products'];
            sortResult = 'sortByRatingAsc';

            wandsData.sort((a, b) => {
                let ratingElA = a.rating.toString();
                let ratingElB = b.rating.toString();
                let numA = parseInt(ratingElA);
                let numB = parseInt(ratingElB);
                if (numA > numB) {
                    return 1;
                }
                if (numA < numB) {
                    return -1;
                }
                return 0;
            });
        }

        function sortByRatingDesc(jsonObj: RootObject) {
            let wandsData: Product[] = jsonObj['products'];
            sortResult = 'sortByRatingDesc';

            wandsData.sort((a, b) => {
                let ratingElA = a.rating.toString();
                let ratingElB = b.rating.toString();
                let numA = parseInt(ratingElA);
                let numB = parseInt(ratingElB);
                if (numA < numB) {
                    return 1;
                }
                if (numA > numB) {
                    return -1;
                }
                return 0;
            });
        }

        function searchSubmit(evt: Event) {
            evt.preventDefault();
        }

        function chooseView() {
            if (view.className === 'view') {
                viewResult = 'grid';
                productList.innerHTML = '';
                productList.style.flexDirection = 'row';
                filtered.length === 0 ? addWandsGrid(wandsData) : addWandsGrid(filtered);
            } else {
                viewResult = 'list';
                productList.innerHTML = '';
                filtered.length === 0 ? addWandsList(wandsData) : addWandsList(filtered);
            }
        }

        function changeView() {
            view.classList.toggle('list');
            chooseView();
        }

        function resetFilters() {
            setLengthPrice();
            filtered = [];
            filterLengthContent.innerHTML = '';
            filterPriceContent.innerHTML = '';
            productList.innerHTML = '';
            search.value = '';
            sort.value = 'sortRandom';
            productList.style.flexDirection = 'row';
            let woodCore = document.getElementsByClassName('category');
            for (let i = 0; i < woodCore.length; i++) {
                (woodCore[i] as HTMLInputElement).checked = false;
            }
            addFilterLength();
            addFilterPrice();
            addWandsGrid(wandsData);
        }

        function copyLink() {
            let copytext = document.createElement('input');
            copytext.value = window.location.href;
            document.body.appendChild(copytext);
            copytext.select();
            document.execCommand('copy');
            document.body.removeChild(copytext);
            copy.innerText = 'Copied!';
            setTimeout(() => {
                copy.innerText = Products.TextObj.copy;
            }, 1500);
        }
    }

    render(): HTMLElement {
        this.renderProductList();
        return this.container;
    }
}

export default Products;
