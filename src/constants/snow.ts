import PageInner from '../componets/pageInnerTemplate';

class Snow extends PageInner {
    constructor(container: HTMLElement, tagName: string, className: string) {
        super(container, tagName, className);
    }
    static TextObj = {
        innerHtml: `
        <div class="let-it-snow">
      <div class="snow layer1 a"></div>
      <div class="snow layer1"></div> 
      <div class="snow layer2 a"></div>
      <div class="snow layer2"></div>
      <div class="snow layer3 a"></div>
      <div class="snow layer3"></div>
        </div>`,
    };
    renderSnow() {
        this.container.innerHTML += Snow.TextObj.innerHtml;
    }
}

export default Snow;
