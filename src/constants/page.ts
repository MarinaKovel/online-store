abstract class Page {
    pageView: HTMLElement;
    static TextObj = {};
    constructor(id: string) {
        this.pageView = document.createElement('article');
        this.pageView.id = id;
    }
    createHeaderTitle(text: string) {
        const headerTitle = document.createElement('h1') as HTMLHeadingElement;
        headerTitle.innerText = text;
        return headerTitle;
    }
    render() {
        return this.pageView;
    }
}

export default Page;
