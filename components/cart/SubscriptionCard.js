import React from "react";
import { Pressable, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";
import { AppColors } from "../../functions/colors";
import { AppValues } from "../../functions/values";
import mainStyle from "../../styles/mainStyle";

export default function SubscriptionCard({ title, onPress }) {
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);
  const values = new AppValues(isBn);
  const colors = new AppColors(isDark);
  const icon = `<svg width="8" height="11" viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.52179 10.5C1.3892 10.5 1.2566 10.4596 1.15193 10.3731C1.05459 10.2917 1 10.1819 1 10.0674C1 9.95296 1.05459 9.84312 1.15193 9.76172L5.70198 6.00108C6.03695 5.72423 6.03695 5.27433 5.70198 4.99748L1.15193 1.23684C1.05459 1.15544 1 1.0456 1 0.931146C1 0.816695 1.05459 0.706857 1.15193 0.625451C1.35431 0.458183 1.68928 0.458183 1.89166 0.625451L6.44171 4.38608C6.79762 4.68024 7 5.07823 7 5.49928C7 5.92033 6.8046 6.31831 6.44171 6.61247L1.89166 10.3731C1.78698 10.4539 1.65439 10.5 1.52179 10.5Z" fill="black" fill-opacity="0.6"/>
    <path d="M0.991541 10.5649L0.992658 10.5658C1.14848 10.6946 1.33984 10.75 1.52179 10.75C1.71073 10.75 1.8968 10.6849 2.04436 10.5711L2.04444 10.5712L2.05093 10.5658L6.59914 6.80668C6.59945 6.80643 6.59976 6.80618 6.60007 6.80592C7.01573 6.46858 7.25 6.0018 7.25 5.49928C7.25 4.99427 7.00668 4.5287 6.60098 4.19338L2.05093 0.43275C1.75611 0.189083 1.28747 0.189083 0.992658 0.43275L0.992655 0.432746L0.991541 0.433678C0.844379 0.556753 0.75 0.734022 0.75 0.931146C0.75 1.12827 0.844379 1.30554 0.991541 1.42862L0.991538 1.42862L0.992658 1.42954L5.54271 5.19018C5.65725 5.28484 5.70321 5.39781 5.70321 5.49928C5.70321 5.60075 5.65725 5.71371 5.54271 5.80838L0.992658 9.56901L0.992655 9.56901L0.991541 9.56994C0.84438 9.69302 0.75 9.87029 0.75 10.0674C0.75 10.2645 0.844379 10.4418 0.991541 10.5649Z" stroke="${colors.getTextColor()}" stroke-opacity="0.6" stroke-width="0.5"/>
    </svg>
    `;

  return (
    <Pressable
      style={[
        mainStyle.flexBox,
        {
          marginHorizontal: 20,
          marginVertical: 6,
          padding: 12,
          borderRadius: 8,
          backgroundColor:isDark?"rgba(153, 153, 153, 0.2)":"#fff"
        },
      ]}
      onPress={onPress}>
      <Text style={[mainStyle.subLevel, { color: colors.getTextColor() }]}>
        {title}
      </Text>
      <View style={{
        flexDirection:"row",
        alignItems:"center"
      }}>
        <Text style={[mainStyle.subLevel, { color: colors.getTextColor() }]}>
          {values.getValues()._details}
        </Text>
        <SvgXml style={{
          marginLeft:10
        }} xml={icon} />
      </View>
    </Pressable>
  );
}
