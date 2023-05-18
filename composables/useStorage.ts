import localforage from 'localforage';

/**
 * Options for the useStorage composable.
 */
export interface StorageOptions {
  name?: string;
  driver?: string | string[];
  size?: number;
  storeName?: string;
  version?: number;
  description?: string;
  // Add any other localforage options you need
}

/**
 * Options for the useStorage composable.
 */
export interface UseStorageOptions<T> {
  storageOptions?: StorageOptions;
  defaultValue: T;
}

/**
 * Return type of the useStorage composable.
 */
export interface UseStorageReturn<T> {
  retrieve: (key: string) => Promise<T>;
  store: (key: string, value: T) => Promise<void>;
}

/**
 * Composable for handling storage operations using localforage.
 *
 * @param storeName - The name of the store to use for storing data.
 * @param options - Options for the useStorage composable.
 * @returns An object containing the `retrieve` and `store` functions for interacting with the storage.
 */
export function useStorage<T>(storeName: string, options: UseStorageOptions<T>): UseStorageReturn<T> {
  const { storageOptions = {}, defaultValue } = options;

  const storage = localforage.createInstance(storageOptions);

  /**
   * Retrieve a value from storage based on the provided key.
   *
   * @param key - The key associated with the value to retrieve.
   * @returns A Promise that resolves to the retrieved value, or the default value if the key is not found.
   */
  const retrieve = async (key: string): Promise<T> => {
    try {
      const value = await storage.getItem<T>(key);
      return value !== null ? value : defaultValue;
    } catch (error) {
      console.error('Error retrieving value from storage:', error);
      return defaultValue;
    }
  };

  /**
   * Store a value in storage with the provided key.
   *
   * @param key - The key associated with the value to store.
   * @param value - The value to store.
   */
  const store = async (key: string, value: T): Promise<void> => {
    try {
      await storage.setItem(key, value);
    } catch (error) {
      console.error('Error storing value in storage:', error);
    }
  };

  return {
    retrieve,
    store,
  };
}
