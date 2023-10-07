import React, { useEffect } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { getPopularComities } from "../../apis/api";
import mainStyle from "../../styles/mainStyle";
import Button from "../main/Button";
import { useSelector } from "react-redux";
import { get } from "../../apis/multipleApi";
const { width, height } = Dimensions.get("window");

export default function PopularCategory({ textColor, navigation }) {
  const [comities, setComities] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const isBn = useSelector((state) => state.isBn);
  const user = useSelector((state) => state.user);

  const icon = `<svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.58206 5.99991C7.58206 6.46658 7.35706 6.93325 6.9154 7.28658L1.48206 11.6332C1.36445 11.7262 1.20576 11.7784 1.0404 11.7784C0.875038 11.7784 0.716345 11.7262 0.59873 11.6332C0.357064 11.4399 0.357064 11.1199 0.59873 10.9266L6.03206 6.57991C6.43206 6.25991 6.43206 5.73991 6.03206 5.41991L0.598731 1.07325C0.357064 0.879914 0.357064 0.559914 0.598731 0.36658C0.840397 0.173247 1.2404 0.173247 1.48206 0.36658L6.9154 4.71325C7.35706 5.06658 7.58206 5.53325 7.58206 5.99991Z" fill="${textColor}" fill-opacity="0.9"/>
</svg>
`;

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const { data } = await get("/comity/get-popular", user.token);
      setComities(data.comities);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 20,
        }}
      >
        <Text style={[mainStyle.headLine, { color: textColor }]}>
          {isBn ? "জনপ্রিয়" : "Popular"}
        </Text>
        <Button
          style={mainStyle.moreButton}
          title={isBn ? "আরও দেখুন" : "See More"}
          Icon={() => <SvgXml xml={icon} />}
          onPress={() => navigation.navigate("PopularComities")}
        />
      </View>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
        <View style={{ width: 14 }} />
        {comities.map((comity, index) => (
          <PopularCategoryCart
            onPress={() => {
              navigation.navigate("ComityProfile", { comityId: comity.id });
            }}
            key={index}
            comity={comity}
            index={comity.id}
          />
        ))}
        <View style={{ width: 14 }} />
      </ScrollView>
    </View>
  );
}
export const PopularCategoryCart = ({ comity, style, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          marginHorizontal: 6,
        },
        style,
      ]}
    >
      <Image
        style={{
          height: style?.height ? style.height : 177,
          borderRadius: 16,
          width: style?.width ? style.width : width / 3,
        }}
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/220px-Image_created_with_a_mobile_phone.png",
        }}
      />
      <Text
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          paddingHorizontal: 8,
          paddingVertical: 12,
          fontSize: 16,
          fontWeight: "500",
          color: "#fff",
        }}
      >
        {comity?.name}
      </Text>
    </Pressable>
  );
};
