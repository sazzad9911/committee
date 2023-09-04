import React from "react";
import { View,Text } from "react-native";
import { useSelector } from "react-redux";
import { AppValues } from "../../functions/values";
import mainStyle from "../../styles/mainStyle";
import Avatar from "../main/Avatar";

export default function CollectionCart({textColor,borderColor,isDark,data}) {
  const isBn=useSelector(state=>state.isBn)
  const values=new AppValues(isBn)
  const headlines = values.getValues();
  return (
    <View style={[mainStyle.flexBox,{padding:12,marginVertical:6,marginHorizontal:20,backgroundColor:isDark?"#000":"#fff",borderRadius:8}]}>
      <View style={[mainStyle.flexBox]}>
        <Avatar source={{uri:"https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg"}} />
        <View style={{marginLeft:12,width:150}}>
          <Text numberOfLines={1} style={[mainStyle.mediumText,{color:textColor}]}>Easin Arafat</Text>
          <Text style={[mainStyle.smallText,{color:borderColor}]}>11/12/2024</Text>
        </View>
      </View>
      <View >
          <Text numberOfLines={1} style={[mainStyle.mediumText,{color:textColor}]}>{data?.amount?data.amount:"00"} ৳</Text>
          <Text style={[mainStyle.smallText,{color:"#6971FF"}]}>{data?.paid?headlines._paid:headlines._unPaid}</Text>
        </View>
    </View>
  );
}
