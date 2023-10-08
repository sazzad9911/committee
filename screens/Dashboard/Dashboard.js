import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import Collection from "./Collection";
import Expenses from "./Expenses";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TabBarLayout from "../../layouts/TabBarLayout";
import { useDispatch, useSelector } from "react-redux";
import mainStyle from "../../styles/mainStyle";
import { AppColors } from "../../functions/colors";
import { AppValues } from "../../functions/values";
import AllCollections from "./AllCollections";
import AllExpenses from "./AllExpenses";
import { useIsFocused } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { get, socket } from "../../apis/multipleApi";
import { setExpenseDateSort } from "../../data/expenseDateSort";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

export default function Dashboard({ navigation }) {
  const [activeIndex, setActiveIndex] = useState();
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);
  const comity = useSelector((state) => state.comity);
  const d = new Date().toISOString().split("-");
  const values = new AppValues(isBn);
  const headlines = values.getDashboardHeadlines();
  const colors = new AppColors(isDark);
  const textColor = colors.getTextColor();
  const borderColor = colors.getBorderColor();
  const expenseDateSort = useSelector((state) => state.expenseDateSort);
  const dispatch = useDispatch();
  //console.log(comity);
  useEffect(() => {
    dispatch(setExpenseDateSort(new Date(`${d[0]}-${d[1]}-01`)));
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
              onPress={(index) => {
                navigation.navigate(
                  index === 0 ? "DashboardNotification" : "DateShort"
                );
              }}
              headlines={headlines}
              borderColor={borderColor}
              textColor={textColor}
              {...props}
              sortDate={expenseDateSort}
            />
          }
          {...props}
        />
      )}
    >
      <Tab.Screen name={headlines._collection} component={Collection} />
      <Tab.Screen name={headlines._expenses} component={Expenses} />
    </Tab.Navigator>
  );
}

const Header = ({
  textColor,
  borderColor,
  headlines,
  onPress,
  state,
  navigation,
  sortDate,
}) => {
  const newDate = new Date();
  const day = newDate.getDay();
  const month = newDate.getMonth();
  const year = newDate.getFullYear();
  const scrollValue = useSelector((state) => state.scrollValue);
  const comity = useSelector((state) => state.comity);
  const user = useSelector((state) => state.user);
  const isBn = useSelector((state) => state.isBn);
  const isFocused = useIsFocused();
  const [balance, setBalance] = useState(comity?.balance || 0);
  const [expense, setExpense] = useState(comity?.expense || 0);

  const inset = useSafeAreaInsets();
  const [number, setNumber] = useState(0);

  const fetchData = async () => {
    try {
      const { data } = await get(
        `/comity/get-balance/${comity.id}`,
        user.token
      );
      setBalance(data.balance?.balance);
      setExpense(data.totalExpense);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCount = async () => {
    try {
      const { data } = await get(
        `/notification/comity/get-unread-count/${comity.id}`,
        user.token
      );
      setNumber(data.count);
      //console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCount();
  }, [isFocused]);
  useEffect(() => {
    socket.on("newNotification", (e) => {
      fetchCount();
    });
  }, []);
  const icon = `<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M23.7286 17.7823C23.0348 16.6792 22.0033 13.5579 22.0033 9.48117C22.0033 7.03291 20.9496 4.68493 19.0739 2.95375C17.1982 1.22257 14.6542 0.25 12.0016 0.25C9.34898 0.25 6.805 1.22257 4.92931 2.95375C3.05362 4.68493 1.99987 7.03291 1.99987 9.48117C1.99987 13.559 0.967195 16.6792 0.273325 17.7823C0.0961323 18.0627 0.00219589 18.3814 0.000988353 18.706C-0.000219185 19.0306 0.0913451 19.3498 0.266447 19.6314C0.441549 19.913 0.693997 20.1469 0.998332 20.3097C1.30267 20.4725 1.64813 20.5583 1.99987 20.5586H7.10201C7.33276 21.6007 7.94643 22.5373 8.83922 23.21C9.73201 23.8826 10.8491 24.25 12.0016 24.25C13.1541 24.25 14.2712 23.8826 15.164 23.21C16.0568 22.5373 16.6704 21.6007 16.9012 20.5586H22.0033C22.355 20.5581 22.7003 20.4721 23.0044 20.3093C23.3086 20.1464 23.5609 19.9124 23.7358 19.6309C23.9108 19.3494 24.0022 19.0303 24.001 18.7057C23.9997 18.3812 23.9058 18.0627 23.7286 17.7823ZM12.0016 22.4048C11.3813 22.4046 10.7762 22.227 10.2698 21.8964C9.76336 21.5657 9.38039 21.0984 9.17361 20.5586H14.8296C14.6228 21.0984 14.2398 21.5657 13.7334 21.8964C13.227 22.227 12.6219 22.4046 12.0016 22.4048Z" fill="white"/>
  </svg>
  `;
  const set = `<svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M21 4.5H15M5 4.5H1M21 15.5H17M7 15.5H1M9 8C9.45963 8 9.91475 7.90947 10.3394 7.73358C10.764 7.55769 11.1499 7.29988 11.4749 6.97487C11.7999 6.64987 12.0577 6.26403 12.2336 5.83939C12.4095 5.41475 12.5 4.95963 12.5 4.5C12.5 4.04037 12.4095 3.58525 12.2336 3.16061C12.0577 2.73597 11.7999 2.35013 11.4749 2.02513C11.1499 1.70012 10.764 1.44231 10.3394 1.26642C9.91475 1.09053 9.45963 1 9 1C8.07174 1 7.1815 1.36875 6.52513 2.02513C5.86875 2.6815 5.5 3.57174 5.5 4.5C5.5 5.42826 5.86875 6.3185 6.52513 6.97487C7.1815 7.63125 8.07174 8 9 8ZM13 19C13.9283 19 14.8185 18.6313 15.4749 17.9749C16.1313 17.3185 16.5 16.4283 16.5 15.5C16.5 14.5717 16.1313 13.6815 15.4749 13.0251C14.8185 12.3687 13.9283 12 13 12C12.0717 12 11.1815 12.3687 10.5251 13.0251C9.86875 13.6815 9.5 14.5717 9.5 15.5C9.5 16.4283 9.86875 17.3185 10.5251 17.9749C11.1815 18.6313 12.0717 19 13 19Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingTop: inset?.top,
        width: Dimensions.get("window").width,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          color: "#B0B0B0",
        }}
      >
        {state.index == 0
          ? headlines?._currentBalance
          : headlines?._totalBalance}
      </Text>
      <Text
        style={{
          fontSize: 40,
          fontWeight: "800",
          color: "#fff",
        }}
      >
        {state.index == 0 ? balance : expense}
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: "#fff",
        }}
      >
        {state.index == 0
          ? new Date().toDateString()
          : sortDate
          ? sortDate.toDateString()
          : new Date(comity?.createdAt).toDateString()}{" "}
        {!isBn ? "to Today" : "থেকে আজ পর্যন্ত"}
      </Text>

      <Pressable
        onPress={() => {
          onPress(state?.index);
        }}
        style={{
          position: "absolute",
          top: 10,
          right: 20,
        }}
      >
        <SvgXml xml={state?.index === 0 ? icon : set} />
        {state?.index === 0 && number ? (
          <View
            style={{
              backgroundColor: "#4ADE80",
              width: 12,
              height: 12,
              borderRadius: 6,
              position: "absolute",
              right: 0,
              top: -5,
            }}
          />
        ) : null}
      </Pressable>
    </View>
  );
};
