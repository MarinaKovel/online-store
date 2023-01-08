abstract class Component {
    container: HTMLElement;
    constructor(tagName: string, className: string) {
        this.container = document.createElement(tagName);
        this.container.classList.add(className);
    }
    render() {
        return this.container;
    }
}

export default Component;
