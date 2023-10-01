/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useRef } from "react";

import Home from "./src/Screens/Home";
import Category from "./src/Screens/Category";
import Details from "./src/Screens/Details";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SearchProvider } from "./src/Context/SearchContext";

const Stack = createStackNavigator();

const App = () => {
  return (
    <SearchProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen
            name="Home"
            options={{
              title: "",
            }}
            component={Home}
          />
          <Stack.Screen name="Category" component={Category} />
        </Stack.Navigator>
      </NavigationContainer>
    </SearchProvider>
  );
};

export default App;
