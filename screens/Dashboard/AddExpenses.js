import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  Pressable,
  Text,
  Modal,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/main/Input";
import { AppColors } from "../../functions/colors";
import mainStyle from "../../styles/mainStyle";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Button from "../../components/main/Button";
import { SvgXml } from "react-native-svg";
import loader from "../../data/loader";
import { post } from "../../apis/multipleApi";

export default function AddExpenses({navigation}) {
  const isDark = useSelector((state) => state.isDark);
  const colors = new AppColors(isDark);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [name, setName] = useState();
  const [amount, setAmount] = useState();
  const [date, setDate] = useState();
  const dispatch = useDispatch();
  const {user,comity} = useSelector((state) => state);
  //console.log(new Date().toISOString());
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
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
      await post(
        "/comity/expense/create",
        {
          name,
          amount,
          date:date.toISOString(),
          comityId:comity.id
        },
        user.token
      )
      dispatch(loader.hide());
      navigation.goBack()
    } catch (e) {
        dispatch(loader.hide());
      console.log(e.message);
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.getBackgroundColor() }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}>
      <ScrollView style={mainStyle.pdH20} showsVerticalScrollIndicator={false}>
        <Input
          value={name}
          onChange={setName}
          outSideStyle={mainStyle.mt24}
          level={"Name of expense *"}
          placeholder={"example: salary, bill, maintaining "}
        />
        <Input
          value={amount}
          onChange={setAmount}
          outSideStyle={mainStyle.mt12}
          keyboardType={"numeric"}
          placeholder={"0.00"}
          level={"amount *"}
        />
        <Input
          value={date?.toDateString()}
          leftIcon={<SvgXml xml={calender} />}
          editable={false}
          onPress={showDatePicker}
          outSideStyle={mainStyle.mt12}
          keyboardType={"numeric"}
          placeholder={"yyyy/mm/dd"}
          level={"Date *"}
        />
      </ScrollView>
      <Modal
        transparent={true}
        visible={isDatePickerVisible}
        onRequestClose={hideDatePicker}>
        <DateTimePickerModal
          isVisible={true}
          mode={"date"}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </Modal>
      <Button onPress={save}
        disabled={name && amount && date ? false : true}
        active={name && amount && date ? true : false}
        style={{
          position: "absolute",
          marginHorizontal: 20,
          bottom: 32,
          width: Dimensions.get("window").width - 40,
        }}
        title={"Confirm"}
      />
    </KeyboardAvoidingView>
  );
}
