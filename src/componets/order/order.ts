import './order.scss';
import Component from '../compTemplate';
import { PageIds } from '../../controller/app/app';

export interface Product {
    id: number;
    name: string;
    wood: string;
    core: string;
    length: string;
    ownerOfSimilarWand: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    thumbnail: string;
    images: string[];
}
export interface RootObject {
    products: Product[];
}
interface ObjectInterface {
    [key: string]: number;
}

class Order extends Component {
    static TextObj = {
        header: 'Personal details',
        nameLabel: 'Name and surname',
        nameReq: 'Minimum 2 words with minimum 3 letters',
        telLabel: 'Phone',
        telReq: 'Minimum 9 numbers starting with "+"',
        addressLabel: 'Delivery address',
        addressReq: 'Minimum 3 words with minimum 5 letters',
        emailLabel: 'Email',
        emailReq: 'Must be a valid email address',
        headerCredit: 'Credit card details',
        cardNumLabel: 'Card number',
        cardNumReq: 'Must be 16 digits',
        cardValidLabel: 'Valid',
        cardValidReq: 'Must be month (2 digits) / year (2 digits)',
        cardCvvLabel: 'CVV',
        cardCvvReq: 'Must be 3 digits',
    };
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }
    renderOrder() {
        const popup = document.createElement('div');
        const form = document.createElement('form');
        const header = document.createElement('h2');
        const personal = document.createElement('div');
        const name = document.createElement('input');
        const nameLabel = document.createElement('label');
        const nameReq = document.createElement('div');
        const telContainer = document.createElement('div');
        const tel = document.createElement('input');
        const telLabel = document.createElement('label');
        const telReq = document.createElement('div');
        const addressContainer = document.createElement('div');
        const address = document.createElement('input');
        const addressLabel = document.createElement('label');
        const addressReq = document.createElement('div');
        const emailContainer = document.createElement('div');
        const email = document.createElement('input');
        const emailLabel = document.createElement('label');
        const emailReq = document.createElement('div');
        const headerCredit = document.createElement('h2');
        const card = document.createElement('div');
        const cardNumContainer = document.createElement('div');
        const cardImg = document.createElement('img');
        const cardNum = document.createElement('div');
        const cardNumInput = document.createElement('input');
        const cardNumLabel = document.createElement('label');
        const cardNumReq = document.createElement('div');
        const cardValidCvv = document.createElement('div');
        const cardValid = document.createElement('div');
        const cardValidInput = document.createElement('input');
        const cardValidLabel = document.createElement('label');
        const cardValidReq = document.createElement('div');
        const cardCvv = document.createElement('div');
        const cardCvvInput = document.createElement('input');
        const cardCvvLabel = document.createElement('label');
        const cardCvvReq = document.createElement('div');
        const submit = document.createElement('input');

        popup.className = 'order';
        form.className = 'form';
        personal.className = 'personal';
        name.className = 'name';
        nameLabel.className = 'name-label';
        nameReq.className = 'requirements';
        tel.className = 'phone';
        telReq.className = 'requirements';
        address.className = 'address';
        addressReq.className = 'requirements';
        email.className = 'email';
        emailReq.className = 'requirements';
        card.className = 'card';
        cardNumContainer.className = 'card-number-container';
        cardImg.className = 'payment';
        cardNum.className = 'card-num';
        cardNumInput.className = 'credit card-number';
        cardNumLabel.className = 'card-number-label';
        cardNumReq.className = 'requirements';
        cardValidCvv.className = 'card-valid-cvv';
        cardValid.className = 'card-valid';
        cardValidInput.className = 'credit';
        cardValidLabel.className = 'card-valid-label';
        cardValidReq.className = 'requirements-short';
        cardCvv.className = 'card-cvv';
        cardCvvInput.className = 'credit';
        cardCvvLabel.className = 'card-cvv-label';
        cardCvvReq.className = 'requirements-short';
        submit.className = 'submit_btn';

        form.setAttribute('action', '#0');

        name.setAttribute('type', 'text');
        name.setAttribute('name', 'name');
        name.setAttribute('id', 'name');
        name.setAttribute('placeholder', ' ');
        name.setAttribute('pattern', '([A-Za-zА-Яа-яЁё]{3,} ){1}([A-Za-zА-Яа-яЁё]{3,}[ ]?){1,}');
        name.setAttribute('title', 'Minimum 2 words with minimum 3 letters');
        name.setAttribute('autocomplete', 'off');
        name.required = true;
        nameLabel.setAttribute('for', 'name');

        tel.setAttribute('type', 'tel');
        tel.setAttribute('name', 'phone');
        tel.setAttribute('id', 'phone');
        tel.setAttribute('placeholder', ' ');
        tel.setAttribute('pattern', '[+][0-9]{9,}');
        tel.setAttribute('title', 'Minimum 9 numbers starting with "+"');
        tel.setAttribute('autocomplete', 'off');
        tel.required = true;
        telLabel.setAttribute('for', 'phone');

        address.setAttribute('type', 'text');
        address.setAttribute('name', 'address');
        address.setAttribute('id', 'address');
        address.setAttribute('placeholder', ' ');
        address.setAttribute('pattern', '(.{5,} ){2,}.{5,}');
        address.setAttribute('title', 'Minimum 3 words with minimum 5 letters');
        address.setAttribute('autocomplete', 'off');
        address.required = true;
        addressLabel.setAttribute('for', 'address');

        email.setAttribute('type', 'email');
        email.setAttribute('name', 'email');
        email.setAttribute('id', 'email');
        email.setAttribute('placeholder', ' ');
        email.setAttribute('pattern', '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$');
        email.setAttribute('title', 'Must be a valid email address');
        email.setAttribute('autocomplete', 'off');
        email.required = true;
        emailLabel.setAttribute('for', 'email');

        cardImg.setAttribute(
            'src',
            'https://raw.githubusercontent.com/MarinaKovel/onlinestoredata/main/unknown-card.png'
        );

        cardNumInput.setAttribute('type', 'text');
        cardNumInput.setAttribute('name', 'card-number');
        cardNumInput.setAttribute('id', 'card-number');
        cardNumInput.setAttribute('placeholder', ' ');
        cardNumInput.setAttribute('pattern', '[0-9]{16}');
        cardNumInput.setAttribute('title', 'Must be 16 digits');
        cardNumInput.setAttribute('autocomplete', 'off');
        cardNumInput.required = true;
        cardNumLabel.setAttribute('for', 'card-number');

        cardValidInput.setAttribute('type', 'text');
        cardValidInput.setAttribute('name', 'card-valid');
        cardValidInput.setAttribute('id', 'card-valid');
        cardValidInput.setAttribute('placeholder', ' ');
        cardValidInput.setAttribute('pattern', '[0-9]{2}/[0-9]{2}');
        cardValidInput.setAttribute('title', 'Must be month (2 digits) / year (2 digits)');
        cardValidInput.setAttribute('autocomplete', 'off');
        cardValidInput.required = true;
        cardValidLabel.setAttribute('for', 'card-valid');

        cardCvvInput.setAttribute('type', 'text');
        cardCvvInput.setAttribute('name', 'cvv');
        cardCvvInput.setAttribute('id', 'cvv');
        cardCvvInput.setAttribute('placeholder', ' ');
        cardCvvInput.setAttribute('pattern', '[0-9]{3}');
        cardCvvInput.setAttribute('title', 'Must be 3 digits');
        cardCvvInput.setAttribute('autocomplete', 'off');
        cardCvvInput.required = true;
        cardCvvLabel.setAttribute('for', 'cvv');

        submit.setAttribute('type', 'submit');
        submit.setAttribute('name', 'submit_btn');
        submit.setAttribute('value', 'Submit');

        header.innerText = Order.TextObj.header;
        nameLabel.innerText = Order.TextObj.nameLabel;
        nameReq.innerText = Order.TextObj.nameReq;
        telLabel.innerText = Order.TextObj.telLabel;
        telReq.innerText = Order.TextObj.telReq;
        addressLabel.innerText = Order.TextObj.addressLabel;
        addressReq.innerText = Order.TextObj.addressReq;
        emailLabel.innerText = Order.TextObj.emailLabel;
        emailReq.innerText = Order.TextObj.emailReq;
        headerCredit.innerText = Order.TextObj.headerCredit;
        cardNumLabel.innerText = Order.TextObj.cardNumLabel;
        cardNumReq.innerText = Order.TextObj.cardNumReq;
        cardValidLabel.innerText = Order.TextObj.cardValidLabel;
        cardValidReq.innerText = Order.TextObj.cardValidReq;
        cardCvvLabel.innerText = Order.TextObj.cardCvvLabel;
        cardCvvReq.innerText = Order.TextObj.cardCvvReq;

        popup.append(form);
        form.append(header, personal, telContainer, addressContainer, emailContainer, headerCredit, card, submit);
        personal.append(name, nameLabel, nameReq);
        telContainer.append(tel, telLabel, telReq);
        addressContainer.append(address, addressLabel, addressReq);
        emailContainer.append(email, emailLabel, emailReq);
        card.append(cardNumContainer, cardValidCvv);
        cardNumContainer.append(cardImg, cardNum);
        cardNum.append(cardNumInput, cardNumLabel, cardNumReq);
        cardValidCvv.append(cardValid, cardCvv);
        cardValid.append(cardValidInput, cardValidLabel, cardValidReq);
        cardCvv.append(cardCvvInput, cardCvvLabel, cardCvvReq);
        this.container = document.querySelector('.cart-page') as HTMLElement;
        this.container.append(popup)!;

        // Change img payment
        cardNumInput.oninput = function () {
            switch ((this as HTMLInputElement).value[0]) {
                case '3':
                    cardImg.setAttribute(
                        'src',
                        'https://raw.githubusercontent.com/MarinaKovel/onlinestoredata/main/american-express.png'
                    );
                    break;
                case '4':
                    cardImg.setAttribute(
                        'src',
                        'https://raw.githubusercontent.com/MarinaKovel/onlinestoredata/main/visa.png'
                    );
                    break;
                case '5':
                    cardImg.setAttribute(
                        'src',
                        'https://raw.githubusercontent.com/MarinaKovel/onlinestoredata/main/Master-Card.png'
                    );
                    break;
                default:
                    cardImg.setAttribute(
                        'src',
                        'https://raw.githubusercontent.com/MarinaKovel/onlinestoredata/main/unknown-card.png'
                    );
            }
            return;
        };

        // Valid
        cardValidInput.onkeydown = function () {
            if (+`${(this as HTMLInputElement).value[0]}${(this as HTMLInputElement).value[1]}` > 12) {
                cardValidInput.value = '';
            }
            return;
        };
       
        cardValidInput.onkeyup = function () {
            cardValidInput.value = cardValidInput.value.replace (/[A-Za-zА-Яа-яЁё]/, '');
            if (+(this as HTMLInputElement).value < 13 && +(this as HTMLInputElement).value.length == 2) {
                (this as HTMLInputElement).value = `${(this as HTMLInputElement).value}/`;
            }
        }
        cardCvvInput.onkeyup = function () {
            cardCvvInput.value = cardCvvInput.value.replace (/\D/, '');
        }
        cardNumInput.onkeyup = function () {
            cardNumInput.value = cardNumInput.value.replace (/\D/, '');
        }

        // order is completed
        let finishImg = document.createElement('img');
        finishImg.setAttribute('src', 'https://raw.githubusercontent.com/MarinaKovel/onlinestoredata/main/finish.jpg');
        finishImg.style.height = '250px';
        finishImg.style.borderRadius = '5px';
        form.addEventListener('submit', function () {
            popup.style.fontSize = '2rem';
            popup.style.height = '100vh';
            popup.style.flexDirection = 'column';
            popup.style.textAlign = 'center';
            popup.style.justifyContent = 'center';
            popup.style.alignItems = 'center';
            popup.innerHTML = 'Thank you! Your order is proccessed.';
            popup.appendChild(finishImg);

            setTimeout(function () {
                window.location.hash = PageIds.MainPage;
                let cart: ObjectInterface = { 0: 0 };
                let totalPrice: ObjectInterface = { price: 0 };
                localStorage.setItem('cart', JSON.stringify(cart));
                localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
                let cartNum = document.querySelector('.cart__num');
                let cartPrice = document.querySelector('.cart__price');
                (cartNum as HTMLDivElement).innerText = '0';
                (cartPrice as HTMLDivElement).innerText = '0G';
                (cartPrice as HTMLDivElement).style.display = 'none';
            }, 3000);
        });
    }

    render(): HTMLElement {
        this.renderOrder();
        return this.container;
    }
}

export default Order;
