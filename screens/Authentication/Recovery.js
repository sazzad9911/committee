import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Text,
  Image,
  Alert,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../components/main/Button";
import Input from "../../components/main/Input";
import { AppColors } from "../../functions/colors";
import { sendRecoverOtp } from "../../apis/api";
import loader from "../../data/loader";
import toast from "../../data/toast";
import isBn from "../../data/isBn";

export default function Recovery({ navigation, route }) {
  const [number, setNumber] = useState();
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.isDark);
  const colors = new AppColors(isDark);
  const textColor = colors.getTextColor();

  const sendOtp = async () => {
    try {
      dispatch(loader.show());
      await sendRecoverOtp({ phone: number });

      dispatch(toast.success("OTP sent successfully!"));
      navigation?.navigate("Otp", { number: number, reset: true });
    } catch (error) {
      console.log(error);
      dispatch(toast.error(error?.response?.data?.msg));
    } finally {
      dispatch(loader.hide());
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.getBackgroundColor() }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingHorizontal: 20,
          }}
        >
          {/* <Image width={"100%"} style={[signUpStyle.mt28,{
            height:253,
            width:"100%"
          }]} source={photo}   /> */}
          <Text
            style={[
              signUpStyle.headLine,
              signUpStyle.mt44,
              { color: textColor },
            ]}
          >
            {isBn ? "আপনার ফোন নাম্বার লিখুন" : "Enter Your Phone Number"}
          </Text>
          <Text
            style={[signUpStyle.mt8, signUpStyle.text, { color: textColor }]}
          >
            {isBn
              ? "আপনার গোপনীয়তা আমাদের কাছে গুরুত্বপূর্ণ৷ নিশ্চিন্ত থাকুন, আপনার নম্বরটি শুধুমাত্র যাচাইকরণের উদ্দেশ্যে ব্যবহার করা হবে৷"
              : "Your privacy is important to us. Rest assured, your number will onlybe used for verification purposes."}
          </Text>
          <Input
            error={error}
            keyboardType={"number-pad"}
            value={number}
            onChange={setNumber}
            //containerStyle={[signUpStyle.input, signUpStyle.mt18]}
            placeholder={"01*********"}
          />
        </View>
      </ScrollView>
      <Button
        active={number ? true : false}
        disabled={number ? false : true}
        onPress={() => {
          sendOtp();
        }}
        style={signUpStyle.button}
        title={isBn ? "পরবর্তি" : "Continue"}
      />
    </KeyboardAvoidingView>
  );
}

const signUpStyle = StyleSheet.create({
  mt28: {
    marginTop: 28,
  },
  mt8: {
    marginTop: 8,
  },
  mt44: {
    marginTop: 44,
  },
  mt18: {
    marginTop: 18,
  },
  input: {
    backgroundColor: "#F1F1F1",
    borderRadius: 4,
    borderBottomWidth: 0,
    marginHorizontal: 0,
    borderWidth: 0,
  },
  headLine: {
    fontSize: 24,
    fontWeight: "700",
  },
  text: {
    fontSize: 14,
    fontWeight: "400",
  },
  button: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
});
