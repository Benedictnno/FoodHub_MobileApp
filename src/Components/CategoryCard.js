import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

export default function CategoryCard({
  idCategory,
  strCategory,
  strCategoryThumb,
  strCategoryDescription,
}) {

  return (
    <View style={styles.container}>
      <Image source={{ uri: strCategoryThumb }} style={styles.Image} />
      <Text style={styles.Text}>{strCategory}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  Image: {
    height: 180,
    width: 180,
  },
  container: {
    marginVertical: 20,
    marginHorizontal: 15,
    // backgroundColor: "#F57C51",
    // borderColor: "#F57C51",
    // borderStyle: "solid",
    // borderRadius: 10,
    // borderWidth: 2,

    elevation: 3,
    shadowOffset: {
      width: 8,
      height: 2,
    },
    shadowColor: "#e3c07f",
    shadowOpacity: 0.1,
    shadowRadius: 1,
    // paddingHorizontal:10,
  },
  Text: {
    // color: "#fff",
    textAlign: "center",
    fontWeight:"600",
    fontSize: 20,
  },
});
