import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import SignUpCart from "../../components/cart/SignUpCart";
import UserHome from "../../components/headers/UserHome";
import { AppColors } from "../../functions/colors";
import { AppValues } from "../../functions/values";
import HidableHeaderLayout from "../../layouts/HidableHeaderLayout";

export default function Home({ navigation }) {
  const isDark=useSelector(state=>state.isDark)
  const isBn=useSelector(state=>state.isBn)
  const colors=new AppColors(isDark)
  const values= new AppValues(isBn)
  const signUpCartTitles=values.getSignUpCartTitles()
  const backgroundColor=colors.getBackgroundColor()
  return (
    <HidableHeaderLayout
      component={<View style={{
        flex:1,
        backgroundColor:backgroundColor,
        paddingHorizontal:20
      }}>
        <SignUpCart title={signUpCartTitles?.title}/>
       
      </View>}
      header={<UserHome navigation={navigation} />}
    />
  );
}
