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
import { Pressable, Text, View } from "react-native";
import { getSummeryOfMembersCollections } from "../../apis/api";
import { SvgXml } from "react-native-svg";

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
              index={props?.state?.index}
              {...props}
            />
          }
          {...props}
        />
      )}>
      <Tab.Screen
        name={headlines._paid}
        component={PaidSubsMember}
        initialParams={{
          memberId: memberId,
        }}
        // children={() => (
        //   <PaidSubsMember navigation={navigation} memberId={memberId} />
        // )}
      />
      <Tab.Screen
        name={headlines._unPaid}
        component={UnpaidSubsMember}
        initialParams={{
          memberId: memberId,
        }}
        // children={() => (
        //   <UnpaidSubsMember navigation={navigation} memberId={memberId} />
        // )}
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
  index,
  navigation
}) => {
  const newDate = new Date();
  const day = newDate.getDay();
  const month = newDate.getMonth();
  const year = newDate.getFullYear();
  const isBn = useSelector((state) => state.isBn);
  const comity = useSelector((state) => state.comity);
  const back = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15 19.5L7.5 12L15 4.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;
  return (
    <View style={{width:"100%"}}>
      <Pressable onPress={()=>{
        navigation.goBack()
      }} style={{
        marginTop:20,
        marginLeft:20
      }}>
        <SvgXml xml={back} />
      </Pressable>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Text
          style={{
            fontSize: 16,
            color: "#B0B0B0",
          }}>
          {isBn
            ? index == 0
              ? "সর্বমোট পরিশোধ"
              : "সর্বমোট অপরিশোধ"
            : index == 0
            ? "Total Paid"
            : "Total Unpaid"}
        </Text>
        <Text
          style={{
            fontSize: 40,
            fontWeight: "800",
            color: "#fff",
          }}>
          {index == 0 ? totalPaid || "0" : totalUnPaid || "0"}
        </Text>
      </View>
    </View>
  );
};
