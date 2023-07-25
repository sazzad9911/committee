import React from "react";
import { Pressable, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import mainStyle from "../../styles/mainStyle";

export default function NoticeCart({ borderColor, color,onPress }) {
  return (
    <Pressable onPress={onPress}
      style={{
        flexDirection: "row",
        marginHorizontal: 20,
        marginVertical: 10,
        paddingBottom: 20,
        borderBottomColor: borderColor,
        borderBottomWidth: 1,
        justifyContent: "space-between",
      }}>
      <View style={mainStyle.flexBox}>
        <View
          style={{
            backgroundColor: color,
            height: 5,
            width: 5,
            borderRadius: 2.5,
          }}
        />
        <Text
          style={{
            fontSize: 14,
            color: color,
            marginHorizontal: 10,
          }}>
          বিস্তারিত বিস্তারিতবিস্তারিতবিস্তারিত
        </Text>
      </View>
      <View style={mainStyle.flexBox}>
        <Text
          style={{
            fontSize: 14,
            color: color,
            marginHorizontal: 10,
          }}>
          01/12/2023
        </Text>
        <SvgXml xml={icon} />
      </View>
    </Pressable>
  );
}
const icon = `<svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.991541 11.0649L0.992658 11.0658C1.14848 11.1946 1.33984 11.25 1.52179 11.25C1.71073 11.25 1.8968 11.1849 2.04436 11.0711L2.04444 11.0712L2.05093 11.0658L6.59914 7.30668C6.59945 7.30643 6.59976 7.30618 6.60007 7.30592C7.01573 6.96858 7.25 6.5018 7.25 5.99928C7.25 5.49427 7.00668 5.0287 6.60098 4.69338L2.05093 0.93275C1.75611 0.689083 1.28747 0.689083 0.992658 0.93275L0.992655 0.932746L0.991541 0.933678C0.844379 1.05675 0.75 1.23402 0.75 1.43115C0.75 1.62827 0.844379 1.80554 0.991541 1.92862L0.991538 1.92862L0.992658 1.92954L5.54271 5.69018C5.65725 5.78484 5.70321 5.89781 5.70321 5.99928C5.70321 6.10075 5.65725 6.21371 5.54271 6.30838L0.992658 10.069L0.992655 10.069L0.991541 10.0699C0.84438 10.193 0.75 10.3703 0.75 10.5674C0.75 10.7645 0.844379 10.9418 0.991541 11.0649Z" fill="#A3A3A3" stroke="#A3A3A3" stroke-width="0.5"/>
</svg>
`;
