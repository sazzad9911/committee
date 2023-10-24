import React, { useState, useRef, useMemo, useCallback } from "react";
import {
  View,
  Image,
  Dimensions,
  ScrollView,
  Pressable,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../components/main/Button";
import Input from "../../components/main/Input";
import TextArea from "../../components/main/TextArea";
import { AppColors } from "../../functions/colors";
import { AppValues } from "../../functions/values";
import mainStyle from "../../styles/mainStyle";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { AreaList } from "../../data/area";
import { DistrictList } from "../../data/district";
import { SvgXml } from "react-native-svg";
import loader from "../../data/loader";
import { updateComity } from "../../apis/api";
import localStorage from "../../functions/localStorage";
import { post, put } from "../../apis/multipleApi";

const { width, height } = Dimensions.get("window");

export default function EditCommitteeInfo({ navigation }) {
  const comity = useSelector((state) => state.comity);
  const user = useSelector((state) => state.user);
  const [division, setDivision] = useState(comity.division || "");
  const [district, setDistrict] = useState(comity.district || "");
  const [area, setArea] = useState(comity.thana || "");
  const [address, setAddress] = useState(comity.address || "");
  const [name, setName] = useState(comity.name || "");
  const [phone, setPhone] = useState(comity.phone || "");
  const [about, setAbout] = useState(comity.about || "");
  const isBn = useSelector((state) => state.isBn);
  const isDark = useSelector((state) => state.isDark);
  const values = new AppValues(isBn);
  const colors = new AppColors(isDark);
  const createCommitteeValues = values.createCommitteeValues();
  const textColor = colors.getTextColor();
  const borderColor = colors.getBorderColor();
  const backgroundColor = colors.getBackgroundColor();
  const [select, setSelect] = useState();
  const [index, setIndex] = useState(-1);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["70%"], []);
  const [districtError, setDistrictError] = useState();
  const [areaError, setAreaError] = useState();
  const dispatch = useDispatch();
  const handleSheetChanges = useCallback((index) => {
    //console.log('handleSheetChanges', index);
    setIndex(index);
  }, []);

  const handelSubmit = async () => {
    if (!name || !phone || !division || !area || !about) {
      return Alert.alert("Please fill up all the fields!");
    }
    try {
      dispatch(loader.show());
      const { data } = await put(
        "/comity/update",
        {
          name,
          phone,
          division,
          district,
          thana: area,
          address,
          about,
          comityId: comity.id,
        },
        user.token
      );
      dispatch({ type: "SET_COMITY", value: data.comity });
      localStorage.comityLogIn(data.comity);
      navigation.goBack();
      //Alert.alert("Comity updated successfully!");
    } catch (error) {
      console.log(error);
      Alert.alert(error.response.data.msg);
    } finally {
      dispatch(loader.hide());
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.getBackgroundColor() }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView
        style={{ backgroundColor: backgroundColor }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}
        >
          <Input
            maxLength={30}
            value={name}
            onChange={setName}
            level={`${createCommitteeValues.name} `}
            optionalLevel={`${createCommitteeValues.required}`}
            subLevel={`${createCommitteeValues.highest30}`}
            placeholder={createCommitteeValues.write}
          />

          <Input
            value={phone}
            onChange={setPhone}
            outSideStyle={mainStyle.mt24}
            level={`${createCommitteeValues.mobile} `}
            optionalLevel={`${createCommitteeValues.required}`}
            placeholder={createCommitteeValues.write}
          />

          <Text
            style={[
              mainStyle.level,
              {
                color: textColor,
              },
              mainStyle.mt24,
            ]}
          >
            {createCommitteeValues.address}
            <Text style={[mainStyle.subLevel, { color: borderColor }]}>
              {" "}
              ({createCommitteeValues.required})
            </Text>
          </Text>

          <Text
            style={[mainStyle.mt12, { color: textColor }, mainStyle.subLevel]}
          >
            {createCommitteeValues.division}
          </Text>
          <Input
            onPress={() => {
              setSelect("Division");
              setIndex(0);
            }}
            value={division}
            outSideStyle={mainStyle.mt8}
            editable={false}
            placeholder={createCommitteeValues.select}
          />
          <View style={[mainStyle.mt12, mainStyle.flexBox]}>
            <View>
              <Text style={[{ color: textColor }, mainStyle.subLevel]}>
                {createCommitteeValues.district}
              </Text>
              <Input
                onPress={() => {
                  setDistrictError();
                  setAreaError();
                  if (!division) {
                    setDistrictError("Select division");
                    return;
                  }
                  setSelect("District");
                  setIndex(0);
                }}
                value={district}
                editable={false}
                placeholder={createCommitteeValues.select}
                outSideStyle={mainStyle.halfInput}
              />
            </View>
            <View>
              <Text style={[{ color: textColor }, mainStyle.subLevel]}>
                {createCommitteeValues.thana}
              </Text>
              <Input
                editable={false}
                onPress={() => {
                  setDistrictError();
                  setAreaError();
                  if (!district) {
                    setAreaError("Select district");
                    return;
                  }
                  setSelect("Area");
                  setIndex(0);
                }}
                value={area}
                placeholder={createCommitteeValues.select}
                outSideStyle={mainStyle.halfInput}
              />
            </View>
          </View>

          <TextArea
            value={address}
            onChange={setAddress}
            outSideStyle={mainStyle.mt12}
            level={`${createCommitteeValues.address} `}
            optionalLevel={createCommitteeValues.notRequired}
            placeholder={createCommitteeValues.write}
          />
          <TextArea
            value={about}
            onChange={setAbout}
            outSideStyle={mainStyle.mt12}
            optionalLevel={createCommitteeValues.required}
            placeholder={createCommitteeValues.write}
            bottomLevel={createCommitteeValues.highest1000}
            level={`${createCommitteeValues.about} `}
          />
          <Button
            onPress={handelSubmit}
            active={true}
            style={mainStyle.mt24}
            title={createCommitteeValues.next}
          />
          <View style={mainStyle.ht32} />
        </View>
      </ScrollView>
      {index != -1 && (
        <View
          style={{
            backgroundColor: "#00000010",
            position: "absolute",
            width: width,
            height: height,
            top: 0,
          }}
        />
      )}
      <BottomSheet
        ref={bottomSheetRef}
        index={index}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backgroundStyle={{
          backgroundColor: colors.getSchemeColor(),
          //borderRadius:0
        }}
        handleIndicatorStyle={{
          backgroundColor: colors.getTextColor(),
        }}
        onChange={handleSheetChanges}
      >
        {select == "Division" ? (
          <Screen
            onChange={(e) => {
              setDivision(e);
            }}
            onClose={() => bottomSheetRef?.current?.close()}
            select={division}
            type={select}
          />
        ) : select == "District" ? (
          <Screen
            onChange={(e) => {
              setDistrict(e);
            }}
            onClose={() => bottomSheetRef?.current?.close()}
            select={district}
            type={select}
            value={division}
          />
        ) : (
          <Screen
            onChange={(e) => {
              setArea(e);
            }}
            onClose={() => bottomSheetRef?.current?.close()}
            select={area}
            type={select}
            value={district}
          />
        )}
      </BottomSheet>
    </KeyboardAvoidingView>
  );
}

