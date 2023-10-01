import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

export default function MiniCards({
  idMeal,
  strMeal,
  strCategory,
  strArea,
  strMealThumb,
}) {
  
  return (
    <View style={styles.container}>
      <Image source={{ uri: strMealThumb }} style={styles.Image} />
      <View style={styles.TextContainer}>
        <Text style={styles.Text}>{strMeal}</Text>

        {strArea && strCategory && (
          <View style={styles.cartTextContainer}>
            <Text style={[styles.Text, styles.cartText]}>{strArea}</Text>
            <Text style={[styles.Text, styles.cartText]}>{strCategory}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Image: {
    height: 70,
    width: 70,
    borderRadius: 50,
  },
  container: {
    marginVertical: 15,
    marginHorizontal: 15,
    backgroundColor: "#d6410b",
   
    borderRadius: 10,
    // borderWidth: 2,
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10,

    elevation: 5,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: "#333",
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  Text: {
    color: "#fff",
    // textAlign: "center",

    fontWeight: "500",
    fontSize: 17,
    lineHeight: 20,
  },

  TextContainer: {
    marginLeft: 10,
    justifyContent: "center",
  },
  cartText: {
    marginRight: 10,
    backgroundColor: "#F6F8E2",
    color: "#e3c07f",
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 5,
  },
  cartTextContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
  },
});
