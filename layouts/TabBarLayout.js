import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  View,
  Animated,
  TouchableOpacity,
  Text,
  Pressable,
  Dimensions,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { AppColors } from "../functions/colors";
import { AppValues } from "../functions/values";
const { width, height } = Dimensions.get("window");

export default function TabBarLayout({
  header,
  state,
  navigation,
  position,
  descriptors,
  BackGround,
  style,
  color,
  counter
}) {
  //const isFocused = state.index === index;
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);
  const colors = new AppColors(isDark);
  const values = new AppValues(isBn);
  const textColor = colors.getTextColor();
  const borderColor = colors.getBorderColor();
  const [translateValue] = useState(new Animated.Value(0));
  const ac = ["#1488CC", "#2B32B2"];
  const backgroundColor = colors.getBackgroundColor();
  const dc = [backgroundColor, backgroundColor];
  const inset=useSafeAreaInsets()

  const press = (v) => {
    Animated.spring(translateValue, {
      toValue: v * (width / state?.routes?.length),
      velocity: 10,
      useNativeDriver: true,
    }).start();
  };
  React.useEffect(() => {
    //console.log(props.state.index);

    //setRoute(state.index);
    press(state?.index);
    //press(state.index);
  }, [state?.index]);

  return (
    <LinearGradient
      // Button Linear Gradient
      style={[
        {
          
          justifyContent: "center",
          alignItems: "center",
          paddingTop:inset?.top,
          borderColor: borderColor,
        },
        style,
      ]}
      start={{ x: 0.2, y: 0 }}
      colors={!color?(isDark?["#000","#000"]:ac):color}>
      {header}
      <View
        style={{
          flexDirection: "row",
        }}>
        <View style={[StyleSheet.absoluteFillObject]}>
          <Animated.View
            style={{
              width: width / 2,
              transform: [{ translateX: translateValue }],
              marginTop: 43,
            }}>
            <Animated.View
              style={[
                {
                  width: width / 2 - 40,
                  height: 2,
                  marginHorizontal: 20,
                  backgroundColor:isDark?(state.index===0?"#6971FF":"#F00"): "#fff",
                },
              ]}
            />
          </Animated.View>
        </View>
        {state.routes.map((route, index) => (
          <Pressable key={index}
            onPress={() => {
              navigation.navigate({ name: route.name, merge: true });
            }}
            style={{
              flex: 1,
              justifyContent: "center",

              alignItems: "center",
              height: 45,
            }}>
            <Text
              style={{ color: state.index == index ?isDark?(state.index===0?"#6971FF":"#F00"): "#fff" : "#ADADAD",fontSize:16 }}>
              {route?.name} {Array.isArray(counter)&&counter[index]}
            </Text>
          </Pressable>
        ))}
      </View>
    </LinearGradient>
  );
}
