import React, { useState } from "react";
import { ScrollView, Text, View, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../components/main/Button";
import Input from "../../components/main/Input";
import RadioButton from "../../components/main/RadioButton";
import { AppColors } from "../../functions/colors";
import { AppValues } from "../../functions/values";
import mainStyle from "../../styles/mainStyle";
import loader from "../../data/loader";
import { updateProfile } from "../../apis/api";
import localStorage from "../../functions/localStorage";

export default function EditProfileInfo({ route, navigation }) {
  const { user } = route.params;
  const isBn = useSelector((state) => state.isBn);
  const isDark = useSelector((state) => state.isDark);
  const colors = new AppColors(isDark);
  const values = new AppValues(isBn);
  const backgroudColor = colors.getBackgroundColor();
  const textColor = colors.getTextColor();
  const borderColor = colors.getBorderColor();
  const [gender, setGender] = useState(user.gender || "");
  const createCommitteeValues = values.createCommitteeValues();
  const dispatch = useDispatch();
  const [name, setName] = React.useState(user.name || "");
  const updateUser = async () => {
    try {
      dispatch(loader.show());
      const { data } = await updateProfile({
        name,
        gender,
      });
      dispatch({ type: "SET_USER", value: data });
      localStorage.login(data);
      Alert.alert("Profile updated successfully!");
    } catch (error) {
      console.log(error);
      Alert.alert(error.response.data.msg);
    } finally {
      dispatch(loader.hide());
    }
  };

  return (
    <ScrollView
      style={{ backgroundColor: backgroudColor }}
      showsVerticalScrollIndicator={false}
    >
      <View style={[mainStyle.pdH20, mainStyle.mt12]}>
        <Input
          value={name}
          onChange={setName}
          optionalLevel={createCommitteeValues.required}
          subLevel={createCommitteeValues.highest30}
          level={`${isBn ? "নাম" : "Name"} `}
        />
        <View style={[mainStyle.mt32]}>
          <Text
            style={{
              color: textColor,
              fontSize: 20,
            }}
          >
            {createCommitteeValues.gender}{" "}
            <Text
              style={{
                fontSize: 16,
                color: borderColor,
              }}
            >
              ({createCommitteeValues.required})
            </Text>
          </Text>
          <View
            style={[
              mainStyle.flexBox,
              mainStyle.mt12,
              { justifyContent: "flex-start" },
            ]}
          >
            <RadioButton
              value={gender == "Male" ? true : false}
              onChange={() => setGender("Male")}
              title={"Male"}
            />
            <View style={{ width: 20 }} />
            <RadioButton
              value={gender == "Female" ? true : false}
              onChange={() => setGender("Female")}
              title={"Female"}
            />
            <View style={{ width: 20 }} />
            <RadioButton
              value={gender == "Other" ? true : false}
              onChange={() => setGender("Other")}
              title={"Other"}
            />
          </View>
        </View>
        <Button
          disabled={name && gender ? false : true}
          active={name && gender ? true : false}
          onPress={updateUser}
          style={mainStyle.mt32}
          title={"Confirm"}
        />
      </View>
    </ScrollView>
  );
}
