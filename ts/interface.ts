
export interface initData {
  id: number;
  name: string;
  iamge: string;
  price: number;
  discount: number;
}
export const listKeys = {
  productList : 'productList',
}
export interface ProductsList {
  [key: number | string] : initData,
};