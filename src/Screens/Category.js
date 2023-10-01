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
  Pressable,
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
const BANNER_H = 300;

export default function Category({ route }) {
  const { data } = route.params;
  const [CategoryList, setCategoryList] = useState([]);
  const scrollA = useRef(new Animated.Value(0)).current;

  const fetchCategoryData = async () => {
    try {
      const categoryData = await getMeals(`filter.php?c=${data[0]}`);
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
          <View style={styles.TextView}>
            
          <FlatList
            numColumns={1}
            data={CategoryList}
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
