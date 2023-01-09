import Page from '../../constants/page';
import Cart from '../../componets/cart/cart'; // Cart
import Order from '../../componets/order/order'; // Order

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

        let order = new Order('section', 'order');  //add order
        this.pageView.append(order.render());  //add order

        return this.pageView;
    }
}

export default DevsPage;
