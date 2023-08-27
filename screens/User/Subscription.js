import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";
import { FavoriteCategoryCart } from "../../components/cart/FavoriteCategory";
import { PopularCategoryCart } from "../../components/cart/PopularCategory";
import Input from "../../components/main/Input";
import { AppColors } from "../../functions/colors";
import { AppValues } from "../../functions/values";
import HidableHeaderLayout from "../../layouts/HidableHeaderLayout";
import UserSubscriptionRoute from "../../routes/UserSubscriptionRoute";
import mainStyle from "../../styles/mainStyle";
import SubscriptionList from "./SubscriptionList";

const { width, height } = Dimensions.get("window");
export default function Subscription() {
  return <UserSubscriptionRoute />;
}
export function ComityList({ navigation }) {
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);
  const colors = new AppColors(isDark);
  const values = new AppValues(isBn);
  const backgroundColor = colors.getBackgroundColor();
  const textColor = colors.getTextColor();
  return <SubscriptionList />;
}
