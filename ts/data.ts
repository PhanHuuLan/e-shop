import { setStorage } from './common.js';
import { listKeys, initData } from "./interface.js"

const initData = [
  {
    id: 1,
    name: "T-Shirt Summer Vibes",
    image: './image/product-1.png',
    price: 119.99,
    discount: 30,
    quantity: 0,
  },
  {
    id: 2,
    name: "Loose Knit 3/4 Sleeve",
    image: './image/product-2.png',
    price: 119.99,
    discount: 0,
    quantity: 0,
  },
  {
    id: 3,
    name: "Basic Slim Fit T-Shirt",
    image: './image/product-3.png',
    price: 79.99,
    discount: 0,
    quantity: 0,
  },
  {
    id: 4,
    name: "Loose Textured T-Shirts",
    image: './image/product-4.png',
    price: 119.99,
    discount: 0,
    quantity: 0,
  },
]

setStorage(listKeys.productList, initData);

export default initData;
