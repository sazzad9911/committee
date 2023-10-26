import React, { useState } from "react";
import { Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/main/Button";
import { AppColors } from "../../functions/colors";
import { AppValues } from "../../functions/values";
import mainStyle from "../../styles/mainStyle";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { setExpenseDateSort } from "../../data/expenseDateSort";
import ReadMoreComponent from "../../components/ReadMoreComponent";

export default function DateShort({ navigation, route }) {
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);
  const colors = new AppColors(isDark);
  const values = new AppValues(isDark);
  const backgroundColor = colors.getBackgroundColor();
  const textColor = colors.getTextColor();
  const primaryColor = colors.getMainColor();
  const headlines = values.getDashboardHeadlines();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const d = new Date().toISOString().split("-");
  const expenseDateSort = useSelector((state) => state.expenseDateSort);
  const [date, setDate] = useState(new Date(`${d[0]}-${d[1]}-01`));
  const [selectAll, setSelectAll] = useState(expenseDateSort ? false : true);
  const icon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4.75 1V3.25M15.25 1V3.25M1 16.75V5.5C1 4.90326 1.23705 4.33097 1.65901 3.90901C2.08097 3.48705 2.65326 3.25 3.25 3.25H16.75C17.3467 3.25 17.919 3.48705 18.341 3.90901C18.7629 4.33097 19 4.90326 19 5.5V16.75M1 16.75C1 17.3467 1.23705 17.919 1.65901 18.341C2.08097 18.7629 2.65326 19 3.25 19H16.75C17.3467 19 17.919 18.7629 18.341 18.341C18.7629 17.919 19 17.3467 19 16.75M1 16.75V9.25C1 8.65326 1.23705 8.08097 1.65901 7.65901C2.08097 7.23705 2.65326 7 3.25 7H16.75C17.3467 7 17.919 7.23705 18.341 7.65901C18.7629 8.08097 19 8.65326 19 9.25V16.75M10 10.75H10.008V10.758H10V10.75ZM10 13H10.008V13.008H10V13ZM10 15.25H10.008V15.258H10V15.25ZM7.75 13H7.758V13.008H7.75V13ZM7.75 15.25H7.758V15.258H7.75V15.25ZM5.5 13H5.508V13.008H5.5V13ZM5.5 15.25H5.508V15.258H5.5V15.25ZM12.25 10.75H12.258V10.758H12.25V10.75ZM12.25 13H12.258V13.008H12.25V13ZM12.25 15.25H12.258V15.258H12.25V15.25ZM14.5 10.75H14.508V10.758H14.5V10.75ZM14.5 13H14.508V13.008H14.5V13Z" stroke="${textColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;
  const dispatch = useDispatch();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(date);
    setSelectAll(false);
    hideDatePicker();
  };
  return (
    <View
      style={{
        paddingHorizontal: 20,
        backgroundColor: colors.getBackgroundColor(),
        flex: 1,
      }}
    >
      <Button
        onPress={() => {
          setSelectAll(true);
        }}
        style={[
          {
            justifyContent: "flex-start",
          },
          mainStyle.mt32,
        ]}
        LeftIcon={() => (
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: textColor,
              backgroundColor: selectAll ? "#2B32B2" : undefined,
            }}
          />
        )}
        title={isBn ? "সকল খরচ" : "All Expenses"}
      />

      <Text style={[mainStyle.mt12, { fontSize: 16, color: textColor }]}>
        {isBn
          ? "অথবা যেদিন থেকে খরচ দেখতে চান সেইদিনের তারিখ সেট করুন"
          : "Or set the date from which you want to view expenses"}
      </Text>
      <Button
        onPress={showDatePicker}
        style={[
          {
            justifyContent: "flex-start",
          },
          mainStyle.mt12,
        ]}
        LeftIcon={() => (
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: textColor,
                backgroundColor: !selectAll ? "#2B32B2" : undefined,
                marginRight: 10,
              }}
            />
            <SvgXml xml={icon} />
          </View>
        )}
        title={date?.toLocaleDateString()}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Button
        active={true}
        onPress={() => {
          dispatch(setExpenseDateSort(selectAll ? null : date));
          navigation.goBack();
        }}
        style={mainStyle.mt32}
        title={isBn ? "নিশ্চিত করুন" : "Confirm"}
      />
      <ReadMoreComponent
        textColor={colors.getTextColor()}
        title={isBn ? "গুরুত্বপূর্ণ নির্দেশাবলী" : "Important Instructions"}
        message={
          isBn
            ? "আপনি যদি আপনার কমিটির সকল খরচ শুরু থেকে শেষ পর্যন্ত সর্বদা দেখতে চান তাহলে উপরের সকল খরচ বাটনে ক্লিক করে নিশ্চিত করুন অথবা আপনি যদি প্রতি মাসের একটি নির্দিষ্ট তারিখ থেকে আপনার কমিটির খরচ দেখতে চান তাহলে নিচের তারিখের ঘরে ক্লিক করে একটি তারিখ পছন্দ করে নিশ্চিত করুন বাটনে ক্লিক করুন৷ মনে রাখবেন আপনি যেই তারিখটি নির্বাচন করে রাখবেন প্রতি মাসে স্বয়ংক্রিয়ভাবে সেই তারিখ থেকে বর্তমান দিন পর্যন্ত আপনার কাছে আপনার খরচ প্রদর্শিত হবে৷"
            : "If you want to see all of your comity expenses from start to finish then confirm by clicking on the all expense button above or if you want to see your comity expenses from a specific date each month then click on the date box below and choose a date and click on the confirm button . Note that whatever date you select, your expenses will automatically be shown to you every month from that date to the current day."
        }
      />
    </View>
  );
}
