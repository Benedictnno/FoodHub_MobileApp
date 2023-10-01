import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Animated,
  Button,
  Linking,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from "react-native/Libraries/NewAppScreen";

import React, { useEffect, useRef, useState } from "react";
import getMeals from "../Components/getFuctions";
import MiniCards from "../Components/MiniCard";
const BANNER_H = 400;

export default function Category({ route }) {
  const { data } = route.params;
  const [CategoryList, setCategoryList] = useState([]);
  const scrollA = useRef(new Animated.Value(0)).current;

  const fetchCategoryData = async () => {
    try {
      const categoryData = await getMeals(`filter.php?c=Seafood${data[0]}`);
      setCategoryList(categoryData.meals);
      // console.log(categoryData.categories);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log("====================================");
  console.log(CategoryList);
  console.log("====================================");

  useEffect(() => {
    fetchCategoryData();
  }, []);
  
  
  return (
    <>
      <StatusBar barStyle="auto" />
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        // onScroll={e => console.log(e.nativeEvent.contentOffset.y)}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollA } } }],
          { useNativeDriver: true }
        )}
        style={styles.scrollView}
      >
        <View style={styles.container}>
          <Animated.Image
            style={styles.banner(scrollA)}
            // width="100%"
            height={BANNER_H}
            source={{
              uri: data[1],
            }}
          />
          {/* <View style={styles.TextView}>
            <View style={styles.flex}>
              <Icon name="food-bank" style={styles.IconStyle} size={40} />
              <Text style={styles.title}> {strMeal}</Text>
            </View>
            <Text style={styles.cartText}>Category : {strCategory}</Text>
            <View>
              <View style={styles.flex}>
                <Icon name="list-alt" style={styles.IconStyle} size={40} />

                <Text style={styles.title}>Ingredients</Text>
              </View>

              {ingredients.map((text, index) => {
                return (
                  text && (
                    <View style={styles.grid} key={index}>
                      <Text style={[styles.footer, styles.ingredientText]}>
                        {" "}
                        {index + 1}.{" "}
                      </Text>
                      <Text style={[styles.footer, styles.ingredientText]}>
                        {" "}
                        {text}{" "}
                      </Text>
                    </View>
                  )
                );
              })}

              <Text>{ingredients.strIngredient1}</Text>
            </View>
            <View>
              <View style={styles.flex}>
                <Text style={styles.title}>Instructions</Text>
                <Icon
                  name="integration-instructions"
                  style={styles.IconStyle}
                  size={40}
                />
              </View>
              <Text style={styles.footer}>{strInstructions}</Text>
              <Button
                onPress={() => Linking.openURL(strYoutube)}
                title=" Youtube Video"
                style={styles.button}
              />
            </View>
          </View> */}

          <FlatList
            numColumns={1}
            data={CategoryList?.meals}
            keyExtractor={(item, index) => item.strMeal + index}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => navigation.navigate("Details", { meals: item })}
              >
                <MiniCards {...item} />
              </Pressable>
            )}
          />
        </View>
      </Animated.ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#fff",
    flex: 1,
  },

  button: {
    padding: 30,
  },

  ingredientText: {
    lineHeight: 10,

    padding: 10,
  },
  ingredientTitle: {},
  grid: {
    flexDirection: "row",
    marginLeft: 20,
  },
  flex: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  title: {
    color: "#000",
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 26,
    margin: 10,
    paddingBottom: 0,
  },
  TextView: {
    justifyContent: "center",
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    top: -20,
    paddingBottom: 15,
  },

  cartText: {
    // color: "#fff",
    // textAlign: "center",
    fontWeight: "500",
    fontSize: 20,
    lineHeight: 26,
    padding: 20,
    paddingBottom: 0,
  },
  banner: (scrollA) => ({
    height: BANNER_H,
    width: "100%",
    transform: [
      {
        translateY: scrollA,
      },
      {
        scale: scrollA.interpolate({
          inputRange: [-BANNER_H, 5, BANNER_H, BANNER_H + 2],
          outputRange: [3, 1, 1.5, 3],
        }),
      },
    ],
  }),
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    color: Colors.dark,
  },
  highlight: {
    fontWeight: "700",
  },
  footer: {
    color: "#000",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 30,

    padding: 20,
    // marginBottom: 100,
  },
  IconStyle: {
    // fontSize: 45,
    // lineHeight: 26,
  },
});
