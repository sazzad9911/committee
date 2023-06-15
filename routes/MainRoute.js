import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/User/Home";
import Profile from "../screens/User/Profile";
import UserTabRoute from "./UserTabRoute";
const Stack = createNativeStackNavigator();

export default function MainRoute() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{
            headerShown:false
        }} name="Dashboard" component={UserTabRoute} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
