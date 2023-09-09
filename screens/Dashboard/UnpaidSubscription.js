import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import { get } from "../../apis/multipleApi";
import CollectionCart from "../../components/cart/CollectionCart";
import SubscriptionCard from "../../components/cart/SubscriptionCard";
import FloatingButton from "../../components/main/FloatingButton";
import NoOption from "../../components/main/NoOption";
import { AppColors } from "../../functions/colors";

export default function UnPaidSubscription({ navigation, route }) {
  const [paidList, setPaidList] = useState([]);
  const isDark = useSelector((state) => state.isDark);
  const colors = new AppColors(isDark);
  const subscriptionId = route?.params?.subscriptionId;
  const data=route?.params?.data;
  const { comity, user } = useSelector((state) => state);
  const isFocused=useIsFocused()

  useEffect(() => {
    const fetch = async () => {
      const res = await get(
        `/subs/get-all-collections/${subscriptionId}`,
        user.token
      );
      setPaidList(res.data.collections?.filter((d) => !d.paid));
    };
    fetch();
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
               
                navigation?.navigate("DeleteMemberCollection", { data: doc,subscriptionId:subscriptionId,paid:false  });
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
      <FloatingButton
        onPress={() => {
          navigation.navigate("SelectMemberType", {
            data: data,
            subscription: data.id,
            paid:false
          });
        }}
      />
    </View>
  );
}
