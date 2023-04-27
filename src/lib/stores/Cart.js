import { writable } from 'svelte/store';

export const cart = writable({});
export const total = writable({ 'ar': 0, 'darab': 0, 'id':"", 'feltet': [] });