import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import FavoriteCategory from "../../components/cart/FavoriteCategory";
import PopularCategory from "../../components/cart/PopularCategory";
import SignUpCart from "../../components/cart/SignUpCart";
import UserHome from "../../components/headers/UserHome";
import { AppColors } from "../../functions/colors";
import { AppValues } from "../../functions/values";
import HidableHeaderLayout from "../../layouts/HidableHeaderLayout";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BackHeader from "../../components/main/BackHeader";
import CreateCommittee from "../Dashboard/CreateCommittee";
import CreateCommitteeNext from "../Dashboard/CreateCommitteeNext";
import CommitteeProfile from "../Dashboard/CommitteeProfile";
const Stack = createNativeStackNavigator();

export default function Home({ navigation }) {
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);
  const colors = new AppColors(isDark);
  const values = new AppValues(isBn);
  const signUpCartTitles = values.getSignUpCartTitles();
  const backgroundColor = colors.getBackgroundColor();
  const textColor = colors.getTextColor();
  const getComityHeadLine=values.getComityHeadLine()

  const HomeScreen=()=>{
    return (
      <HidableHeaderLayout
        component={
          <View
            style={{
              flex: 1,
              backgroundColor: backgroundColor,
            }}>
            <SignUpCart onPress={()=>{
              navigation.navigate("CreateCommittee")
            }} title={signUpCartTitles?.title} />
            <PopularCategory textColor={textColor} />
            <FavoriteCategory textColor={textColor} />
            <PopularCategory textColor={textColor} />
            <View style={{ height: 24 }} />
          </View>
        }
        header={<UserHome navigation={navigation} />}
      />
    );
  }
  return (
    <Stack.Navigator>
      <Stack.Screen options={{
        headerShown:false
      }} name="HomeScreen" component={HomeScreen} />
      <Stack.Screen options={{
        header:props=><BackHeader title={getComityHeadLine} {...props}/>
      }} name="CreateCommittee" component={CreateCommittee} />
      <Stack.Screen options={{
        headerShown:false
      }} name="CreateCommitteeNext" component={CreateCommitteeNext} />
      <Stack.Screen options={{
        headerShown:false
      }} name="CommitteeProfile" component={CommitteeProfile} />
    </Stack.Navigator>
  );
  
}
