import React, { useState } from "react";
import { ScrollView, View, Text, Dimensions } from "react-native";
import { SvgXml } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/main/Button";
import { AppColors } from "../../functions/colors";
import { AppValues } from "../../functions/values";
import mainStyle from "../../styles/mainStyle";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import toast from "../../data/toast";
import ReadMoreComponent from "../../components/ReadMoreComponent";
const { width, height } = Dimensions.get("window");

export default function SelectDate({ navigation, route }) {
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);
  const comity = useSelector((state) => state.comity);
  const user = useSelector((state) => state.user);
  const colors = new AppColors(isDark);
  const values = new AppValues(isBn);
  const headlines = values.getValues();
  const { choose, setChoose, type } = route.params;
  const [from, setFrom] = useState(false);
  const [to, setTo] = useState(false);
  const [fromDate, setFromDate] = useState(choose?choose[0]:undefined);
  const [toDate, setToDate] = useState(choose?choose[1]:undefined);
  const dispatch = useDispatch();
  const icon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4.75 1V3.25M15.25 1V3.25M1 16.75V5.5C1 4.90326 1.23705 4.33097 1.65901 3.90901C2.08097 3.48705 2.65326 3.25 3.25 3.25H16.75C17.3467 3.25 17.919 3.48705 18.341 3.90901C18.7629 4.33097 19 4.90326 19 5.5V16.75M1 16.75C1 17.3467 1.23705 17.919 1.65901 18.341C2.08097 18.7629 2.65326 19 3.25 19H16.75C17.3467 19 17.919 18.7629 18.341 18.341C18.7629 17.919 19 17.3467 19 16.75M1 16.75V9.25C1 8.65326 1.23705 8.08097 1.65901 7.65901C2.08097 7.23705 2.65326 7 3.25 7H16.75C17.3467 7 17.919 7.23705 18.341 7.65901C18.7629 8.08097 19 8.65326 19 9.25V16.75M10 10.75H10.008V10.758H10V10.75ZM10 13H10.008V13.008H10V13ZM10 15.25H10.008V15.258H10V15.25ZM7.75 13H7.758V13.008H7.75V13ZM7.75 15.25H7.758V15.258H7.75V15.25ZM5.5 13H5.508V13.008H5.5V13ZM5.5 15.25H5.508V15.258H5.5V15.25ZM12.25 10.75H12.258V10.758H12.25V10.75ZM12.25 13H12.258V13.008H12.25V13ZM12.25 15.25H12.258V15.258H12.25V15.25ZM14.5 10.75H14.508V10.758H14.5V10.75ZM14.5 13H14.508V13.008H14.5V13Z" stroke="${colors.getBorderColor()}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;
  const BnText = `আপনার ${type==="Expense"?"খরচ":"কালেকশন"} চেক করার জন্য সময়কাল নির্দিষ্ট করতে আপনি দুটি তারিখ নির্বাচন করতে পারেন৷ আপনি যে তারিখের মধ্যে আপনার খরচ রিভিউ করতে চান তা নির্ধারণ করতে শুরুর তারিখ এবং শেষের তারিখ বেছে নিন`;
  const EnText = `You can select two dates to specify the time period for checking your collection. Choose the start date and end date to define the range within which you wish to review your ${type}`;

  return (
    <ScrollView
      style={{
        backgroundColor: colors.getBackgroundColor(),
      }}>
      <View
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          },
          mainStyle.mt24,
          mainStyle.mH20,
        ]}>
        <Button
          onPress={() => setFrom(true)}
          style={{ width: width / 2 - 40, justifyContent: "space-between" }}
          Icon={() => <SvgXml xml={icon} />}
          title={fromDate ? fromDate.toLocaleDateString() : "dd/mm/yyyy"}
        />
        <Text style={[mainStyle.subLevel, { marginHorizontal: 10 }]}>
          {isBn ? "থেকে" : "To"}
        </Text>
        <Button
          onPress={() => setTo(true)}
          style={{ width: width / 2 - 40, justifyContent: "space-between" }}
          Icon={() => <SvgXml xml={icon} />}
          title={toDate ? toDate.toLocaleDateString() : "dd/mm/yyyy"}
        />
      </View>
      <DateTimePickerModal
        isVisible={from}
        mode="date"
        onConfirm={(date) => {
          setFromDate(date);
          setFrom(false);
        }}
        onCancel={() => setFrom(false)}
      />
      <DateTimePickerModal
        isVisible={to}
        mode="date"
        onConfirm={(date) => {
          setTo(false);

          if (!fromDate) {
            return dispatch(toast.error("Starting date invalid"));
          }
          if (fromDate > date) {
            return dispatch(toast.error("Starting date must be smaller"));
          }
          setToDate(date);
        }}
        onCancel={() => setTo(false)}
      />
      <Button onPress={()=>{
        setChoose([fromDate,toDate])
        navigation?.goBack()
      }}
        active={fromDate && toDate ? true : false}
        disabled={fromDate && toDate ? false : true}
        style={[mainStyle.mt32, mainStyle.mH20]}
        title={headlines._ok}
      />
      <View style={mainStyle.mH20}>
        <ReadMoreComponent message={isBn?BnText:EnText}  />
      </View>
    </ScrollView>
  );
}
