import React from "react";
import { Pressable, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";
import { AppColors } from "../../functions/colors";
import { AppValues } from "../../functions/values";
import mainStyle from "../../styles/mainStyle";
import { dateConverter } from "../../functions/action";

export default function SubscriptionCard({ title, onPress, index, data }) {
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);
  const values = new AppValues(isBn);
  const colors = new AppColors(isDark);
  const borderColor = colors.getBorderColor();

  const icon = `<svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0.991541 11.0649L0.992658 11.0658C1.14848 11.1946 1.33984 11.25 1.52179 11.25C1.71073 11.25 1.8968 11.1849 2.04436 11.0711L2.04444 11.0712L2.05093 11.0658L6.59914 7.30668C6.59945 7.30643 6.59976 7.30618 6.60007 7.30592C7.01573 6.96858 7.25 6.5018 7.25 5.99928C7.25 5.49427 7.00668 5.0287 6.60098 4.69338L2.05093 0.93275C1.75611 0.689083 1.28747 0.689083 0.992658 0.93275L0.992655 0.932746L0.991541 0.933678C0.844379 1.05675 0.75 1.23402 0.75 1.43115C0.75 1.62827 0.844379 1.80554 0.991541 1.92862L0.991538 1.92862L0.992658 1.92954L5.54271 5.69018C5.65725 5.78484 5.70321 5.89781 5.70321 5.99928C5.70321 6.10075 5.65725 6.21371 5.54271 6.30838L0.992658 10.069L0.992655 10.069L0.991541 10.0699C0.84438 10.193 0.75 10.3703 0.75 10.5674C0.75 10.7645 0.844379 10.9418 0.991541 11.0649Z" fill="${borderColor}" stroke="${borderColor}" stroke-width="0.5"/>
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
          backgroundColor: isDark ? "rgba(153, 153, 153, 0.2)" : "#fff",
        },
      ]}
      onPress={onPress}
    >
      <Text style={[mainStyle.subLevel, { color: colors.getTextColor() }]}>
        {index}. {title}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={[mainStyle.subLevel, { color: colors.getTextColor() }]}>
          {dateConverter(data.createdAt)}
          {/* {values.getValues()._details} */}
        </Text>
        <SvgXml
          style={{
            marginLeft: 10,
          }}
          xml={icon}
        />
      </View>
    </Pressable>
  );
}
