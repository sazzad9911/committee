import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import { get } from "../../apis/multipleApi";
import SubscriptionCard from "../../components/cart/SubscriptionCard";
import FloatingButton from "../../components/main/FloatingButton";
import NoOption from "../../components/main/NoOption";
import { AppColors } from "../../functions/colors";

export default function Paid({ navigation }) {
  const [paidList, setPaidList] = useState([]);
  const isDark = useSelector((state) => state.isDark);
  const colors = new AppColors(isDark);
  const isFocused = useIsFocused();
  const { comity, user } = useSelector((state) => state);
  useEffect(() => {
    const fetch = async () => {
      const res = await get(`/subs/get-all-subs/${comity.id}`, user.token);
      //console.log(res.data.subs);
      setPaidList(res.data.subs?.filter((sub) => sub.completed));
    };
    fetch();
  }, [isFocused]);
  return (
    <View style={{ flex: 1, backgroundColor: colors.getBackgroundColor() }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ height: 6 }} />
        {paidList &&
          paidList.map((doc, i) => (
            <SubscriptionCard
              data={doc}
              key={i}
              index={i + 1}
              onPress={() => {
                navigation?.navigate("SubscriptionDetails", { data: doc });
              }}
              title={doc.name}
            />
          ))}
        {paidList?.length == 0 && (
          <NoOption
            title={"No subscription list has been created"}
            subTitle={"Create a subscription by clicking the Add button"}
          />
        )}
        <View style={{ height: 6 }} />
      </ScrollView>
    </View>
  );
}
