import Page from '../../constants/page';
import Description from '../../componets/description/description'; // Desc

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

        let description = new Description('section', 'product');  //add desc
        this.pageView.append(description.render());  //add desc

        return this.pageView;
    }
}

export default DevsPage;
