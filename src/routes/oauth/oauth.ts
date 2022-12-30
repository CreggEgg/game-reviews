
import {writable, type Writable} from 'svelte/store';
import {browser} from "$app/environment";


function fromLocalStorage(storageKey: string, fallback: any) {
	if(browser) {
		const storedValue = window.localStorage.getItem(storageKey);
		if(storedValue !== undefined) return (typeof fallback === 'object' && storedValue !== undefined) ? JSON.parse(storedValue!) : storedValue
	}
	return fallback;
}

function toLocalStorage<T>(store: Writable<T>, storageKey: string) {
	if(browser) {
		store.subscribe(value => {const storageValue = JSON.stringify(value); window.localStorage.setItem(storageKey, storageValue)})
	}
}

export const profileData = writable<ProfileData>(fromLocalStorage("profileData", null));
toLocalStorage<ProfileData>(profileData, "profileData")

export type ProfileData = {
	profilePicture: string;
	username: string;
	id: string;
} | null;