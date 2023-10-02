import {
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { FirebaseAuth, GoogleAuth } from "../../FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useSearch } from "../Context/SearchContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);
  const auth = FirebaseAuth;
  const { loggedIn, setLoggedIn } = useSearch();

  
  async function signIn() {
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, Password);
      console.log(res);
    } catch (error) {
      console.log(error);
      alert("SigUp in failed" + error.message);

    } finally {
      setLoading(false);
    }
  }
  async function signUp() {
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, Password);
      setLoggedIn(true)
    } catch (error) {
      console.log(error);
      alert("SigIn in failed " + error.message);
    } finally {
      setLoading(false);
    }
  }

  
  async function google() {
    try {
      
      signInWithPopup(auth, GoogleAuth)
         .then((result) => {
           // This gives you a Google Access Token. You can use it to access the Google API.
           const credential = GoogleAuthProvider.credentialFromResult(result);
           const token = credential.accessToken;
           // The signed-in user info.
           const user = result.user;
           console.log('====================================');
           console.log(user);
           console.log('====================================');
   
             localStorage.setItem("isAuth", true);
             localStorage.setItem("userData", JSON.stringify(user));
   
           // IdP data available using getAdditionalUserInfo(result)
           // ...
         })
         .catch((error) => {
           // Handle Errors here.
           const errorCode = error.code;
           const errorMessage = error.message;
           // The email of the user's account used.
           const email = error.customData.email;
           // The AuthCredential type that was used.
           const credential = GoogleAuthProvider.credentialFromError(error);
           // ...
         });
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }

    
  }

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <KeyboardAvoidingView>
        <TextInput
          // value={email}
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(e) => setEmail(e)}
        />
        <TextInput
          // value={Password}
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          onChangeText={(e) => setPassword(e)}
        />

        {Loading ? (
          <ActivityIndicator size={"large"} color={"#0000ff"} />
        ) : (
          <>
            <Button title="Login" onPress={signIn} />
            <Button title="Create Account" onPress={signUp} />
            <Button title="Use Google" onPress={google} />
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "50%",
  },
});
