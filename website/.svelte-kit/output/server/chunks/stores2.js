import { w as writable } from "./index2.js";
const toasts = writable([]);
function storable(key, value) {
  const isBrowser = typeof window !== "undefined";
  const store = writable(isBrowser ? localStorage[key] ? localStorage[key] : value : value);
  const { subscribe, set, update } = store;
  isBrowser && localStorage[key] && set(JSON.parse(localStorage[key]));
  return {
    subscribe,
    set: (n) => {
      isBrowser && (localStorage[key] = JSON.stringify(n));
      set(n);
    },
    update: (cb) => {
      const updatedStore = cb(get(store));
      isBrowser && (localStorage[key] = JSON.stringify(updatedStore));
      set(updatedStore);
    }
  };
}
const theme = storable("theme", "light");
function newToast(type, message) {
  const newToast2 = { type, message };
  toasts.update((oldToasts) => {
    oldToasts = [newToast2, ...oldToasts];
    return oldToasts;
  });
  setTimeout(() => {
    toasts.update((oldToasts) => {
      oldToasts = oldToasts.filter((toast) => toast !== newToast2);
      return oldToasts;
    });
  }, 3e3);
}
export {
  theme as a,
  newToast as n,
  toasts as t
};
