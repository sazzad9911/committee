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
import { getPaidSubsByComityUser } from "../../apis/api";

export default function PaidSubsMember({ navigation, memberId }) {
  const isDark = useSelector((state) => state.isDark);
  const colors = new AppColors(isDark);
  const [paidList, setPaidList] = useState([]);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { comity, user } = useSelector((state) => state);
  useEffect(() => {
    const fetch = async () => {
      try {
        dispatch(loader.show());
        const { data } = await getPaidSubsByComityUser(comity.id, memberId);
        setPaidList(data.subs);
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(loader.hide());
      }
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
              onPress={() => {
                navigation?.navigate("MemberSubDetails", {
                  subscriptionId: doc.id,
                  memberId,
                });
              }}
              title={doc.name}
            />
          ))}
        {paidList?.length == 0 && (
          <NoOption title={"No subscription list found"} />
        )}
        <View style={{ height: 6 }} />
      </ScrollView>
    </View>
  );
}
