import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FirebaseAuth } from "../../FirebaseConfig";
import { signOut } from "firebase/auth";
import { RemoveData, RetrieveData } from "../Components/DataStorage";
import { useSearch } from "../Context/SearchContext";

export default function Profile({ navigation }) {
  const [data, setData] = useState(null);
  const { userData } = useSearch();

  async function signedOut() {
    try {
      await signOut(FirebaseAuth)
        .then(() => {
          // Sign-out successful.
        })
        .catch((error) => {
          // An error happened.
        });
      RemoveData("user");
    } catch (error) {
    } finally {
      navigation.navigate("Login");
    }
  }
  const retrieveData = async () => {
    try {
      const objectString = await RetrieveData("user");

      // setUserData(objectString);
    } catch (error) {
      console.error("Error retrieving object from string: ", error);
    }
  };
  console.log('====================================');
  console.log(userData);
  console.log('====================================');

  useEffect(() => {

    retrieveData();
  }, []);

  return (
    <View>
      <Text style={styles.title}>Profile</Text>
      <Text>Data: {userData ? userData.email : "No data"}</Text>
      <Button title="LogOut" onPress={() => signedOut()} />
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
