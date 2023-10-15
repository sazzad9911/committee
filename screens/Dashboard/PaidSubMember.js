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

export default function PaidSubsMember({ navigation,route }) {
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);
  const colors = new AppColors(isDark);
  const [paidList, setPaidList] = useState();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const {memberId}=route?.params;

//console.log(memberId);
  const comity  = useSelector((state) => state.comity);
  useEffect(() => {
    const fetch = async () => {
      try {
        dispatch(loader.show());
        const { data } = await getPaidSubsByComityUser(comity.id, memberId);
        //console.log(data.subs);
        setPaidList(data.subs);
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(loader.hide());
      }
    };
    fetch();
  }, [isFocused,memberId,comity]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.getBackgroundColor() }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ height: 6 }} />
        {paidList &&
          paidList.map((doc, i) => (
            <SubscriptionCard
              data={doc}
              key={i}
              index={i+1}
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
          <NoOption title={isBn?"কোন কালেকশন নেই":"No collection"} />
        )}
        <View style={{ height: 6 }} />
      </ScrollView>
    </View>
  );
}
