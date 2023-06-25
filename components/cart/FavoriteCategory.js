import React from "react";
import { Dimensions, Image, ScrollView, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import mainStyle from "../../styles/mainStyle";
import Button from "../main/Button";
const { width, height } = Dimensions.get("window");

export default function FavoriteCategory({ textColor }) {
  const icon = `<svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.58206 5.99991C7.58206 6.46658 7.35706 6.93325 6.9154 7.28658L1.48206 11.6332C1.36445 11.7262 1.20576 11.7784 1.0404 11.7784C0.875038 11.7784 0.716345 11.7262 0.59873 11.6332C0.357064 11.4399 0.357064 11.1199 0.59873 10.9266L6.03206 6.57991C6.43206 6.25991 6.43206 5.73991 6.03206 5.41991L0.598731 1.07325C0.357064 0.879914 0.357064 0.559914 0.598731 0.36658C0.840397 0.173247 1.2404 0.173247 1.48206 0.36658L6.9154 4.71325C7.35706 5.06658 7.58206 5.53325 7.58206 5.99991Z" fill="${textColor}" fill-opacity="0.9"/>
</svg>
`;
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 20,
        }}>
        <Text style={[mainStyle.headLine, { color: textColor }]}>জনপ্রিয় ক্যাটাগরি</Text>
        <Button
          style={mainStyle.moreButton}
          title={"আরও দেখুন"}
          Icon={() => <SvgXml xml={icon} />}
        />
      </View>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
        <View style={{ width: 14 }} />
        <PopularCategoryCart index={0} />
        <PopularCategoryCart index={1} />
        <PopularCategoryCart index={2} />
        <View style={{ width: 14 }} />
      </ScrollView>
    </View>
  );
}
export const PopularCategoryCart = ({ index, image }) => {
  return (
    <View
      style={{
        marginHorizontal: 6,
      }}>
      <Image
        style={{
          height: 177,
          borderRadius: 16,
          width: width / 3,
        }}
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/220px-Image_created_with_a_mobile_phone.png",
        }}
      />
    </View>
  );
};
