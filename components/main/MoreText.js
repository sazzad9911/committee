import React, { useState } from "react";
import { Pressable, Text } from "react-native";
import { useSelector } from "react-redux";
import { AppColors } from "../../functions/colors";

export default function MoreText({ textColor, numberOfLines, text }) {
    const [expand,setExpand]=useState(false)
    const isDark = useSelector((state) => state.isDark);
    const colors = new AppColors(isDark);
  return (
    <Pressable onPress={()=>setExpand(v=>!v)}>
      <Text
        numberOfLines={!expand?(numberOfLines ? numberOfLines : 3):null}
        style={[
          {
            color: colors.getTextColor(),
            fontSize: 16,
            fontWeight: "400",
          },
        ]}>
       {text}
      </Text>
    </Pressable>
  );
}
