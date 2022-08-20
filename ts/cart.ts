import { getStorage, setStorage } from "./common.js";
import { initData, listKeys } from "./interface.js";
import { countCart } from "./base.js";


const renderProduct = (element : initData) => {
  
  const ulCartList : HTMLElement | null = document.querySelector('.js-cart-list');

  const liCartItem : HTMLLIElement = document.createElement('li');
  liCartItem.id = `cart-${element.id}`
  liCartItem.classList.add('cart-item')
  ulCartList?.appendChild(liCartItem);

  const divProduct : HTMLDivElement = document.createElement('div');
  divProduct.classList.add('product')
  liCartItem.appendChild(divProduct);

  const divImageProduct : HTMLDivElement = document.createElement('div');
  divImageProduct.classList.add('product-image')
  divProduct.appendChild(divImageProduct);

  const imageProduct : HTMLImageElement = document.createElement('img');
  imageProduct.src = element.image;
  divImageProduct.appendChild(imageProduct);

  const divProductDetail : HTMLDivElement = document.createElement('div');
  divProductDetail.classList.add('product-details');
  divProduct.appendChild(divProductDetail);

  const h4ProductTitle :HTMLElement = document.createElement('h4');
  h4ProductTitle.classList.add('product-title')
  h4ProductTitle.textContent = element.name;
  divProductDetail.appendChild(h4ProductTitle);

  const spanPriceProduct :HTMLSpanElement = document.createElement('span');
  spanPriceProduct.classList.add('product-price')
  spanPriceProduct.textContent = `${((element.price)-(element.price * element.discount / 100)).toFixed(2)}`;
  divProduct.appendChild(spanPriceProduct);

  const divQuantity : HTMLDivElement = document.createElement('div');
  divQuantity.classList.add('product-quantity');
  divProduct.appendChild(divQuantity)

  const buttonReduce : HTMLButtonElement = document.createElement('button');
  buttonReduce.classList.add('btn-reduce', 'btn-change');
  buttonReduce.textContent = '-';
  divQuantity.appendChild(buttonReduce);
  buttonReduce.addEventListener('click', function(e) {
    handleQuantity(element.id,'reduce');
    countCart();
    subTotal();
  })

  const inputQuantity : HTMLInputElement = document.createElement('input');
  inputQuantity.classList.add('input-quantity');
  inputQuantity.setAttribute('type','text');
  inputQuantity.setAttribute('value',`${element.quantity}`);
  inputQuantity.id = `quantity-${element.id}`;
  inputQuantity.ariaValueNow = `${element.quantity}`;
  divQuantity.appendChild(inputQuantity);
  inputQuantity.addEventListener('input', function(e) {   
    const carts : initData[] = getStorage(listKeys.cartList);
    let product : initData | undefined = carts.find(function(product) {
      return product.id === element.id
    });
    let thisValue : number = +this.value;
    if(thisValue < 1) {
      thisValue = 1;
    }
    else if(thisValue > 10) {
      thisValue = 10;
    }
    if(product) {
      product.quantity = thisValue;
    }
    setStorage(listKeys.cartList,carts)
    totalCart(element.id);
    countCart();
    subTotal();
  })
  
  const buttonIncrease : HTMLButtonElement = document.createElement('button');
  buttonIncrease.classList.add('btn-raise', 'btn-change');
  buttonIncrease.textContent = '+';
  divQuantity.appendChild(buttonIncrease);
  buttonIncrease.addEventListener('click', function(e) {
    handleQuantity(element.id, 'increase')
    countCart();
    subTotal();
  })

  const divRemove : HTMLDivElement = document.createElement('div');
  divRemove.classList.add('product-removal');
  divProduct.appendChild(divRemove);

  const buttonRemove : HTMLButtonElement = document.createElement('button');
  buttonRemove.classList.add('remove-product')
  buttonRemove.textContent = 'Remove';
  buttonRemove.addEventListener('click', function(e) {
    handleRemove(element.id);
    checkCart();
    countCart();
    subTotal();
  })
  divRemove.appendChild(buttonRemove);

  const spanTotalProduct : HTMLSpanElement = document.createElement('span');
  spanTotalProduct.id = `productTotal-${element.id}`;
  spanTotalProduct.classList.add('product-line-price');
  spanTotalProduct.textContent = `$${(((element.price)-(element.price * element.discount / 100)) * element.quantity).toFixed(2)}`
  divProduct.appendChild(spanTotalProduct);

}

