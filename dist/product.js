import { getStorage, setStorage } from './common.js';
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
        const addProduct = document.createElement('button');
        // addProduct.id =`addToCart-${element.id}`; 
        addProduct.classList.add('btn', 'btn-primary', 'js-addProduct');
        addProduct.textContent = 'Add to Cart';
        divCard.appendChild(addProduct);
        addProduct.addEventListener('click', () => {
            handleAddProduct(element.id);
        });
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
const handleAddProduct = (id) => {
    let products = getStorage(listKeys.productList);
    const product = products.find(function (element) {
        return +element.id === +id;
    });
    let cart = getStorage(listKeys.cartList);
    const existProduct = cart.find(function (element) {
        return +element.id === +id;
    });
    if (!existProduct) {
        const newProductCart = Object.assign(Object.assign({}, product), { quantity: 1 });
        cart.push(newProductCart);
    }
    else {
        cart[cart.indexOf(existProduct)].quantity += 1;
    }
    setStorage(listKeys.cartList, cart);
    countCart();
};
const countCart = () => {
    const cart = getStorage(listKeys.cartList);
    let count = 0;
    cart.forEach(function (element) {
        count += element.quantity;
    });
    const renderCount = document.createElement('span');
    renderCount.classList.add('js-count');
    renderCount.textContent = `${count}`;
    const countItem = document.querySelector('.js-countCart');
    countItem === null || countItem === void 0 ? void 0 : countItem.append(renderCount);
};
renderProduct();
countCart();
