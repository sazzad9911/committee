import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  Pressable,
  Text,
  Modal,
  Dimensions,
  TextInput,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/main/Input";
import { AppColors } from "../../functions/colors";
import mainStyle from "../../styles/mainStyle";
import Button from "../../components/main/Button";
import { SvgXml } from "react-native-svg";
import loader from "../../data/loader";
import { post } from "../../apis/multipleApi";
import DateTimePicker from "@react-native-community/datetimepicker";
import { deleteExpense, updateExpense } from "../../apis/api";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppValues } from "../../functions/values";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function EditExpenses({ navigation, route }) {
  const isDark = useSelector((state) => state.isDark);
  const colors = new AppColors(isDark);
  const { data } = route?.params;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [name, setName] = useState(data.name || "");
  const [amount, setAmount] = useState(data.amount ? `${data.amount}` : "");
  const [date, setDate] = useState(
    data.date ? new Date(data.date) : new Date()
  );
  const inset = useSafeAreaInsets();
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const textColor = colors.getTextColor();
  const isBn = useSelector((state) => state.isBn);
  const values = new AppValues(isBn);

  const dispatch = useDispatch();
  const { user, comity } = useSelector((state) => state);
  //console.log(new Date().toISOString());
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(date);
    hideDatePicker();
  };

  const calender = `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.75 4V6.25M18.25 4V6.25M4 19.75V8.5C4 7.90326 4.23705 7.33097 4.65901 6.90901C5.08097 6.48705 5.65326 6.25 6.25 6.25H19.75C20.3467 6.25 20.919 6.48705 21.341 6.90901C21.7629 7.33097 22 7.90326 22 8.5V19.75M4 19.75C4 20.3467 4.23705 20.919 4.65901 21.341C5.08097 21.7629 5.65326 22 6.25 22H19.75C20.3467 22 20.919 21.7629 21.341 21.341C21.7629 20.919 22 20.3467 22 19.75M4 19.75V12.25C4 11.6533 4.23705 11.081 4.65901 10.659C5.08097 10.2371 5.65326 10 6.25 10H19.75C20.3467 10 20.919 10.2371 21.341 10.659C21.7629 11.081 22 11.6533 22 12.25V19.75M13 13.75H13.008V13.758H13V13.75ZM13 16H13.008V16.008H13V16ZM13 18.25H13.008V18.258H13V18.25ZM10.75 16H10.758V16.008H10.75V16ZM10.75 18.25H10.758V18.258H10.75V18.25ZM8.5 16H8.508V16.008H8.5V16ZM8.5 18.25H8.508V18.258H8.5V18.25ZM15.25 13.75H15.258V13.758H15.25V13.75ZM15.25 16H15.258V16.008H15.25V16ZM15.25 18.25H15.258V18.258H15.25V18.25ZM17.5 13.75H17.508V13.758H17.5V13.75ZM17.5 16H17.508V16.008H17.5V16Z" stroke="${colors.getTextColor()}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

  const save = async () => {
    dispatch(loader.show());
    try {
      await updateExpense({
        name,
        amount,
        date: date.toISOString(),
        expenseId: data.id,
      });

      dispatch(loader.hide());
      navigation.goBack();
    } catch (e) {
      dispatch(loader.hide());
      console.log(e?.response?.data?.msg);
    }
  };

  const handelDelete = async () => {
    try {
      dispatch(loader.show());
      await deleteExpense(data.id);
      navigation.pop(2);
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
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <ScrollView style={mainStyle.pdH20} showsVerticalScrollIndicator={false}>
        <Pressable
          onPress={async () => {
            navigation.navigate("DeleteConfirmation", {
              title: isBn
                ? "খরচটি মুছে ফেলতে নিশ্চিত করুন"
                : "Confirm to delete this expense",
              rmTitle: isBn
                ? "গুরুত্বপূর্ণ নির্দেশাবলী"
                : "Important Instructions",
              rmMessage: isBn
                ? "আপনি যখন একটি খরচ মুছে ফেলবেন, অনুগ্রহ করে মনে রাখবেন যে পরিমাণটি আপনার কমিটির মূল ব্যালেন্সে আবার যোগ করা হবে। এটি নিশ্চিত করে যে আপনার আর্থিক রেকর্ডগুলি সঠিক থাকে এবং আপনার কমিটির প্রকৃত আর্থিক অবস্থা প্রতিফলিত করে।"
                : "When you delete an expense, please remember that the amount will be added back to your comity main balance. This ensures that your financial records stay accurate and reflect the true financial status of your comity.",

              onPress: () => handelDelete(),
            });
          }}
          style={{
            position: "absolute",
            right: 20,
            top: 0,
          }}
        >
          <SvgXml xml={deleteIcon} />
        </Pressable>
        <Input
          value={name}
          onChange={setName}
          outSideStyle={mainStyle.mt24}
          level={isBn ? "খরচের নাম *" : "Name of expense *"}
          placeholder={
            isBn
              ? "উদাহরণ: বেতন, বিল, রক্ষণাবেক্ষণ"
              : "example: salary, bill, maintaining "
          }
        />
        <Input
          value={amount}
          onChange={setAmount}
          outSideStyle={mainStyle.mt12}
          keyboardType={"numeric"}
          placeholder={isBn ? "০০.০০" : "0.00"}
          level={isBn ? "পরিমানের লক্ষ *" : "amount *"}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "400",
            color: textColor,
            paddingVertical: 16,
          }}
        >
          {isBn ? "তারিখ *" : "Date *"}
        </Text>
        {/* <Pressable onPress={showDatepicker}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              marginVertical: 5,
              borderRadius: 4,
              minHeight: 45,
              paddingHorizontal: 10,
              backgroundColor: isDark ? "rgba(255, 255, 255, 0.2)" : "#ffff",
            }}
          >
            <Text
              style={{
                color: textColor,
              }}
            >
              {date?.toDateString()}
            </Text>
          </View>
        </Pressable> */}

        <Pressable onPress={showDatePicker}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              marginVertical: 5,
              borderRadius: 4,
              minHeight: 45,
              paddingHorizontal: 10,
              backgroundColor: isDark ? "rgba(255, 255, 255, 0.2)" : "#ffff",
            }}
          >
            <SvgXml xml={calender} />
            <Text
              style={{
                color: textColor,
                marginLeft: 5,
              }}
            >
              {date?.toDateString()}
            </Text>
          </View>
        </Pressable>
      </ScrollView>

      <Button
        onPress={save}
        disabled={name && amount && date ? false : true}
        active={name && amount && date ? true : false}
        style={{
          position: "absolute",
          marginHorizontal: 20,
          bottom: 32,
          width: Dimensions.get("window").width - 40,
        }}
        title={isBn ? "নিশ্চিত করুন" : "Confirm"}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </KeyboardAvoidingView>
  );
}

const deleteIcon = `<svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 1H12L10.8571 0H5.14286L4 1H0V3H16M1.14286 16C1.14286 16.5304 1.38367 17.0391 1.81233 17.4142C2.24098 17.7893 2.82236 18 3.42857 18H12.5714C13.1776 18 13.759 17.7893 14.1877 17.4142C14.6163 17.0391 14.8571 16.5304 14.8571 16V4H1.14286V16Z" fill="white"/>
</svg>
`;
