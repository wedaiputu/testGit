import * as SecureStore from "expo-secure-store";

export async function getStorage(key) {
  try {
    const result = await SecureStore.getItemAsync(key);
    console.log(`getStorage(${key}):`, result);
    return result;
  } catch (error) {
    console.error("Error getting data from storage:", error);
    throw error;
  }
}

export async function setStorage(key, value) {
  await SecureStore.setItemAsync(key, value);
}

export async function deleteStorage(key) {
  await SecureStore.deleteItemAsync(key);
}
