import React, { useState } from "react";
import {
  View,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  Pressable,
  Dimensions,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/main/Button";
import Input from "../../components/main/Input";
import { AppColors } from "../../functions/colors";
import mainStyle from "../../styles/mainStyle";
import localStorage from "../../functions/localStorage";

export default function ComityDeleteSuccess({ navigation }) {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const isDark = useSelector((state) => state.isDark);
  const colors = new AppColors(isDark);
  const isBn = useSelector((state) => state.isBn);
  const comity = useSelector((state) => state.comity);
  const { width, height } = Dimensions.get("window");

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.getBackgroundColor() }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingHorizontal: 20,
            flex: 1,
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            height: height - 30,
          }}
        >
          <View style={{ flex: 1 }} />
          <View style={{ flex: 1, alignItems: "center" }}>
            <SvgXml xml={Done} />
            <Text
              style={{
                fontSize: 24,
                fontWeight: "500",
                color: colors.getTextColor(),
                paddingVertical: 20,
                textAlign: "center",
              }}
            >
              {isBn
                ? "কমিটির প্রোফাইলটি সফল ভাবে মুছে ফেলা হয়েছে"
                : "Comity profile has been successfully deleted"}
            </Text>
          </View>

          <Button
            onPress={() => {
              localStorage.comityLogOut();
              dispatch({ type: "SET_COMITY", value: null });
              navigation.navigate("Dashboard");
            }}
            active={true}
            style={[mainStyle.mt24]}
            title={"Sign out"}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const Done = `
<svg width="61" height="60" viewBox="0 0 61 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M28.925 0H32.0328C38.9187 0.426563 45.6922 3.13594 50.7359 7.88437C56.5203 13.1109 60.0359 20.6578 60.5 28.4297V31.5C60.0641 39.3047 56.5297 46.8797 50.7266 52.1297C45.6688 56.8312 38.9422 59.5687 32.0609 60H28.9953C21.2141 59.5594 13.6531 56.0297 8.40781 50.2547C3.66406 45.2203 0.940625 38.4609 0.5 31.5844V28.4484C0.940625 21.1125 4.03906 13.9266 9.32187 8.78438C14.4594 3.53437 21.6125 0.45 28.925 0ZM44.5531 17.7797C37.8406 23.9953 31.1562 30.2391 24.4672 36.4781C21.5844 33.4219 18.7625 30.3141 15.8422 27.2906C14.1687 25.5422 10.9813 25.9219 9.72969 27.9891C8.73125 29.4937 8.9375 31.65 10.2172 32.9297C14.825 37.8937 19.4703 42.825 24.0828 47.7891C32.2438 40.2234 40.3672 32.6203 48.5047 25.0266C49.5312 24.0234 50.8531 23.0953 51.1484 21.5906C51.6031 19.8328 50.6469 17.8641 49.0109 17.1C47.5672 16.3828 45.7156 16.6641 44.5531 17.7797Z" fill="#4ADE80"/>
</svg>

`;
