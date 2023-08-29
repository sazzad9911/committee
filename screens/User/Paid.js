import React, { useEffect } from "react";
import { ScrollView, View, Text } from "react-native";
import { useSelector } from "react-redux";
import { getPaidCollectionsByUser } from "../../apis/api";
import SubscriptionCard from "../../components/cart/SubscriptionCard";
import Avatar from "../../components/main/Avatar";
import FloatingButton from "../../components/main/FloatingButton";
import { AppColors } from "../../functions/colors";
import mainStyle from "../../styles/mainStyle";

export default function Paid({ navigation }) {
  const isDark = useSelector((state) => state.isDark);
  const colors = new AppColors(isDark);
  const [isLoading, setIsLoading] = React.useState(true);
  const [collections, setCollections] = React.useState([]);

  const fetchCollections = async () => {
    try {
      const { data } = getPaidCollectionsByUser();
      setCollections(data.collections);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  if (isLoading) {
    return <></>;
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.getBackgroundColor() }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ height: 6 }} />
        <SubscriptionCard
          onPress={() => {
            navigation?.navigate("SubscriptionDetails");
          }}
          title={"হজুরের বেতন"}
        />
        <View style={{ height: 70 }} />
      </ScrollView>
    </View>
  );
}

const CollectionCart = ({ textColor, borderColor, isDark }) => {
  return (
    <View
      style={[
        mainStyle.flexBox,
        {
          padding: 12,
          marginVertical: 6,
          marginHorizontal: 20,
          backgroundColor: isDark ? "#000" : "#fff",
          borderRadius: 8,
        },
      ]}
    >
      <View style={[mainStyle.flexBox]}>
        <Avatar
          source={{
            uri: "https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg",
          }}
        />
        <View style={{ marginLeft: 12, width: 150 }}>
          <Text
            numberOfLines={1}
            style={[mainStyle.mediumText, { color: textColor }]}
          >
            Easin Arafat
          </Text>
          <Text style={[mainStyle.smallText, { color: borderColor }]}>
            11/12/2024
          </Text>
        </View>
      </View>
      <View>
        <Text
          numberOfLines={1}
          style={[mainStyle.mediumText, { color: textColor }]}
        >
          5000000 ৳
        </Text>
        <Text style={[mainStyle.smallText, { color: "#6971FF" }]}>Paid</Text>
      </View>
    </View>
  );
};
