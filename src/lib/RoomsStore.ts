import type { Room } from '../models/Room';
import { createLocalStorageStore } from './useLocalStorage';

export const roomStore = createLocalStorageStore<Room[]>('rooms', []);