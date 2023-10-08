import React, { useState } from "react";
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
const { width, height } = Dimensions.get("window");
import { Menu } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, userLogin } from "../../apis/authApi";
import Button from "../../components/main/Button";
import { CheckBox } from "../../components/main/CheckBox";
import Input from "../../components/main/Input";
import loader from "../../data/loader";
import { AppColors } from "../../functions/colors";
import localStorage from "../../functions/localStorage";

export default function Information({ navigation, route }) {
  const [visible, setVisible] = React.useState(false);
  const [gender, setGender] = useState();
  const token = route?.params?.token;
  const [name, setName] = useState();
  const [nameError, setNameError] = useState();
  const [genderError, setGenderError] = useState();
  const [age, setAge] = useState();
  const [ageError, setAgeError] = useState();
  const [userName, setUserName] = useState();
  const [userNameError, setUserNameError] = useState();
  const [password, setPassword] = useState();
  const [passwordError, setPasswordError] = useState();
  const [RePassword, setRePassword] = useState();
  const [RePasswordError, setRePasswordError] = useState();
  const [check, setCheck] = useState(false);
  const dispatch = useDispatch();

  var regName = /^[a-zA-Z ]+$/;
  const openMenu = () => setVisible(true);
  //console.log("df")
  const closeMenu = () => setVisible(false);
  const isDark = useSelector((state) => state.isDark);
  const colors = new AppColors(isDark);
  const textColor = colors.getTextColor();
  const background = colors.getBackgroundColor();

  const verify = async () => {
    setNameError();
    setUserNameError();
    setPasswordError();
    setRePasswordError();
    if (!regName.test(name)) {
      setNameError("Invalid name");
      return;
    }
    if (name.split("")?.length < 4) {
      setNameError("Name is too small");
      return;
    }
    if (name.split("")?.length > 20) {
      setNameError("Name is too large");
      return;
    }
    if (!regName.test(userName)) {
      setUserNameError("Invalid name");
      return;
    }
    if (userName.split("")?.length < 4) {
      setUserNameError("Name is too small");
      return;
    }
    if (userName.split("")?.length > 20) {
      setUserNameError("Name is too large");
      return;
    }
    if (password.split("")?.length < 8) {
      setPasswordError("Minimum 8 character");
      return;
    }
    if (password !== RePassword) {
      setRePasswordError("Password not matched");
      return;
    }
    dispatch(loader.show());
    registerUser(token, name, userName, password, age, gender)
      .then((res) => {
        userLogin(userName, password)
          .then((res) => {
            dispatch(loader.hide());
            //console.log(res);
            dispatch({ type: "SET_USER", value: res });

            localStorage.login(res);
            navigation.navigate("Dashboard");
            //navigation.navigate("Feed");
          })
          .catch((err) => {
            dispatch(loader.hide());
            Alert.alert(err.response.data.msg);
          });
      })
      .catch((err) => {
        //console.log()
        dispatch(loader.hide());
        setUserNameError(err.response.data.msg);
      });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.getBackgroundColor() }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={[styles.mt37, { paddingHorizontal: 20 }]}>
          <Text style={[styles.label, { color: textColor }]}>Your name</Text>
          <Input
            onChange={(e) => {
              setName(e);
            }}
            value={name}
            placeholder={"Type your name"}
            style={{ color: "#000" }}
            containerStyle={[styles.input, styles.mt8]}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                color: "red",
              }}
            >
              {nameError}
            </Text>
            <Text style={{ color: textColor }}>min 4 max 20 character</Text>
          </View>
          <View
            style={[
              {
                flexDirection: "row",
                justifyContent: "space-between",
              },
              styles.mt20,
            ]}
          >
            <View
              style={{
                width: width / 2 - 36,
              }}
            >
              <Text style={[styles.label, { color: textColor }]}>Gender</Text>
              <Menu
                contentStyle={{
                  backgroundColor: background,
                }}
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                  <Button
                    error={genderError}
                    onPress={openMenu}
                    bg={["#F1F1F1", "#F1F1F1"]}
                    style={[styles.input, styles.mt8]}
                    placeholder={"Select"}
                    title={gender}
                    color={"#000"}
                    placeholderTextColor={"#a3a3a3"}
                  />
                }
              >
                <Menu.Item
                  onPress={() => {
                    setGender("Male");
                    closeMenu();
                  }}
                  title="Male"
                />
                <Menu.Item
                  onPress={() => {
                    setGender("Female");
                    closeMenu();
                  }}
                  title="Female"
                />
                <Menu.Item
                  onPress={() => {
                    setGender("Other");
                    closeMenu();
                  }}
                  title="Other"
                />
              </Menu>
            </View>
            <View
              style={{
                width: width / 2 - 36,
              }}
            >
              <Text style={[styles.label, { color: textColor }]}>Age</Text>
              <Input
                value={age}
                onChange={setAge}
                error={ageError}
                keyboardType={"number-pad"}
                containerStyle={[styles.input, styles.mt8]}
                placeholder={"12"}
                placeholderTextColor={"#A3A3A3"}
                style={{ color: "#000" }}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                color: "red",
              }}
            >
              {userNameError}
            </Text>
            <Text style={{ color: textColor }}>min 4 max 20 character</Text>
          </View>
          <Text style={[styles.label, styles.mt20, { color: textColor }]}>
            Password
          </Text>
          <Input
            error={passwordError}
            value={password}
            onChange={setPassword}
            secureTextEntry={true}
            containerStyle={[styles.input, styles.mt8]}
            placeholder={"Type password"}
            placeholderTextColor={"#A3A3A3"}
            style={{ color: "#000" }}
          />
          <Text style={[styles.label, styles.mt20, { color: textColor }]}>
            Retype
          </Text>
          <Input
            error={RePasswordError}
            value={RePassword}
            onChange={setRePassword}
            //secureTextEntry={true}
            containerStyle={[styles.input, styles.mt8]}
            placeholder={"Retype password"}
            placeholderTextColor={"#A3A3A3"}
            style={{ color: "#000" }}
          />
        </View>
        <View
          style={{
            paddingVertical: 20,
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginBottom: 10,
              flex: 1,
            }}
          >
            <CheckBox
              value={check}
              onChange={() => {
                setCheck((v) => !v);
              }}
            />
            <Text
              style={{
                fontWeight: "500",
                color: textColor,
                fontSize: 14,
                width: "90%",
              }}
            >
              I agree with all of Comity's{" "}
              <Text style={{ color: "#7566FF", fontWeight: "400" }}>
                Terms of Service
              </Text>
              ,{" "}
              <Text style={{ color: "#7566FF", fontWeight: "400" }}>
                Privacy Policy
              </Text>
              , and{" "}
              <Text style={{ color: "#7566FF", fontWeight: "400" }}>
                Refund Policy
              </Text>
            </Text>
          </View>
        </View>
        <Button
          onPress={verify}
          disabled={
            name && gender && age && userName && password && RePassword && check
              ? false
              : true
          }
          active={
            name && gender && age && userName && password && RePassword && check
              ? true
              : false
          }
          style={{
            marginHorizontal: 20,
            marginVertical: 20,
          }}
          title={"Confirm"}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "400",
  },
  mt37: {
    marginTop: 37,
  },
  mt8: {
    marginTop: 8,
  },
  mt20: {
    marginTop: 20,
  },
  input: {
    backgroundColor: "#F1F1F1",
    borderRadius: 4,
    borderBottomWidth: 0,
    marginHorizontal: 0,
    borderWidth: 0,
  },
});
