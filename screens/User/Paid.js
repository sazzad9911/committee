import React, { useEffect } from "react";
import { ScrollView, View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getPaidCollectionsByUser } from "../../apis/api";
import { get } from "../../apis/multipleApi";
import SubscriptionCard from "../../components/cart/SubscriptionCard";
import Avatar from "../../components/main/Avatar";
import FloatingButton from "../../components/main/FloatingButton";
import loader from "../../data/loader";
import { dateConverter, timeConverter } from "../../functions/action";
import { AppColors } from "../../functions/colors";
import mainStyle from "../../styles/mainStyle";

export default function Paid({ navigation,route }) {
  const isDark = useSelector((state) => state.isDark);
  const colors = new AppColors(isDark);
  const textColor = colors.getTextColor();
  const borderColor = colors.getBorderColor();
  const [isLoading, setIsLoading] = React.useState(true);
  const [collections, setCollections] = React.useState([]);
  const dispatch=useDispatch()
  const user = useSelector((state) => state.user);
  const {comityId}=route?.params;


  useEffect(() => {
    dispatch(loader.show())
    get(`/subs/get-subs-by-user/${comityId}`, user.token)
      .then((res) => {
        setCollections(res.data.subs.filter(sub => sub.collections[0].paid));
        dispatch(loader.hide())
      })
      .catch((err) => {
        dispatch(loader.hide())
        console.error(err.message);
      });
  }, []);


  return (
    <View style={{ flex: 1, backgroundColor: colors.getBackgroundColor() }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ height: 6 }} />
        {collections.map((collection, index) => (
          <SubscriptionCard
            textColor={textColor}
            borderColor={borderColor}
            isDark={isDark}
            title={collection.name}
            key={collection.id}
            onPress={() => {
              navigation?.navigate("UserSubscriptionDetails", { data: collection });
            }}
          />
        ))}
        <View style={{ height: 70 }} />
      </ScrollView>
    </View>
  );
}

const CollectionCart = ({ collection, textColor, borderColor, isDark }) => {
  const user = useSelector((state) => state.user);
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
            {user.user.name}
          </Text>
          <Text style={[mainStyle.smallText, { color: borderColor }]}>
            {dateConverter(collection.createdAt)}
          </Text>
        </View>
      </View>
      <View>
        <Text
          numberOfLines={1}
          style={[mainStyle.mediumText, { color: textColor }]}
        >
          {collection.amount} ৳
        </Text>
        <Text style={[mainStyle.smallText, { color: "#6971FF" }]}>Paid</Text>
      </View>
    </View>
  );
};
