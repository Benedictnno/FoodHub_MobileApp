import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Title() {
  return (
    <View style={styles.flex}  >
      <Text style={styles.title}>Food</Text>
      <Text style={[styles.title,styles.color]}>Hub</Text>
    </View>
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
    // justifyContent: "center",
    marginVertical: 10,
  },

  color: {
    color: "#d6410b",
  },
});