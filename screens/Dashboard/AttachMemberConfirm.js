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
import { attachMember, deleteComity } from "../../apis/api";

export default function AttachMemberConfirm({ navigation, route }) {
  const { onlineMemberId, offlineMemberId } = route?.params;
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const isDark = useSelector((state) => state.isDark);
  const colors = new AppColors(isDark);
  const isBn = useSelector((state) => state.isBn);
  const comity = useSelector((state) => state.comity);

  const handelAttach = async () => {
    console.log(onlineMemberId, offlineMemberId);
    try {
      dispatch(loader.show());
      await attachMember({
        onlineMemberId,
        offlineMemberId,
      });
      navigation.navigate("Member");
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
            Confirm if you want to add this account
          </Text>

          <Button
            onPress={handelAttach}
            active={true}
            title={"Confirm"}
            style={[mainStyle.mt24, { marginBottom: 32 }]}
          />
          <ReadMoreComponent
            textColor={colors.getTextColor()}
            title={isBn ? "গুরুত্বপূর্ণ মেসেজ" : "Important message"}
            message={
              isBn
                ? "যদি সমাজ একাউন্ট এ কাওকে একবার যোগ করা হয় তাহলে সমাজ ব্যাবহার কারির সকল তথ্য কমিটির কাছে চলেআসবে ।এবং কমিটি চাইলে সেটা এডিট করে সংশোধন অ করতে পারবে ইউজার এর সকল কিছু , কিন্তু সে তথ্য গুলি ইউজার এর সাইডে যোগ হবে না, ইউজার কে একবার আলাদা করে আবার যদি এড করা হয় তাহলে সকল তথ্য পুনরায় নতুন করে যোগ হবে কমিটির ওইখানে এবং আবার যদি কমিটি চায় তাহলে সেটা এডিট করে নিতে পারবে"
                : "Please be informed that by clicking the 'Confirm' button, you will merge this online user with the offline user. This action implies that all data associated with the offline user, including payments and collections, will be transferred to this online user's account. Once merged, you cannot undo this action. The merged user will gain access to all payment information previously associated with the offline user. Please proceed with caution."
            }
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
