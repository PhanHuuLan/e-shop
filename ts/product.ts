

import { getStorage } from './common.js';
import { listKeys, ProductsList } from './interface.js';

const productElements : NodeList  = document.querySelectorAll('.js-products');


const renderCard = (element : any) => { 
  productElements.forEach( e => {
    const liItem : HTMLElement = document.createElement('li');
    liItem.classList.add('col-3','col-sm-6','foryou-item');
    e.appendChild(liItem);
    const divCard : HTMLElement = document.createElement('div');
    divCard.classList.add('card');
    liItem.appendChild(divCard);

    const divCardImage : HTMLElement = document.createElement('div');
    divCardImage.classList.add('card-image');
    divCard.appendChild(divCardImage);

    const aImage : HTMLAnchorElement = document.createElement('a');
    aImage.classList.add('card-link');
    aImage.href = '#'
    divCardImage.appendChild(aImage);
    
    const imageCard : HTMLImageElement = document.createElement('img');
    imageCard.src = `${element.image}`;
    imageCard.alt = 'product';
    aImage.appendChild(imageCard);

    const divContent : HTMLElement = document.createElement('div');
    divContent.classList.add('card-content');
    divCard.appendChild(divContent);
    
    const aContent : HTMLAnchorElement = document.createElement('a');
    aContent.classList.add('card-link');
    aContent.href = '#';
    divContent.appendChild(aContent);

    const h4Card : HTMLElement = document.createElement('h4');
    h4Card.classList.add('card-title');
    h4Card.textContent = `${element.name}`;
    aContent.appendChild(h4Card);

    const divPrice : HTMLElement = document.createElement('div');
    divPrice.classList.add('card-price');
    aContent.appendChild(divPrice);

    const priceInitial    : HTMLElement = document.createElement('p');
    priceInitial.classList.add('price');
    divPrice.appendChild(priceInitial);
    priceInitial.textContent = `$${element.price}`;

    if(element.discount > 0) {
        priceInitial.classList.add('price-initial');
        priceInitial.textContent = `$${((element.price)-(element.price * element.discount / 100)).toFixed(2)} `;
        const priceSale : HTMLElement = document.createElement('p');
        priceSale.classList.add('price','price-sale');
        priceSale.textContent = `$${element.price}`;
        divPrice.appendChild(priceSale);

        const discount : HTMLElement = document.createElement('a');
        discount.classList.add('badge','badge-price');
        discount.textContent = `${-element.discount}%`;
        divContent.appendChild(discount);
      }
    })
}

const renderProduct = () => {
  let productList : ProductsList[]  = getStorage(listKeys.productList);
  productList.map((product: ProductsList) => {  
      renderCard(product);
  })
}
renderProduct();