import Page from '../../constants/page';
import Products from '../../componets/products/products';

class ShopPage extends Page {
    static TextObj = {
        shopPageTitle: 'Online wand store',
    };
    constructor(id: string) {
        super(id);
    }
    render() {
        const title = this.createHeaderTitle(ShopPage.TextObj.shopPageTitle);
        this.pageView.append(title);

        let products = new Products('section', 'products');  //add product list
        this.pageView.append(products.render());  //add product list

        return this.pageView;
    }
}

export default ShopPage;
