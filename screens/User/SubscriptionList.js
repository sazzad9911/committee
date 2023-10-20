import React, { useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TabBarLayout from "../../layouts/TabBarLayout";
import { useSelector } from "react-redux";
import { AppValues } from "../../functions/values";
import Paid from "./Paid";
import UnPaid from "./UnPaid";
import { AppColors } from "../../functions/colors";
import { View, Text, Pressable } from "react-native";
import mainStyle from "../../styles/mainStyle";
import { SvgXml } from "react-native-svg";
import Input from "../../components/main/Input";
import { get } from "../../apis/multipleApi";
import { useIsFocused } from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();

export default function SubscriptionList({ navigation, route }) {
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);
  const isFocused = useIsFocused();
  const user = useSelector((state) => state.user);

  const values = new AppValues(isBn);
  const colors = new AppColors(isDark);
  const headlines = values.getValues();
  const { comityId } = route?.params;
  const [paidCount, setPaidCount] = useState();
  const [unpaidCount, setUnpaidCount] = useState();

  useEffect(() => {
    get(`/subs/get-subs-by-user/${comityId}`, user.token).then((res) => {
      setPaidCount(
        res.data.subs.filter((sub) => sub.collections[0].paid).length
      );
      setUnpaidCount(
        res.data.subs.filter((sub) => !sub.collections[0].paid).length
      );
    });
  }, [isFocused]);

  return (
    <Tab.Navigator
      tabBar={(props) => (
        <TabBarLayout
          color={
            props.state.index == 1 && !isDark ? ["#E52D27", "#B31217"] : null
          }
          counter={[
            paidCount > 0
              ? `${paidCount > 9 ? paidCount : `0${paidCount}`}`
              : "",
            unpaidCount > 0
              ? `${unpaidCount > 9 ? unpaidCount : `0${unpaidCount}`}`
              : "",
          ]}
          header={
            <Header
              headlines={headlines}
              borderColor={colors.getBorderColor()}
              textColor={colors.getTextColor()}
              index={props.state.index}
              navigation={navigation}
              comityId={comityId}
            />
          }
          {...props}
        />
      )}
    >
      <Tab.Screen
        initialParams={{
          comityId: comityId,
        }}
        name={headlines._paid}
        component={Paid}
      />
      <Tab.Screen
        initialParams={{
          comityId: comityId,
        }}
        name={headlines._unPaid}
        component={UnPaid}
      />
    </Tab.Navigator>
  );
}
const Header = ({
  textColor,
  borderColor,
  headlines,
  index,
  comityId,
  navigation,
}) => {
  const newDate = new Date();
  const isDark = useSelector((state) => state.isDark);
  const day = newDate.getDay();
  const month = newDate.getMonth();
  const year = newDate.getFullYear();
  const scrollValue = useSelector((state) => state.scrollValue);
  const search = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.11036 0.0408841C5.04858 0.326439 2.23492 2.29256 0.900663 5.06853C-0.124611 7.19849 -0.279105 9.62805 0.460591 11.8563C1.92126 16.2473 6.44838 18.8033 10.9849 17.7968C12.1834 17.53 13.3631 17.001 14.3088 16.3035L14.6084 16.0835L16.4858 17.956C17.5157 18.9858 18.438 19.8659 18.527 19.9127C18.7376 20.0251 19.2432 20.0298 19.4399 19.9221C19.6225 19.8238 19.8238 19.6225 19.9221 19.4399C20.0298 19.2433 20.0251 18.7377 19.9127 18.5271C19.8659 18.4381 18.9858 17.5159 17.9558 16.4861L16.0832 14.6089L16.3032 14.3093C18.2367 11.6878 18.555 8.0692 17.1225 5.09662C15.4699 1.67464 11.9259 -0.31489 8.11036 0.0408841ZM10.395 2.18489C13.1618 2.77473 15.2498 4.8766 15.8444 7.66662C15.9661 8.23305 15.9661 9.8153 15.8444 10.3677C15.5401 11.7487 14.8987 12.9377 13.9156 13.9161C12.4596 15.3766 10.5869 16.0788 8.5083 15.943C5.7555 15.7698 3.33979 13.902 2.42219 11.2478C2.14597 10.4566 2.07107 9.97447 2.07575 9.00077C2.07575 8.26113 2.09448 8.03175 2.17875 7.63385C2.46901 6.2997 3.06357 5.17152 3.98585 4.21655C4.50551 3.67352 4.95963 3.31307 5.55419 2.97134C6.27516 2.55471 7.27703 2.2083 8.08695 2.09595C8.60661 2.02573 9.87533 2.07254 10.395 2.18489Z" fill="${textColor}" fill-opacity="${
    isDark ? 1 : 0.4
  }"/>
  <path d="M8.68607 3.05098C8.41922 3.1446 8.28814 3.24759 8.14301 3.46293C8.03065 3.63145 8.0166 3.70167 8.0166 4.01999C8.0166 4.34768 8.03065 4.39917 8.15705 4.58642C8.37709 4.89538 8.61117 5.00305 9.17764 5.04518C9.73944 5.092 9.98756 5.14349 10.4136 5.30265C11.3499 5.65374 12.1786 6.43083 12.5999 7.34835C12.8153 7.81179 12.8995 8.15352 12.9557 8.76677C13.0119 9.38469 13.1196 9.63279 13.4192 9.84345C13.6018 9.96984 13.6533 9.98389 14.0044 9.98389C14.3555 9.98389 14.4117 9.96984 14.5849 9.84813C14.8799 9.64684 15.0156 9.33319 15.0156 8.86507C15.0156 8.08331 14.7675 7.07684 14.393 6.33252C14.0933 5.72864 13.7703 5.28861 13.2413 4.75963C12.2488 3.76252 11.069 3.19141 9.66453 3.03693C9.08869 2.9714 8.90143 2.97608 8.68607 3.05098Z" fill="${textColor}" fill-opacity="${
    isDark ? 1 : 0.4
  }"/>
  </svg>  
  `;
  const ic = `<svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1.52179 11C1.3892 11 1.2566 10.9596 1.15193 10.8731C1.05459 10.7917 1 10.6819 1 10.5674C1 10.453 1.05459 10.3431 1.15193 10.2617L5.70198 6.50108C6.03695 6.22423 6.03695 5.77433 5.70198 5.49748L1.15193 1.73684C1.05459 1.65544 1 1.5456 1 1.43115C1 1.31669 1.05459 1.20686 1.15193 1.12545C1.35431 0.958183 1.68928 0.958183 1.89166 1.12545L6.44171 4.88608C6.79762 5.18024 7 5.57823 7 5.99928C7 6.42033 6.8046 6.81831 6.44171 7.11247L1.89166 10.8731C1.78698 10.9539 1.65439 11 1.52179 11Z" fill="#F6F6F6"/>
  <path d="M0.991541 11.0649L0.992658 11.0658C1.14848 11.1946 1.33984 11.25 1.52179 11.25C1.71073 11.25 1.8968 11.1849 2.04436 11.0711L2.04444 11.0712L2.05093 11.0658L6.59914 7.30668C6.59945 7.30643 6.59976 7.30618 6.60007 7.30592C7.01573 6.96858 7.25 6.5018 7.25 5.99928C7.25 5.49427 7.00668 5.0287 6.60098 4.69338L2.05093 0.93275C1.75611 0.689083 1.28747 0.689083 0.992658 0.93275L0.992655 0.932746L0.991541 0.933678C0.844379 1.05675 0.75 1.23402 0.75 1.43115C0.75 1.62827 0.844379 1.80554 0.991541 1.92862L0.991538 1.92862L0.992658 1.92954L5.54271 5.69018C5.65725 5.78484 5.70321 5.89781 5.70321 5.99928C5.70321 6.10075 5.65725 6.21371 5.54271 6.30838L0.992658 10.069L0.992655 10.069L0.991541 10.0699C0.84438 10.193 0.75 10.3703 0.75 10.5674C0.75 10.7645 0.844379 10.9418 0.991541 11.0649Z" stroke="black" stroke-opacity="0.6" stroke-width="0.5"/>
  </svg>
  `;

  return (
    <View
      style={{
        paddingHorizontal: 20,
        width: "100%",
      }}
      transition={{
        type: "timing",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={[
            {
              color: "#fff",
              fontSize: 24,
            },
            mainStyle.mt24,
          ]}
        >
          {index === 0 ? headlines._paid : headlines._unPaid}
        </Text>
        <Pressable
          onPress={() => {
            navigation.navigate("ComityProfile", { comityId: comityId });
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text
            style={{
              color: "#fff",
              marginRight: 10,
              fontWeight: "500",
              fontSize: 16,
            }}
          >
            {headlines._seeProfile}
          </Text>
          <SvgXml xml={ic} />
        </Pressable>
      </View>
      <Input
        leftIcon={<SvgXml xml={search} />}
        containerStyle={[
          {
            borderRadius: 30,
            minHeight: 40,
            borderWidth: 0,
          },
          mainStyle.mt12,
        ]}
        outSideStyle={{ marginVertical: 10 }}
        placeholder={headlines._nameDateTaka}
      />
    </View>
  );
};
