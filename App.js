import React from "react";
import Home from "./screens/Home";
import Control from "./screens/Control";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Control" component={Control} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
