abstract class PageInner {
    container: HTMLElement;
    tagName: string;
    className: string;
    constructor(container: HTMLElement, tagName: string, className: string) {
        this.tagName = tagName;
        this.className = className;
        this.container = container;
    }
    static TextObj = {};
    createContent() {}

    render(): HTMLElement {
        this.createContent();
        return this.container;
    }
}

export default PageInner;
