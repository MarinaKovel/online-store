import Page from '../../constants/page';
import MPContent from '../../componets/main-page-components/mp-comp';

class MainPage extends Page {
    static TextObj = {
        MainTitle: 'Main Page',
    };

    constructor(id: string) {
        super(id);
    }

    renderComponents() {
        const a = new MPContent(this.pageView, 'section', 'main-section');
        a.render();
    }

    render() {
        this.renderComponents();
        return this.pageView;
    }
}

export default MainPage;
