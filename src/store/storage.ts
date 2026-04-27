import {createMMKV} from 'react-native-mmkv';

const storageInstance = createMMKV();

/**
 * MMKV Storage adapter for Zustand Persist
 */
export const mmkvStorage = {
  setItem: (key: string, value: string) => {
    storageInstance.set(key, value);
  },
  getItem: (key: string) => {
    return storageInstance.getString(key) ?? null;
  },
  removeItem: (key: string) => {
    storageInstance.remove(key);
  },
};
