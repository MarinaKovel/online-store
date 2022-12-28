import Page from '../../constants/page';

class MainPage extends Page {
    static TextObj = {
        MainTitle: 'Main Page',
    };

    constructor(id: string) {
        super(id);
    }

    render() {
        const title = this.createHeaderTitle(MainPage.TextObj.MainTitle);
        this.pageView.append(title);
        return this.pageView;
    }
}

export default MainPage;
