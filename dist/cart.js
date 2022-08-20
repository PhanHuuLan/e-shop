import { getStorage, setStorage } from "./common.js";
import { listKeys } from "./interface.js";
import { countCart } from "./base.js";
const renderProduct = (element) => {
    const ulCartList = document.querySelector('.js-cart-list');
    const liCartItem = document.createElement('li');
    liCartItem.id = `cart-${element.id}`;
    liCartItem.classList.add('cart-item');
    ulCartList === null || ulCartList === void 0 ? void 0 : ulCartList.appendChild(liCartItem);
    const divProduct = document.createElement('div');
    divProduct.classList.add('product');
    liCartItem.appendChild(divProduct);
    const divImageProduct = document.createElement('div');
    divImageProduct.classList.add('product-image');
    divProduct.appendChild(divImageProduct);
    const imageProduct = document.createElement('img');
    imageProduct.src = element.image;
    divImageProduct.appendChild(imageProduct);
    const divProductDetail = document.createElement('div');
    divProductDetail.classList.add('product-details');
    divProduct.appendChild(divProductDetail);
    const h4ProductTitle = document.createElement('h4');
    h4ProductTitle.classList.add('product-title');
    h4ProductTitle.textContent = element.name;
    divProductDetail.appendChild(h4ProductTitle);
    const spanPriceProduct = document.createElement('span');
    spanPriceProduct.classList.add('product-price');
    spanPriceProduct.textContent = `${((element.price) - (element.price * element.discount / 100)).toFixed(2)}`;
    divProduct.appendChild(spanPriceProduct);
    const divQuantity = document.createElement('div');
    divQuantity.classList.add('product-quantity');
    divProduct.appendChild(divQuantity);
    const buttonReduce = document.createElement('button');
    buttonReduce.classList.add('btn-reduce', 'btn-change');
    buttonReduce.textContent = '-';
    divQuantity.appendChild(buttonReduce);
    buttonReduce.addEventListener('click', function (e) {
        handleQuantity(element.id, 'reduce');
        countCart();
        subTotal();
    });
    const inputQuantity = document.createElement('input');
    inputQuantity.classList.add('input-quantity');
    inputQuantity.setAttribute('type', 'text');
    inputQuantity.setAttribute('value', `${element.quantity}`);
    inputQuantity.id = `quantity-${element.id}`;
    inputQuantity.ariaValueNow = `${element.quantity}`;
    divQuantity.appendChild(inputQuantity);
    inputQuantity.addEventListener('input', function (e) {
        const carts = getStorage(listKeys.cartList);
        let product = carts.find(function (product) {
            return product.id === element.id;
        });
        let thisValue = +this.value;
        if (thisValue < 1) {
            thisValue = 1;
        }
        else if (thisValue > 10) {
            thisValue = 10;
        }
        if (product) {
            product.quantity = thisValue;
        }
        setStorage(listKeys.cartList, carts);
        totalCart(element.id);
        countCart();
        subTotal();
    });
    const buttonIncrease = document.createElement('button');
    buttonIncrease.classList.add('btn-raise', 'btn-change');
    buttonIncrease.textContent = '+';
    divQuantity.appendChild(buttonIncrease);
    buttonIncrease.addEventListener('click', function (e) {
        handleQuantity(element.id, 'increase');
        countCart();
        subTotal();
    });
    const divRemove = document.createElement('div');
    divRemove.classList.add('product-removal');
    divProduct.appendChild(divRemove);
    const buttonRemove = document.createElement('button');
    buttonRemove.classList.add('remove-product');
    buttonRemove.textContent = 'Remove';
    buttonRemove.addEventListener('click', function (e) {
        handleRemove(element.id);
        checkCart();
        countCart();
        subTotal();
    });
    divRemove.appendChild(buttonRemove);
    const spanTotalProduct = document.createElement('span');
    spanTotalProduct.id = `productTotal-${element.id}`;
    spanTotalProduct.classList.add('product-line-price');
    spanTotalProduct.textContent = `$${(((element.price) - (element.price * element.discount / 100)) * element.quantity).toFixed(2)}`;
    divProduct.appendChild(spanTotalProduct);
};
const renderCartEmpty = () => {
    const ulCartList = document.querySelector('.js-cart-list');
    const divImageEmpty = document.createElement('div');
    divImageEmpty.classList.add('image-empty');
    ulCartList === null || ulCartList === void 0 ? void 0 : ulCartList.appendChild(divImageEmpty);
    const imageEmpty = document.createElement('img');
    imageEmpty.src = './image/cart.png';
    divImageEmpty.appendChild(imageEmpty);
    const aGoBack = document.createElement('a');
    aGoBack.classList.add('btn-primary', 'btn-goBack');
    aGoBack.href = `./index.html`;
    aGoBack.textContent = 'Go Home';
    ulCartList === null || ulCartList === void 0 ? void 0 : ulCartList.appendChild(aGoBack);
};
const checkCart = () => {
    const carts = getStorage(listKeys.cartList);
    if (carts.length === 0) {
        renderCart();
    }
};
const renderCart = () => {
    let cartList = getStorage(listKeys.cartList);
    if (cartList.length > 0) {
        cartList.map((product) => {
            renderProduct(product);
        });
    }
    else {
        renderCartEmpty();
        removeEmpty();
    }
};
const handleQuantity = (id, action) => {
    const carts = getStorage(listKeys.cartList);
    let input = document.getElementById(`quantity-${id}`);
    let product = carts.find(function (product) {
        return product.id === id;
    });
    if (action === 'reduce') {
        if (product) {
            if ((product === null || product === void 0 ? void 0 : product.quantity) > 1) {
                product.quantity -= +1;
            }
        }
    }
    else {
        if (product) {
            if (product.quantity < 10) {
                product.quantity += 1;
            }
            else {
                alert(`can't add more than 10 product`);
            }
        }
    }
    input === null || input === void 0 ? void 0 : input.setAttribute('value', `${product === null || product === void 0 ? void 0 : product.quantity}`);
    setStorage(listKeys.cartList, carts);
    totalCart(id);
};
const handleRemove = (id) => {
    const carts = getStorage(listKeys.cartList);
    let removeId = document.getElementById(`cart-${id}`);
    let result = carts.filter(function (product) {
        return +product.id !== id;
    });
    removeId === null || removeId === void 0 ? void 0 : removeId.remove();
    setStorage(listKeys.cartList, result);
};
const totalCart = (id) => {
    const carts = getStorage(listKeys.cartList);
    let product = carts.find(function (product) {
        return product.id === id;
    });
    let totalProduct = 0;
    if (product) {
        totalProduct += +(((product.price) - (product.price * product.discount / 100)) * product.quantity).toFixed(2);
    }
    let totalElement = document.getElementById(`productTotal-${product === null || product === void 0 ? void 0 : product.id}`);
    if (totalElement) {
        totalElement.textContent = `$${totalProduct}`;
    }
};
const removeEmpty = () => {
    const removeTable = document.querySelector('.column-labels');
    const removeSubTotal = document.querySelector('.totals');
    const checkOut = document.querySelector('.checkout');
    removeTable === null || removeTable === void 0 ? void 0 : removeTable.remove();
    removeSubTotal === null || removeSubTotal === void 0 ? void 0 : removeSubTotal.remove();
    checkOut === null || checkOut === void 0 ? void 0 : checkOut.remove();
};
const subTotal = () => {
    const carts = getStorage(listKeys.cartList);
    const total = document.getElementById('cart-subtotal');
    const totalGrand = document.getElementById('cart-total');
    let moneyTotal = 0;
    carts.forEach(function (product) {
        moneyTotal += +(((product.price) - (product.price * product.discount / 100)) * product.quantity).toFixed(2);
    });
    if (total) {
        total.textContent = `${moneyTotal.toFixed(2)}`;
    }
    if (totalGrand) {
        totalGrand.textContent = `${(moneyTotal + 3.60 + 15.00).toFixed(2)}`;
    }
};
renderCart();
subTotal();
