import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/User/Home";
import Profile from "../screens/User/Profile";
import UserTabRoute from "./UserTabRoute";
import { useColorScheme } from "react-native";
import {useDispatch} from "react-redux"
import { setIsDark } from "../data/isDark";
import { setIsBn } from "../data/isBn";
const Stack = createNativeStackNavigator();

export default function MainRoute() {
  const colorScheme = useColorScheme();
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(setIsDark(colorScheme=="dark"?true:false))
    dispatch(setIsBn(true))
  },[])

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
