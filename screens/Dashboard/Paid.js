import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import { get } from "../../apis/multipleApi";
import SubscriptionCard from "../../components/cart/SubscriptionCard";
import FloatingButton from "../../components/main/FloatingButton";

export default function Paid({ navigation }) {
  const [paidList, setPaidList] = useState();

  const { comity, user } = useSelector((state) => state);
  useEffect(() => {
    const fetch = async () => {
      const res = await get(`/subs/get-all-subs/${comity.id}`, user.token);
      //console.log(res.data.subs);
      setPaidList(res.data.subs);
    };
    fetch();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ height: 6 }} />
        {paidList &&
          paidList.map((doc, i) => (
            <SubscriptionCard data={doc} key={i}
              onPress={() => {
                navigation?.navigate("SubscriptionDetails",{data:doc});
              }}
              title={doc.name}
            />
          ))}
        <View style={{ height: 70 }} />
      </ScrollView>
      <FloatingButton
        onPress={() => {
          navigation.navigate("AddSubscription");
        }}
      />
    </View>
  );
}
