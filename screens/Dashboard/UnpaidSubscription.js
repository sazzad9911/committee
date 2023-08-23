import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import { get } from "../../apis/multipleApi";
import SubscriptionCard from "../../components/cart/SubscriptionCard";
import FloatingButton from "../../components/main/FloatingButton";
import NoOption from "../../components/main/NoOption";
import { AppColors } from "../../functions/colors";

export default function UnPaidSubscription({ navigation }) {
  const [paidList, setPaidList] = useState([]);
  const isDark = useSelector((state) => state.isDark);
  const colors = new AppColors(isDark);

  const { comity, user } = useSelector((state) => state);
  useEffect(() => {
    const fetch = async () => {
      const res = await get(`/subs/get-all-subs/${comity.id}`, user.token);
      //console.log(res.data.subs);
      //setPaidList(res.data.subs);
    };
    fetch();
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: colors.getBackgroundColor() }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ height: 6 }} />
        {paidList &&
          paidList.map((doc, i) => (
            <SubscriptionCard
              data={doc}
              key={i}
              onPress={() => {
                navigation?.navigate("SubscriptionDetails", { data: doc });
              }}
              title={doc.name}
            />
          ))}
        {paidList?.length == 0 && (
          <NoOption
            title={"No paid list has been created"}
            subTitle={"Create a paid by clicking the Add button"}
          />
        )}
        <View style={{ height: 6 }} />
      </ScrollView>
      
    </View>
  );
}
