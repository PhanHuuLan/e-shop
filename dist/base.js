import { getStorage } from "./common.js";
import { listKeys } from "./interface.js";
export const countCart = () => {
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
export default countCart();
