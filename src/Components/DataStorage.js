import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSearch } from "../Context/SearchContext";

export const StoreData = async (key, value) => {
  const { userData, setUserData } = useSearch();
  try {
    await AsyncStorage.setItem(key, value);
    console.log("====================================");
    console.log(value);
    console.log("====================================");
    console.log("Data saved successfully");
      setUserData(value);

  } catch (error) {
    console.error("Error saving data:", error);
  }
};

export const RetrieveData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log("Retrieved data:", value);
    } else {
      console.log("No data found with key:", JSON.parse(value));
    }
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
};

export const RemoveData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log("Data removed successfully");
  } catch (error) {
    console.error("Error removing data:", error);
  }
};
