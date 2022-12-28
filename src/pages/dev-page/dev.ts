import Page from '../../constants/page';

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
        return this.pageView;
    }
}

export default DevsPage;
