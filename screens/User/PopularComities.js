import React, { useEffect } from "react";
import { ScrollView, Text, View, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { AppColors } from "../../functions/colors";
import { AppValues } from "../../functions/values";
import PopularCategory from "../../components/cart/PopularCategory";
import { getPopularComities } from "../../apis/api";
import { ComityCart } from "../../components/cart/ComityCart";

export default function PopularComities() {
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);
  const colors = new AppColors(isDark);
  const values = new AppValues(isBn);
  const backgroundColor = colors.getBackgroundColor();
  const textColor = colors.getTextColor();
  const [popularComities, setPopularComities] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getPopularComities();
        setPopularComities(data.comities);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <ScrollView style={{ backgroundColor: backgroundColor }}>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          paddingHorizontal: 10,
          paddingBottom: 64,
        }}
      >
        {popularComities.map((item) => (
          <ComityCart
            onPress={() => {
              navigation.navigate("ComityProfile", {
                comityId: item.id,
              });
            }}
            comity={item}
            containerStyle={{
              marginHorizontal: 10,
              marginBottom: 10,
              marginTop: 10,
            }}
            style={{
              width: Dimensions.get("window").width / 2 - 30,
              height: 210,
              paddingHorizontal: 10,
              paddingVertical: 15,
              marginBottom: 10,
              fontSize: 16,
            }}
          />
        ))}
      </View>
    </ScrollView>
  );
}
