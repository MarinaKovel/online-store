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
    };
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    renderProductList() {
        const filters = document.createElement('div') as HTMLDivElement;
        const productContainer = document.createElement('div') as HTMLDivElement;
        const viewSettings = document.createElement('div') as HTMLDivElement;
        const productList = document.createElement('div') as HTMLDivElement;
        const sort = document.createElement('div') as HTMLDivElement;
        const results = document.createElement('div') as HTMLDivElement;
        const search = document.createElement('div') as HTMLDivElement;
        const view = document.createElement('div') as HTMLDivElement;

        filters.className = 'filters';
        productContainer.className = 'product__container';
        viewSettings.className = 'view__settings';
        productList.className = 'product__list';
        sort.className = 'settings__text';
        results.className = 'settings__text';
        search.className = 'settings__text';
        view.className = 'settings__text';
        
        filters.innerText = Products.TextObj.filterText;
        sort.innerText = Products.TextObj.sortText;
        results.innerText = Products.TextObj.resultText;
        search.innerText = Products.TextObj.searchText;
        view.innerText = Products.TextObj.viewText;

        productContainer.append(viewSettings);
        productContainer.append(productList);
        viewSettings.append(sort);
        viewSettings.append(results);
        viewSettings.append(search);
        viewSettings.append(view);
        
        let requestURL = './app-data/wands.json';
        let request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();
        request.onload = function() {
            let wands: RootObject = request.response;
            getWands(wands);
            }
            
        function getWands(jsonObj: RootObject) {
            for (let i = 0; i < 30; i++) {
                let wandsData: Product[] = jsonObj['products'];
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
                prodItem.appendChild(prodName);
                prodItem.appendChild(core);
                prodItem.appendChild(wood);
                prodItem.appendChild(length);
                prodItem.appendChild(rating);
                prodItem.appendChild(stock);
                prodItem.appendChild(discount);
                prodItem.appendChild(price);
                prodItem.appendChild(addToCartBtn);
                prodItem.appendChild(detailsBtn);
            }
        }

        this.container.append(filters, productContainer);
    }

    render(): HTMLElement {
        this.renderProductList();
        return this.container;
    }
}

export default Products;