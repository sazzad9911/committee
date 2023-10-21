import React from "react";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";
import { AppColors } from "../../functions/colors";
import mainStyle from "../../styles/mainStyle";

export default function SheetCard({ title, onPress, select }) {
  const isDark = useSelector((state) => state.isDark);
  const colors = new AppColors(isDark);

  return (
    <TouchableOpacity
      onPress={() => (onPress ? onPress(title) : console.log("ok"))}
      style={{
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.getShadowColor(),
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Text
        style={[
          mainStyle.mediumText,
          {
            color: colors.getTextColor(),
            fontWeight: "400",
          },
        ]}
      >
        {title ? title : "Last 7 days collection"}
      </Text>
      {select && <SvgXml xml={tick} />}
    </TouchableOpacity>
  );
}
const tick = `<svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.725 1.22423C14.055 0.885479 14.5413 0.664229 15.0188 0.792979C15.5688 0.907979 15.9525 1.42673 16 1.97298V2.03548C15.9688 2.44423 15.7487 2.80423 15.46 3.08298C12.5825 5.95548 9.7075 8.82923 6.835 11.7042C6.54625 11.993 6.18625 12.263 5.75625 12.2442C5.325 12.2605 4.9625 11.9917 4.67375 11.7017C3.30125 10.3267 1.9275 8.95298 0.55125 7.58298C0.2625 7.30423 0.0375 6.94798 0 6.54048V6.47923C0.03875 5.92298 0.42875 5.39423 0.9875 5.28048C1.46625 5.15173 1.95125 5.37923 2.28125 5.71923C3.44375 6.87298 4.59625 8.03673 5.75875 9.19048C8.41625 6.53798 11.0662 3.87798 13.725 1.22423Z" fill="#4ADE80"/>
</svg>
`;
