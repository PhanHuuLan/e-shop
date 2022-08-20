import { getStorage } from "./common.js";
import { initData, listKeys } from "./interface.js";

export const countCart = () => {
  const cart : initData[] = getStorage(listKeys.cartList);
  let count : number = 0;
  cart.forEach(function(element : initData) {
    count += element.quantity;
  })
  const renderCount : HTMLElement = document.createElement('span');
  renderCount.classList.add('js-count');
  renderCount.textContent = `${count}`;

  const countItem : HTMLElement | null= document.querySelector('.js-countCart') ;
  countItem?.append(renderCount);
  
}
export default countCart();
