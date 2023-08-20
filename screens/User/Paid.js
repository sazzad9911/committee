import React from "react";
import { ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import SubscriptionCard from "../../components/cart/SubscriptionCard";
import FloatingButton from "../../components/main/FloatingButton";
import { AppColors } from "../../functions/colors";

export default function Paid({navigation}) {
  const isDark=useSelector(state=>state.isDark)
  const colors=new AppColors(isDark)

  return (
    <View style={{flex:1,backgroundColor:colors.getBackgroundColor()}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ height: 6 }} />
        <SubscriptionCard onPress={()=>{
            navigation?.navigate("SubscriptionDetails")
        }} title={"হজুরের বেতন"} />
        <View style={{ height: 70 }} />
      </ScrollView>
      
    </View>
  );
}
