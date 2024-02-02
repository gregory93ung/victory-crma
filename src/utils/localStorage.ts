export enum LocalStorageKeys {
  USER = 'USER-TOKEN',
}

/** items */
export const setLocalStorageItem = (key: string, item: string) => {
  return localStorage.setItem(key, item);
};
export const getLocalStorageItem = (key: string) => {
  return localStorage.getItem(key);
};
export const removeLocalStorageItem = (key: string): void => {
  return localStorage.removeItem(key);
};

/** objects */
export const setLocalStorageObject = (key: string, item: Object) => {
  return localStorage.setItem(key, JSON.stringify(item));
};
export const getLocalStorageObject = (key: string) => {
  const obj = localStorage.getItem(key);
  return obj ? JSON.parse(obj) : {};
};
export const removeLocalStorageItems = (keys: string[]) => {
  keys.forEach((key) => {
    localStorage.removeItem(key);
  });
};
