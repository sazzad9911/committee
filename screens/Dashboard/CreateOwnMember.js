import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { post } from "../../apis/multipleApi";
import Avatar from "../../components/main/Avatar";
import Button from "../../components/main/Button";
import Input from "../../components/main/Input";
import ProfilePicture, {
  pickImage,
} from "../../components/main/ProfilePicture";
import RadioButton from "../../components/main/RadioButton";
import TextArea from "../../components/main/TextArea";
import loader from "../../data/loader";
import toast from "../../data/toast";
import { AppColors } from "../../functions/colors";
import { AppValues } from "../../functions/values";
import mainStyle from "../../styles/mainStyle";

export default function CreateOwnMember({ navigation, route }) {
  const isDark = useSelector((state) => state.isDark);
  const { isBn, comity, user } = useSelector((state) => state);
  const colors = new AppColors(isDark);
  const values = new AppValues(isBn);
  const headlines = values.getValues();
  const data = route?.params?.data;
  const subscription = route?.params?.subscription;
  const [name, setName] = useState();
  const [explain, setExplain] = useState();
  const [position, setPosition] = useState();
  const [age, setAge] = useState();
  const [mobile, setMobile] = useState();
  const [email, setEmail] = useState();
  const [gender, setGender] = useState();
  const [address, setAddress] = useState();
  const [picture, setPicture] = useState();
  const dispatch = useDispatch();
  const paid = route?.params?.paid;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.getBackgroundColor() }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[{ flex: 1, paddingBottom: 32 }, mainStyle.pdH20]}>
          <View
            style={[
              mainStyle.flexBox,
              { justifyContent: "center" },
              mainStyle.mt24,
            ]}>
            <ProfilePicture
              edit={true}
              source={{
                uri: picture?.uri,
              }}
              onEdit={async () => {
                const res = await pickImage();
                setPicture(res);
              }}
            />
          </View>
          <Input
            value={name}
            onChange={setName}
            outSideStyle={mainStyle.mt24}
            level={headlines._name}
            optionalLevel={headlines._required}
            subLevel={headlines._max20}
            placeholder={headlines.write}
          />
          <Text
            style={[
              mainStyle.mt32,
              mainStyle.text20,
              { color: colors.getTextColor() },
            ]}>
            {headlines._geder}
          </Text>
          <View
            style={[
              mainStyle.flexBox,
              { paddingVertical: 5, justifyContent: "flex-start" },
            ]}>
            <RadioButton
              value={gender == "Male" ? true : false}
              title={headlines._male}
              onChange={() => setGender("Male")}
            />
            <RadioButton
              value={gender == "Female" ? true : false}
              style={mainStyle.ml16}
              title={headlines._female}
              onChange={() => setGender("Female")}
            />
            <RadioButton
              value={gender == "Other" ? true : false}
              style={mainStyle.ml16}
              title={headlines._other}
              onChange={() => setGender("Other")}
            />
          </View>
          <Input
            value={explain}
            onChange={setExplain}
            level={headlines._position}
            placeholder={headlines._positionPlaceholder}
            subLevel={headlines._max20}
            optionalLevel={headlines._required}
            outSideStyle={[mainStyle.mt24]}
          />

          <Text
            style={[
              mainStyle.mt32,
              mainStyle.text20,
              { color: colors.getTextColor() },
            ]}>
            {headlines._selectAmembershipPlan}
          </Text>
          <View
            style={[
              mainStyle.flexBox,
              { paddingVertical: 5, justifyContent: "flex-start" },
            ]}>
            <RadioButton
              value={position == "General" ? true : false}
              title={headlines._generalMember}
              onChange={() => setPosition("General")}
            />
            <RadioButton
              value={position == "Special" ? true : false}
              style={mainStyle.ml16}
              title={headlines._specialMember}
              onChange={() => setPosition("Special")}
            />
          </View>

          <Input
            keyboardType={"numeric"}
            value={age}
            onChange={setAge}
            outSideStyle={mainStyle.mt24}
            level={headlines._age}
            optionalLevel={headlines._notRequired}
            placeholder={headlines.write}
          />
          <Input
            keyboardType={"numeric"}
            value={mobile}
            onChange={setMobile}
            level={headlines._mobile}
            placeholder={headlines.write}
            subLevel={headlines._max11}
            optionalLevel={headlines._notRequired}
            outSideStyle={[mainStyle.mt24]}
          />
          <Input
            value={email}
            onChange={setEmail}
            level={headlines._email}
            placeholder={headlines.write}
            subLevel={headlines._max30}
            optionalLevel={headlines._notRequired}
            outSideStyle={[mainStyle.mt24]}
          />
          <TextArea
            value={address}
            onChange={setAddress}
            level={headlines._address}
            placeholder={headlines.write}
            subLevel={headlines._max50}
            optionalLevel={headlines._notRequired}
            outSideStyle={[mainStyle.mt24]}
          />
          <Button
            onPress={async () => {
              dispatch(loader.show());
              try {
                const form = new FormData();
                form.append("files", picture);
                const data = picture
                  ? await (
                      await post("/upload", form, user.token)
                    ).data
                  : null;

                const res = await post(
                  "/member/create",
                  {
                    comityId: comity.id,
                    position: explain,
                    name: name,
                    category: position,
                    age: age,
                    mobile: mobile,
                    email: email,
                    address: address,
                    profilePhoto: data ? data.files[0] : null,
                    gender: gender,
                  },
                  user.token
                );
                dispatch(loader.hide());
                dispatch(toast.success("Member created"));
                if (subscription) {
                  return navigation.navigate("AddMemberSubscription", {
                    data: res.data.member,
                    subscriptionId: subscription,
                    paid:paid
                  });
                }
                navigation.navigate("Member");
              } catch (e) {
                dispatch(loader.hide());
                console.error(e.message);
                dispatch(toast.error("Request failed"));
              }
            }}
            active={
              name && gender && position  && explain 
                ? true
                : false
            }
            disabled={
              name && gender && position && explain 
                ? false
                : true
            }
            style={mainStyle.mt24}
            title={headlines._ok}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
