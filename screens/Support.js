import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { newSupport } from "../apis/api";
import Button from "../components/main/Button";
import Input from "../components/main/Input";
import InputButton from "../components/main/InputButton";
import TextArea from "../components/main/TextArea";
import { AppColors } from "../functions/colors";
import { AppValues } from "../functions/values";
import BottomShitLayout from "../layouts/BottomShitLayout";
import mainStyle from "../styles/mainStyle";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import SheetCard from "../components/cart/SheetCard";
import toast from "../data/toast";
import loader from "../data/loader";

export default function Support({navigation}) {
  const [message, setMessage] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);
  const colors = new AppColors(isDark);
  const values = new AppValues(isBn);
  const headlines = values.getValues();
  const [index, setIndex] = useState(-1);
  const dispatch = useDispatch();
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["60%"], []);
  const [choose, setChoose] = useState();
  const handleSheetChanges = useCallback((index) => {
    setIndex && setIndex(index);
  }, []);

  const bs = [
    "কমিটির জন্য রিপোর্ট",
    "সাধারণ অ্যাকাউন্টের সমস্যা",
    "কমিটির অ্যাকাউন্ট সমস্যা",
    "অ্যাকাউন্ট মুছে ফেলুন",
  ];
  const en = [
    "Report for a Comity",
    "Normal account Issues",
    "Comity account issues",
    "Delete Account",
  ];

  const reset = () => {
    setSubject("");
    setMessage("");
  };

  const handelSubmit = async () => {
    if (!subject || !message) {
      
      dispatch(toast.info("Please fill all the fields!"))
      return;
    }
    try {
      dispatch(loader.show());
      await newSupport({
        subject,
        message,
      });
      navigation.navigate("ContactSuccess");
      reset();
    } catch (error) {
      console.log(error);
      dispatch(toast.error(error.response.data.msg));
    } finally {
      dispatch(loader.hide());
    }
  };

  const Options = ({ value, onChoose, setSubject }) => (
    <View style={[{ flex: 1, marginBottom: 32 }, mainStyle.pdH20]}>
      <Text style={[{ textAlign: "center" }, mainStyle.mediumText]}>
        {headlines._select}
      </Text>
      <View style={[mainStyle.mt12]}>
        {isBn
          ? bs.map((d, i) => <Cart key={i} title={d} />)
          : en.map((d, i) => (
              <SheetCard
                select={d === value ? true : false}
                title={d}
                key={i}
                onPress={() => {
                  onChoose(d);
                  setSubject(d);
                }}
              />
            ))}
      </View>
    </View>
  );
  const Cart = ({ title }) => (
    <View
      style={{
        paddingVertical: 16,
        borderBottomColor: colors.getShadowColor(),
        borderBottomWidth: 1,
      }}>
      <Text style={[mainStyle.subLevel, { color: colors.getTextColor() }]}>
        {title}
      </Text>
    </View>
  );
  // return (
  //   <BottomShitLayout
  //     scrollable={true}
  //     component={<Options />}
  //     setIndex={setIndex}
  //     index={index}
  //     screen={<Screen />}
  //   />
  // );
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.getBackgroundColor() }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}>
      <Screen
        headlines={headlines}
        setSubject={setSubject}
        message={message}
        setMessage={setMessage}
        handelSubmit={handelSubmit}
        setIndex={setIndex}
        subject={subject}
        isBn={isBn}
        backgroundColor={colors.getBackgroundColor()}
        onBack={()=>navigation.goBack()}
      />
      {index != -1 && (
        <View
          style={{
            flex: 1,
            position: "absolute",
            backgroundColor: colors.getSchemeColor(),
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
            opacity: 0.1,
          }}></View>
      )}
      <BottomSheet
        handleIndicatorStyle={{ backgroundColor: colors.getBorderColor() }}
        ref={bottomSheetRef}
        index={index}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: colors.getSchemeColor() }}
        onChange={handleSheetChanges}>
        <BottomSheetScrollView
          contentContainerStyle={{
            backgroundColor: colors.getSchemeColor(),
          }}
          style={{ flex: 1 }}>
          <Options
            onChoose={setChoose}
            setSubject={setSubject}
            value={choose}
          />
        </BottomSheetScrollView>

        <Button
          onPress={() => {
            bottomSheetRef.current?.close();
          }}
          style={{
            marginHorizontal: 20,
            marginBottom: 20,
          }}
          active={true}
          title={headlines._ok}
        />
      </BottomSheet>
    </KeyboardAvoidingView>
  );
}
const Screen = ({
  headlines,
  subject,
  setSubject,
  setIndex,
  message,
  setMessage,
  handelSubmit,
  isBn,
  onBack,
  backgroundColor
}) => (
  <ScrollView showsVerticalScrollIndicator={false}>
    <View style={[mainStyle.pdH20]}>
      <View
        style={[
          mainStyle.flexBox,
          {
            paddingHorizontal: 8,
            paddingVertical: 16,
            borderRadius: 4,
            backgroundColor: "#6971FF",
          },
          mainStyle.mt12,
        ]}>
        <Text style={[mainStyle.subLevel, { color: "#fff" }]}>
          {headlines._supportCaution}
        </Text>
      </View>
      <InputButton
        value={subject}
        onChange={setSubject}
        placeholder={isBn ? "বিষয় নির্বাচন করুন" : "Choose subject"}
        editable={false}
        onPress={() => setIndex(0)}
        level={headlines._subject}
        outSideStyle={mainStyle.mt12}
      />
      <TextArea
        style={{
          height: 200,
          paddingVertical:12
        }}
        value={message}
        onChange={setMessage}
        outSideStyle={mainStyle.mt12}
        placeholder={headlines.write}
        level={headlines._details}
      />
      <View style={[mainStyle.flexBox, mainStyle.mt12]}>
        <Button active={true} bg={[backgroundColor,backgroundColor]}  onPress={onBack}
          style={{ width: Dimensions.get("window").width / 2 - 30,borderWidth:1 }}
          title={headlines._canncel}
        />
        <Button
          onPress={handelSubmit}
          active={subject&&message?true:false}
          disabled={subject&&message?false:true}
          style={{ width: Dimensions.get("window").width / 2 - 30 }}
          title={headlines._send}
        />
      </View>
      <View style={mainStyle.mt32} />
    </View>
  </ScrollView>
);
