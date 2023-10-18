import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { get } from "../../apis/multipleApi";
import SubscriptionCard from "../../components/cart/SubscriptionCard";
import FloatingButton from "../../components/main/FloatingButton";
import NoOption from "../../components/main/NoOption";
import loader from "../../data/loader";
import { AppColors } from "../../functions/colors";
import {
  getPaidSubsByComityUser,
  getUnpaidSubsByComityUser,
} from "../../apis/api";

export default function UnpaidSubsMember({ navigation, route }) {
  const isDark = useSelector((state) => state.isDark);
  const colors = new AppColors(isDark);
  const isBn = useSelector((state) => state.isBn);
  const [paidList, setPaidList] = useState();
  const {memberId}=route?.params;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { comity, user } = useSelector((state) => state);
  useEffect(() => {
    const fetch = async () => {
      try {
        dispatch(loader.show());
        const { data } = await getUnpaidSubsByComityUser(comity.id, memberId);
        setPaidList(data.subs);
       // console.log(data.subs);
        dispatch(loader.hide());
      } catch (error) {
        console.log(error);

        dispatch(loader.hide());
      } finally {
        
      }
    };
    fetch();
  }, [isFocused,memberId,comity]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.getBackgroundColor() }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ height: 6 }} />
        {
          paidList?.map((doc, i) => (
            <SubscriptionCard
              data={doc}
              key={i}
              index={i+1}
              onPress={() => {
                navigation.navigate("MemberSubDetails", {
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
