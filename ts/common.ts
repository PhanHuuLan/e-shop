
export const getStorage = function (key: string) {
  return JSON.parse(localStorage.getItem(key) || '[]');
}

export const setStorage = function (key: string,value : any) {
  localStorage.setItem(key,JSON.stringify(value));
}
