import React, { useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import Button from "../components/main/Button";
import Input from "../components/main/Input";
import TextArea from "../components/main/TextArea";
import { AppColors } from "../functions/colors";
import { AppValues } from "../functions/values";
import BottomShitLayout from "../layouts/BottomShitLayout";
import mainStyle from "../styles/mainStyle";

export default function Support() {
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);
  const colors = new AppColors(isDark);
  const values = new AppValues(isBn);
  const headlines = values.getValues();
  const [index,setIndex]=useState(-1)
  const bs=["কমিটির জন্য রিপোর্ট","সাধারণ অ্যাকাউন্টের সমস্যা","কমিটির অ্যাকাউন্ট সমস্যা","অ্যাকাউন্ট মুছে ফেলুন"]
  const en=["report for a Comity","Normal account Issues","Comity account issues","Delete Account"]
  const Screen = () => (
    <View style={[mainStyle.pdH20]}>
      <View
        style={[
          mainStyle.flexBox,
          {
            paddingHorizontal: 8,
            paddingVertical: 16,
            borderRadius: 4,
            backgroundColor: "#6971FF",
          },
          mainStyle.mt12,
        ]}>
        <Text style={[mainStyle.subLevel, { color: "#fff" }]}>
          {headlines._supportCaution}
        </Text>
      </View>
      <Input
        placeholder={" "}
        editable={false}
        onPress={() => setIndex(1)}
        level={headlines._subject}
        outSideStyle={mainStyle.mt12}
      />
      <TextArea
        style={{
          height: 200,
        }}
        outSideStyle={mainStyle.mt12}
        placeholder={headlines.write}
        level={headlines._details}
      />
      <View style={[mainStyle.flexBox, mainStyle.mt12]}>
        <Button
          style={{ width: Dimensions.get("window").width / 2 - 30 }}
          title={headlines._canncel}
        />
        <Button
          active={true}
          style={{ width: Dimensions.get("window").width / 2 - 30 }}
          title={headlines._send}
        />
      </View>
      <View style={mainStyle.mt32} />
    </View>
  );
  const Options = () => (
    <View style={[{flex:1},mainStyle.pdH20]}>
      <Text style={[{textAlign:"center"},mainStyle.mediumText]}>{headlines._select}</Text>
      <View style={[mainStyle.mt12]}>
        {isBn?bs.map((d,i)=><Cart key={i} title={d}/>):(en.map((d,i)=><Cart key={i} title={d}/>))}
      </View>
      <Button style={mainStyle.mt32} active={true} title={headlines._ok}/>
    </View>
  );
  const Cart=({title})=><View style={{
    paddingVertical:16,
    borderBottomColor:colors.getShadowColor(),
    borderBottomWidth:1
  }}>
    <Text style={[mainStyle.subLevel,{color:colors.getTextColor()}]}>{title}</Text>
  </View>
  return (
    <BottomShitLayout scrollable={true} component={<Options />} setIndex={setIndex} index={index} screen={<Screen />} />
  );
}
