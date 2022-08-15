import { getStorage } from './common.js';
import { listKeys } from './interface.js';
const productElements = document.querySelectorAll('.js-products');
const renderCard = (element) => {
    productElements.forEach(e => {
        const liItem = document.createElement('li');
        liItem.classList.add('col-3', 'col-sm-6', 'foryou-item');
        e.appendChild(liItem);
        const divCard = document.createElement('div');
        divCard.classList.add('card');
        liItem.appendChild(divCard);
        const divCardImage = document.createElement('div');
        divCardImage.classList.add('card-image');
        divCard.appendChild(divCardImage);
        const aImage = document.createElement('a');
        aImage.classList.add('card-link');
        aImage.href = '#';
        divCardImage.appendChild(aImage);
        const imageCard = document.createElement('img');
        imageCard.src = `${element.image}`;
        imageCard.alt = 'product';
        aImage.appendChild(imageCard);
        const divContent = document.createElement('div');
        divContent.classList.add('card-content');
        divCard.appendChild(divContent);
        const aContent = document.createElement('a');
        aContent.classList.add('card-link');
        aContent.href = '#';
        divContent.appendChild(aContent);
        const h4Card = document.createElement('h4');
        h4Card.classList.add('card-title');
        h4Card.textContent = `${element.name}`;
        aContent.appendChild(h4Card);
        const divPrice = document.createElement('div');
        divPrice.classList.add('card-price');
        aContent.appendChild(divPrice);
        const priceInitial = document.createElement('p');
        priceInitial.classList.add('price');
        divPrice.appendChild(priceInitial);
        priceInitial.textContent = `$${element.price}`;
        if (element.discount > 0) {
            priceInitial.classList.add('price-initial');
            priceInitial.textContent = `$${((element.price) - (element.price * element.discount / 100)).toFixed(2)} `;
            const priceSale = document.createElement('p');
            priceSale.classList.add('price', 'price-sale');
            priceSale.textContent = `$${element.price}`;
            divPrice.appendChild(priceSale);
            const discount = document.createElement('a');
            discount.classList.add('badge', 'badge-price');
            discount.textContent = `${-element.discount}%`;
            divContent.appendChild(discount);
        }
    });
};
const renderProduct = () => {
    let productList = getStorage(listKeys.productList);
    productList.map((product) => {
        renderCard(product);
    });
};
renderProduct();
