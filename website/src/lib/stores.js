import { writable } from 'svelte/store';

export const toasts = writable([]);

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