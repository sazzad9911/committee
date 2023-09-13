import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { AppColors } from "../../functions/colors";
import { AppValues } from "../../functions/values";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { getAllCollectionsByMember } from "../../apis/api";
const Tab = createMaterialTopTabNavigator();
import loader from "../../data/loader";
import NoOption from "../../components/main/NoOption";
import CollectionCart from "../../components/cart/CollectionCart";

export default function MemberSubDetails({ navigation, route }) {
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);

  const values = new AppValues(isBn);
  const headlines = values.getValues();
  const colors = new AppColors(isDark);
  const textColor = colors.getTextColor();
  const borderColor = colors.getBorderColor();
  const { subscriptionId, memberId } = route?.params;
  const [paidList, setPaidList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetch = async () => {
      try {
        dispatch(loader.show());
        const { data } = await getAllCollectionsByMember(
          subscriptionId,
          memberId
        );
        setPaidList(data.collections);
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(loader.hide());
      }
    };
    fetch();
  }, []);

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
                navigation?.navigate("DeleteMemberCollection", { data: doc });
              }}
              title={doc.name}
            />
          ))}
        {paidList?.length == 0 && <NoOption title={"No collection found"} />}
        <View style={{ height: 6 }} />
      </ScrollView>
    </View>
  );
}
