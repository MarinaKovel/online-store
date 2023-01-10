import Page from '../../constants/page';

import DevPageInner from '../../componets/dev-page-content/dev-page-content';

class DevsPage extends Page {
    static TextObj = {
        DevPageTitle: 'Devs Page text',
    };
    constructor(id: string) {
        super(id);
    }

    renderContent() {
        const content = new DevPageInner(this.pageView, 'section', 'devs__inner');
        content.render();
    }

    render() {
        this.renderContent();
        return this.pageView;
    }
}

export default DevsPage;
