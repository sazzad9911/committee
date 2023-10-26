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
import { updateMember } from "../../apis/api";

export default function EditMemberInfo({ navigation, route }) {
  const isDark = useSelector((state) => state.isDark);
  const { isBn, comity, user } = useSelector((state) => state);
  const colors = new AppColors(isDark);
  const values = new AppValues(isBn);
  const headlines = values.getValues();
  const { member } = route?.params;
  const [name, setName] = useState(member.name || member.user.name);
  const [explain, setExplain] = useState(member.position || "");
  const [position, setCategory] = useState(member.category || "");
  const [age, setAge] = useState(member.age || "");
  const [mobile, setMobile] = useState(member.mobile || "");
  const [email, setEmail] = useState(member.email || "");
  const [gender, setGender] = useState(member.gender || member.user.gender);
  const [address, setAddress] = useState(member.address || "");
  const [picture, setPicture] = useState({
    uri: member?.profilePhoto || member.user?.profilePhoto,
  });
  const dispatch = useDispatch();

  const handelSubmit = async () => {
    try {
      dispatch(loader.show());
      const { data } = await updateMember({
        name: name,
        category: position,
        position: explain,
        age: age,
        mobile: mobile,
        email: email,
        gender: gender,
        address: address,
        profilePhoto: picture?.uri,
        memberId: member.id,
      });
      dispatch(loader.hide());
      toast.success("Member updated successfully!");
      navigation.navigate("UserProfile", {
        data: data.member,
      });
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg);
    } finally {
      dispatch(loader.hide());
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.getBackgroundColor() }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[{ flex: 1, paddingBottom: 32 }, mainStyle.pdH20]}>
          <View
            style={[
              mainStyle.flexBox,
              { justifyContent: "center" },
              mainStyle.mt24,
            ]}
          >
            <ProfilePicture
              edit={true}
              source={{
                uri: picture?.uri,
              }}
              onEdit={async () => {
                const res = await pickImage();
                if (!res) return;
                setPicture(res);
              }}
            />
          </View>
          <Input
            maxLength={20}
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
            ]}
          >
            {headlines._geder}
          </Text>
          <View
            style={[
              mainStyle.flexBox,
              { paddingVertical: 5, justifyContent: "flex-start" },
            ]}
          >
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
            maxLength={20}
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
            ]}
          >
            {headlines._selectAmembershipPlan}
          </Text>
          <View
            style={[
              mainStyle.flexBox,
              { paddingVertical: 5, justifyContent: "flex-start" },
            ]}
          >
            <RadioButton
              value={position == "General" ? true : false}
              title={headlines._generalMember}
              onChange={() => setCategory("General")}
            />
            <RadioButton
              value={position == "Special" ? true : false}
              style={mainStyle.ml16}
              title={headlines._specialMember}
              onChange={() => setCategory("Special")}
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
            onPress={handelSubmit}
            active={name && gender && position && explain ? true : false}
            disabled={name && gender && position && explain ? false : true}
            style={mainStyle.mt24}
            title={headlines._ok}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
