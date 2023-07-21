import React from "react";
import { View, Text } from "react-native";
import mainStyle from "../../styles/mainStyle";
import Avatar from "../main/Avatar";

export default function ExpensesCart({ textColor, borderColor, isDark }) {
  return (
    <View
      style={[
        mainStyle.flexBox,
        {
          padding: 12,
          marginVertical: 6,
          marginHorizontal: 20,
          backgroundColor: isDark ? "#000" : "#fff",
          borderRadius: 8,
        },
      ]}>
      <View style={[mainStyle.flexBox]}>
        <View style={{  width: 150 }}>
          <Text
            numberOfLines={1}
            style={[mainStyle.mediumText, { color: textColor }]}>
            Easin Arafat
          </Text>
          <Text style={[mainStyle.smallText, { color: borderColor }]}>
            11/12/2024
          </Text>
        </View>
      </View>
      <View>
        <Text
          numberOfLines={1}
          style={[mainStyle.mediumText, { color: textColor }]}>
          5000000 ৳
        </Text>
      </View>
    </View>
  );
}
