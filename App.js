/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useRef, useState } from "react";

import Home from "./src/Screens/Home";
import Category from "./src/Screens/Category";
import Details from "./src/Screens/Details";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SearchProvider, useSearch } from "./src/Context/SearchContext";
import Title from "./src/Components/Title";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { View, Text, Button, Linking } from "react-native";
import Login from "./src/Screens/Login";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "./FirebaseConfig";
import Profile from "./src/Screens/Profile";
import { RetrieveData, StoreData } from "./src/Components/DataStorage";

const Stack = createStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const App = () => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [loggedIn, setLoggedIn] = useState(RetrieveData("user"));

  console.log(loggedIn);

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, (user) => {
      StoreData("user", JSON.stringify(user));
      console.log('====================================');
      console.log(RetrieveData("user"));
      console.log('====================================');
      setLoggedIn(RetrieveData("user"));
    });

    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function schedulePushNotification() {
    // Calculate the time for 8 AM tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(8, 0, 0, 0);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Good morning! ☀️",
        body: "Time to start your day!",
        data: { data: "goes here" },
      },
      trigger: {
        date: tomorrow,
        hour: 8,
        minute: 0,
        repeats: true, // Set this to true to make it a daily recurring notification
      },
    });
  }

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: "your-project-id",
        })
      ).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }
  return (
    <SearchProvider>
      {/* Notification */}
      {/* <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Text>Your expo push token: {expoPushToken}</Text>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text>
            Title: {notification && notification.request.content.title}{" "}
          </Text>
          <Text>Body: {notification && notification.request.content.body}</Text>
          <Text>
            Data:{" "}
            {notification && JSON.stringify(notification.request.content.data)}
          </Text>
        </View>
        <Button
          title="Press to schedule a notification"
          onPress={async () => {
            await schedulePushNotification();
          }}
        />
      </View> */}
      {/* Notification end */}

      <NavigationContainer
      // linking={{
      //   config: {
      //     // Configuration for linking
      //   },
      //   async getInitialURL() {
      //     // First, you may want to do the default deep link handling
      //     // Check if app was opened from a deep link
      //     const url = await Linking.getInitialURL();

      //     if (url != null) {
      //       return url;
      //     }

      //     // Handle URL from expo push notifications
      //     const response =
      //       await Notifications.getLastNotificationResponseAsync();

      //     if (response?.notification.request.content.data.url) {
      //       return response.notification.request.content.data.url;
      //     }

      //     return null;
      //   },
      //   subscribe(listener) {
      //     const onReceiveURL = ({ url }) => listener(url);

      //     // Listen to incoming links from deep linking
      //     const eventListenerSubscription = Linking.addEventListener(
      //       "url",
      //       onReceiveURL
      //     );

      //     // Listen to expo push notifications
      //     const subscription =
      //       Notifications.addNotificationResponseReceivedListener(
      //         (response) => {
      //           const url = response.notification.request.content.data.url;

      //           // Any custom logic to see whether the URL needs to be handled
      //           //...

      //           // Let React Navigation handle the URL
      //           listener(url);
      //         }
      //       );

      //     return () => {
      //       // Clean up the event listeners
      //       eventListenerSubscription.remove();
      //       subscription.remove();
      //     };
      //   },
      // }}
      >
        <Stack.Navigator initialRouteName={loggedIn ? "Home " : "Login"}>
          {!loggedIn ? (
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen
              name="Home"
              // options={{
              //   title: <Title />,
              // }}
              options={{ headerShown: false }}
              component={Home}
            />
          )}
          <Stack.Screen
            name="Details"
            component={Details}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Category"
            component={Category}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SearchProvider>
  );
};

export default App;
