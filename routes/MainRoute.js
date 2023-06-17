import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/User/Home";
import Profile from "../screens/User/Profile";
import UserTabRoute from "./UserTabRoute";
import { StatusBar, useColorScheme, View } from "react-native";
import { useDispatch } from "react-redux";
import { setIsDark } from "../data/isDark";
import { setIsBn } from "../data/isBn";
import { AppColors } from "../functions/colors";
import SignIn from "../screens/Authentication/SignIn";
import BackHeader from "../components/main/BackHeader";
const Stack = createNativeStackNavigator();

export default function MainRoute() {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const colors = new AppColors(colorScheme == "dark" ? true : false);
  const backgroundColor = colors.getBackgroundColor();
  const textColor = colors.getTextColor();
  useEffect(() => {
    dispatch(setIsDark(colorScheme == "dark" ? true : false));
    dispatch(setIsBn(true));
  }, [colorScheme]);
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "rgb(255, 45, 85)",
      background: backgroundColor,
    },
    dark: true,
  };

  return (
    <View style={{
      flex:1
    }}>
      <StatusBar backgroundColor={backgroundColor} barStyle={colorScheme=="dark"?"light-content":"dark-content"}/>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator>
        <Stack.Screen
            options={{
              header:(props)=><BackHeader onPress={()=>{}} {...props}/>
            }}
            name="SignIn"
            component={SignIn}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Dashboard"
            component={UserTabRoute}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
