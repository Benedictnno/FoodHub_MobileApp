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
import  Icon  from "react-native-vector-icons/MaterialIcons";

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

  console.log(Category);

  return (
    <ScrollView>
      <SearchComponent />
      <Text>Categories</Text>
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
        <Text>Meals</Text>
      </View>

      <FlatList
        numColumns={1}
        data={data.meals}
        keyExtractor={(item, index) => item.strMeal + index}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate("Details", { meals: item })}
          >
            <MiniCard {...item} />
          </Pressable>
        )}
      />

      {/* <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      /> */}
    </ScrollView>
  );
}