const newStyle = StyleSheet.create({
  text: {
    fontSize: 16,

    fontWeight: "400",
  },
});
export const Screen = ({ select, value, onChange, onClose, type }) => {
  //console.log(value)
  const isDark = useSelector((state) => state.isDark);
  const colors = new AppColors(isDark);

  const newStyles = StyleSheet.create({
    text: {
      fontSize: 20,
      fontWeight: "400",
    },
    input: {
      borderColor: "#A3A3A3",
      padding: 0,
      borderWidth: 1,
      marginHorizontal: 0,
      marginVertical: 0,
    },
    radio: {
      height: 16,
      width: 16,
    },
    padding: {
      paddingLeft: 20,
    },
    textArea: {
      paddingHorizontal: 20,
      minHeight: 60,
      marginTop: 16,
      borderColor: colors.getShadowColor(),
      width: "100%",
    },
    button: {
      borderRadius: 4,
      backgroundColor: "#4ADE80",
      height: 44,
      color: "white",
      marginTop: 28,
    },
    box: {
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderBottomColor: colors.getShadowColor(),
      borderBottomWidth: 1,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    textSp: {
      color: colors.getTextColor(),
      fontWeight: "400",
      fontSize: 16,
    },
    errorText: {
      color: "red",
      marginTop: 2,
    },
  });
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.getSchemeColor(),
      }}
    >
      <Text
        style={{
          marginVertical: 12,
          fontWeight: "400",
          fontSize: 20,
          width: "100%",
          textAlign: "center",
        }}
      >
        {type ? type : "Division"}
      </Text>
      <BottomSheetScrollView
        contentContainerStyle={{
          backgroundColor: colors.getSchemeColor(),
        }}
      >
        {type == "Division" &&
          DistrictList.map((doc, i) => (
            <Pressable
              onPress={() => {
                if (onChange) {
                  onChange(doc.title);
                }
              }}
              style={newStyles.box}
              key={i}
            >
              <Text style={newStyles.textSp}>{doc.title}</Text>
              {select == doc.title && <SvgXml xml={tick} />}
            </Pressable>
          ))}
        {type == "District" &&
          DistrictList.filter((d) => d.title.match(value))[0].data.map(
            (doc, i) => (
              <Pressable
                onPress={() => {
                  if (onChange) {
                    onChange(doc);
                  }
                }}
                style={newStyles.box}
                key={i}
              >
                <Text style={newStyles.textSp}>{doc}</Text>
                {select == doc && <SvgXml xml={tick} />}
              </Pressable>
            )
          )}
        {type == "Area" &&
          AreaList.filter((d) => d.title.match(value))[0].data.map((doc, i) => (
            <Pressable
              onPress={() => {
                if (onChange) {
                  onChange(doc);
                }
              }}
              style={newStyles.box}
              key={i}
            >
              <Text style={newStyles.textSp}>{doc}</Text>
              {select == doc && <SvgXml xml={tick} />}
            </Pressable>
          ))}
      </BottomSheetScrollView>
      <Button
        active={true}
        onPress={onClose}
        style={{
          marginVertical: 8,
          backgroundColor: "#4ADE80",
          marginHorizontal: 8,
          color: "white",
        }}
        title={"Done"}
      />
    </View>
  );
};
const tick = `<svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M13.725 1.22423C14.055 0.885479 14.5413 0.664229 15.0188 0.792979C15.5688 0.907979 15.9525 1.42673 16 1.97298V2.03548C15.9688 2.44423 15.7487 2.80423 15.46 3.08298C12.5825 5.95548 9.7075 8.82923 6.835 11.7042C6.54625 11.993 6.18625 12.263 5.75625 12.2442C5.325 12.2605 4.9625 11.9917 4.67375 11.7017C3.30125 10.3267 1.9275 8.95298 0.55125 7.58298C0.2625 7.30423 0.0375 6.94798 0 6.54048V6.47923C0.03875 5.92298 0.42875 5.39423 0.9875 5.28048C1.46625 5.15173 1.95125 5.37923 2.28125 5.71923C3.44375 6.87298 4.59625 8.03673 5.75875 9.19048C8.41625 6.53798 11.0662 3.87798 13.725 1.22423Z" fill="#4ADE80"/>
  </svg>
  `;
