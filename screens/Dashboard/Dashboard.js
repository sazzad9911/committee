import React, { useEffect, useRef, useState } from "react";
import { Animated, SafeAreaView, ScrollView, Text, View } from "react-native";
import Collection from "./Collection";
import Expenses from "./Expenses";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TabBarLayout from "../../layouts/TabBarLayout";
import { useSelector } from "react-redux";
import { MotiView } from "moti";
import mainStyle from "../../styles/mainStyle";
import { AppColors } from "../../functions/colors";
import { AppValues } from "../../functions/values";
import AllCollections from "./AllCollections";
import AllExpenses from "./AllExpenses";
const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

export default function Dashboard() {
  const [activeIndex, setActiveIndex] = useState();
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);

  const values = new AppValues(isBn);
  const headlines = values.getDashboardHeadlines();
  const colors = new AppColors(isDark);
  const textColor = colors.getTextColor();
  const borderColor = colors.getBorderColor();
  
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
            />
          }
          {...props}
        />
      )}>
      <Tab.Screen name={headlines._collection} component={Collection} />
      <Tab.Screen name={headlines._expenses} component={Expenses} />
    </Tab.Navigator>
  );
  
}

const Header = ({ textColor, borderColor, headlines }) => {
  const newDate = new Date();
  const day = newDate.getDay();
  const month = newDate.getMonth();
  const year = newDate.getFullYear();
  const scrollValue = useSelector((state) => state.scrollValue);

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
      }}>
      <Text
        style={{
          fontSize: 16,
          color: borderColor,
        }}>
        {headlines?._currentBalance}
      </Text>
      <Text
        style={{
          fontSize: 40,
          fontWeight: "800",
          color: textColor,
        }}>
        500000
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: borderColor,
        }}>
        1 June 2023
      </Text>
    </MotiView>
  );
};
