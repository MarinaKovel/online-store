import Page from '../../constants/page';
import './error.scss';
import { PageIds } from '../../controller/app/app';
export const enum ErrorTypes {
    Error_404 = '404',
}

class ErrorPage extends Page {
    static TextObj = {
        code: '404',
        errorText: 'Nothing to see here!',
        errorScary: 'Say Hi TO DEMENTORS !',
    };
    constructor(id: string) {
        super(id);
    }
    render(): HTMLElement {
        const title = this.createHeaderTitle(`${ErrorPage.TextObj.code}`);
        title.classList.add('error-title');
        const errorPageText = document.createElement('p') as HTMLParagraphElement;
        errorPageText.classList.add('error__discription');
        errorPageText.innerText = ErrorPage.TextObj.errorText;
        const scaryText = document.createElement('p') as HTMLParagraphElement;
        scaryText.classList.add('error__scary-text');
        scaryText.innerText = ErrorPage.TextObj.errorScary;
        this.pageView.append(title, errorPageText, scaryText);
        return this.pageView;
    }
}

export default ErrorPage;
