import AsyncStorage from "@react-native-async-storage/async-storage";

export const StoreData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log("Data saved successfully");
  } catch (error) {
    console.error("Error saving data:", error);
  }
};

export const RetrieveData = async (key) => {
    let value = false 
  try {
     value = await AsyncStorage.getItem(key);
    // if (value !== null) {
    //   console.log("Retrieved data:", value);
    // } else {
    //   console.log("No data found with key:", value);
    // }
} catch (error) {
    console.error("Error retrieving data:", error);
}
return value
};

export const RemoveData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log("Data removed successfully");
  } catch (error) {
    console.error("Error removing data:", error);
  }
};
