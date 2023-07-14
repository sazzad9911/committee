import React from "react";
import { ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setIsBn } from "../../data/isBn";
import { AppColors } from "../../functions/colors";
import { AppValues } from "../../functions/values";
import mainStyle from "../../styles/mainStyle";
import { Clickable } from "./ProfileScreen";

export default function LanguageScreen() {
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);
  const colors = new AppColors(isDark);
  const values = new AppValues(isBn);
  const signUpCartTitles = values.getSignUpCartTitles();
  const backgroundColor = colors.getBackgroundColor();
  const textColor = colors.getTextColor();
  const subTextColor = colors.getSubTextColor();
  const borderColor = colors.getBorderColor();
  const textPrimaryColor=colors.getTextPrimaryColor()
  const dispatch = useDispatch();

  return (
    <ScrollView style={{ backgroundColor: backgroundColor }}>
      <View style={mainStyle.pdH20}>
        <View
          style={{
            borderColor: borderColor,
            borderWidth: 1,
            borderRadius: 8,
            marginLeft: 0,
            marginTop: 12,
            marginBottom: 32,
          }}>
          <Clickable active={isBn?true:false}
            subTextColor={subTextColor}
            border={borderColor}
            activeColor={"#2B32B2"}
            color={textColor}
            onPress={() => dispatch(setIsBn(true))}
            title={"বাংলা"}
          />
          <Clickable active={isBn?false:true}
            bottom={true}
            activeColor={"#2B32B2"}
            subTextColor={subTextColor}
            border={borderColor}
            color={textColor}
            onPress={() => dispatch(setIsBn(false))}
            title={"English"}
          />
        </View>
      </View>
    </ScrollView>
  );
}
