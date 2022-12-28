import Page from '../../constants/page';

class ShopPage extends Page {
    static TextObj = {
        shopPageTitle: 'ShopPage text',
    };
    constructor(id: string) {
        super(id);
    }
    render() {
        const title = this.createHeaderTitle(ShopPage.TextObj.shopPageTitle);
        this.pageView.append(title);
        return this.pageView;
    }
}

export default ShopPage;
