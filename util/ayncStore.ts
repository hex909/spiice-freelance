import AsyncStorage from "@react-native-async-storage/async-storage";

export const getStoreValue = async (
  key: string,
  options?: { parse?: true }
) => {
  try {
    const res = await AsyncStorage.getItem(key);
    if (options?.parse) return JSON.parse(res || "");
    return res;
  } catch (e) {
    new Error("something went wrong");
    return null;
  }
};

export const setStoreValue = async (key: string, value: string) => {
  try {
    return await AsyncStorage.setItem(key, value);
  } catch (e) {
    new Error("something went wrong");
    return null;
  }
};
