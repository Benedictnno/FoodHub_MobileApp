import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FirebaseAuth } from "../../FirebaseConfig";
import { signOut } from "firebase/auth";
import { RemoveData } from "../Components/DataStorage";

export default function Profile() {
  async function signedOut() {
    try {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
        })
        .catch((error) => {
          // An error happened.
        });
      RemoveData("user");
    } catch (error) {}
  }
  return (
    <View>
      <Text style={styles.title}>Profile</Text>
      <Button title="LogOut" onPress={signedOut} />
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
    marginTop: 50,
  },
});
