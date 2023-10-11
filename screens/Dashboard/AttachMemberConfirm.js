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
            {isBn?"আপনি এই অ্যাকাউন্ট যোগ করতে চান কিনা তা নিশ্চিত করুন":"Confirm if you want to add this account"}
          </Text>

          <Button
            onPress={handelAttach}
            active={true}
            title={isBn?"নিশ্চিত করুন":"Confirm"}
            style={[mainStyle.mt24, { marginBottom: 32 }]}
          />
          <ReadMoreComponent
            textColor={colors.getTextColor()}
            title={isBn ? "গুরুত্বপূর্ণ মেসেজ" : "Important message"}
            message={
              isBn
                ? "অনুগ্রহ করে জানানো হচ্ছে যে 'নিশ্চিত করুন' বাটনে ক্লিক করে, আপনি এই অনলাইন ব্যবহারকারীকে অফলাইন ব্যবহারকারীর সাথে যুক্ত করবেন৷ এতে বোঝায় যে অফলাইন ব্যবহারকারীর সাথে সম্পর্কিত সমস্ত ডেটা, পেমেন্ট সংক্রান্ত সকল কিছু এই অনলাইন ব্যবহারকারীর অ্যাকাউন্টে স্থানান্তর করা হবে৷ একবার একত্রিত হয়ে গেলে, আপনি এই কাজটিকে আগের অবস্থায় ফিরিয়ে আনতে পারবেন না এবং এই অনলাইন ব্যবহারকারী অফলাইন ব্যবহারকারীর সমস্ত অর্থপ্রদানের তথ্যের অ্যাক্সেস লাভ করবে৷ অনুগ্রহ করে সতর্কতার সাথে এগিয়ে যান"
                : "Please be informed that by clicking the 'Confirm' button, you will merge this online user with the offline user. This action implies that all data associated with the offline user, including payments and collections, will be transferred to this online user's account. Once merged, you cannot undo this action. The online user will gain access to all payment information previously associated with the offline user. Please proceed with caution"
            }
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
