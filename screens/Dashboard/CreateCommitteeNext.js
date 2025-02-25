import React, { useState } from "react";
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  Text,
  View,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { createComity } from "../../apis/authApi";
import Button from "../../components/main/Button";
import { CheckBox } from "../../components/main/CheckBox";
import Input from "../../components/main/Input";
import TextArea from "../../components/main/TextArea";
import loader from "../../data/loader";
import { AppColors } from "../../functions/colors";
import localStorage from "../../functions/localStorage";
import { AppValues } from "../../functions/values";
import mainStyle from "../../styles/mainStyle";
import ComityP from "../../assets/comity_p.jpeg";
import { pickImage } from "../../components/main/ProfilePicture";
import { fileFromURL, uploadFile } from "../../functions/action";
import { post } from "../../apis/multipleApi";

export default function CreateCommitteeNext({ navigation, route }) {
  const inset = useSafeAreaInsets();
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);
  const colors = new AppColors(isDark);
  const values = new AppValues(isBn);
  const backgroundColor = colors.getBackgroundColor();
  const textColor = colors.getTextColor();
  const createCommitteeValues = values.createCommitteeValues();
  const [about, setAbout] = useState();
  const [check, setCheck] = useState(false);
  const { name, mobile, division, district, area, address } = route?.params;
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [image, setImage] = useState();
  //console.log(image);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.getBackgroundColor() }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <ScrollView
        style={{ backgroundColor: backgroundColor }}
        showsVerticalScrollIndicator={false}
      >
        <View style={[{ paddingTop: inset?.top }]}>
          <Image
            source={image ? { uri: image } : ComityP}
            style={{
              position: "absolute",
              top: 0,
              height: 360,
              width: Dimensions.get("window").width,
              zIndex: 0,
            }}
          />
          <View style={[mainStyle.flexBox, mainStyle.pdV20, mainStyle.pdH20]}>
            <SvgXml
              onPress={() => {
                navigation?.goBack();
              }}
              xml={back}
            />
            <SvgXml
              onPress={async () => {
                dispatch(loader.show());
                const img = await pickImage();
                if (!img) {
                  dispatch(loader.hide());
                  return;
                }
                //console.log(img);
                let arr = [];
                arr.push(fileFromURL(img));
                const images = await uploadFile(arr, user.token);
                setImage(images[0]);
                dispatch(loader.hide());
              }}
              xml={camera}
            />
          </View>
          <View
            style={{
              height: inset?.top + 220,
            }}
          ></View>
          <View
            style={[
              {
                backgroundColor: backgroundColor,
                borderRadius: 25,
                paddingTop: 24,
              },
              mainStyle.pdH20,
            ]}
          >
            <TextArea
              maxLength={1000}
              value={about}
              onChange={setAbout}
              optionalLevel={createCommitteeValues.required}
              placeholder={createCommitteeValues.write}
              bottomLevel={createCommitteeValues.highest1000}
              level={`${createCommitteeValues.about} `}
            />
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: "#F1F1F1",
              marginVertical: 20,
            }}
          />
          <View style={mainStyle.pdH20}>
            <CheckBox
              value={check}
              onChange={() => setCheck((v) => !v)}
              component={
                <View>
                  {isBn ? (
                    <Text style={[mainStyle.text14, { color: textColor }]}>
                      আমি কমিটির সকল{" "}
                      <Text
                        onPress={() => navigation.navigate("Conditions")}
                        style={{ color: "#737AFF" }}
                      >
                        শর্তাবলী
                      </Text>{" "}
                      এবং{" "}
                      <Text
                        onPress={() => navigation.navigate("Policy")}
                        style={{ color: "#737AFF" }}
                      >
                        গোপনীয়তার নীতিমালার
                      </Text>{" "}
                      বিষয়ে সম্মতি দিলাম
                    </Text>
                  ) : (
                    <Text style={[mainStyle.text14, { color: textColor }]}>
                      I agree to all Comity's{" "}
                      <Text
                        onPress={() => navigation.navigate("Conditions")}
                        style={{ color: "#737AFF" }}
                      >
                        terms
                      </Text>{" "}
                      and{" "}
                      <Text
                        onPress={() => navigation.navigate("Policy")}
                        style={{ color: "#737AFF" }}
                      >
                        conditions
                      </Text>
                    </Text>
                  )}
                </View>
              }
            />
            <Button
              onPress={() => {
                dispatch(loader.show());
                post(
                  "/comity/create",
                  {
                    name,
                    phone: mobile,
                    division,
                    district,
                    thana: area,
                    address,
                    about,
                    profilePhoto: image,
                  },
                  user.token
                )
                  .then((res) => {
                    dispatch(loader.hide());
                    //console.log(res.data.comity);
                    dispatch({ type: "SET_COMITY", value: res.data.comity });
                    localStorage.storeData("SET_COMITY", res.data.comity);
                    navigation.navigate("Profile");
                  })
                  .catch((e) => {
                    Alert.alert(e.response.data.msg);
                    dispatch(loader.hide());
                  });

                //navigation?.navigate("CommitteeProfile")
              }}
              style={mainStyle.mt12}
              active={check && about ? true : false}
              disabled={check && about ? false : true}
              title={createCommitteeValues.confirm}
            />
            <View style={{ height: 16 }} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const back = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 19.5L7.5 12L15 4.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const camera = `<svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="33" height="32" rx="16" fill="#59A7D6"/>
<path d="M16.889 14.2222C15.4436 14.2222 14.2223 15.4436 14.2223 16.8889C14.2223 18.3342 15.4436 19.5556 16.889 19.5556C18.3343 19.5556 19.5556 18.3342 19.5556 16.8889C19.5556 15.4436 18.3343 14.2222 16.889 14.2222Z" fill="#F2F2F6"/>
<path d="M24 10.6667H21.7013L19.2951 8.26044C19.1289 8.09333 18.9031 8 18.6667 8H15.1111C14.8747 8 14.6489 8.09333 14.4827 8.26044L12.0764 10.6667H9.77778C8.79733 10.6667 8 11.464 8 12.4444V22.2222C8 23.2027 8.79733 24 9.77778 24H24C24.9804 24 25.7778 23.2027 25.7778 22.2222V12.4444C25.7778 11.464 24.9804 10.6667 24 10.6667ZM16.8889 21.3333C14.48 21.3333 12.4444 19.2978 12.4444 16.8889C12.4444 14.48 14.48 12.4444 16.8889 12.4444C19.2978 12.4444 21.3333 14.48 21.3333 16.8889C21.3333 19.2978 19.2978 21.3333 16.8889 21.3333Z" fill="#F2F2F6"/>
</svg>
`;
