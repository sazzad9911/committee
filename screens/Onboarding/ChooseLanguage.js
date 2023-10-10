import React from "react";
import { ScrollView, View, Dimensions, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppColors } from "../../functions/colors";
import localStorage from "../../functions/localStorage";
import { AppValues } from "../../functions/values";
import mainStyle from "../../styles/mainStyle";
import Button from "../../components/main/Button";
import { setIsBn } from "../../data/isBn";
import { Clickable } from "../User/Profile";

export default function ChooseLanguage({ navigation }) {
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);
  const colors = new AppColors(isDark);
  const values = new AppValues(isBn);
  const backgroundColor = colors.getBackgroundColor();
  const textColor = colors.getTextColor();
  const subTextColor = colors.getSubTextColor();
  const borderColor = colors.getBorderColor();
  const textPrimaryColor = colors.getTextPrimaryColor();
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: backgroundColor }}>
        <View
          style={{ alignItems: "center", marginTop: 60, paddingVertical: 24 }}
        >
          <Text style={[mainStyle.text20, { color: colors.getTextColor() }]}>
            {isBn ? "ভাষা নির্বাচন করুন" : "Change language "}
          </Text>
        </View>
        <View style={mainStyle.pdH20}>
          <View
            style={{
              borderColor: borderColor,
              borderWidth: 1,
              borderRadius: 8,
              marginLeft: 0,
              marginTop: 12,
              marginBottom: 32,
            }}
          >
            <Clickable
              active={isBn ? true : false}
              subTextColor={subTextColor}
              border={borderColor}
              activeColor={"#2B32B2"}
              color={textColor}
              onPress={async () => {
                dispatch(setIsBn(true));
                await localStorage.setBn(true);
              }}
              title={"বাংলা"}
            />
            <Clickable
              active={isBn ? false : true}
              bottom={true}
              activeColor={"#2B32B2"}
              subTextColor={subTextColor}
              border={borderColor}
              color={textColor}
              onPress={async () => {
                dispatch(setIsBn(false));
                await localStorage.setBn(false);
              }}
              title={"English"}
            />
          </View>
        </View>
      </ScrollView>
      <Button
        onPress={() => {
          navigation.navigate("LoginOrRegister");
        }}
        active={true}
        style={{
          position: "absolute",
          width: Dimensions.get("window").width - 40,
          bottom: 32,
          marginHorizontal: 20,
        }}
        title={values.createCommitteeValues().next}
      />
    </View>
  );
}
