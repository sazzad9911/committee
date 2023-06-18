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
import Otp from "../screens/Authentication/Otp";
import SignUp from "../screens/Authentication/SignUp";
import Information from "../screens/Authentication/Information";
import { PaperProvider } from "react-native-paper";
import Recovery from "../screens/Authentication/Recovery";
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
    <View
      style={{
        flex: 1,
      }}>
      <StatusBar
        backgroundColor={backgroundColor}
        barStyle={colorScheme == "dark" ? "light-content" : "dark-content"}
      />
      <PaperProvider>
        <NavigationContainer theme={MyTheme}>
          <Stack.Navigator>
            <Stack.Screen
              options={{
                //header:(props)=><BackHeader title={"Phone Number Verification"} onPress={()=>{}} {...props}/>
                headerShown: false,
              }}
              name="SignIn"
              component={SignIn}
            />
            <Stack.Screen
              options={{
                header: (props) => (
                  <BackHeader title={"Phone Number Verification"} {...props} />
                ),
              }}
              name="SignUp"
              component={SignUp}
            />
            <Stack.Screen
              options={{
                header: (props) => (
                  <BackHeader title={"Phone Number Verification"} {...props} />
                ),
              }}
              name="Otp"
              component={Otp}
            />
            <Stack.Screen
              options={{
                header: (props) => (
                  <BackHeader title={"User Information"} {...props} />
                ),
              }}
              name="Information"
              component={Information}
            />
            <Stack.Screen
              options={{
                header: (props) => (
                  <BackHeader title={"Recovery Account"} {...props} />
                ),
              }}
              name="Recovery"
              component={Recovery}
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
      </PaperProvider>
    </View>
  );
}
