import React, { useEffect, Fragment } from "react";
import { Dimensions, Image, ScrollView, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { getRecentComities } from "../../apis/api";
import mainStyle from "../../styles/mainStyle";
import Button from "../main/Button";
const { width, height } = Dimensions.get("window");

export default function FavoriteCategory({ textColor }) {
  const [comities, setComities] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const icon = `<svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.58206 5.99991C7.58206 6.46658 7.35706 6.93325 6.9154 7.28658L1.48206 11.6332C1.36445 11.7262 1.20576 11.7784 1.0404 11.7784C0.875038 11.7784 0.716345 11.7262 0.59873 11.6332C0.357064 11.4399 0.357064 11.1199 0.59873 10.9266L6.03206 6.57991C6.43206 6.25991 6.43206 5.73991 6.03206 5.41991L0.598731 1.07325C0.357064 0.879914 0.357064 0.559914 0.598731 0.36658C0.840397 0.173247 1.2404 0.173247 1.48206 0.36658L6.9154 4.71325C7.35706 5.06658 7.58206 5.53325 7.58206 5.99991Z" fill="${textColor}" fill-opacity="0.9"/>
</svg>
`;

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const { data } = await getRecentComities();
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
          জনপ্রিয় ক্যাটাগরি
        </Text>
        <Button
          style={mainStyle.moreButton}
          title={"আরও দেখুন"}
          Icon={() => <SvgXml xml={icon} />}
        />
      </View>
      {comities.map((comity, index) => (
        <Fragment key={comity.id}>
          <FavoriteCategoryCart index={0} comity={comity} />
          {index + 1 < comities.length && <View style={{ height: 24 }} />}
        </Fragment>
      ))}
    </View>
  );
}
export const FavoriteCategoryCart = ({ comity }) => {
  return (
    <View
      style={{
        marginHorizontal: 20,
        marginBottom: 0,
      }}
    >
      <Image
        style={{
          height: 400,
          borderRadius: 21,
          width: width - 40,
        }}
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/220px-Image_created_with_a_mobile_phone.png",
        }}
      />
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          justifyContent: "flex-end",
          paddingHorizontal: 22,
          paddingVertical: 32,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "500",
            color: "#fff",
          }}
        >
          {comity.name}
        </Text>
      </View>
    </View>
  );
};
