import './products.scss';
import Component from '../compTemplate';

export interface Product {
    id: number;
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
        sortText: 'Sort',
        resultText: 'Results',
        searchText: 'Search',
        viewText: 'View',
        filterText: 'Filters',
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
        const filters = document.createElement('div') as HTMLDivElement;
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
        const search = document.createElement('div') as HTMLDivElement;
        const view = document.createElement('div') as HTMLDivElement;

        filters.className = 'filters';
        productContainer.className = 'product__container';
        viewSettings.className = 'view__settings';
        productList.className = 'product__list';
        sort.className = 'sort__menu';
        results.className = 'settings__text';
        search.className = 'settings__text';
        view.className = 'settings__text';

        sortRandom.setAttribute('value', 'sortRandom');
        sortChoiceByRatingDesc.setAttribute('value', 'sortByRatingDesc');
        sortChoiceByRatingAsc.setAttribute('value', 'sortByRatingAsc');
        sortChoiceByPriceAsc.setAttribute('value', 'sortByPriceAsc');
        sortChoiceByPriceDesc.setAttribute('value', 'sortByPriceDesc');
        
        filters.innerText = Products.TextObj.filterText;
        sort.innerText = Products.TextObj.sortText;
        results.innerText = Products.TextObj.resultText;
        search.innerText = Products.TextObj.searchText;
        view.innerText = Products.TextObj.viewText;
        sortRandom.innerText = Products.TextObj.sortRandom;
        sortChoiceByRatingDesc.innerText = Products.TextObj.sortByRatingDescText;
        sortChoiceByRatingAsc.innerText = Products.TextObj.sortByRatingAscText;
        sortChoiceByPriceAsc.innerText = Products.TextObj.sortByPriceAscText;
        sortChoiceByPriceDesc.innerText = Products.TextObj.sortByPriceDescText;

        productContainer.append(viewSettings);
        productContainer.append(productList);
        viewSettings.append(sort);
        sort.append(sortRandom, sortChoiceByRatingAsc, sortChoiceByRatingDesc, sortChoiceByPriceAsc, sortChoiceByPriceDesc)
        viewSettings.append(results);
        viewSettings.append(search);
        viewSettings.append(view);

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
                addWands(wandsData);
            }

            sort.addEventListener("change", sortProd);
        }

        function getJson(jsonObj: RootObject) {
            wandsData = jsonObj['products'];
            return wandsData;
        }

        function addWands(wandsData: Product[]) {
            for (let i = 0; i < 30; i++) {
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
    
                prodName.textContent = wandsData[i].wood + ' wand with ' + wandsData[i].core;
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

        this.container.append(filters, productContainer);
    }

    render(): HTMLElement {
        this.renderProductList();
        return this.container;
    }
}

export default Products;