import React from "react";
import { Pressable, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";
import { AppColors } from "../../functions/colors";
import mainStyle from "../../styles/mainStyle";
import Avatar from "../main/Avatar";

export default function ComityCard({ title, subTitle, uri, onPress }) {
  const isDark = useSelector((state) => state.isDark);
  const colors = new AppColors(isDark);

  return (
    <Pressable onPress={onPress}>
      <View
        style={{ flexDirection: "row", marginTop: 28, alignItems: "center" }}>
        <Avatar
          source={{ uri: uri }}
          style={{
            height: 48,
            width: 48,
          }}
        />
        <View
          style={{
            marginLeft: 7,
          }}>
          <Text
            style={[mainStyle.mediumText, { color: colors.getTextColor() }]}>
            {title?title:"Kundia Vita Comity"}
          </Text>
          <Text
            style={[
              mainStyle.text14,
              { color: colors.getBorderColor(), marginTop: 3 },
            ]}>
            {subTitle?subTitle:"Dashboard"}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
