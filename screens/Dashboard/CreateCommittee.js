import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import React, {
  createRef,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";
import { createComity } from "../../apis/authApi";
import Button from "../../components/main/Button";
import Input from "../../components/main/Input";
import InputButton from "../../components/main/InputButton";
import TextArea from "../../components/main/TextArea";
import { AreaList } from "../../data/area";
import { DistrictList } from "../../data/district";
import { AppColors } from "../../functions/colors";
import { AppValues } from "../../functions/values";
import BottomShitLayout from "../../layouts/BottomShitLayout";
import mainStyle from "../../styles/mainStyle";

export default function CreateCommittee({ navigation }) {
  const isBn = useSelector((state) => state.isBn);
  const isDark = useSelector((state) => state.isDark);
  const values = new AppValues(isBn);
  const colors = new AppColors(isDark);
  const createCommitteeValues = values.createCommitteeValues();
  const textColor = colors.getTextColor();
  const borderColor = colors.getBorderColor();
  const backgroundColor = colors.getBackgroundColor();
  const [name, setName] = useState();
  const [mobile, setMobile] = useState();
  const [index, setIndex] = useState(-1);
  const [select, setSelect] = useState("Division");
  const [division, setDivision] = useState();
  const [district, setDistrict] = useState();
  const [area, setArea] = useState();
  const [address, setAddress] = useState();
  const ref = createRef();
  const [bg, setBg] = useState();
  useEffect(() => {
    isDark
      ? setBg("rgba(255, 255, 255, 0.2)", "rgba(255, 255, 255, 0.2)")
      : setBg("#fff", "#fff");
  }, [isDark]);

  return (
    <BottomShitLayout
      points={["75%"]}
      screen={
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
            maxLength={11}
            value={mobile}
            onChange={setMobile}
            outSideStyle={mainStyle.mt24}
            keyboardType="numeric"
            level={`${createCommitteeValues.mobile} `}
            optionalLevel={`${createCommitteeValues.required}`}
            placeholder={"01xxxxxxxxx"}
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

          <Button
            bg={bg}
            title={division}
            onPress={() => {
              setSelect("Division");
              setIndex(0);
            }}
            color={colors.getTextColor()}
            style={[
              {
                marginTop: 8,
                justifyContent: "flex-start",
                borderColor: colors.getShadowColor(),
              },
            ]}
            placeholder={createCommitteeValues.select}
            placeholderTextColor={colors.getTextColor()}
          />
          <View style={[mainStyle.mt12, mainStyle.flexBox, { width: "100%" }]}>
            <View style={{ width: "50%" }}>
              <Text style={[{ color: textColor }, mainStyle.subLevel]}>
                {createCommitteeValues.district}
              </Text>
              <Button
                bg={bg}
                title={district}
                onPress={() => {
                  setSelect("District");
                  setIndex(0);
                }}
                color={colors.getTextColor()}
                style={[
                  {
                    width: "95%",
                    marginTop: 8,
                    justifyContent: "flex-start",
                    borderColor: colors.getShadowColor(),
                  },
                ]}
                placeholder={createCommitteeValues.select}
                placeholderTextColor={colors.getTextColor()}
              />
            </View>
            <View style={{ width: "50%" }}>
              <Text style={[{ color: textColor }, mainStyle.subLevel]}>
                {createCommitteeValues.thana}
              </Text>
              <Button
                bg={bg}
                title={area}
                onPress={() => {
                  setSelect("Thana");
                  setIndex(0);
                }}
                color={colors.getTextColor()}
                style={[
                  {
                    width: "95%",
                    marginTop: 8,
                    marginLeft: "5%",
                    justifyContent: "flex-start",
                    borderColor: colors.getShadowColor(),
                  },
                ]}
                placeholder={createCommitteeValues.select}
                placeholderTextColor={colors.getTextColor()}
              />
            </View>
          </View>

          <TextArea
            subLevel={`${createCommitteeValues.highest50}`}
            maxLength={50}
            value={address}
            onChange={setAddress}
            outSideStyle={mainStyle.mt12}
            level={`${createCommitteeValues.address} `}
            optionalLevel={createCommitteeValues.notRequired}
            placeholder={createCommitteeValues.write}
          />

          <Button
            disabled={
              name && mobile && division && district && area ? false : true
            }
            active={
              name && mobile && division && district && area ? true : false
            }
            onPress={async () => {
              navigation?.navigate("CreateCommitteeNext", {
                name,
                mobile,
                division,
                district,
                area,
                address,
              });
            }}
            style={mainStyle.mt24}
            title={createCommitteeValues.next}
          />
          <View style={mainStyle.ht32} />
        </View>
      }
      index={index}
      setIndex={setIndex}
      scrollable={true}
      component={
        select == "Division" ? (
          <Screen
            onChange={(e) => {
              setDivision(e);
            }}
            onClose={() => setIndex(-1)}
            select={division}
            type={select}
          />
        ) : select == "District" ? (
          <Screen
            onChange={(e) => {
              setDistrict(e);
              setIndex(-1);
            }}
            onClose={() => setIndex(-1)}
            select={district}
            type={select}
            value={division}
          />
        ) : (
          <Screen
            onChange={(e) => {
              setArea(e);
            }}
            onClose={() => setIndex(-1)}
            select={area}
            type={select}
            value={district}
          />
        )
      }
    />
  );
}
export const Screen = ({ select, value, onChange, onClose, type }) => {
  //console.log(value)
  const isDark = useSelector((state) => state.isDark);
  const colors = new AppColors(isDark);
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
          color: colors.getTextColor(),
        }}
      >
        {type ? type : "Division"}
      </Text>
      <View contentContainerStyle={{}}>
        {type == "Division" &&
          DistrictList.map((doc, i) => (
            <Pressable
              onPress={() => {
                if (onChange) {
                  onChange(doc.title);
                }
              }}
              style={[
                newStyles.box,
                { borderBottomColor: colors.getShadowColor() },
              ]}
              key={i}
            >
              <Text
                style={[newStyles.textSp, { color: colors.getTextColor() }]}
              >
                {doc.title}
              </Text>
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
                style={[
                  newStyles.box,
                  { borderBottomColor: colors.getShadowColor() },
                ]}
                key={i}
              >
                <Text
                  style={[newStyles.textSp, { color: colors.getTextColor() }]}
                >
                  {doc}
                </Text>
                {select == doc && <SvgXml xml={tick} />}
              </Pressable>
            )
          )}
        {type == "Thana" &&
          AreaList.filter((d) => d.title.match(value))[0].data.map((doc, i) => (
            <Pressable
              onPress={() => {
                if (onChange) {
                  onChange(doc);
                }
              }}
              style={[
                newStyles.box,
                { borderBottomColor: colors.getShadowColor() },
              ]}
              key={i}
            >
              <Text
                style={[newStyles.textSp, { color: colors.getTextColor() }]}
              >
                {doc}
              </Text>
              {select == doc && <SvgXml xml={tick} />}
            </Pressable>
          ))}
      </View>
    </View>
  );
};
const tick = `<svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.725 1.22423C14.055 0.885479 14.5413 0.664229 15.0188 0.792979C15.5688 0.907979 15.9525 1.42673 16 1.97298V2.03548C15.9688 2.44423 15.7487 2.80423 15.46 3.08298C12.5825 5.95548 9.7075 8.82923 6.835 11.7042C6.54625 11.993 6.18625 12.263 5.75625 12.2442C5.325 12.2605 4.9625 11.9917 4.67375 11.7017C3.30125 10.3267 1.9275 8.95298 0.55125 7.58298C0.2625 7.30423 0.0375 6.94798 0 6.54048V6.47923C0.03875 5.92298 0.42875 5.39423 0.9875 5.28048C1.46625 5.15173 1.95125 5.37923 2.28125 5.71923C3.44375 6.87298 4.59625 8.03673 5.75875 9.19048C8.41625 6.53798 11.0662 3.87798 13.725 1.22423Z" fill="#4ADE80"/>
</svg>
`;
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
    borderColor: "#A3A3A3",
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
    borderBottomColor: "#F1EFEF",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textSp: {
    color: "#484848",
    fontWeight: "400",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginTop: 2,
  },
});
