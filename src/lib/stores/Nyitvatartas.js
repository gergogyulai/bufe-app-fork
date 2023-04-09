import { writable } from 'svelte/store';

export const bufeClosed = writable(0);
export const nyitasIdo = writable({ hours: 7, minutes: 0 });
export const zarasIdo = writable({ hours: 14, minutes: 0 });

function getStoreValues() {
    return {
      nyitasIdo: nyitasIdo,
      zarasIdo: zarasIdo,
      bufeClosed: bufeClosed
    };
  }
  
export { getStoreValues };