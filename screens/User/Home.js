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

export default function Home({ navigation }) {
  const isDark=useSelector(state=>state.isDark)
  const isBn=useSelector(state=>state.isBn)
  const colors=new AppColors(isDark)
  const values= new AppValues(isBn)
  const signUpCartTitles=values.getSignUpCartTitles()
  const backgroundColor=colors.getBackgroundColor()
  const textColor=colors.getTextColor()
  return (
    <HidableHeaderLayout
      component={<View style={{
        flex:1,
        backgroundColor:backgroundColor,
        
      }}>
        <SignUpCart title={signUpCartTitles?.title}/>
       <PopularCategory textColor={textColor}/>
       <FavoriteCategory textColor={textColor}/>
      </View>}
      header={<UserHome navigation={navigation} />}
    />
  );
}
