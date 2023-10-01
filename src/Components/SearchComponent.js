import React from "react";
import { View, TextInput, Button,StyleSheet } from "react-native";
import { useSearch } from "../Context/SearchContext";
import Icon from "react-native-vector-icons/MaterialIcons"
const SearchComponent = () => {
  const { searchQuery, setSearch } = useSearch();

 
  return (
    <View style={styles.container}>
      <Icon style={styles.icon} name="search" size={40} />

      <TextInput
        placeholder="Search Meals"
        value={searchQuery}
        onChangeText={(text) => setSearch(text)}
      />
      {/* <Button title="Search" onPress={handleSearch} /> */}
    </View>
  );
};

export default SearchComponent;


const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 20,
    backgroundColor: "#F6F8E2",
    padding: 10,
    borderRadius: 10,
  },
  icon: {
    color: "#e0ddca",
  },
});