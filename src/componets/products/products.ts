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

class Products extends Component {

    static TextObj = {
        reset: 'Reset Filters',
        copy: 'Copy Link',
        filterWoodName: 'Choose by Wood',
        filterCoreName: 'Choose by Core',
        sortText: 'Sort',
        resultText: 'Results: ',
        searchText: 'Search',
        addToCartBtn: 'Add to cart',
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
        sort.innerText = Products.TextObj.sortText;
        search.innerText = Products.TextObj.searchText;
        sortRandom.innerText = Products.TextObj.sortRandom;
        sortChoiceByRatingDesc.innerText = Products.TextObj.sortByRatingDescText;
        sortChoiceByRatingAsc.innerText = Products.TextObj.sortByRatingAscText;
        sortChoiceByPriceAsc.innerText = Products.TextObj.sortByPriceAscText;
        sortChoiceByPriceDesc.innerText = Products.TextObj.sortByPriceDescText;

        filtersContainer.append(resetCopyContainer, filters);
        filters.append(filterWood, filterCore);
        filterWood.append(filterWoodName, filterWoodContent);
        filterCore.append(filterCoreName, filterCoreContent);
        resetCopyContainer.append(reset, copy);
        productContainer.append(viewSettings, productList);
        viewSettings.append(sort, results, searchForm, view);
        sort.append(sortRandom, sortChoiceByRatingAsc, sortChoiceByRatingDesc, sortChoiceByPriceAsc, sortChoiceByPriceDesc)
        searchForm.append(search);

        let wandsData: Product[];
        let requestURL = './app-data/wands.json';
        let request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();

        request.onload = function() {
            let wands: RootObject = request.response;
            getJson(wands);
            sortProd();
            addFilterWood();
            addFilterCore();

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

            sort.addEventListener("change", sortProd);
        }

        function getJson(jsonObj: RootObject) {
            wandsData = jsonObj['products'];
            return wandsData;
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
    
                prodItem.className = 'product__item';
                prodName.className = 'prod__name';
                wood.className = 'prod__desc';
                core.className = 'prod__desc';
                length.className = 'prod__desc';
                rating.className = 'prod__desc';
                stock.className = 'prod__desc';
                discount.className = 'prod__desc';
                price.className = 'prod__desc';
                addToCartBtn.className = 'buy__btn';
                detailsBtn.className = 'buy__btn';
    
                prodName.textContent = wandsData[i].name;
                core.textContent = 'Core: ' + wandsData[i].core;
                wood.textContent = 'Wood: ' + wandsData[i].wood;
                length.textContent = 'Length: ' + wandsData[i].length + '"';
                rating.textContent = 'Rating: ' + wandsData[i].rating;
                stock.textContent = 'Stock: ' + wandsData[i].stock;
                discount.textContent = 'Discount: ' + wandsData[i].discountPercentage + '%';
                price.textContent = 'Price: ' + wandsData[i].price + 'ʛ';
                addToCartBtn.innerText = Products.TextObj.addToCartBtn;
                detailsBtn.innerText = Products.TextObj.detailsBtn;

                productList.append(prodItem);
                prodItem.append(prodName, core, wood, length, rating, stock, discount, price, addToCartBtn, detailsBtn);
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
    
                productList.style.flexDirection = 'column';
                prodName.style.height = 'auto';
                price.style.fontSize = '2rem';
                prodItem.className = 'product__itemlist';
                prodName.className = 'prod__name';
                price.className = 'prod__desc';
                addToCartBtn.className = 'buy__btn';
                detailsBtn.className = 'buy__btn';
    
                prodName.textContent = wandsData[i].name;
                price.textContent = wandsData[i].price + 'ʛ (Galleon)';
                addToCartBtn.innerText = Products.TextObj.addToCartBtn;
                detailsBtn.innerText = Products.TextObj.detailsBtn;

                productList.append(prodItem);
                prodItem.append(prodName, price, addToCartBtn, detailsBtn);
            }
        }

        this.container.append(filtersContainer, productContainer);


