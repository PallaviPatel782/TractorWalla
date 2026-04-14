import {Storage} from 'redux-persist';
import {createMMKV} from 'react-native-mmkv';

const storageInstance = createMMKV();

/**
 * MMKV Storage adapter for Redux Persist
 * MMKV is synchronous, so we wrap it in a Promise to meet Redux Persist's requirements.
 */
const reduxStorage: Storage = {
  setItem: (key, value) => {
    storageInstance.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key) => {
    const value = storageInstance.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key) => {
    storageInstance.remove(key);
    return Promise.resolve();
  },
};

export default reduxStorage;
