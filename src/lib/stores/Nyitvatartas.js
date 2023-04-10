import { writable } from 'svelte/store';

const defaultNyitasIdo = { hours: 7, minutes: 0 };
const defaultZarasIdo = { hours: 14, minutes: 0 };
const defaultBufeClosed = false;

export const nyitasIdo = writable(defaultNyitasIdo);
export const zarasIdo = writable(defaultZarasIdo);
export const bufeClosed = writable(defaultBufeClosed);