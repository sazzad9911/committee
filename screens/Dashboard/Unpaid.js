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

export default function UnPaid({ navigation }) {
  const isDark = useSelector((state) => state.isDark);
  const colors = new AppColors(isDark);
  const [paidList, setPaidList] = useState([]);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const user = useSelector((state) => state.user);
  const comity = useSelector((state) => state.comity);

  useEffect(() => {
    dispatch(loader.show());
    get(`/subs/get-all-subs/${comity.id}`, user.token)
      .then((res) => {
        setPaidList(res.data.subs?.filter((sub) => !sub.completed));
        dispatch(loader.hide());
      })
      .catch((err) => {
        dispatch(loader.hide());
      });
    //console.log(res.data.subs);
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
            title={"No payment is collected from any member"}
            subTitle={"Collect payment by clicking on add button"}
          />
        )}
        <View style={{ height: 6 }} />
      </ScrollView>
    </View>
  );
}
