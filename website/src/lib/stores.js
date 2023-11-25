import { writable } from 'svelte/store';

export const toasts = writable([]);

export function storable(key, value) {
    const isBrowser = typeof window !== 'undefined';
    const store = writable(isBrowser ? localStorage[key] ? localStorage[key] : value : value);
    const { subscribe, set, update } = store;
 
    isBrowser && localStorage[key] && set(JSON.parse(localStorage[key]));
 
    return {
        subscribe,
        set: n => {
            isBrowser && (localStorage[key] = JSON.stringify(n));
            set(n);
        },
        update: cb => {
            const updatedStore = cb(get(store));
    
            isBrowser && (localStorage[key] = JSON.stringify(updatedStore));
            set(updatedStore);
        }
    };
}


export const theme = storable("theme", 'light');

export function newToast(type, message) {
    const newToast = { type, message };
    toasts.update((oldToasts) => {
        oldToasts = [newToast, ...oldToasts];
        return oldToasts;
    });
    setTimeout(() => {
        toasts.update((oldToasts) => {
            oldToasts = oldToasts.filter((toast) => toast !== newToast);
            return oldToasts;
        });
    }, 3000);
}

export function removeToast(index) {
    toasts.update((oldToasts) => {
        oldToasts = oldToasts.filter((_, i) => i !== index);
        return oldToasts;
    });
}