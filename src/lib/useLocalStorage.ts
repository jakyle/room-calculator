import { writable, type Writable } from 'svelte/store';

export function createLocalStorageStore<T>(key: string, startValue: T): Writable<T> {
	const storedValue = localStorage.getItem(key);
	const initialValue = storedValue ? JSON.parse(storedValue) : startValue;
	const store = writable<T>(initialValue);

	store.subscribe(value => {
		localStorage.setItem(key, JSON.stringify(value));
	});

	return store;
}