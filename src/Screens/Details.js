import React, { useRef } from "react";
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
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from "react-native/Libraries/NewAppScreen";

const BANNER_H = 400;
export default function Details({ route }) {
  const { meals } = route.params;

  const {
    idMeal,
    strMeal,
    strCategory,
    strArea,
    strMealThumb,
    strInstructions,
    strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
    strIngredient5,
    strIngredient6,
    strIngredient7,
    strIngredient8,
    strIngredient9,
    strIngredient10,
    strIngredient11,
    strIngredient12,
    strIngredient13,
    strYoutube,
  } = meals;

  const ingredients = [
    strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
    strIngredient5,
    strIngredient6,
    strIngredient7,
    strIngredient8,
    strIngredient9,
    strIngredient10,
    strIngredient11,
    strIngredient12,
    strIngredient13,
  ];

  console.log("====================================");
  console.log(ingredients);
  console.log("====================================");

  const scrollA = useRef(new Animated.Value(0)).current;
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
              uri: strMealThumb,
            }}
          />
          <View style={styles.TextView}>
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

  button:{
    padding:30,
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
