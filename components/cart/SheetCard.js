import React from "react";
import { View, Text, Pressable } from "react-native";
import { useSelector } from "react-redux";
import { AppColors } from "../../functions/colors";
import mainStyle from "../../styles/mainStyle";

export default function SheetCard({ title,onPress }) {
  const isDark = useSelector((state) => state.isDark);
  const colors = new AppColors(isDark);

  return (
    <Pressable onPress={onPress}
      style={{
        paddingVertical: 16,
        borderBottomWidth:1,
        borderBottomColor:colors.getShadowColor()
      }}>
      <Text style={[{
        color:colors.getTextColor(),
      },mainStyle.mediumText]}>{title?title:"Last 7 days collection"}</Text>
    </Pressable>
  );
}