        function addFilterWood() {
            let arrWood: string[] = [];
            wandsData.forEach((elem) => arrWood.push(elem.wood));
            let woodCategories = Array.from(new Set(arrWood));
            let woodCategoriesLowerCase = woodCategories.map(elem => elem.toLowerCase().split(' ').join(''));
            
            for (let i = 0; i < woodCategories.length; i++) {
                const woodDiv = document.createElement('div') as HTMLDivElement;
                let woodInput = document.createElement('input') as HTMLInputElement;
                const woodLabel = document.createElement('label') as HTMLLabelElement;
                woodDiv.className = 'categoryDiv';
                woodInput.className = 'category';
                woodInput.setAttribute('type', 'checkbox');
                woodInput.setAttribute('name', woodCategories[i]);
                woodInput.setAttribute('id', woodCategoriesLowerCase[i]);
                woodLabel.setAttribute('for', woodCategoriesLowerCase[i]);
                woodLabel.innerText = woodCategories[i];
                woodDiv.append(woodInput, woodLabel);
                filterWoodContent.append(woodDiv);

                woodInput.addEventListener('change', function() {
                    productList.innerHTML = '';
                    let filtered: Product[] = [];
                    let arr = [];
                    let inputs = document.getElementsByClassName('category');
                    for (let i = 0; i < inputs.length; i++) {
                        if ((inputs[i] as HTMLInputElement).checked) {
                            arr.push(inputs[i].getAttribute('name'));
                        }
                    }
                    let inputValue = arr.join('');

                    wandsData.forEach(
                        function getMatch(elem) {
                            let searchContent = elem.wood;
                            if (inputValue.includes(searchContent) || inputValue === '') {
                                filtered = [];
                                filtered.push(elem);
                                if (view.className === 'view') {
                                    addWandsGrid(filtered);
                                    results.innerText = Products.TextObj.resultText + ' ' + productList.childNodes.length;
                                } else {
                                    addWandsList(filtered);
                                    results.innerText = Products.TextObj.resultText + ' ' + productList.childNodes.length;
                                }
                            } else if (productList.childNodes.length === 0) {
                                results.innerText = Products.TextObj.resultText + ' 0';
                            }
                        }
                    )
                });
            }
        }

        function addFilterCore() {
            let arrCore: string[] = [];
            wandsData.forEach((elem) => arrCore.push(elem.core));
            let coreCategories = Array.from(new Set(arrCore));
            let coreCategoriesLowerCase = coreCategories.map(elem => elem.toLowerCase().split(' ').join(''));
            
            for (let i = 0; i < coreCategories.length; i++) {
                const coreDiv = document.createElement('div') as HTMLDivElement;
                let coreInput = document.createElement('input') as HTMLInputElement;
                const coreLabel = document.createElement('label') as HTMLLabelElement;
                coreDiv.className = 'categoryDiv';
                coreInput.className = 'category';
                coreInput.setAttribute('type', 'checkbox');
                coreInput.setAttribute('name', coreCategories[i]);
                coreInput.setAttribute('id', coreCategoriesLowerCase[i]);
                coreLabel.setAttribute('for', coreCategoriesLowerCase[i]);
                coreLabel.innerText = coreCategories[i];
                coreDiv.append(coreInput, coreLabel);
                filterCoreContent.append(coreDiv);

                coreInput.addEventListener('change', function() {
                    productList.innerHTML = '';
                    let filtered: Product[] = [];
                    let arr = [];
                    let inputs = document.getElementsByClassName('category');
                    for (let i = 0; i < inputs.length; i++) {
                        if ((inputs[i] as HTMLInputElement).checked) {
                            arr.push(inputs[i].getAttribute('name'));
                        }
                    }
                    let inputValue = arr.join('');

                    wandsData.forEach(
                        function getMatch(elem) {
                            let searchContent = elem.core;
                            if (inputValue.includes(searchContent) || inputValue === '') {
                                filtered = [];
                                filtered.push(elem);
                                if (view.className === 'view') {
                                    addWandsGrid(filtered);
                                    results.innerText = Products.TextObj.resultText + ' ' + productList.childNodes.length;
                                } else {
                                    addWandsList(filtered);
                                    results.innerText = Products.TextObj.resultText + ' ' + productList.childNodes.length;
                                }
                            } else if (productList.childNodes.length === 0) {
                                results.innerText = Products.TextObj.resultText + ' 0';
                            }
                        }
                    )
                });
            }
        }

        function sortByPriceAsc(jsonObj: RootObject) {
            let wandsData: Product[] = jsonObj['products'];
            
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
        function searchProducts() {
            productList.innerHTML = '';
            let filtered: Product[] = [];
            let inputValue = search.value.trim().toUpperCase();
            
            wandsData.forEach(
                function getMatch(elem) {
                    let searchContent = (elem.name + elem.wood + elem.core + elem.length + elem.stock + elem.rating + elem.discountPercentage + elem.price + elem.ownerOfSimilarWand + elem.description).toUpperCase();
                    if (searchContent.includes(inputValue)) {
                        filtered = [];
                        filtered.push(elem);
                        if (view.className === 'view') {
                            addWandsGrid(filtered);
                            results.innerText = Products.TextObj.resultText + ' ' + productList.childNodes.length;
                        } else {
                            addWandsList(filtered);
                            results.innerText = Products.TextObj.resultText + ' ' + productList.childNodes.length;
                        }
                    } else if (productList.childNodes.length === 0) {
                        results.innerText = Products.TextObj.resultText + ' 0';
                    }
                }
            )
        }

        searchForm.addEventListener('keyup', searchProducts);
        searchForm.addEventListener('submit', searchSubmit);

        function chooseView() {
            if (view.className === 'view') {
                productList.innerHTML = '';
                productList.style.flexDirection = 'row';
                addWandsGrid(wandsData);
            } else {
                productList.innerHTML = '';
                addWandsList(wandsData);
            }
        }
        function changeView() {
            view.classList.toggle('list');
            chooseView();
        }
        view.addEventListener('click', changeView);
    }

    render(): HTMLElement {
        this.renderProductList();
        return this.container;
    }
}

export default Products;