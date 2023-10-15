import React, { useEffect } from "react";
import { View, Text, Dimensions } from "react-native";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
const { width, height } = Dimensions.get("window");
import { AntDesign } from "@expo/vector-icons";
import { AppColors } from "../../functions/colors";

export default function ToastComponent() {
  const toast = useSelector((state) => state.toast);
  const isDark = useSelector((state) => state.isDark);
  const textColor = new AppColors(isDark).getSchemeColor();
  const dispatch = useDispatch();
  

  if (toast) {
    return (
      <Animated.View
        entering={FadeInDown}
        exiting={FadeOutDown}
        style={{
          position: "absolute",
          width: width,
          bottom: 30,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 100,
        }}>
        <View
          style={{
            backgroundColor: isDark ? "#161616" : "#161616",
            borderRadius: 5,
            paddingHorizontal: 10,
            paddingVertical: 12,
            flexDirection: "row",
            alignItems: "center",
            opacity:isDark?1:.6
          }}>
          {toast.type!="success"&&(<AntDesign
            name={
              toast.type == "error"
                ? "closecircle"
                : toast.type == "success"
                ? "checkcircle"
                : "infocirlce"
            }
            size={24}
            color={
              toast.type == "error"
                ? "red"
                : toast.type == "success"
                ? "green"
                : textColor
            }
          />)}
          <Text
            style={{
              color: "#fff",
              fontWeight: "500",
              fontSize: 16,
              marginLeft: 10,
            }}>
            {toast.message}
          </Text>
        </View>
      </Animated.View>
    );
  } else {
    return null;
  }
}