const renderCartEmpty = () => {

  const ulCartList : HTMLElement | null = document.querySelector('.js-cart-list');

  const divImageEmpty : HTMLDivElement = document.createElement('div');
  divImageEmpty.classList.add('image-empty');
  ulCartList?.appendChild(divImageEmpty);

  const imageEmpty : HTMLImageElement = document.createElement('img');
  imageEmpty.src = './image/cart.png';
  divImageEmpty.appendChild(imageEmpty)

  const aGoBack : HTMLAnchorElement = document.createElement('a');
  aGoBack.classList.add('btn-primary', 'btn-goBack');
  aGoBack.href = `./index.html`;
  aGoBack.textContent = 'Go Home';
  ulCartList?.appendChild(aGoBack);
}

const checkCart = () => {
  const carts : initData[] = getStorage(listKeys.cartList);
  if(carts.length === 0) {
    renderCart();
  }
}

const renderCart = () => {
  let cartList : initData[] = getStorage(listKeys.cartList);
  if(cartList.length > 0) {
    cartList.map((product : initData ) => {
      renderProduct(product);
    })
  }
  else {
    renderCartEmpty();
    removeEmpty();
  }
}

const handleQuantity = (id : number, action : string) => {
  const carts : initData[] = getStorage(listKeys.cartList);
  let input : HTMLElement | null  =  document.getElementById(`quantity-${id}`);
  let product : initData | undefined  = carts.find( function(product : initData) {
    return product.id === id;
  })
 
  if(action === 'reduce') {
    if( product) {
      if(product?.quantity > 1) {
        product.quantity -= +1
      } 
    }
  }
  else {
    if(product) {
      if(product.quantity < 10) {
        product.quantity += 1;
      }
      else {
        alert(`can't add more than 10 product`);
      }
    }
  }
  input?.setAttribute('value',`${product?.quantity}`);
  setStorage(listKeys.cartList, carts);
  totalCart(id);
}

const handleRemove = (id : number) => {
  const carts : initData[] = getStorage(listKeys.cartList);
  let removeId : HTMLElement | null = document.getElementById(`cart-${id}`); 
  let result : initData[] = carts.filter( function(product : initData) {
    return +product.id !== id;
  })
  removeId?.remove();
  setStorage(listKeys.cartList,result);
}

const totalCart = (id : number) => {
  const carts : initData[] = getStorage(listKeys.cartList);
  let product : initData | undefined = carts.find( function(product) {
    return product.id === id;
  });

  let totalProduct : number = 0;

  if(product) {
    totalProduct += +(((product.price)-(product.price * product.discount / 100)) * product.quantity).toFixed(2);  
  }  
  let totalElement : HTMLElement | null  = document.getElementById(`productTotal-${product?.id}`);
  if(totalElement) {
    totalElement.textContent = `$${totalProduct}`;
  }

}

const removeEmpty = () => {
  const removeTable : Element | null = document.querySelector('.column-labels');
  const removeSubTotal : Element | null = document.querySelector('.totals');
  const checkOut : Element | null = document.querySelector('.checkout');
  removeTable?.remove();
  removeSubTotal?.remove();
  checkOut?.remove();
}

const subTotal = () => {
  const carts : initData[] = getStorage(listKeys.cartList);
  const total : HTMLElement | null = document.getElementById('cart-subtotal');
  const totalGrand : HTMLElement | null = document.getElementById('cart-total');
  let moneyTotal : number = 0;
  carts.forEach(function (product) {
    moneyTotal += +(((product.price)-(product.price * product.discount / 100)) * product.quantity).toFixed(2);
  });
  if(total) {
    total.textContent = `${moneyTotal.toFixed(2)}`;
  }
  if(totalGrand) {
    totalGrand.textContent = `${(moneyTotal + 3.60 + 15.00).toFixed(2)}`;
  }
}

renderCart();
subTotal();
