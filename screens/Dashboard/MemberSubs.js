import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TabBarLayout from "../../layouts/TabBarLayout";
import { useSelector } from "react-redux";
import { AppValues } from "../../functions/values";
import Paid from "./Paid";
import UnPaid from "./Unpaid";
import PaidSubsMember from "./PaidSubMember";
import UnpaidSubsMember from "./UnpaidSubMember";
import { AppColors } from "../../functions/colors";
import { MotiView } from "moti";
import { Text } from "react-native";
import { getSummeryOfMembersCollections } from "../../apis/api";

const Tab = createMaterialTopTabNavigator();

export default function MemberSubs({ navigation, route }) {
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);
  const { userId, memberId } = route?.params;
  const values = new AppValues(isBn);
  const colors = new AppColors(isDark);
  const headlines = values.getValues();
  const textColor = colors.getTextColor();
  const borderColor = colors.getBorderColor();
  const [totalPaid, setTotalPaid] = React.useState(0);
  const [totalUnPaid, setTotalUnPaid] = React.useState(0);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getSummeryOfMembersCollections(memberId);
        setTotalPaid(data.totalPaid);
        setTotalUnPaid(data.totalUnpaid);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Tab.Navigator
      tabBar={(props) => (
        <TabBarLayout
          color={
            props.state.index == 1 && !isDark ? ["#E52D27", "#B31217"] : null
          }
          header={
            <Header
              headlines={headlines}
              borderColor={borderColor}
              textColor={textColor}
              totalPaid={totalPaid}
              totalUnPaid={totalUnPaid}
            />
          }
          {...props}
        />
      )}
    >
      <Tab.Screen
        name={headlines._paid}
        children={() => (
          <PaidSubsMember navigation={navigation} memberId={memberId} />
        )}
      />
      <Tab.Screen
        name={headlines._unPaid}
        children={() => (
          <UnpaidSubsMember navigation={navigation} memberId={memberId} />
        )}
      />
    </Tab.Navigator>
  );
}

const Header = ({
  textColor,
  borderColor,
  headlines,
  totalPaid,
  totalUnPaid,
}) => {
  const newDate = new Date();
  const day = newDate.getDay();
  const month = newDate.getMonth();
  const year = newDate.getFullYear();
  const scrollValue = useSelector((state) => state.scrollValue);
  const comity = useSelector((state) => state.comity);
  return (
    <MotiView
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
      animate={{
        height: 150 - scrollValue,
        overflow: "hidden",
      }}
      transition={{
        type: "timing",
      }}
    >
      <Text
        style={{
          fontSize: 16,
          color: "#B0B0B0",
        }}
      >
        Total Paid
      </Text>
      <Text
        style={{
          fontSize: 40,
          fontWeight: "800",
          color: "#fff",
        }}
      >
        {totalPaid || "0"}
      </Text>
    </MotiView>
  );
};
