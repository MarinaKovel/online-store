import Page from '../../constants/page';
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

        let order = new Order('section', 'product');  //add order
        this.pageView.append(order.render());  //add order

        return this.pageView;
    }
}

export default DevsPage;
