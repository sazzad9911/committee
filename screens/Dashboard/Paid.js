import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { get } from "../../apis/multipleApi";
import SubscriptionCard from "../../components/cart/SubscriptionCard";
import FloatingButton from "../../components/main/FloatingButton";
import NoOption from "../../components/main/NoOption";
import loader from "../../data/loader";
import { AppColors } from "../../functions/colors";

export default function Paid({ navigation }) {
  const [paidList, setPaidList] = useState([]);
  const isDark = useSelector((state) => state.isDark);
  const colors = new AppColors(isDark);
  const isFocused = useIsFocused();
  const user = useSelector((state) => state.user);
  const comity = useSelector((state) => state.comity);
  const dispatch=useDispatch()
  useEffect(() => {
    !paidList&&dispatch(loader.show());
    get(`/subs/get-all-subs/${comity.id}`, user.token)
      .then((res) => {
        dispatch(loader.hide());
        setPaidList(res.data.subs?.filter((sub) => sub.completed));
      })
      .catch((err) => {
        dispatch(loader.hide());
      });
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
