import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Text,
  Image,
} from "react-native";
import { SvgXml } from "react-native-svg";

import pic from "../../assets/pic.jpeg";
import { resetUserPassword } from "../../apis/authApi";
import { useDispatch, useSelector } from "react-redux";
import loader from "../../data/loader";
import Input from "../../components/main/Input";
import Button from "../../components/main/Button";
import { AppColors } from "../../functions/colors";
import toast from "../../data/toast";

export default function Reset({ navigation, route }) {
  const [password, setPassword] = useState();
  const [rePassword, setRePassword] = useState();
  const [passwordError, setPasswordError] = useState();
  const [rePasswordError, setRePasswordError] = useState();
  const token = route?.params?.token;
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.isDark);
  const colors = new AppColors(isDark);
  const textColor = colors.getTextColor();

  const verify = async () => {
    setPasswordError();
    setRePasswordError();

    if (password.split("")?.length < 8) {
      setPasswordError("Minimum 8 character");
      return;
    }
    if (password !== rePassword) {
      setRePasswordError("Password not matched");
      return;
    }
    dispatch(loader.show());
    try {
      await resetUserPassword(token, password)
        .catch((err) => {
          //console.log()
          dispatch(loader.hide());
          setPasswordError(err.response.data.msg);
        })
        .then((res) => {
          dispatch(loader.hide());
          dispatch(toast.success("Password has changed"));
          navigation.navigate("SignIn");
        });
    } catch (err) {
      dispatch(loader.hide());
      dispatch(toast.error(err.message));
      console.log(err.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.getBackgroundColor() }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingHorizontal: 20,
          }}
        >
          <Image
            width={"100%"}
            style={[
              signUpStyle.mt28,
              {
                height: 253,
                width: "100%",
              },
            ]}
            source={pic}
          />

          <Text style={[signUpStyle.text, { marginTop: 32, color: textColor }]}>
            Create new password
          </Text>
          <Input
            error={passwordError}
            value={password}
            onChange={setPassword}
            secureTextEntry={true}
            containerStyle={[signUpStyle.mt8]}
            placeholder={"Type password"}
          />
          <Text style={[signUpStyle.text, { marginTop: 20, color: textColor }]}>
            Retype password
          </Text>
          <Input
            error={rePasswordError}
            value={rePassword}
            onChange={setRePassword}
            secureTextEntry={true}
            containerStyle={[signUpStyle.mt8]}
            placeholder={"Retype password"}
          />
        </View>
      </ScrollView>
      <Button
        active={password && rePassword ? true : false}
        disabled={password && rePassword ? false : true}
        onPress={() => {
          // navigation.navigate("SignUp_2",{number:number,name:"Reset"})
          verify();
        }}
        style={signUpStyle.button}
        title={"Confirm"}
      />
    </KeyboardAvoidingView>
  );
}

const signUpStyle = StyleSheet.create({
  mt28: {
    marginTop: 28,
  },
  mt8: {
    marginTop: 8,
  },
  mt44: {
    marginTop: 44,
  },
  mt18: {
    marginTop: 18,
  },
  input: {
    backgroundColor: "#F1F1F1",
    borderRadius: 4,
    borderBottomWidth: 0,
    marginHorizontal: 0,
  },
  headLine: {
    fontSize: 24,
    fontWeight: "700",
  },
  text: {
    fontSize: 14,
    fontWeight: "400",
  },
  button: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
});
