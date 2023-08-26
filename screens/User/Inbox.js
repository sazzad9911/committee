import React from "react";
import { ScrollView, Text } from "react-native";
import { useSelector } from "react-redux";
import { AppColors } from "../../functions/colors";
import { AppValues } from "../../functions/values";

export default function Inbox() {
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);
  const colors = new AppColors(isDark);
  const values = new AppValues(isBn);
  const backgroundColor = colors.getBackgroundColor();
  const textColor = colors.getTextColor();
  return (
    <ScrollView style={{ backgroundColor: backgroundColor }}>
      <Text>Inbox</Text>
    </ScrollView>
  );
}
