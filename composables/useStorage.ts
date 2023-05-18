import localforage from 'localforage';
import { onUnmounted } from 'vue';

export interface StorageOptions {
  name?: string;
  driver?: string | string[];
  size?: number;
  storeName?: string;
  version?: number;
  description?: string;
  // Add any other localforage options you need
}

export interface UseStorageOptions<T> {
  storageOptions?: StorageOptions;
  defaultValue: T;
}

export interface UseStorageReturn<T> {
  retrieve: (key: string) => Promise<T>;
  store: (key: string, value: T) => Promise<void>;
}

export function useStorage<T>(storeName: string, options: UseStorageOptions<T>): UseStorageReturn<T> {
  const { storageOptions = {}, defaultValue } = options;

  const storage = localforage.createInstance(storageOptions);

  const retrieve = async (key: string): Promise<T> => {
    try {
      const value = await storage.getItem<T>(key);
      return value !== null ? value : defaultValue;
    } catch (error) {
      console.error('Error retrieving value from storage:', error);
      return defaultValue;
    }
  };

  const store = async (key: string, value: T): Promise<void> => {
    try {
      await storage.setItem(key, value);
    } catch (error) {
      console.error('Error storing value in storage:', error);
    }
  };

  // Clean up localforage instance when component is unmounted
  onUnmounted(() => {
    storage.clear(); // Optional: Clear storage when component is unmounted
  });

  return {
    retrieve,
    store,
  };
}
