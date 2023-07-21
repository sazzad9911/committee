import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/User/Home";
import Profile from "../screens/User/Profile";
import UserTabRoute from "./UserTabRoute";
import { StatusBar, useColorScheme, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import isDark, { setIsDark } from "../data/isDark";
import { setIsBn } from "../data/isBn";
import { AppColors } from "../functions/colors";
import SignIn from "../screens/Authentication/SignIn";
import BackHeader from "../components/main/BackHeader";
import Otp from "../screens/Authentication/Otp";
import SignUp from "../screens/Authentication/SignUp";
import Information from "../screens/Authentication/Information";
import { PaperProvider, MD3LightTheme } from "react-native-paper";
import Recovery from "../screens/Authentication/Recovery";
import LanguageScreen from "../screens/User/LanguageScreen";
import EditProfileInfo from "../screens/User/EditProfileInfo";
import { AppValues } from "../functions/values";
import CreateCommittee from "../screens/Dashboard/CreateCommittee";
import CreateCommitteeNext from "../screens/Dashboard/CreateCommitteeNext";
import DashboardRoute from "./DashboardRoute";
import DateShort from "../screens/Dashboard/DateShort";
import SelectDate from "../screens/Dashboard/SelectDate";
const Stack = createNativeStackNavigator();

export default function MainRoute() {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const colors = new AppColors(colorScheme == "dark" ? true : false);
  const backgroundColor = colors.getBackgroundColor();
  const textColor = colors.getTextColor();
  const isBn = useSelector((state) => state.isBn);

  const values = new AppValues(isBn);
  const getComityHeadLine = values.getComityHeadLine();
  const headlines = values.getDashboardHeadlines();
  const languageTitle = values.getLanguageHeadline();
  const editProfileInfo = values.getEditProfileHeadLine();

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
    dark: false,
  };
  const theme = {
    ...MD3LightTheme, // or MD3DarkTheme
    roundness: 2,
    colors: {
      ...MD3LightTheme.colors,
      primary: "#000",
      secondary: "#000",
      tertiary: "#000",
    },
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
      <PaperProvider theme={colorScheme == "dark" ? null : theme}>
        <NavigationContainer theme={MyTheme}>
          <Stack.Navigator>
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Dashboard"
              component={DashboardRoute}
            />
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
                header: (props) => (
                  <BackHeader title={languageTitle} {...props} />
                ),
              }}
              name="LanguageScreen"
              component={LanguageScreen}
            />
            <Stack.Screen
              options={{
                header: (props) => (
                  <BackHeader title={editProfileInfo} {...props} />
                ),
              }}
              name="EditProfileInfo"
              component={EditProfileInfo}
            />
            <Stack.Screen
              options={{
                header: (props) => (
                  <BackHeader title={getComityHeadLine} {...props} />
                ),
              }}
              name="CreateCommittee"
              component={CreateCommittee}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="CreateCommitteeNext"
              component={CreateCommitteeNext}
            />

            <Stack.Screen
              options={{
                header: (props) => <BackHeader title={headlines._settings} {...props} />,
              }}
              name="DateShort"
              component={DateShort}
            />
            <Stack.Screen
              options={{
                header: (props) => <BackHeader title={headlines._chooseDateHeadline} {...props} />,
              }}
              name="SelectDate"
              component={SelectDate}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </View>
  );
}
