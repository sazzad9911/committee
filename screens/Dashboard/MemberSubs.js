import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TabBarLayout from "../../layouts/TabBarLayout";
import { useSelector } from "react-redux";
import { AppValues } from "../../functions/values";
import Paid from "./Paid";
import UnPaid from "./Unpaid";
import PaidSubsMember from "./PaidSubMember";
import UnpaidSubsMember from "./UnpaidSubMember";

const Tab = createMaterialTopTabNavigator();

export default function MemberSubs({ navigation, route }) {
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);
  const userId = route?.params?.userId;
  const values = new AppValues(isBn);
  const headlines = values.getValues();

  return (
    <Tab.Navigator
      tabBar={(props) => (
        <TabBarLayout
          color={
            props.state.index == 1 && !isDark ? ["#E52D27", "#B31217"] : null
          }
          header={<></>}
          {...props}
        />
      )}
    >
      <Tab.Screen
        name={headlines._paid}
        children={() => (
          <PaidSubsMember navigation={navigation} userId={userId} />
        )}
      />
      <Tab.Screen
        name={headlines._unPaid}
        children={() => (
          <UnpaidSubsMember navigation={navigation} userId={userId} />
        )}
      />
    </Tab.Navigator>
  );
}
