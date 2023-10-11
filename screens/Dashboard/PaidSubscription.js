import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { get } from "../../apis/multipleApi";
import CollectionCart from "../../components/cart/CollectionCart";
import SubscriptionCard from "../../components/cart/SubscriptionCard";
import FloatingButton from "../../components/main/FloatingButton";
import NoOption from "../../components/main/NoOption";
import loader from "../../data/loader";
import { AppColors } from "../../functions/colors";

export default function PaidSubscription({ navigation, route }) {
  const [paidList, setPaidList] = useState();
  const isDark = useSelector((state) => state.isDark);
  const colors = new AppColors(isDark);
  const isBn = useSelector((state) => state.isBn);
  const subscriptionId = route?.params?.subscriptionId;
  const data = route?.params?.data;
  const isFocused = useIsFocused();
  const { comity, user } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    !paidList&&dispatch(loader.show());
    get(`/subs/get-all-collections/${subscriptionId}`, user.token)
      .then((res) => {
        dispatch(loader.hide());
        setPaidList(res.data.collections?.filter((d) => d.paid));
      })
      .catch((e) => {
        dispatch(loader.hide());
        console.error(e.message);
      });
    //console.log(res.data.subs);
  }, [isFocused]);
  return (
    <View style={{ flex: 1, backgroundColor: colors.getBackgroundColor() }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ height: 6 }} />
        {paidList &&
          paidList.map((doc, i) => (
            <CollectionCart
              textColor={colors.getTextColor()}
              borderColor={colors.getBorderColor()}
              isDark={isDark}
              data={doc}
              key={i}
              onPress={() => {
                navigation?.navigate("DeleteMemberCollection", {
                  data: doc,
                  subscriptionId: subscriptionId,
                  paid: true,
                });
              }}
              title={doc.name}
            />
          ))}
        {paidList?.length == 0 && (
          <NoOption
            title={isBn?"কোন কালেকশন নেই":"No collection"}
           
          />
        )}
        <View style={{ height: 6 }} />
      </ScrollView>
      <FloatingButton
        onPress={() => {
          navigation.navigate("SelectMemberType", {
            data: data,
            subscription: data.id,
            paid: true,
          });
        }}
      />
    </View>
  );
}
