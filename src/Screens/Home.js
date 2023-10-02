import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Pressable,
  Image,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import getMeals from "../Components/getFuctions";
import SearchComponent from "../Components/SearchComponent";
import { useSearch } from "../Context/SearchContext";
import CategoryCard from "../Components/CategoryCard";
import { Categories } from "../Components/Data";
import MiniCard from "../Components/MiniCard";
import { mealsData } from "../Components/MealsData";
import Icon from "react-native-vector-icons/MaterialIcons";
import Title from "../Components/Title";

export default function Home({ navigation }) {
  const [Category, setCategory] = useState([]);
  const { data } = useSearch();
  const fetchCategoryData = async () => {
    try {
      const categoryData = await getMeals("categories.php");
      setCategory(categoryData.categories);
      // console.log(categoryData.categories);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchCategoryData();
  }, []);

  return (
    <ScrollView style={styles.MainContainer}>
      <View style={styles.container}>
        <View style={styles.flex}>
          <Text style={styles.title}>Delicacy </Text>
          <Text style={[styles.title, styles.color]}>Hub</Text>
        </View>

        <Pressable onPress={() => navigation.navigate("Profile")}>
          <Text style={styles.text}>Profile</Text>
        </Pressable>
      </View>

      <SearchComponent />
      <Text style={styles.title}>Categories</Text>
      {Categories ? (
        <FlatList
          numColumns={1}
          data={Category}
          horizontal
          keyExtractor={(item, index) => item.strCategory + index}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                navigation.navigate("Category", {
                  data: [item.strCategory, item.strCategoryThumb],
                })
              }
            >
              <CategoryCard {...item} />
            </Pressable>
          )}
        />
      ) : (
        <ActivityIndicator size={100} />
      )}
      <View>
        <Text style={styles.title}>Meals</Text>
      </View>
      <FlatList
        numColumns={1}
        data={data.meals}
        keyExtractor={(item, index) => item.strMeal + index}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation.navigate("Details", { meals: item.idMeal })
            }
          >
            <MiniCard {...item} />
          </Pressable>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#000",
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 26,
    marginLeft: 10,
    paddingBottom: 0,
  },
  flex: {
    flexDirection: "row",
    justifyContent: "center",

    marginVertical: 10,
  },
  text: {
    marginRight: 10,
    fontSize: 20,
    fontWeight: '550',
  },
  color: {
    color: "#d6410b",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "stretch",
  },
  MainContainer: {
    marginTop: 40,
  },
  title: {
    color: "#000",
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 26,
    marginLeft: 10,
    paddingBottom: 0,
  },
});
