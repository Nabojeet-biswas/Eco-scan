/**
 * Safe web storage adapter for redux-persist in Vite/ESM environments.
 * Avoids the known Vite/CJS default-export interop issue where
 * `storage.getItem is not a function` occurs with `redux-persist/lib/storage`.
 */
const createStorage = () => {
  return {
    getItem: (key) => {
      try {
        if (typeof window === "undefined" || !window.localStorage) {
          return Promise.resolve(null);
        }
        return Promise.resolve(window.localStorage.getItem(key));
      } catch {
        return Promise.resolve(null);
      }
    },
    setItem: (key, value) => {
      try {
        if (typeof window === "undefined" || !window.localStorage) {
          return Promise.resolve();
        }
        window.localStorage.setItem(key, value);
        return Promise.resolve(value);
      } catch {
        return Promise.resolve();
      }
    },
    removeItem: (key) => {
      try {
        if (typeof window === "undefined" || !window.localStorage) {
          return Promise.resolve();
        }
        window.localStorage.removeItem(key);
        return Promise.resolve();
      } catch {
        return Promise.resolve();
      }
    },
  };
};

const storage = createStorage();
export default storage;
