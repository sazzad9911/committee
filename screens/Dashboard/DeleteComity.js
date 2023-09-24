import React, { useState } from "react";
import {
  View,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/main/Button";
import Input from "../../components/main/Input";
import ReadMoreComponent from "../../components/ReadMoreComponent";
import { AppColors } from "../../functions/colors";
import mainStyle from "../../styles/mainStyle";
import loader from "../../data/loader";
import { deleteComity } from "../../apis/api";

export default function DeleteComity({ navigation }) {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const isDark = useSelector((state) => state.isDark);
  const colors = new AppColors(isDark);
  const isBn = useSelector((state) => state.isBn);
  const comity = useSelector((state) => state.comity);

  const handelDelete = async () => {
    try {
      dispatch(loader.show());
      await deleteComity({
        password: password,
        comityId: comity?.id,
      });
      navigation.navigate("ComityDeleteSuccess");
    } catch (error) {
      console.log(error);
      Alert.alert(error?.response?.data?.msg);
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "500",
              color: colors.getTextColor(),
              flex: 1,
              paddingVertical: 20,
            }}
          >
            {isBn
              ? "আপনার অ্যাকাউন্ট এর পাসওয়ার্ড টি প্রবেশ করিয়ে নিশ্চিত করুন"
              : "Enter your account password and confirm"}
          </Text>
          <Input
            type="password"
            value={password}
            onChange={setPassword}
            containerStyle={mainStyle.mt24}
            placeholder={"Password"}
          />

          <Button
            onPress={handelDelete}
            disabled={password ? false : true}
            active={password ? true : false}
            title={"Confirm"}
            style={[mainStyle.mt24, { marginBottom: 32 }]}
          />
          <ReadMoreComponent
            textColor={colors.getTextColor()}
            title={isBn ? "গুরুত্বপূর্ণ মেসেজ" : "Important message"}
            message={
              isBn
                ? "আপনি যখন 'নিশ্চিত করুন' বোতামে ক্লিক করেন, আপনার কমিটি অ্যাকাউন্ট এবং সমস্ত সংশ্লিষ্ট ডেটা স্থায়ীভাবে মুছে যাবে এবং এই ক্রিয়াটি পূর্বাবস্থায় ফেরানো যাবে না।ডিলিট নিশ্চিত করতে দয়া করে আপনার পাসওয়ার্ড লিখুন"
                : "When you click the 'Confirm' button, your comity account and all associated data will be permanently deleted, and this action cannot be undone. Please enter your password to confirm the deletion."
            }
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
