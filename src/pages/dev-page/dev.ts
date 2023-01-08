import Page from '../../constants/page';
import Cart from '../../componets/cart/cart'; // Cart

class DevsPage extends Page {
    static TextObj = {
        DevPageTitle: 'Devs Page text',
    };
    constructor(id: string) {
        super(id);
    }
    render() {
        const title = this.createHeaderTitle(DevsPage.TextObj.DevPageTitle);
        this.pageView.append(title);

        let cart = new Cart('section', 'cart');  //add cart
        this.pageView.append(cart.render());  //add cart

        return this.pageView;
    }
}

export default DevsPage;
