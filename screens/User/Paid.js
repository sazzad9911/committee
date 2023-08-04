import React from "react";
import { ScrollView, View } from "react-native";
import SubscriptionCard from "../../components/cart/SubscriptionCard";
import FloatingButton from "../../components/main/FloatingButton";

export default function Paid({navigation}) {
  return (
    <View style={{flex:1}}>
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
