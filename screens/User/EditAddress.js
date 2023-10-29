import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
import { SvgXml } from "react-native-svg";
const { width, height } = Dimensions.get("window");
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import ReadMoreComponent from "../../components/ReadMoreComponent";
import Button from "../../components/main/Button";
import TextArea from "../../components/main/TextArea";
import MenuItem from "../../components/main/MenuItem";
import { AreaList } from "../../data/area";
import { DistrictList } from "../../data/district";
import Input from "../../components/main/Input";
import { AppColors } from "../../functions/colors";
import loader from "../../data/loader";
import { updateProfile } from "../../apis/api";
import localStorage from "../../functions/localStorage";
import { put } from "../../apis/multipleApi";

export default function EditLocation({ navigation }) {
  const [layoutHeight, setLayoutHeight] = useState(0);
  const [visible, setVisible] = React.useState(false);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [type, setType] = useState(
    user?.user?.addressIsPublic ? "Public" : "Only me"
  );
  const [division, setDivision] = useState(user?.user?.address?.division);
  const [district, setDistrict] = useState(user?.user?.address?.district);
  const [area, setArea] = useState(user?.user?.address?.area);
  const [address, setAddress] = useState(user?.user?.address?.address);
  const [index, setIndex] = useState(-1);
  const bottomSheetRef = useRef(null);
  const [select, setSelect] = useState();
  const [districtError, setDistrictError] = useState();
  const [areaError, setAreaError] = useState();
  const isBn = useSelector((state) => state.isBn);

  // variables

  const snapPoints = useMemo(() => ["70%"], []);
  const handleSheetChanges = useCallback((index) => {
    //console.log('handleSheetChanges', index);
    setIndex(index);
  }, []);
  //console.log(user?.user?.address)
  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  const isDark = useSelector((state) => state.isDark);
  const colors = new AppColors(isDark);
  const [bg, setBg] = useState();
  useEffect(() => {
    isDark
      ? setBg("rgba(255, 255, 255, 0.2)", "rgba(255, 255, 255, 0.2)")
      : setBg("#fff", "#fff");
  }, [isDark]);

  const onlyme = `<svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 8.78049C9.16707 8.78049 10.2863 8.31795 11.1116 7.49462C11.9368 6.67128 12.4004 5.55461 12.4004 4.39024C12.4004 3.22588 11.9368 2.1092 11.1116 1.28587C10.2863 0.462542 9.16707 0 8 0C6.83293 0 5.71366 0.462542 4.88842 1.28587C4.06318 2.1092 3.59956 3.22588 3.59956 4.39024C3.59956 5.55461 4.06318 6.67128 4.88842 7.49462C5.71366 8.31795 6.83293 8.78049 8 8.78049ZM8 10.9756C3.59076 10.9756 0 13.9259 0 17.561C0 17.8068 0.193619 18 0.440044 18H15.56C15.8064 18 16 17.8068 16 17.561C16 13.9259 12.4092 10.9756 8 10.9756Z" fill="${colors.getTextColor()}"/>
</svg>
`;
  const pub = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 0C3.58161 0 0 3.58161 0 8C0 12.4184 3.58161 16 8 16C12.4184 16 16 12.4184 16 8C16 3.58161 12.4184 0 8 0ZM10.6545 11.5355C10.5287 11.6606 10.3968 11.7919 10.2897 11.8994C10.1932 11.9961 10.1252 12.1155 10.0906 12.2448C10.0419 12.4274 10.0026 12.6119 9.93677 12.789L9.37581 14.3003C8.93194 14.3971 8.47258 14.4516 8 14.4516V13.5684C8.05452 13.1613 7.75355 12.3987 7.27 11.9152C7.07645 11.7216 6.96774 11.459 6.96774 11.1852V10.1526C6.96774 9.7771 6.76548 9.43194 6.43677 9.25032C5.97323 8.99387 5.31387 8.63548 4.86226 8.40806C4.49194 8.22161 4.14935 7.98419 3.84129 7.70645L3.81548 7.68323C3.59518 7.48437 3.39958 7.25974 3.2329 7.01419C2.93032 6.57 2.43742 5.83935 2.1171 5.36452C2.77742 3.89677 3.96742 2.71806 5.44613 2.07774L6.22064 2.46516C6.56387 2.63677 6.96774 2.38742 6.96774 2.00355V1.63903C7.22548 1.59742 7.48774 1.57097 7.75452 1.56097L8.66742 2.47387C8.86903 2.67548 8.86903 3.00226 8.66742 3.20387L8.51613 3.35484L8.18258 3.68839C8.08193 3.78903 8.08193 3.95258 8.18258 4.05323L8.33387 4.20452C8.43452 4.30516 8.43452 4.46871 8.33387 4.56935L8.07581 4.82742C8.02735 4.87578 7.96168 4.90293 7.89323 4.9029H7.60323C7.53613 4.9029 7.47161 4.92903 7.42323 4.97613L7.10323 5.28742C7.064 5.32562 7.03793 5.37529 7.02876 5.42927C7.0196 5.48325 7.02783 5.53874 7.05226 5.58774L7.55516 6.59387C7.64097 6.76548 7.51613 6.96742 7.32452 6.96742H7.14258C7.08032 6.96742 7.02032 6.94484 6.97355 6.90419L6.67419 6.64419C6.60645 6.58543 6.52458 6.5453 6.43663 6.52777C6.34868 6.51023 6.25768 6.5159 6.17258 6.54419L5.1671 6.87935C5.09033 6.90495 5.02357 6.95406 4.97627 7.01971C4.92896 7.08537 4.90352 7.16424 4.90355 7.24516C4.90355 7.39129 4.98613 7.52452 5.11677 7.59L5.47419 7.76871C5.77774 7.92064 6.11258 7.99968 6.45194 7.99968C6.79129 7.99968 7.18064 8.88 7.48419 9.03193H9.63742C9.91129 9.03193 10.1735 9.14064 10.3674 9.33419L10.809 9.77581C10.9935 9.96037 11.0971 10.2107 11.0971 10.4716C11.097 10.6694 11.0579 10.8651 10.9819 11.0477C10.906 11.2303 10.7947 11.396 10.6545 11.5355ZM13.4516 8.58871C13.2648 8.54193 13.1019 8.42742 12.9952 8.2671L12.4152 7.3971C12.3303 7.26999 12.285 7.12058 12.285 6.96774C12.285 6.8149 12.3303 6.6655 12.4152 6.53839L13.0471 5.59064C13.1219 5.47871 13.2245 5.38774 13.3452 5.32774L13.7639 5.11839C14.2 5.98677 14.4516 6.96355 14.4516 8C14.4516 8.27968 14.4277 8.55355 14.3929 8.82387L13.4516 8.58871Z" fill="${colors.getTextColor()}"/>
</svg>
`;
  const arrow = `<svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 1L8.06061 6.5118C7.47727 7.16273 6.52273 7.16273 5.93939 6.5118L1 1" stroke="${colors.getTextColor()}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

  const updateUser = async () => {
    try {
      dispatch(loader.show());
      const { data } = await put(
        "/auth/profile/update",
        {
          division,
          district,
          area,
          address,
          addressIsPublic: type == "Only me" ? "private" : "public",
        },
        user?.token
      );
      dispatch({ type: "SET_USER", value: data });
      localStorage.login(data);
      navigation?.goBack();
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingHorizontal: 20,
          }}
        >
          <SvgXml
            style={{
              marginTop: 36,
            }}
            xml={isDark ? victorDark : victorLight}
          />
          <ReadMoreComponent
            textColor={colors.getTextColor()}
            title={
              isBn
                ? "আমরা আপনার ঠিকানা জানতে চাইছি কেন?"
                : "Why are we asking for your address?"
            }
            message={
              isBn
                ? "কমিটি নির্বাচন করার জন্য আপনাকে ধন্যবাদ! আমরা আপনাকে আপনার ঠিকানা লিখতে অনুরোধ করছি কারণ এটি আপনাকে একটি ভাল সামাজিক অভিজ্ঞতা প্রদান করতে সাহায্য করে। আপনি যখন কোনো কমিটি তে যোগদানের জন্য একটি অনুরোধ পাঠান, তখন আপনি কোথা থেকে এসেছেন তা জেনে তারা আপনাকে আরও ভালভাবে চিনতে পারবে, যা আপনাকে সমমনা ব্যক্তিদের সাথে আরও সহজে সংযোগ করতে সাহায্য করবে৷ উপরন্তু, আপনার ঠিকানা প্রদান করা আমাদের আপনার অভিজ্ঞতা উপযোগী করতে এবং আপনার অবস্থানের উপর ভিত্তি করে প্রাসঙ্গিক বিষয়বস্তু এবং আপডেট প্রদান করতে সাহায্য করে। আমরা আপনার গোপনীয়তাকে গুরুত্ব সহকারে নিই এবং আপনার সম্মতি ছাড়া আপনার ঠিকানা তথ্য কারো সাথে শেয়ার করা হবে না। আরও সংযুক্ত এবং ব্যক্তিগতকৃত সামাজিক প্ল্যাটফর্ম তৈরি করতে আমাদের সাহায্য করার জন্য আপনাকে ধন্যবাদ৷"
                : "Thank you for choosing Comity! We request you to enter your address as it helps to provide you with a better social experience. When you send a request to join a comity, they'll get to know you better by knowing where you're from, which will help you connect with like-minded people more easily. Additionally, providing your address helps us tailor your experience and deliver relevant content and updates based on your location. We take your privacy seriously and your address information will not be shared with anyone without your consent. Thank you for helping us build a more connected and personalized social platform."
            }
          />

          <View style={{ marginTop: 24 }}>
            <Text
              style={[
                newStyle.text,
                { marginTop: 0, color: colors.getTextColor() },
              ]}
            >
              {isBn ? "বিভাগ" : "Division"}
            </Text>
            <Button
              bg={bg}
              title={division}
              onPress={() => {
                setSelect("Division");
                setIndex(0);
              }}
              color={colors.getTextColor()}
              style={[{ marginTop: 8, borderColor: colors.getShadowColor() }]}
              placeholder={isBn ? "বিভাগ" : "Division"}
              placeholderTextColor={colors.getTextColor()}
            />

            <View style={{ flexDirection: "row", marginTop: 12 }}>
              <View>
                <Text style={[newStyle.text, { color: colors.getTextColor() }]}>
                  {isBn ? "জেলা" : "District"}
                </Text>
                <Button
                  bg={bg}
                  error={districtError}
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
                  title={district}
                  color={colors.getTextColor()}
                  style={[
                    {
                      marginTop: 8,
                      width: width / 2 - 26.5,
                      borderColor: colors.getShadowColor(),
                    },
                  ]}
                  placeholderTextColor={colors.getTextColor()}
                  placeholder={isBn ? "জেলা" : "District"}
                />
              </View>
              <View style={{ width: 13 }} />
              <View>
                <Text style={[newStyle.text, { color: colors.getTextColor() }]}>
                  {isBn ? "থানা" : "Thana"}
                </Text>
                <Button
                  bg={bg}
                  error={areaError}
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
                  title={area}
                  color={colors.getTextColor()}
                  style={[
                    {
                      marginTop: 8,
                      width: width / 2 - 26.5,
                      borderColor: colors.getShadowColor(),
                    },
                  ]}
                  placeholderTextColor={colors.getTextColor()}
                  placeholder={isBn ? "থানা" : "Thana"}
                />
              </View>
            </View>
            <Text
              style={[
                newStyle.text,
                { marginTop: 12, color: colors.getTextColor() },
              ]}
            >
              {isBn ? "ঠিকানা" : "Address"}
            </Text>
            <TextArea
              value={address}
              onChange={setAddress}
              style={[{ marginTop: 8, borderColor: "#a3a3a3" }]}
              placeholder={isBn ? "লিখুন" : "Type"}
            />
            <View
              style={{
                alignItems: "flex-end",
                marginTop: 12,
              }}
            >
              <MenuItem
                onChange={setType}
                visible={visible}
                onClose={closeMenu}
                button={
                  <Button
                    style={{
                      borderWidth: 0,
                    }}
                    LeftIcon={() => (
                      <SvgXml xml={type == "Only me" ? onlyme : pub} />
                    )}
                    Icon={() => <SvgXml xml={arrow} />}
                    onPress={openMenu}
                    title={isBn?type == "Only me"?"প্রাইভেট":"পাবলিক":type == "Only me"?"Private":"Public"}
                    color={colors.getTextColor()}
                  />
                }
              />
            </View>
            <Button
              onPress={updateUser}
              active={division && district && area ? true : false}
              disabled={division && district && area ? false : true}
              style={[{ marginTop: 24, marginBottom: 32 }]}
              title={isBn ? "সংশোধন করুন" : "Update"}
            />
          </View>
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
const address = `<svg width="18" height="29" viewBox="0 0 18 29" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M17.5 10.7C16.45 6.08 12.42 4 8.87998 4H8.86998C5.33998 4 1.29998 6.07 0.249978 10.69C-0.920022 15.85 2.23998 20.22 5.09998 22.97C6.1137 23.9512 7.46918 24.4998 8.87998 24.5C10.24 24.5 11.6 23.99 12.65 22.97C15.51 20.22 18.67 15.86 17.5 10.7ZM8.87998 15.71C8.46631 15.71 8.0567 15.6285 7.67453 15.4702C7.29235 15.3119 6.9451 15.0799 6.65259 14.7874C6.36009 14.4949 6.12806 14.1476 5.96976 13.7655C5.81146 13.3833 5.72998 12.9737 5.72998 12.56C5.72998 12.1463 5.81146 11.7367 5.96976 11.3545C6.12806 10.9724 6.36009 10.6251 6.65259 10.3326C6.9451 10.0401 7.29235 9.80808 7.67453 9.64978C8.0567 9.49148 8.46631 9.41 8.87998 9.41C9.71541 9.41 10.5166 9.74187 11.1074 10.3326C11.6981 10.9234 12.03 11.7246 12.03 12.56C12.03 13.3954 11.6981 14.1966 11.1074 14.7874C10.5166 15.3781 9.71541 15.71 8.87998 15.71Z" fill="#767676"/>
  </svg>
  `;
const light = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <rect width="24" height="24" fill="url(#pattern0)"/>
  <defs>
  <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
  <use xlink:href="#image0_4970_40895" transform="scale(0.0078125)"/>
  </pattern>
  <image id="image0_4970_40895" width="128" height="128" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAADdgAAA3YBfdWCzAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAvfSURBVHja7Z0LcBXVGceDirVlBqUjmbHValusrS8eBhBHHtIikwTGOjWF5O7eBIUICahgWyt9kDoOUHVahYKD2FiMg8hDrUgHBKogIIUo914Ir/B+CoSHQICEkNPv2wc35O69d/fePbt793w78x9xs7t3z/f/7Z7Hfns2izGWJaTC0nDQV5qGixoHQc2X7wbT2ZWCdQSAMFf/q7EAwDoCQJg7wByDO8AcAoAAIAAIAAKAACAACAACgAAgAAgAAoAAIAB8qJD0TgwAuI4AEESRQFEsALJMAIii3SXXsYj0aQsAIlAFtCMARNOGoi4sVNRD5Bg4FejbWUQuh6ssW2jgzDVQs5VYYcx8AUBYmgBq1m61F0Djyei4sRqvxYhpMZuQ2QCsDbSHQpw2ePRaQYbHmF9hEKfTSgwzFoCvim6FQlwyKBhBkNx8psQOY5jRVUBI+iBO4ZyBICxdA+oEygU9BZoKWgxaB1oGWgB6C/Qa6AXQb0AjQD1BV7toPlNil/ltgMDNUJBaRyEISzmgv4O2gS4m+O1kOgVCgKEBK93hsPm1Sux80QtwAoKw9BMtoNvTMDyZ9oEqQQ/7wXxnxwGSQRCRnkshiG1AJaD1HE2PpzWgAamNREJZPWC+8wNBiSE4yzaU3GDB/F4uGd9an4P6mx8TgTJiWT1gvjsjgYkgCAUkE8Z/D1TVYmzBK1oB6pO8UQxl9Ij57g0FG0NwnlUX3pjA+Lag34POeMz41poEuipuObCMWFYPmO/us4BQ8PtQF1ZpI197E76dE5Y6gD7zuPEt9Qnou0neStqrlB1jgLEQ9mFQpKgDm1twdYJg/Ri0NYPM17Ub1CVuubDMWHZ6Gpiwvn8AdCwDzdd1DiR5OcZeNn9ITF2ZuXqRALBm/hMebOWnq1ICwJz5D4IafWY+04akBxAAic2/BXTEh+a3fLZwJwFgbP63tckamM+FvYNsAiAWgDkCmK/rC9B1BEDU/HECme+phBgvmJ8dJ23M76pXnmsQANJ0Ac3XVSk2AGHpp2lm7GS6MF+ys8gA/Ftg83UtExOAsNSXzL+sfBEBWEXGX1a1WACEpVvJ9BjdJhIAz5LhMRorEgBryfAYrRQDAPWBTzMZbtglzBYBgLFkdlyNEAGA1WR0XP3H3wCoL2o2kdFx1aDEyMcA3EYmJ9UtfgagHxmcVL38DMAwMjipHvMzAH8hg5PqGe8BEJaHKgMValJjMi1ikaI+cQCYRQYn1cvGb1AFH2HhwFJTHuAciLi9LQBEiu5LoRBNhnPbqG/QOhvQLc8ydmwJY/U7GDu7hbGjHzNWU2a87c6JjJ34nLHz+xg7tY6xfTPcAGB2TNxqlClurA+ehYIPpg9AOPB6agUJTDQAYCWfoMmMHXoXDHujxYQTQcb2TmOsqZ7FLI0nwOxJ0W03jQAwsAveHLvtN18CRM9cCRRCtG28c0PCEXlSSscKSTPsAKAsRQAeMwBgHp+rfFwLwzbAFb9YNVlf6rcztv+f6tXdfDG6/twexo7/l7FL59X/x7/hNrgt7nN5ATDObIK/rYJ/NqmrTqzkN8+AmbmNzWl4+gBUF1yvpTFbIW81+7TfNQYATOV2B4h3pe/665Xbbn66lbktIMG/tdx29yuMXTzNDJfD7/ECoMrE3MZmtIFVl37Hvl5AWO7JQvLIpMI2Q/xewB+51Z14q8bl7Da1zsfqYNOTceYjKobq4R/qbR+F/8Z1RtvWlKt3hLpP1GPrS+0EXgBMTDy3sQkPNkoPeLUbOJwbAAerVGO+fp9fAw2PjQvebbCNwed3Rvl5HGAwN3O2Pa/dymv5AaDfAb6p9k1+oNMAdOcXOFmtr5svwa2/1P7jb3wi2gA8MIsnAPf6GYAfcO1Dn/qfatDuv9l/7F0vRev/rb/jCcANfgbgWm3aFD7BO/CWalDdUvuPfXRRtGfBz/wzIiSEfMAtgFt/q5p04bD9x8YxA6X/v4onAJ+JAECAazWgDwC17tOno00jo6OEfIeHR4kAQHst84VPEE+uVo3aP9O+Y+6ZEq3/Nz/FcwqZjqKkhX/MDQA0HpeTa+w7Zt0yrWo5xPPqXyLSewEl/J7+jVXNwi4hdg3tOCa2KXg1LqMaJhIAHbi+Ft5wTDVs+x/SPxbe8vVlz6u8zMfpcq8X7eXQJdwAOLFCNezQ7PSPhY0+/YlgvGcL6etDEd8O/hU3APa9rnp2OmIDTKu0R8e7eN7+C0SdIGIpl4BuHqOadqmBsUiJPd3KIx/x/PJIG5GniOEzK6jecMM0r3QHlpTjTOLV9bvXTQ+8MEnUZC4A1C1P/8o98K9optDGx51LABUMgHba17jsDe7eqenX3afWq8c4U8PrC2TtCABeDcKaUdrwbbM6lJtSmtkZLf1rLg8AfkkTRfLuFp7fr/Xfp1jfd/ufeKZ/fURzBRvnCthbFWBuIC6Y+Wt1X0wz55P+ddDpF0Azabr420GHbQs2Jobg0nDU+r44hqC/F2Cf+UeUng9NF58Qgjtt+04Qpobpj3Hx3QGz++HYAY4h4HLwbbvMrwPdQx+MMAdBF9BJexI5dml5fJXm99nxYrT+3/acHeZjWbrRJ2OsQdDTllnE9VQufNfPavp340k7zMcy3E8fjUoNgt7atOppJHO+rDXmzpp/PKynf6ef/lVv6nOy4k4WLd/NIvIUFgqMYWsD7RPMKZz652I3Do+mc9f+2dr26aV/nYv7UWksK5YZy44xEHSy6AmtArYZVreJs+39abUJ8GURswM6+h0jvfQv/N7hL4zLntVGKeuV208Qba7gCuOXSuWBCfbpmnLv4MiH5od09TZD6pnFaP7D8b+ZDGX00CdkvGO++k5/ryT79krp6SE+yTP7UEdP/8Y8wNQAkBNPuBHs5aXvCHnHfJw/2NwxrM9XgKbr8wLgGz5m0r9TS/+aYbIMa70CgTfMD0m1LBy42cKxrM81hNPD4IK3+KTp3ymlf30J+pa584eyKmV2H4LMMz/6kclaa692L1C9xfl/kuUQWH+EjEmdnayVwRsQ8Dc/Ipfban4UgkcsmbTjhejVjZM+JMoiOrrQKgAvpVaGJBBg7DIagOrSttrTL3vNj0KwPKXx/b3TDfIIn26R/jXZivnH0krpTgzBQSWGGQvARvln3MxXAeiszbNv7Qmf0QRPevq39fSv9K/SRBBgDDO6Cgi1mh7eLvOjECw0bRZO7KSM8R+Pn/5tLf2rTnnl3ZZyGECAscv4NoA6yeFM0H5l7sCwnG1zA/NR04ZhZk+8SR709O/D86wA8JrNQ+PZaowwVhCzGosNS989DDIHQFst0cJEOyDIWNO52Of8CMPl9K8KKwB0zvT4ZT4AoDXzpGmzp8nHzWju/Lcb5y9azubOn9Wor5tTNeksrpu/cHHz7OlBU8dZ+o683g+x8wUA9+XJI3PygsxhzSEACAACgAAgAFxXzqDicd0HFTOH9T4B4LL6DB3T9aGi0QseKiq/BGIOqxl/G8+BAHBJYMJ6F4xvrfUEgAvqL5V384D5ivBcCACH1btgTEcI/gUPAHABz4UAcKUKKHvTfQDK3qQqwK2Tz8pq8/PC8gF9hoxc1/vXTzKHtQd/G8+BAKBxAAKAACAACAACwGHjS0vb9i8sK+w7dNSWvkNGMmc16mv8bTwHAsCtXkBg9GzXewFwDgSAG+MAUulNYECjB8YBGvFcCACnnwMERt/jlZFAPBcCwAX1Kyxb6bb5eA5UBbgFgFTWCUyY0a+wvMF548ublN+GcyAAXFb3vOLy7vnFzFHllrxH3UCPqFu+PNDpcYDuucHJBIBXxgMGF94IpjQ5CUCPQcFHCQBvjQZOdOzqzwt+kVVRcRUB4CHdVVBwLRgz0wnzewyWf+iXuPkGgGiCaLAHNAqfB7OqQAty8oO18N8dKUndd0FObvG7WOfjbd8vV75vAYgBIi9YmcYVX+n3+PgegK65wzrm5AYPWjYf9sF9CQA/jBPkP/6jnDx5p3kA5J24jwixEQIApZcwULoJ6vR5YHBzAvObcRvcVpS4CAPA5bvBwOK7wOSpYPYK0DFNK3Ad/k20ePwfwVrko6ctlXIAAAAASUVORK5CYII="/>
  </defs>
  </svg>
  `;

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
  const isBn = useSelector((state) => state.isBn);

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
        title={isBn ? "নিশ্চিত করুন" : "Confirm"}
      />
    </View>
  );
};
const tick = `<svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M13.725 1.22423C14.055 0.885479 14.5413 0.664229 15.0188 0.792979C15.5688 0.907979 15.9525 1.42673 16 1.97298V2.03548C15.9688 2.44423 15.7487 2.80423 15.46 3.08298C12.5825 5.95548 9.7075 8.82923 6.835 11.7042C6.54625 11.993 6.18625 12.263 5.75625 12.2442C5.325 12.2605 4.9625 11.9917 4.67375 11.7017C3.30125 10.3267 1.9275 8.95298 0.55125 7.58298C0.2625 7.30423 0.0375 6.94798 0 6.54048V6.47923C0.03875 5.92298 0.42875 5.39423 0.9875 5.28048C1.46625 5.15173 1.95125 5.37923 2.28125 5.71923C3.44375 6.87298 4.59625 8.03673 5.75875 9.19048C8.41625 6.53798 11.0662 3.87798 13.725 1.22423Z" fill="#4ADE80"/>
  </svg>
  `;

const victorDark = `<svg width="284" height="163" viewBox="0 0 284 163" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M229.413 37.8488V28.52H239.18H250.494V57.362H271.265V94.8842H250.494H250.184H230.035H229.413H162.409V37.8488H229.413Z" fill="#3A3A3A"/>
<path d="M247.991 37.076H245.087V39.9143H247.991V37.076Z" fill="#A6A6A6"/>
<path d="M247.991 31.0592H245.087V33.8974H247.991V31.0592Z" fill="#A6A6A6"/>
<path d="M268.451 61.3823H265.547V64.2205H268.451V61.3823Z" fill="#A6A6A6"/>
<path d="M268.451 66.7229H265.547V69.5611H268.451V66.7229Z" fill="#A6A6A6"/>
<path d="M142.463 0V25.0148H131.021V13.5838H106.089V48.921H81.5254V94.8842H106.089H106.457H130.286H131.021H142.463H155.213H177.546V0H142.463Z" fill="#3A3A3A"/>
<path d="M139.643 0V25.0148H128.197V13.5838H103.265V48.921H78.7061V94.8842H103.265H103.633H127.462H128.197H139.643H152.394H174.727V0H139.643Z" fill="#3A3A3A"/>
<path d="M109.177 18.4597H105.741V21.8177H109.177V18.4597Z" fill="#A6A6A6"/>
<path d="M109.177 24.771H105.741V28.129H109.177V24.771Z" fill="#A6A6A6"/>
<path d="M116.039 18.4597H112.604V21.8177H116.039V18.4597Z" fill="#A6A6A6"/>
<path d="M116.039 24.771H112.604V28.129H116.039V24.771Z" fill="#A6A6A6"/>
<path d="M85.4603 52.4768H82.0244V55.8348H85.4603V52.4768Z" fill="#A6A6A6"/>
<path d="M92.473 52.4768H89.0371V55.8348H92.473V52.4768Z" fill="#A6A6A6"/>
<path d="M275.242 83.2876C275.242 79.9388 272.653 77.0316 269.236 76.8108C269.086 76.8016 268.935 76.797 268.784 76.797C266.073 76.797 263.744 78.361 262.666 80.6104C261.546 80.1826 260.336 79.9388 259.061 79.9388C255.107 79.9388 251.704 82.202 250.108 85.4726C248.532 84.8608 246.814 84.5204 245.011 84.5204C238.582 84.5204 233.179 88.8122 231.635 94.6266H275.242V83.2876Z" fill="#71C7C2"/>
<path d="M76.6356 94.5346H120.563C119.014 88.7202 113.616 84.4284 107.182 84.4284C105.384 84.4284 103.666 84.7688 102.085 85.3806C100.489 82.11 97.086 79.8468 93.1324 79.8468C91.8569 79.8468 90.6473 80.0906 89.5271 80.5184C88.4493 78.269 86.1195 76.705 83.4085 76.705C79.6761 76.705 76.6497 79.6628 76.6497 83.3106C76.6497 83.5636 76.6685 83.8166 76.6968 84.0604H76.6309V94.5346H76.6356Z" fill="#71C7C2"/>
<path d="M49.2939 94.6635H247.478" stroke="#192A34" stroke-width="1.45" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M252.721 94.6635H275.19" stroke="#192A34" stroke-width="1.45" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M278.372 94.6635H282.495" stroke="#192A34" stroke-width="1.45" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M40.4932 94.6635H44.6115" stroke="#192A34" stroke-width="1.45" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M216.438 49.4913C216.438 47.1177 218.405 45.1949 220.834 45.1949C223.262 45.1949 225.23 47.1177 225.23 49.4913C225.23 51.8649 223.262 53.7878 220.834 53.7878C218.405 53.7878 216.438 51.8649 216.438 49.4913Z" fill="#A6A6A6"/>
<path d="M217.251 52.256C217.035 52.256 216.917 52.5136 217.068 52.67C218.009 53.6544 219.346 54.2754 220.833 54.2754C222.32 54.2754 223.657 53.6544 224.598 52.67C224.749 52.5136 224.631 52.256 224.415 52.256H217.251Z" fill="#232F49"/>
<path d="M221.285 53.797H220.377V91.8758H221.285V53.797Z" fill="#232F49"/>
<path d="M221.977 85.6335H219.689V94.8013H221.977V85.6335Z" fill="#232F49"/>
<path d="M140.57 49.4913C140.57 47.1177 142.538 45.1949 144.966 45.1949C147.395 45.1949 149.362 47.1177 149.362 49.4913C149.362 51.8649 147.395 53.7878 144.966 53.7878C142.542 53.7878 140.57 51.8649 140.57 49.4913Z" fill="#A6A6A6"/>
<path d="M141.39 52.256C141.174 52.256 141.056 52.5136 141.206 52.67C142.143 53.6544 143.48 54.2754 144.967 54.2754C146.454 54.2754 147.791 53.6544 148.732 52.67C148.883 52.5136 148.765 52.256 148.549 52.256H141.39Z" fill="#232F49"/>
<path d="M145.423 53.797H144.515V91.8758H145.423V53.797Z" fill="#232F49"/>
<path d="M146.115 85.6335H143.827V94.8013H146.115V85.6335Z" fill="#232F49"/>
<path d="M178.417 32.9037C176.435 29.3019 177.085 24.7525 180.224 22.0477C181.914 20.5941 184.126 19.7109 186.555 19.7109C186.776 19.7109 186.992 19.7201 187.209 19.7339C193.93 20.1755 197.672 27.6367 194.222 33.2901C191.407 37.9085 186.479 43.9391 186.479 43.9391C186.479 43.9391 181.076 37.7337 178.417 32.9037Z" fill="#DD4757"/>
<path d="M189.318 28.1934C189.318 26.703 188.08 25.4932 186.555 25.4932C185.03 25.4932 183.792 26.703 183.792 28.1934C183.792 29.6838 185.03 30.8936 186.555 30.8936C188.08 30.8936 189.318 29.6838 189.318 28.1934Z" fill="#A6A6A6"/>
<path d="M79.4027 153.502V9.14483C79.4027 4.25963 75.3503 0.294434 70.3471 0.294434H9.5605C4.56203 0.294434 0.504883 4.25503 0.504883 9.14483V153.502C0.504883 158.387 4.55732 162.352 9.5605 162.352H70.3471C75.3503 162.352 79.4027 158.392 79.4027 153.502Z" fill="#232F49"/>
<path d="M3.76155 145.236H76.1454V9.22302C76.1454 5.99842 73.472 3.38562 70.1679 3.38562H9.73431C6.43493 3.38562 3.75684 5.99842 3.75684 9.22302V145.236H3.76155Z" fill="#EEC441"/>
<path d="M3.76155 145.236H76.1454V9.22302C76.1454 5.99842 73.472 3.38562 70.1679 3.38562H9.73431C6.43493 3.38562 3.75684 5.99842 3.75684 9.22302V145.236H3.76155Z" fill="#3A3A3A"/>
<path d="M60.9244 3.39478C41.8718 22.0156 22.8192 40.6364 3.7666 59.2572V68.494C21.3884 51.2716 39.0101 34.0492 56.6272 16.8314C61.2115 12.351 65.7911 7.87518 70.3754 3.39478H60.9244Z" fill="#A6A6A6"/>
<path d="M76.1504 50.6322V59.869L56.6272 78.9498C39.0054 96.1722 21.3837 113.395 3.7666 130.612V121.376C27.893 97.7914 52.0194 74.2118 76.1504 50.6322Z" fill="#A6A6A6"/>
<path d="M3.76172 58.7006V67.9374C10.271 74.2992 16.7756 80.6564 23.285 87.0182L76.1455 138.681V129.444C52.0192 105.86 27.8928 82.2802 3.76172 58.7006Z" fill="#A6A6A6"/>
<path d="M44.5879 154.003C44.5879 151.501 42.5123 149.477 39.9566 149.477C37.3961 149.477 35.3252 151.506 35.3252 154.003C35.3252 156.506 37.4008 158.53 39.9566 158.53C42.517 158.534 44.5879 156.506 44.5879 154.003Z" fill="#1A2641"/>
<path d="M14.3571 18.9612C13.1992 16.859 13.5805 14.2002 15.4161 12.6178C16.3998 11.7668 17.6988 11.2516 19.1155 11.2516C19.2426 11.2516 19.3697 11.2562 19.4968 11.2654C23.4221 11.523 25.606 15.8838 23.5963 19.1866C21.9536 21.8822 19.0732 25.4058 19.0732 25.4058C19.0732 25.4058 15.9103 21.781 14.3571 18.9612Z" fill="#232F49"/>
<path d="M20.7249 16.2058C20.7249 15.3364 20.0047 14.6281 19.1105 14.6281C18.2209 14.6281 17.4961 15.3318 17.4961 16.2058C17.4961 17.0752 18.2162 17.7836 19.1105 17.7836C20.0047 17.7836 20.7249 17.0798 20.7249 16.2058Z" fill="#A6A6A6"/>
<path d="M32.9005 60.973C30.599 56.7962 31.3614 51.5246 34.9997 48.392C36.9577 46.7038 39.5228 45.6826 42.3374 45.6826C42.5915 45.6826 42.8457 45.6918 43.0999 45.7056C50.8894 46.2208 55.2289 54.8688 51.2283 61.4238C47.9666 66.7736 42.2527 73.7656 42.2527 73.7656C42.2527 73.7656 35.9834 66.5666 32.9005 60.973Z" fill="#DD4757"/>
<path d="M45.5388 55.5082C45.5388 53.7832 44.1079 52.3802 42.3382 52.3802C40.5685 52.3802 39.1377 53.7832 39.1377 55.5082C39.1377 57.2378 40.5685 58.6362 42.3382 58.6362C44.1079 58.6362 45.5388 57.2378 45.5388 55.5082Z" fill="#A6A6A6"/>
<path d="M59.9408 94.8658C58.8959 92.9706 59.2394 90.5832 60.8915 89.1618C61.7763 88.3982 62.9436 87.9336 64.2191 87.9336C64.3368 87.9336 64.4497 87.9382 64.5627 87.9474C68.0927 88.182 70.0601 92.1012 68.248 95.0728C66.7701 97.497 64.1768 100.671 64.1768 100.671C64.1768 100.671 61.3386 97.4004 59.9408 94.8658Z" fill="#232F49"/>
<path d="M65.6689 92.3864C65.6689 91.6044 65.0193 90.9696 64.2192 90.9696C63.4191 90.9696 62.7695 91.6044 62.7695 92.3864C62.7695 93.1684 63.4191 93.8032 64.2192 93.8032C65.0193 93.8032 65.6689 93.173 65.6689 92.3864Z" fill="#A6A6A6"/>
<path d="M26.203 126.748C24.4992 123.653 25.0592 119.743 27.7562 117.42C29.2058 116.168 31.112 115.409 33.1971 115.409C33.3853 115.409 33.5736 115.414 33.7619 115.428C39.537 115.81 42.7516 122.222 39.7911 127.08C37.3719 131.045 33.1359 136.229 33.1359 136.229C33.1359 136.229 28.4857 130.898 26.203 126.748Z" fill="#232F49"/>
<path d="M35.5695 122.696C35.5695 121.417 34.5058 120.377 33.1973 120.377C31.8889 120.377 30.8252 121.417 30.8252 122.696C30.8252 123.979 31.8889 125.014 33.1973 125.014C34.5058 125.014 35.5695 123.979 35.5695 122.696Z" fill="#A6A6A6"/>
<path d="M146.384 143.686C146.384 145.268 136.278 146.551 123.81 146.551C111.342 146.551 101.237 145.268 101.237 143.686C101.237 142.103 111.342 140.82 123.81 140.82C136.278 140.82 146.384 142.103 146.384 143.686Z" fill="#535353"/>
<path d="M130.507 85.3622C130.234 85.1322 129.896 84.9804 129.528 84.9206C128.375 84.7412 127.42 85.1 126.794 86.2546C126.257 87.2436 125.984 88.3844 125.674 89.4792C125.236 91.0064 124.907 92.5749 124.718 94.1711C124.563 95.4913 124.478 96.9081 124.939 98.1685C125.641 100.091 127.552 101.016 129.095 99.6866C131.656 97.4832 130.545 92.598 130.828 89.5068C130.95 88.1498 131.712 86.3742 130.507 85.3622Z" fill="#232F49"/>
<path d="M131.36 82.7126C131.195 82.869 130.917 83.2462 130.752 83.4072C130.851 83.2416 131.482 82.0686 131.477 81.673C131.473 81.5028 131.265 81.466 131.171 81.5902C130.828 82.0548 130.588 82.5332 130.244 82.9978C130.437 82.3906 130.621 81.7788 130.776 81.1624C130.823 80.9784 130.583 80.9002 130.475 81.0382C130.155 81.4614 129.816 82.34 129.604 82.8414C129.689 82.3814 129.726 81.5212 129.741 81.0382C129.745 80.8956 129.486 80.8772 129.439 81.0014C129.209 81.6316 129.044 82.9196 128.747 83.8626C128.559 83.4946 128.253 83.0254 127.947 83.3842C128.31 83.5866 128.103 85.3392 129.063 85.7624C129.825 86.0982 130.414 85.3208 130.715 84.7918C131.058 84.1754 131.284 83.5268 131.618 82.9058C131.698 82.7448 131.496 82.5792 131.36 82.7126Z" fill="#E27E5E"/>
<path d="M132.018 141.675C131.336 141.271 130.286 141.367 129.529 141.266C128.239 141.096 126.912 140.525 125.664 140.162C125.664 140.162 121.076 139.932 121.01 140.102C120.807 140.631 120.073 142.568 120.45 143.147C120.803 143.69 122.76 143.658 122.76 143.658L130.197 143.828C131.035 143.847 131.835 143.423 132.221 142.697C132.414 142.324 132.452 141.933 132.018 141.675Z" fill="#2A3C65"/>
<path d="M120.332 106.016H128.602L126.149 140.332C124.13 141.657 120.332 140.571 120.332 140.571V106.016Z" fill="#1A2641"/>
<path d="M127.42 142.085C126.738 141.68 125.688 141.777 124.93 141.675C123.641 141.505 122.313 140.935 121.066 140.571C121.066 140.571 116.477 140.341 116.411 140.512C116.204 141.036 115.47 142.977 115.851 143.557C116.204 144.1 118.162 144.067 118.162 144.067L125.599 144.238C126.436 144.256 127.237 143.833 127.623 143.106C127.82 142.729 127.853 142.338 127.42 142.085Z" fill="#344873"/>
<path d="M123.857 106.251L113.851 105.731C113.851 105.731 113.554 108.1 114.331 111.035C115.38 115.009 115.211 118.74 115.399 122.838C115.724 129.973 116.077 140.562 116.077 140.562C118.096 141.887 121.894 140.801 121.894 140.801L123.857 106.251Z" fill="#232F49"/>
<path d="M125.881 110.179C128.705 109.324 129.373 106.136 128.366 103.509C126.314 98.1548 128.168 92.2806 126.314 87.1562C125.293 84.3318 123.876 82.5608 120.708 82.5516H120.661C120.652 82.5516 120.647 82.5516 120.638 82.5516C120.628 82.5516 120.624 82.5516 120.614 82.5516H120.567C117.4 82.5608 115.089 84.3318 114.067 87.1608C112.213 92.2852 114.147 98.4216 112.095 103.776C111.088 106.403 112.57 109.324 115.394 110.179C115.413 110.184 115.437 110.193 115.456 110.198C117.136 110.699 118.877 110.975 120.624 111.035C120.628 111.035 120.628 111.035 120.633 111.035H120.642C122.393 110.975 124.135 110.704 125.815 110.198C125.843 110.193 125.862 110.188 125.881 110.179Z" fill="#1A2641"/>
<path d="M118.054 75.624C118.798 75.1134 120.742 75.0076 122.126 75.003C122.996 74.9984 123.749 75.5872 123.938 76.4198C124.197 77.5422 124.3 79.1476 124.46 79.7272C124.62 80.3252 124.554 80.6748 124.192 81.2452C123.754 81.9352 123.232 82.6021 122.333 82.6987C122.342 82.7217 122.126 83.0667 121.951 84.1937C121.834 84.9527 119.222 84.8516 119.104 84.2628C118.577 81.7052 117.301 76.1438 118.054 75.624Z" fill="#E27E5E"/>
<path d="M121.984 85.1782C122.059 84.8562 122.106 84.64 122.003 84.3226C121.928 84.0972 120.906 84.226 120.685 84.4054C120.511 84.5434 120.52 84.8056 120.61 84.9804C120.704 85.1644 120.859 85.3208 121.047 85.4128C121.697 88.7616 121.589 92.161 121.622 95.5742C121.626 95.933 122.346 96.9726 122.921 96.7656C123.33 96.6184 123.655 95.312 123.65 95.059C123.617 91.6182 121.984 85.192 121.984 85.1782Z" fill="#A6A6A6"/>
<path d="M123.043 77.717C123.203 77.2662 123.584 76.9626 124.05 76.9258C124.059 76.981 124.074 77.0316 124.083 77.0868C123.575 77.1144 123.212 77.5284 123.142 78.0252C123.071 78.499 123.255 78.9498 123.485 79.3546C123.537 79.4466 123.401 79.5432 123.344 79.4466C123.048 78.9268 122.831 78.315 123.043 77.717Z" fill="#DF6041"/>
<path d="M117.767 74.589C118.873 73.669 120.859 74.2256 121.227 74.0646C121.283 73.968 121.363 73.8714 121.471 73.7932C121.904 73.4712 122.413 73.5586 122.869 73.7656C122.912 73.7196 122.959 73.6782 123.015 73.6414L123.02 73.6368C123.33 73.393 123.782 73.4022 124.088 73.6506C124.761 74.198 124.78 75.256 124.422 76.1116C124.272 76.475 123.914 76.7142 123.519 76.7326C122.973 76.7602 122.384 76.6406 121.801 76.5348C121.429 76.4704 121.038 76.4796 120.681 76.59C120.455 76.659 120.243 76.7694 120.05 76.9304C119.424 77.4594 119.339 78.177 119.494 78.8808C119.344 78.6002 119.146 78.2276 118.581 78.4116C118.351 78.4852 118.163 78.6646 118.115 78.8946C117.993 79.511 118.821 79.9802 119.363 80.0124C119.495 80.8588 119.532 81.6454 118.351 81.8754C117.009 82.1468 116.007 76.0564 117.767 74.589Z" fill="#A6A6A6"/>
<path d="M120.713 80.431C120.676 80.247 120.963 80.6058 121.796 79.8744C122.215 79.5064 122.624 79.2258 122.874 79.0648C123.043 78.9544 123.245 78.9038 123.452 78.9176C123.73 78.936 123.975 78.9544 124.554 79.0648C124.671 79.0878 125.283 82.0916 122.831 82.639C120.793 83.0898 120.873 81.2038 120.713 80.431Z" fill="#A6A6A6"/>
<path d="M120.981 80.8174L119.494 78.8854L121.094 80.7346L120.981 80.8174Z" fill="#A6A6A6"/>
<path d="M123.033 79.2948C123.09 79.258 123.151 79.2304 123.222 79.212C123.287 79.1936 123.363 79.1844 123.433 79.189C123.631 79.2028 124.215 79.5294 124.215 79.5294C123.909 79.4834 123.669 79.4604 123.504 79.4466C123.433 79.442 123.363 79.4512 123.292 79.4696C123.226 79.488 123.165 79.5156 123.104 79.5524C122.892 79.6904 122.581 79.902 122.252 80.1734C122.252 80.178 122.779 79.4604 123.033 79.2948Z" fill="#09104F"/>
<path d="M123.133 82.2848C123.853 81.5534 123.495 80.1734 123.307 79.6996C123.387 80.201 123.472 81.5764 123.133 82.2848Z" fill="#09104F"/>
<path d="M123.792 77.855C123.796 77.8458 123.806 77.8412 123.815 77.832C123.999 77.7078 124.168 78.3196 123.876 78.3012C123.702 78.2874 123.697 77.97 123.792 77.855Z" fill="#09104F"/>
<path d="M121.805 78.0253C121.815 78.0161 121.819 78.0115 121.829 78.0023C122.012 77.8781 122.182 78.4898 121.89 78.4714C121.716 78.4576 121.711 78.1403 121.805 78.0253Z" fill="#09104F"/>
<path d="M127.029 110.952H126.319V107.157C126.319 106.182 125.509 105.391 124.511 105.391C123.513 105.391 122.704 106.182 122.704 107.157V110.952H121.993V107.157C121.993 105.8 123.123 104.691 124.516 104.691C125.909 104.691 127.039 105.795 127.039 107.157V110.952H127.029Z" fill="#344873"/>
<path d="M132.277 107.635H116.854V118.041H132.277V107.635Z" fill="#344873"/>
<path d="M132.277 107.635H116.854V112.065H132.277V107.635Z" fill="#2A3C65"/>
<path d="M120.604 110.529H119.508V113.744H120.604V110.529Z" fill="#F2CF31"/>
<path d="M129.59 110.529H128.493V113.744H129.59V110.529Z" fill="#F2CF31"/>
<path d="M126.3 104.503C126.107 104.53 125.923 104.521 125.744 104.434H125.74C125.5 104.057 125.048 103.785 123.923 103.822C123.575 103.684 123.273 103.518 122.958 103.399C122.793 103.633 122.567 104.457 121.781 105.064C121.781 105.064 122.487 105.418 122.497 105.427C122.487 105.46 122.473 105.791 122.605 106.076C122.963 106.84 124.191 106.904 124.892 106.927C125.58 106.945 125.956 106.09 125.956 106.09C125.683 105.8 125.782 105.372 125.956 105.22C126.271 105.23 126.629 105.161 126.648 104.802C126.653 104.595 126.497 104.475 126.3 104.503Z" fill="#E27E5E"/>
<path d="M122.704 102.24C121.875 100.873 119.823 100.538 118.708 99.406C117.625 98.3066 116.952 96.7703 116.717 95.1879C116.411 93.1087 116.783 91.011 117.343 89.0146C117.658 87.8922 117.686 86.3466 117.319 85.2334C116.651 83.214 115.686 84.4606 114.782 85.7348C111.789 89.9392 109.2 97.0462 112.1 101.821C112.928 103.183 114.637 104.001 116.077 104.576C117.757 105.243 120.911 106.338 122.473 104.903C122.906 104.507 123.109 103.896 123.052 103.321C123.014 102.893 122.887 102.543 122.704 102.24Z" fill="#232F49"/>
<path d="M160.941 120.258C160.941 121.84 171.047 123.124 183.515 123.124C195.983 123.124 206.088 121.84 206.088 120.258C206.088 118.675 195.983 117.392 183.515 117.392C171.047 117.392 160.941 118.675 160.941 120.258Z" fill="#535353"/>
<path d="M176.031 118.252C176.671 117.847 177.65 117.944 178.356 117.843C179.561 117.673 181.453 117.102 182.615 116.739C182.615 116.739 185.684 116.509 185.745 116.679C185.938 117.208 186.621 119.145 186.268 119.724C185.938 120.267 184.677 120.235 184.677 120.235L177.735 120.405C176.953 120.423 176.205 120 175.847 119.273C175.659 118.896 175.626 118.505 176.031 118.252Z" fill="#2A3C65"/>
<path d="M186.992 82.5884H178.723L182.62 116.739C184.62 117.788 185.75 116.679 185.75 116.679L186.992 82.5884Z" fill="#E27E5E"/>
<path d="M180.619 118.657C181.26 118.252 182.239 118.349 182.945 118.248C184.149 118.077 185.759 117.507 186.922 117.144C186.922 117.144 189.99 116.914 190.052 117.084C190.245 117.608 190.927 119.549 190.574 120.129C190.245 120.672 189.261 120.64 189.261 120.64L182.319 120.81C181.537 120.828 180.789 120.405 180.431 119.678C180.243 119.306 180.215 118.91 180.619 118.657Z" fill="#344873"/>
<path d="M184.248 83.5911L193.468 82.3077C193.468 82.3077 193.765 84.6767 192.988 87.6115C191.939 91.5859 192.108 95.3165 191.92 99.4151C191.59 106.55 190.051 117.088 190.051 117.088C189.006 117.962 186.921 117.148 186.921 117.148L184.248 83.5911Z" fill="#E88B6D"/>
<path d="M186.992 99.5808V82.5884H178.723L179.678 98.5228C180.907 99.7786 186.992 99.5808 186.992 99.5808Z" fill="#1A2641"/>
<path d="M193.13 99.4151C193.318 95.3165 192.489 91.5859 193.544 87.6115C194.32 84.6767 193.473 82.3077 193.473 82.3077L183.467 82.8275L184.418 99.5807C189.477 101.251 193.125 99.4703 193.13 99.4151Z" fill="#232F49"/>
<path d="M181.444 86.756C178.62 85.9004 177.951 82.7126 178.958 80.086C181.011 74.7316 179.156 68.8574 181.011 63.733C182.032 60.9086 183.449 59.1376 186.621 59.1284H186.668C186.677 59.1284 186.682 59.1284 186.691 59.1284C186.701 59.1284 186.706 59.1284 186.715 59.1284H186.762C189.93 59.1376 192.241 60.9132 193.262 63.7376C195.116 68.862 193.182 74.9984 195.234 80.3528C196.241 82.9794 194.759 85.9004 191.935 86.756C191.916 86.7606 191.892 86.7698 191.874 86.7744C190.193 87.2758 188.452 87.5518 186.706 87.6116C186.701 87.6116 186.696 87.6116 186.696 87.6116C186.692 87.6116 186.691 87.6116 186.687 87.6116C184.936 87.5518 183.194 87.2804 181.519 86.7744C181.481 86.7652 181.462 86.7606 181.444 86.756Z" fill="#71C7C2"/>
<path d="M189.27 52.1962C188.526 51.6856 186.583 51.5798 185.199 51.5752C184.328 51.5706 183.575 52.1594 183.387 52.992C183.128 54.1144 183.024 55.7198 182.864 56.2994C182.704 56.8974 182.77 57.247 183.133 57.8174C183.57 58.5074 184.093 59.1744 184.992 59.271C184.982 59.294 185.199 59.639 185.373 60.766C185.491 61.525 188.103 61.4238 188.221 60.835C188.748 58.2774 190.023 52.716 189.27 52.1962Z" fill="#E88B6D"/>
<path d="M184.281 54.2938C184.121 53.843 183.74 53.5394 183.274 53.5026C183.265 53.5578 183.251 53.6084 183.241 53.6636C183.75 53.6912 184.112 54.1052 184.183 54.602C184.253 55.0758 184.07 55.5266 183.839 55.9314C183.787 56.0234 183.928 56.1154 183.98 56.0234C184.277 55.499 184.493 54.8872 184.281 54.2938Z" fill="#DF6041"/>
<path d="M189.558 51.1612C188.452 50.2412 186.461 50.7978 186.099 50.6368C186.042 50.5356 185.962 50.4436 185.854 50.3654C185.421 50.0434 184.913 50.1308 184.456 50.3378C184.414 50.2918 184.367 50.2504 184.31 50.2136L184.305 50.209C183.995 49.9652 183.543 49.9744 183.237 50.2228C182.564 50.7702 182.545 51.8282 182.903 52.6838C183.053 53.0472 183.411 53.2864 183.807 53.3048C184.357 53.3324 184.941 53.2128 185.524 53.107C185.896 53.0426 186.287 53.0518 186.645 53.1622C186.871 53.2312 187.082 53.3416 187.275 53.5026C187.901 54.0316 187.986 54.7492 187.831 55.453C187.981 55.1724 188.179 54.7998 188.744 54.9838C188.974 55.0574 189.167 55.2368 189.21 55.4668C189.332 56.0832 188.504 56.5524 187.963 56.5846C187.831 57.431 187.793 58.2176 188.974 58.4476C190.316 58.7236 191.318 52.6286 189.558 51.1612Z" fill="#F2CF31"/>
<path d="M186.611 57.0032C186.649 56.8192 186.362 57.178 185.529 56.4466C185.11 56.0786 184.7 55.798 184.451 55.637C184.281 55.5266 184.074 55.476 183.872 55.4898C183.594 55.5082 183.349 55.5266 182.771 55.637C182.653 55.66 182.041 58.6638 184.493 59.2112C186.531 59.662 186.451 57.776 186.611 57.0032Z" fill="#A6A6A6"/>
<path d="M186.229 57.3068L187.83 55.4622L186.338 57.3942L186.229 57.3068Z" fill="#A6A6A6"/>
<path d="M184.291 55.8717C184.234 55.8349 184.168 55.8072 184.102 55.7888C184.032 55.7704 183.961 55.7659 183.891 55.7705C183.693 55.7843 183.109 56.1109 183.109 56.1109C183.415 56.0649 183.655 56.0419 183.82 56.0281C183.891 56.0235 183.961 56.0326 184.032 56.0464C184.098 56.0648 184.159 56.0925 184.22 56.1293C184.432 56.2673 184.743 56.4789 185.072 56.7549C185.072 56.7503 184.545 56.0327 184.291 55.8717Z" fill="#09104F"/>
<path d="M184.192 58.857C183.472 58.1256 183.825 56.7457 184.018 56.2719C183.938 56.7733 183.854 58.1486 184.192 58.857Z" fill="#09104F"/>
<path d="M183.528 54.4318C183.519 54.4226 183.514 54.4179 183.505 54.4087C183.321 54.2845 183.152 54.8964 183.444 54.878C183.622 54.8642 183.627 54.5422 183.528 54.4318Z" fill="#09104F"/>
<path d="M185.515 54.602C185.505 54.5928 185.501 54.5882 185.491 54.579C185.308 54.4548 185.138 55.0666 185.43 55.0482C185.609 55.0344 185.613 54.7124 185.515 54.602Z" fill="#09104F"/>
<path d="M182.305 83.3612C177.608 80.293 174.106 77.3582 174.972 76.0932C175.838 74.8236 179.952 76.866 184.649 79.9296C189.346 82.9932 192.848 85.9326 191.982 87.1976C191.116 88.4672 187.002 86.4248 182.305 83.3612Z" fill="#ECC385"/>
<path d="M188.725 83.3428C188.843 83.6602 188.885 83.927 188.899 84.1892C188.913 84.4514 188.894 84.6952 188.852 84.9344C188.81 85.1736 188.744 85.4082 188.645 85.6428C188.546 85.882 188.428 86.1166 188.221 86.388C187.986 86.1442 187.868 85.859 187.807 85.583C187.751 85.3024 187.746 85.0218 187.798 84.7504C187.85 84.479 187.944 84.2214 188.09 83.9776C188.24 83.743 188.428 83.513 188.725 83.3428Z" fill="#D6AB6E"/>
<path d="M188.725 83.3428C188.725 83.3428 188.198 85.4864 188.221 86.3926C187.986 86.1488 187.868 85.8636 187.807 85.5876C187.751 85.307 187.746 85.0264 187.798 84.755C187.85 84.4836 187.944 84.226 188.09 83.9822C188.24 83.743 188.428 83.513 188.725 83.3428Z" fill="#DDB171"/>
<path d="M186.277 81.7419C186.399 82.0593 186.437 82.3261 186.451 82.5883C186.465 82.8505 186.446 83.0943 186.404 83.3335C186.361 83.5727 186.296 83.8073 186.197 84.0419C186.093 84.2811 185.98 84.5157 185.773 84.7871C185.538 84.5433 185.42 84.2581 185.359 83.9821C185.302 83.7015 185.298 83.4209 185.35 83.1495C185.397 82.8781 185.495 82.6205 185.641 82.3767C185.792 82.1467 185.98 81.9167 186.277 81.7419Z" fill="#D6AB6E"/>
<path d="M186.277 81.7419C186.277 81.7419 185.75 83.8855 185.773 84.7917C185.538 84.5479 185.42 84.2627 185.359 83.9867C185.302 83.7061 185.298 83.4255 185.35 83.1541C185.397 82.8827 185.495 82.6251 185.641 82.3813C185.792 82.1467 185.98 81.9167 186.277 81.7419Z" fill="#DDB171"/>
<path d="M183.829 80.1458C183.952 80.4632 183.99 80.73 184.004 80.9922C184.018 81.2544 183.999 81.4981 183.957 81.7373C183.914 81.9765 183.848 82.2112 183.749 82.4504C183.646 82.6896 183.533 82.9242 183.326 83.1956C183.091 82.9518 182.973 82.6666 182.912 82.3906C182.855 82.11 182.851 81.8294 182.902 81.558C182.949 81.2866 183.048 81.029 183.194 80.7852C183.345 80.546 183.533 80.3206 183.829 80.1458Z" fill="#D6AB6E"/>
<path d="M183.829 80.1458C183.829 80.1458 183.302 82.2894 183.326 83.1956C183.091 82.9518 182.973 82.6666 182.912 82.3906C182.855 82.11 182.851 81.8294 182.902 81.558C182.949 81.2866 183.048 81.029 183.194 80.7852C183.345 80.546 183.533 80.3206 183.829 80.1458Z" fill="#DDB171"/>
<path d="M181.387 78.5496C181.509 78.867 181.547 79.1338 181.561 79.396C181.575 79.6582 181.557 79.902 181.514 80.1412C181.472 80.3804 181.406 80.615 181.307 80.8542C181.204 81.0934 181.091 81.328 180.883 81.604C180.648 81.3602 180.53 81.075 180.469 80.799C180.413 80.5184 180.408 80.2378 180.46 79.9664C180.507 79.695 180.606 79.4374 180.747 79.1936C180.898 78.9498 181.086 78.7198 181.387 78.5496Z" fill="#D6AB6E"/>
<path d="M181.387 78.5496C181.387 78.5496 180.86 80.6932 180.883 81.604C180.648 81.3602 180.53 81.075 180.469 80.799C180.413 80.5184 180.408 80.2378 180.46 79.9664C180.507 79.695 180.606 79.4374 180.747 79.1936C180.898 78.9498 181.086 78.7198 181.387 78.5496Z" fill="#DDB171"/>
<path d="M178.94 76.9489C179.062 77.2663 179.1 77.5331 179.114 77.7953C179.128 78.0575 179.109 78.3013 179.067 78.5405C179.025 78.7797 178.959 79.0143 178.86 79.2489C178.756 79.4881 178.643 79.7227 178.436 79.9941C178.201 79.7503 178.083 79.4651 178.022 79.1891C177.966 78.9085 177.961 78.6279 178.013 78.3565C178.06 78.0851 178.159 77.8275 178.304 77.5837C178.45 77.3491 178.639 77.1237 178.94 76.9489Z" fill="#D6AB6E"/>
<path d="M178.94 76.9489C178.94 76.9489 178.413 79.0925 178.436 79.9987C178.201 79.7549 178.083 79.4697 178.022 79.1937C177.966 78.9131 177.961 78.6325 178.013 78.3611C178.06 78.0897 178.159 77.8321 178.304 77.5883C178.45 77.3491 178.639 77.1237 178.94 76.9489Z" fill="#DDB171"/>
<path d="M184.371 79.9709C184.371 79.9709 183.924 80.4586 183.576 80.5966C182.498 80.5598 181.806 81.0382 181.801 81.0382C181.547 80.9922 181.147 80.8127 180.945 80.6563C180.625 80.4171 180.413 80.8265 180.559 81.0933C180.794 81.5257 181.335 81.7373 181.538 81.7557C181.585 81.9949 181.392 82.4733 181.349 82.7447C181.251 83.3887 181.632 83.4946 182.173 83.904C182.879 84.4422 183.632 84.6997 183.919 84.1707C184.07 83.8947 184.837 82.0317 184.828 81.9995C184.837 81.9903 185.543 81.6361 185.543 81.6361C184.762 81.0289 184.536 80.2055 184.371 79.9709Z" fill="#E88B6D"/>
<path d="M184.62 78.8118C185.449 77.4456 187.501 77.1098 188.616 75.9782C189.699 74.8788 190.372 73.3424 190.607 71.76C190.913 69.6808 190.541 67.5832 189.981 65.5868C189.666 64.4644 189.638 62.9188 190.005 61.8102C190.673 59.7862 191.638 61.0374 192.542 62.307C195.535 66.5114 198.124 73.6184 195.224 78.3932C194.396 79.7548 192.687 80.5736 191.247 81.1486C189.567 81.8156 186.413 82.9104 184.851 81.4752C184.418 81.0796 184.215 80.4678 184.272 79.8928C184.31 79.4696 184.437 79.1154 184.62 78.8118Z" fill="#8CCFCB"/>
<path d="M258.435 159.487C258.435 161.069 248.325 162.352 235.862 162.352C223.394 162.352 213.289 161.069 213.289 159.487C213.289 157.904 223.394 156.621 235.862 156.621C248.33 156.625 258.435 157.904 258.435 159.487Z" fill="#535353"/>
<path d="M226.03 157.118C226.599 156.704 227.465 156.8 228.096 156.699C229.164 156.524 230.266 155.94 231.301 155.567C231.301 155.567 235.109 155.333 235.166 155.508C235.335 156.046 235.947 158.033 235.631 158.626C235.34 159.183 233.716 159.151 233.716 159.151L227.55 159.326C226.854 159.344 226.19 158.912 225.87 158.166C225.7 157.78 225.672 157.38 226.03 157.118Z" fill="#2A3C65"/>
<path d="M236.459 120.598H230.858L231.296 155.572C233.8 156.625 235.16 155.512 235.16 155.512L236.459 120.598Z" fill="#4F4F4F"/>
<path d="M230.618 157.532C231.183 157.118 232.054 157.214 232.685 157.113C233.753 156.938 234.854 156.354 235.89 155.981C235.89 155.981 239.697 155.747 239.754 155.922C239.923 156.46 240.535 158.447 240.22 159.04C239.928 159.597 238.304 159.565 238.304 159.565L232.139 159.74C231.442 159.758 230.778 159.326 230.458 158.58C230.284 158.194 230.256 157.794 230.618 157.532Z" fill="#344873"/>
<path d="M234.374 120.837L242.479 120.304C242.479 120.304 242.752 122.733 242.032 125.736C241.057 129.807 241.213 133.625 241.039 137.825C240.733 145.13 239.749 155.977 239.749 155.977C238.332 157.15 235.885 155.981 235.885 155.981L234.374 120.837Z" fill="#3A3A3A"/>
<path d="M243.849 121.799C241.75 116.316 244.151 106.541 242.249 101.287C241.204 98.3939 238.837 96.5769 235.594 96.5677H235.547C235.538 96.5677 235.533 96.5677 235.523 96.5677C235.514 96.5677 235.509 96.5677 235.5 96.5677H235.453C232.69 96.5769 232.111 100.073 231.287 102.051C230.873 103.054 230.205 104.149 230.219 105.257C230.233 106.311 230.826 107.143 231.537 107.893C231.358 112.456 231.382 117.364 229.875 121.302C228.849 123.993 244.88 124.49 243.849 121.799Z" fill="#DD4757"/>
<path d="M236.888 86.8159C236.064 86.5675 235.17 86.5813 234.346 86.9079C233.527 87.2299 232.633 87.9521 232.934 88.8353C231.87 88.7801 230.67 88.8997 230.025 89.8335C229.592 90.4637 229.663 91.2457 230.185 91.7655C228.646 92.7453 229.051 94.9165 230.75 95.3949C229.583 96.5909 231.663 98.4631 233.155 98.0491C233.212 98.7667 233.941 99.0473 234.704 99.0703C235.951 99.1117 236.888 97.9617 236.888 97.9617V86.8159Z" fill="#1A2641"/>
<path d="M238.172 89.4746C237.41 88.9502 235.419 88.8444 234.002 88.8352C233.108 88.8306 232.341 89.4332 232.143 90.2888C231.88 91.4388 231.72 93.0718 231.611 93.6744C231.235 95.7582 233.226 96.6092 234.143 96.7104C234.134 96.7334 234.402 98.1364 234.181 99.4566C234.049 100.234 236.977 98.923 237.099 98.3158C237.636 95.703 238.944 90.0082 238.172 89.4746Z" fill="#AE4C33"/>
<path d="M235.208 92.9568C235.123 92.9108 235.024 92.8832 234.944 92.8694C234.652 92.8142 233.881 92.943 234.017 93.3846C234.041 93.4536 234.092 93.4996 234.144 93.5364C234.394 93.6836 234.765 93.6882 235.038 93.6284C235.198 93.5916 235.368 93.5042 235.42 93.3386C235.471 93.1592 235.358 93.035 235.208 92.9568Z" fill="#A14027"/>
<path d="M232.963 93.4812C232.888 93.4858 232.789 93.5042 232.718 93.4582C233.001 92.9246 233.259 92.184 233.062 91.6228C232.897 91.1628 232.506 90.85 232.031 90.8132C232.022 90.8684 232.007 90.9236 231.998 90.9788C232.52 91.0064 232.888 91.4296 232.963 91.9402C233.029 92.4002 232.77 93.0166 232.539 93.4306C232.436 93.472 232.775 93.817 232.963 93.8032C233.175 93.7848 233.175 93.4674 232.963 93.4812Z" fill="#A14027"/>
<path d="M232.295 91.7608C232.285 91.7516 232.28 91.747 232.271 91.7378C232.083 91.609 231.909 92.2392 232.21 92.2162C232.389 92.2024 232.398 91.8758 232.295 91.7608Z" fill="#311E16"/>
<path d="M234.333 91.9356C234.323 91.9264 234.318 91.9218 234.309 91.9126C234.121 91.7838 233.947 92.414 234.248 92.391C234.422 92.3772 234.431 92.0506 234.333 91.9356Z" fill="#311E16"/>
<path d="M236.064 118.846C236.374 118.625 236.638 118.395 236.925 118.202C237.146 118.395 237.57 119.168 238.497 119.591C238.497 119.591 237.881 120.106 237.871 120.115C237.89 120.147 237.984 120.469 237.918 120.787C237.749 121.629 236.539 121.978 235.843 122.158C235.165 122.332 234.04 121.941 234.04 121.941C234.463 121.261 235.08 120.966 234.374 120.842L233.809 121.481C233.414 120.046 234.929 119.066 236.064 118.846Z" fill="#AE4C33"/>
<path d="M236.723 116.753C237.137 115.961 238.008 115.276 238.723 114.733C239.839 113.882 240.625 112.649 240.959 111.306C241.698 108.339 240.488 105.147 239.048 102.571C238.46 101.522 238.662 98.1641 239.533 98.3757C241.693 98.9047 243.472 102.594 244.771 105.414C246.325 108.795 246.842 113.169 244.065 116.081C242.503 117.719 241.557 120.009 239.123 119.894C238.361 119.858 237.594 119.559 237.09 118.997C236.361 118.188 236.37 117.429 236.723 116.753Z" fill="#DD4757"/>
<path d="M236.723 116.753C237.137 115.961 238.008 115.276 238.724 114.733C239.839 113.882 240.625 112.649 240.959 111.306C241.698 108.339 240.489 105.147 239.048 102.571C239.039 102.552 239.03 102.529 239.015 102.511C242.315 105.952 243.529 111.177 240.136 114.899C239.039 116.104 236.794 117.378 238.234 119.191C238.526 119.559 238.898 119.784 239.303 119.899C239.241 119.899 239.18 119.899 239.119 119.894C238.357 119.858 237.589 119.559 237.086 118.997C236.361 118.188 236.37 117.429 236.723 116.753Z" fill="#C73848"/>
<path d="M244.452 91.3422C244.969 90.8224 245.045 90.0404 244.612 89.4102C243.967 88.4764 242.767 88.3568 241.703 88.412C242.004 87.5288 241.105 86.8066 240.291 86.4846C239.204 86.0568 238.004 86.1672 236.992 86.7008C236.314 85.7486 234.535 85.8406 234.276 86.7974C232.774 86.3788 231.339 87.239 232.021 89.4884C232.101 89.7506 233.989 89.999 235.236 90.1232C236.281 90.229 237.043 91.1858 236.832 92.1932L236.728 92.667C236.879 92.3864 237.175 91.5584 237.726 91.724C237.971 91.7976 238.182 91.977 238.234 92.2162C238.375 92.8556 237.519 93.3432 236.959 93.3754C236.625 93.3938 236.342 93.8906 236.281 94.1574C236.191 94.5438 236.304 94.9118 236.356 95.2936C236.399 95.634 236.239 95.7628 236.135 96.0756C236.003 96.4804 235.975 96.9082 236.206 97.2808C236.643 97.9938 235.744 99.0012 236.836 99.4198C237.523 99.682 238.164 99.2818 238.686 98.8586C238.945 99.4566 239.693 99.5716 240.315 99.3048C241.016 99.0058 241.421 98.3434 241.482 97.6258C242.974 98.0398 245.054 96.1676 243.887 94.9716C245.586 94.4978 245.986 92.322 244.452 91.3422Z" fill="#1A2641"/>
<path d="M235.598 94.3046C235.636 94.116 235.339 94.484 234.483 93.7342C234.05 93.357 233.636 93.0672 233.377 92.9016C233.203 92.7866 232.991 92.736 232.784 92.7498C232.501 92.7682 232.247 92.7866 231.654 92.9016C231.536 92.9246 230.901 96.0112 233.424 96.5724C235.514 97.037 235.434 95.1004 235.598 94.3046Z" fill="#A6A6A6"/>
<path d="M235.203 94.6174L236.85 92.7222L235.321 94.7048L235.203 94.6174Z" fill="#A6A6A6"/>
<path d="M233.212 93.1408C233.156 93.104 233.09 93.0718 233.019 93.058C232.949 93.0396 232.878 93.0304 232.803 93.035C232.6 93.0488 231.998 93.3846 231.998 93.3846C232.309 93.3386 232.563 93.311 232.728 93.3018C232.803 93.2972 232.873 93.3064 232.944 93.3248C233.015 93.3432 233.076 93.3708 233.137 93.4076C233.358 93.5502 233.674 93.7664 234.012 94.047C234.017 94.047 233.476 93.311 233.212 93.1408Z" fill="#3D6CF3"/>
<path d="M233.113 96.2136C232.374 95.4638 232.736 94.0424 232.934 93.5594C232.849 94.07 232.76 95.4822 233.113 96.2136Z" fill="#09104F"/>
<path d="M204.115 152.154C204.115 151.966 205.029 149.307 203.588 147.899C204.13 147.379 204.276 147.071 204.459 146.372C204.61 146.579 204.77 146.745 204.812 146.588C205.005 145.88 205.014 145.19 204.854 144.527C204.873 144.55 205.344 144.629 205.335 144.435C205.245 143.023 202.647 140.958 202.821 141.234C203.701 142.637 204.836 146.418 202.727 147.43C202.12 147.347 200.214 147.177 198.886 147.177C195.239 147.177 193.897 147.586 191.723 144.012C191.153 143.074 191.092 142.03 190.701 141.022C190.819 140.502 189.708 138.083 189.242 137.94C188.969 137.857 188.852 139.633 188.852 139.633C188.776 139.633 188.376 139.615 188.306 139.619C188.207 139.035 187.567 138.396 187.256 138.207C187.063 138.092 187.049 139.431 187.087 139.891C186.503 140.19 186.287 140.673 185.788 141.114C185.138 141.685 184.225 141.804 183.707 141.827C183.472 141.836 183.274 142.002 183.218 142.223C183.081 142.779 182.851 143.732 182.841 143.805C182.719 144.762 185.129 146.064 187.36 144.932C187.807 146.17 187.769 146.754 187.995 148.046C188.207 149.265 188.419 150.498 188.951 151.63C189.407 152.6 190.094 153.456 191.045 153.994C191.276 154.123 191.535 154.238 191.732 154.422C191.925 154.601 192.269 156.943 192.132 157.343C192.062 157.55 190.716 157.656 190.838 158.042C190.923 158.309 191.619 158.309 192.104 158.295C192.396 158.286 193.69 158.309 193.888 158.042C194.081 157.78 193.926 157.076 193.935 156.773C193.949 156.28 194.726 153.497 194.726 153.497H200.129C200.153 155.439 202.021 156.768 202.021 156.768C202.143 157.007 202.534 157.683 202.233 157.904C202.158 157.955 202.068 157.978 201.979 158.001C201.64 158.093 200.774 158.456 201.48 158.663C201.828 158.764 202.294 158.764 202.652 158.723C202.972 158.682 203.795 158.631 204.007 158.355C203.118 153.415 204.134 154.252 204.115 152.154Z" fill="#232F49"/>
<path d="M192.273 144.164C191.242 145.76 188.955 146.988 187.039 146.685L187.138 148.171C189.444 148.534 191.793 146.86 193.049 144.923L192.273 144.164Z" fill="#F2CF31"/>
<path d="M194.213 145.88C193.427 145.88 192.65 145.843 191.888 145.76C191.756 145.746 191.657 145.631 191.671 145.498C191.685 145.369 191.803 145.268 191.94 145.286C199.522 146.059 208.305 142.894 218.047 135.87C225.757 130.309 231.904 123.823 234.323 120.865C234.408 120.764 234.563 120.745 234.667 120.828C234.77 120.911 234.789 121.063 234.704 121.164C232.271 124.14 226.091 130.663 218.339 136.252C209.467 142.651 201.362 145.88 194.213 145.88Z" fill="#F2CF31"/>
</svg>
`;

const victorLight = `<svg width="353" height="230" viewBox="0 0 353 230" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask0_197_8457)">
<path d="M352.614 0H0V230H352.614V0Z" fill="white"/>
</g>
<mask id="mask1_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask1_197_8457)">
<path d="M264.265 71.783V62.4542H274.031H285.346V91.2962H306.117V128.818H285.346H285.036H264.886H264.265H197.261V71.783H264.265Z" fill="#CBE2E2"/>
</g>
<mask id="mask2_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask2_197_8457)">
<path d="M282.842 71.0103H279.938V73.8485H282.842V71.0103Z" fill="white"/>
</g>
<mask id="mask3_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask3_197_8457)">
<path d="M282.842 64.9934H279.938V67.8316H282.842V64.9934Z" fill="white"/>
</g>
<mask id="mask4_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask4_197_8457)">
<path d="M303.302 95.3165H300.398V98.1547H303.302V95.3165Z" fill="white"/>
</g>
<mask id="mask5_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask5_197_8457)">
<path d="M303.302 100.657H300.398V103.495H303.302V100.657Z" fill="white"/>
</g>
<mask id="mask6_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask6_197_8457)">
<path d="M177.314 33.9342V58.949H165.872V47.518H140.941V82.8552H116.377V128.818H140.941H141.308H165.138H165.872H177.314H190.065H212.398V33.9342H177.314Z" fill="#CBE2E2"/>
</g>
<mask id="mask7_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask7_197_8457)">
<path d="M174.495 33.9342V58.949H163.048V47.518H138.117V82.8552H113.558V128.818H138.117H138.484H162.314H163.048H174.495H187.245H209.578V33.9342H174.495Z" fill="#D3EBEB"/>
</g>
<mask id="mask8_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask8_197_8457)">
<path d="M144.029 52.3939H140.593V55.7519H144.029V52.3939Z" fill="white"/>
</g>
<mask id="mask9_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask9_197_8457)">
<path d="M144.029 58.7052H140.593V62.0632H144.029V58.7052Z" fill="white"/>
</g>
<mask id="mask10_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask10_197_8457)">
<path d="M150.891 52.3939H147.455V55.7519H150.891V52.3939Z" fill="white"/>
</g>
<mask id="mask11_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask11_197_8457)">
<path d="M150.891 58.7052H147.455V62.0632H150.891V58.7052Z" fill="white"/>
</g>
<mask id="mask12_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask12_197_8457)">
<path d="M120.312 86.411H116.876V89.769H120.312V86.411Z" fill="white"/>
</g>
<mask id="mask13_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask13_197_8457)">
<path d="M127.325 86.411H123.889V89.769H127.325V86.411Z" fill="white"/>
</g>
<mask id="mask14_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask14_197_8457)">
<mask id="mask15_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask15_197_8457)">
<path d="M310.094 117.222C310.094 113.873 307.505 110.966 304.088 110.745C303.938 110.736 303.787 110.731 303.636 110.731C300.925 110.731 298.596 112.295 297.518 114.545C296.398 114.117 295.188 113.873 293.913 113.873C289.959 113.873 286.556 116.136 284.96 119.407C283.384 118.795 281.666 118.455 279.863 118.455C273.434 118.455 268.031 122.746 266.487 128.561H310.094V117.222Z" fill="#71C7C2"/>
</g>
<mask id="mask16_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask16_197_8457)">
<path d="M111.487 128.469H155.414C153.866 122.654 148.467 118.363 142.033 118.363C140.235 118.363 138.517 118.703 136.936 119.315C135.34 116.044 131.937 113.781 127.984 113.781C126.708 113.781 125.499 114.025 124.378 114.453C123.301 112.203 120.971 110.639 118.26 110.639C114.527 110.639 111.501 113.597 111.501 117.245C111.501 117.498 111.52 117.751 111.548 117.995H111.482V128.469H111.487Z" fill="#71C7C2"/>
</g>
<mask id="mask17_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask17_197_8457)">
<path d="M84.1458 128.598H282.329" stroke="#192A34" stroke-width="1.45" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<mask id="mask18_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask18_197_8457)">
<path d="M287.573 128.598H310.042" stroke="#192A34" stroke-width="1.45" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<mask id="mask19_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask19_197_8457)">
<path d="M313.224 128.598H317.347" stroke="#192A34" stroke-width="1.45" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<mask id="mask20_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask20_197_8457)">
<path d="M75.3443 128.598H79.4626" stroke="#192A34" stroke-width="1.45" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<mask id="mask21_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask21_197_8457)">
<path d="M251.289 83.4255C251.289 81.0519 253.256 79.1292 255.685 79.1292C258.114 79.1292 260.081 81.0519 260.081 83.4255C260.081 85.7991 258.114 87.722 255.685 87.722C253.256 87.722 251.289 85.7991 251.289 83.4255Z" fill="white"/>
</g>
<mask id="mask22_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask22_197_8457)">
<path d="M252.103 86.1902C251.887 86.1902 251.769 86.4478 251.92 86.6042C252.861 87.5886 254.198 88.2096 255.685 88.2096C257.172 88.2096 258.509 87.5886 259.45 86.6042C259.601 86.4478 259.483 86.1902 259.267 86.1902H252.103Z" fill="#232F49"/>
</g>
<mask id="mask23_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask23_197_8457)">
<path d="M256.137 87.7312H255.228V125.81H256.137V87.7312Z" fill="#232F49"/>
</g>
<mask id="mask24_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask24_197_8457)">
<path d="M256.829 119.568H254.541V128.736H256.829V119.568Z" fill="#232F49"/>
</g>
<mask id="mask25_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask25_197_8457)">
<path d="M175.422 83.4255C175.422 81.0519 177.39 79.1292 179.818 79.1292C182.247 79.1292 184.214 81.0519 184.214 83.4255C184.214 85.7991 182.247 87.722 179.818 87.722C177.394 87.722 175.422 85.7991 175.422 83.4255Z" fill="white"/>
</g>
<mask id="mask26_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask26_197_8457)">
<path d="M176.241 86.1902C176.025 86.1902 175.907 86.4478 176.058 86.6042C176.994 87.5886 178.331 88.2096 179.818 88.2096C181.306 88.2096 182.642 87.5886 183.584 86.6042C183.734 86.4478 183.616 86.1902 183.4 86.1902H176.241Z" fill="#232F49"/>
</g>
<mask id="mask27_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask27_197_8457)">
<path d="M180.275 87.7312H179.366V125.81H180.275V87.7312Z" fill="#232F49"/>
</g>
<mask id="mask28_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask28_197_8457)">
<path d="M180.967 119.568H178.679V128.736H180.967V119.568Z" fill="#232F49"/>
</g>
<mask id="mask29_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask29_197_8457)">
<path d="M213.268 66.8379C211.287 63.2361 211.936 58.6867 215.076 55.9819C216.766 54.5283 218.978 53.6451 221.406 53.6451C221.628 53.6451 221.844 53.6543 222.061 53.6681C228.782 54.1097 232.523 61.5709 229.073 67.2243C226.259 71.8427 221.331 77.8733 221.331 77.8733C221.331 77.8733 215.928 71.6679 213.268 66.8379Z" fill="#DD4757"/>
</g>
<mask id="mask30_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask30_197_8457)">
<path d="M224.169 62.1276C224.169 60.6372 222.931 59.4274 221.406 59.4274C219.881 59.4274 218.643 60.6372 218.643 62.1276C218.643 63.618 219.881 64.8278 221.406 64.8278C222.931 64.8278 224.169 63.618 224.169 62.1276Z" fill="white"/>
</g>
<mask id="mask31_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask31_197_8457)">
<path d="M114.254 187.436V43.079C114.254 38.1938 110.202 34.2286 105.199 34.2286H44.4121C39.4136 34.2286 35.3565 38.1892 35.3565 43.079V187.436C35.3565 192.321 39.4089 196.287 44.4121 196.287H105.199C110.202 196.287 114.254 192.326 114.254 187.436Z" fill="#232F49"/>
</g>
<mask id="mask32_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask32_197_8457)">
<path d="M38.6135 179.17H110.997V43.1572C110.997 39.9326 108.324 37.3198 105.02 37.3198H44.5863C41.2869 37.3198 38.6088 39.9326 38.6088 43.1572V179.17H38.6135Z" fill="#EEC441"/>
</g>
<mask id="mask33_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask33_197_8457)">
<path d="M38.6135 179.17H110.997V43.1572C110.997 39.9326 108.324 37.3198 105.02 37.3198H44.5863C41.2869 37.3198 38.6088 39.9326 38.6088 43.1572V179.17H38.6135Z" fill="#CBE2E2"/>
</g>
<mask id="mask34_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask34_197_8457)">
<path d="M95.776 37.329C76.7234 55.9498 57.6708 74.5706 38.6182 93.1914V102.428C56.24 85.2058 73.8617 67.9834 91.4788 50.7656C96.0631 46.2852 100.643 41.8094 105.227 37.329H95.776Z" fill="white"/>
</g>
<mask id="mask35_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask35_197_8457)">
<path d="M111.002 84.5664V93.8032L91.4788 112.884C73.857 130.106 56.2352 147.329 38.6182 164.547V155.31C62.7446 131.726 86.871 108.146 111.002 84.5664Z" fill="white"/>
</g>
<mask id="mask36_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask36_197_8457)">
<path d="M38.6135 92.6348V101.872C45.1228 108.233 51.6274 114.591 58.1367 120.952L110.997 172.615V163.378C86.871 139.794 62.7446 116.214 38.6135 92.6348Z" fill="white"/>
</g>
<mask id="mask37_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask37_197_8457)">
<path d="M79.4391 187.938C79.4391 185.435 77.3635 183.411 74.8077 183.411C72.2473 183.411 70.1764 185.44 70.1764 187.938C70.1764 190.44 72.252 192.464 74.8077 192.464C77.3682 192.469 79.4391 190.44 79.4391 187.938Z" fill="#1A2641"/>
</g>
<mask id="mask38_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask38_197_8457)">
<path d="M49.2082 52.8954C48.0504 50.7932 48.4316 48.1344 50.2672 46.552C51.2509 45.701 52.5499 45.1858 53.9666 45.1858C54.0937 45.1858 54.2208 45.1904 54.3479 45.1996C58.2732 45.4572 60.4571 49.818 58.4474 53.1208C56.8048 55.8164 53.9243 59.34 53.9243 59.34C53.9243 59.34 50.7614 55.7152 49.2082 52.8954Z" fill="#232F49"/>
</g>
<mask id="mask39_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask39_197_8457)">
<path d="M55.5763 50.1401C55.5763 49.2707 54.8562 48.5623 53.9619 48.5623C53.0724 48.5623 52.3475 49.2661 52.3475 50.1401C52.3475 51.0095 53.0677 51.7178 53.9619 51.7178C54.8562 51.7178 55.5763 51.0141 55.5763 50.1401Z" fill="white"/>
</g>
<mask id="mask40_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask40_197_8457)">
<path d="M67.7525 94.9072C65.4509 90.7304 66.2134 85.4588 69.8516 82.3262C71.8096 80.638 74.3748 79.6168 77.1893 79.6168C77.4435 79.6168 77.6977 79.626 77.9518 79.6398C85.7413 80.155 90.0809 88.803 86.0802 95.358C82.8185 100.708 77.1046 107.7 77.1046 107.7C77.1046 107.7 70.8353 100.501 67.7525 94.9072Z" fill="#DD4757"/>
</g>
<mask id="mask41_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask41_197_8457)">
<path d="M80.3899 89.4424C80.3899 87.7174 78.959 86.3145 77.1893 86.3145C75.4196 86.3145 73.9888 87.7174 73.9888 89.4424C73.9888 91.172 75.4196 92.5704 77.1893 92.5704C78.959 92.5704 80.3899 91.172 80.3899 89.4424Z" fill="white"/>
</g>
<mask id="mask42_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask42_197_8457)">
<path d="M94.7923 128.8C93.7474 126.905 94.091 124.517 95.743 123.096C96.6279 122.332 97.7951 121.868 99.0706 121.868C99.1883 121.868 99.3012 121.872 99.4142 121.882C102.944 122.116 104.912 126.035 103.1 129.007C101.622 131.431 99.0283 134.605 99.0283 134.605C99.0283 134.605 96.1902 131.335 94.7923 128.8Z" fill="#232F49"/>
</g>
<mask id="mask43_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask43_197_8457)">
<path d="M100.52 126.321C100.52 125.539 99.8708 124.904 99.0706 124.904C98.2705 124.904 97.621 125.539 97.621 126.321C97.621 127.103 98.2705 127.737 99.0706 127.737C99.8708 127.737 100.52 127.107 100.52 126.321Z" fill="white"/>
</g>
<mask id="mask44_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask44_197_8457)">
<path d="M61.0549 160.683C59.3511 157.587 59.9112 153.677 62.6081 151.354C64.0577 150.103 65.9639 149.344 68.049 149.344C68.2373 149.344 68.4255 149.348 68.6138 149.362C74.3889 149.744 77.6035 156.156 74.643 161.014C72.2238 164.979 67.9878 170.163 67.9878 170.163C67.9878 170.163 63.3376 164.832 61.0549 160.683Z" fill="#232F49"/>
</g>
<mask id="mask45_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask45_197_8457)">
<path d="M70.4211 156.63C70.4211 155.351 69.3574 154.312 68.049 154.312C66.7405 154.312 65.6768 155.351 65.6768 156.63C65.6768 157.913 66.7405 158.948 68.049 158.948C69.3574 158.948 70.4211 157.913 70.4211 156.63Z" fill="white"/>
</g>
<mask id="mask46_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask46_197_8457)">
<path d="M181.235 177.62C181.235 179.202 171.13 180.486 158.662 180.486C146.194 180.486 136.089 179.202 136.089 177.62C136.089 176.037 146.194 174.754 158.662 174.754C171.13 174.754 181.235 176.037 181.235 177.62Z" fill="#E2F4F4"/>
</g>
<mask id="mask47_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask47_197_8457)">
<path d="M165.359 119.296C165.086 119.066 164.747 118.915 164.38 118.855C163.227 118.675 162.272 119.034 161.646 120.189C161.109 121.178 160.836 122.319 160.526 123.413C160.088 124.941 159.758 126.509 159.57 128.105C159.415 129.426 159.33 130.842 159.791 132.103C160.493 134.026 162.404 134.95 163.947 133.621C166.508 131.417 165.397 126.532 165.679 123.441C165.802 122.084 166.564 120.308 165.359 119.296Z" fill="#232F49"/>
</g>
<mask id="mask48_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask48_197_8457)">
<path d="M166.211 116.647C166.047 116.803 165.769 117.18 165.604 117.341C165.703 117.176 166.334 116.003 166.329 115.607C166.324 115.437 166.117 115.4 166.023 115.524C165.679 115.989 165.439 116.467 165.096 116.932C165.289 116.325 165.472 115.713 165.628 115.097C165.675 114.913 165.435 114.834 165.326 114.972C165.006 115.396 164.667 116.274 164.456 116.776C164.54 116.316 164.578 115.455 164.592 114.972C164.597 114.83 164.338 114.811 164.291 114.936C164.06 115.566 163.896 116.854 163.599 117.797C163.411 117.429 163.105 116.96 162.799 117.318C163.161 117.521 162.954 119.273 163.914 119.697C164.677 120.032 165.265 119.255 165.566 118.726C165.91 118.11 166.136 117.461 166.47 116.84C166.55 116.679 166.348 116.513 166.211 116.647Z" fill="#E27E5E"/>
</g>
<mask id="mask49_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask49_197_8457)">
<path d="M166.87 175.61C166.188 175.205 165.138 175.301 164.38 175.2C163.091 175.03 161.763 174.46 160.516 174.096C160.516 174.096 155.927 173.866 155.861 174.036C155.659 174.565 154.925 176.502 155.301 177.082C155.654 177.624 157.612 177.592 157.612 177.592L165.049 177.762C165.886 177.781 166.687 177.358 167.073 176.631C167.265 176.258 167.303 175.867 166.87 175.61Z" fill="#2A3C65"/>
</g>
<mask id="mask50_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask50_197_8457)">
<path d="M155.184 139.95H163.453L161.001 174.266C158.982 175.591 155.184 174.506 155.184 174.506V139.95Z" fill="#1A2641"/>
</g>
<mask id="mask51_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask51_197_8457)">
<path d="M162.272 176.019C161.589 175.614 160.54 175.711 159.782 175.61C158.492 175.439 157.165 174.869 155.918 174.506C155.918 174.506 151.329 174.276 151.263 174.446C151.056 174.97 150.322 176.911 150.703 177.491C151.056 178.034 153.014 178.002 153.014 178.002L160.45 178.172C161.288 178.19 162.088 177.767 162.474 177.04C162.672 176.663 162.705 176.272 162.272 176.019Z" fill="#344873"/>
</g>
<mask id="mask52_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask52_197_8457)">
<path d="M158.709 140.185L148.702 139.665C148.702 139.665 148.406 142.034 149.183 144.969C150.232 148.943 150.063 152.674 150.251 156.773C150.576 163.907 150.929 174.496 150.929 174.496C152.948 175.821 156.746 174.736 156.746 174.736L158.709 140.185Z" fill="#232F49"/>
</g>
<mask id="mask53_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask53_197_8457)">
<path d="M160.733 144.113C163.557 143.258 164.225 140.07 163.218 137.443C161.166 132.089 163.02 126.215 161.166 121.09C160.144 118.266 158.728 116.495 155.56 116.486H155.513C155.504 116.486 155.499 116.486 155.489 116.486C155.48 116.486 155.475 116.486 155.466 116.486H155.419C152.251 116.495 149.94 118.266 148.919 121.095C147.065 126.219 148.999 132.356 146.947 137.71C145.94 140.337 147.422 143.258 150.246 144.113C150.265 144.118 150.289 144.127 150.307 144.132C151.988 144.633 153.729 144.909 155.475 144.969C155.48 144.969 155.48 144.969 155.485 144.969H155.494C157.245 144.909 158.986 144.638 160.667 144.132C160.695 144.127 160.714 144.123 160.733 144.113Z" fill="#1A2641"/>
</g>
<mask id="mask54_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask54_197_8457)">
<path d="M152.905 109.558C153.649 109.048 155.593 108.942 156.977 108.937C157.847 108.933 158.601 109.521 158.789 110.354C159.048 111.476 159.151 113.082 159.311 113.661C159.471 114.259 159.405 114.609 159.043 115.179C158.605 115.869 158.083 116.536 157.184 116.633C157.193 116.656 156.977 117.001 156.803 118.128C156.685 118.887 154.073 118.786 153.955 118.197C153.428 115.639 152.152 110.078 152.905 109.558Z" fill="#E27E5E"/>
</g>
<mask id="mask55_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask55_197_8457)">
<path d="M156.836 119.112C156.911 118.79 156.958 118.574 156.854 118.257C156.779 118.031 155.758 118.16 155.537 118.34C155.362 118.478 155.372 118.74 155.461 118.915C155.555 119.099 155.711 119.255 155.899 119.347C156.548 122.696 156.44 126.095 156.473 129.508C156.478 129.867 157.198 130.907 157.772 130.7C158.182 130.553 158.506 129.246 158.502 128.993C158.469 125.552 156.836 119.126 156.836 119.112Z" fill="white"/>
</g>
<mask id="mask56_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask56_197_8457)">
<path d="M157.895 111.651C158.055 111.2 158.436 110.897 158.902 110.86C158.911 110.915 158.925 110.966 158.935 111.021C158.426 111.049 158.064 111.463 157.993 111.959C157.923 112.433 158.106 112.884 158.337 113.289C158.389 113.381 158.252 113.477 158.196 113.381C157.899 112.861 157.683 112.249 157.895 111.651Z" fill="#DF6041"/>
</g>
<mask id="mask57_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask57_197_8457)">
<path d="M152.618 108.523C153.724 107.603 155.711 108.16 156.078 107.999C156.134 107.902 156.214 107.806 156.323 107.727C156.756 107.405 157.264 107.493 157.72 107.7C157.763 107.654 157.81 107.612 157.866 107.576L157.871 107.571C158.182 107.327 158.633 107.336 158.939 107.585C159.612 108.132 159.631 109.19 159.274 110.046C159.123 110.409 158.765 110.648 158.37 110.667C157.824 110.694 157.236 110.575 156.652 110.469C156.28 110.405 155.89 110.414 155.532 110.524C155.306 110.593 155.094 110.704 154.901 110.865C154.275 111.394 154.19 112.111 154.346 112.815C154.195 112.534 153.997 112.162 153.433 112.346C153.202 112.419 153.014 112.599 152.967 112.829C152.844 113.445 153.673 113.914 154.214 113.947C154.346 114.793 154.383 115.58 153.202 115.81C151.861 116.081 150.858 109.991 152.618 108.523Z" fill="white"/>
</g>
<mask id="mask58_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask58_197_8457)">
<path d="M155.565 114.365C155.527 114.181 155.814 114.54 156.647 113.809C157.066 113.441 157.476 113.16 157.725 112.999C157.895 112.889 158.097 112.838 158.304 112.852C158.582 112.87 158.826 112.889 159.405 112.999C159.523 113.022 160.135 116.026 157.683 116.573C155.645 117.024 155.725 115.138 155.565 114.365Z" fill="white"/>
</g>
<mask id="mask59_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask59_197_8457)">
<path d="M155.833 114.752L154.346 112.82L155.946 114.669L155.833 114.752Z" fill="white"/>
</g>
<mask id="mask60_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask60_197_8457)">
<path d="M157.885 113.229C157.942 113.192 158.003 113.165 158.073 113.146C158.139 113.128 158.215 113.119 158.285 113.123C158.483 113.137 159.067 113.464 159.067 113.464C158.761 113.418 158.521 113.395 158.356 113.381C158.285 113.376 158.215 113.385 158.144 113.404C158.078 113.422 158.017 113.45 157.956 113.487C157.744 113.625 157.433 113.836 157.104 114.108C157.104 114.112 157.631 113.395 157.885 113.229Z" fill="#09104F"/>
</g>
<mask id="mask61_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask61_197_8457)">
<path d="M157.984 116.219C158.704 115.488 158.346 114.108 158.158 113.634C158.238 114.135 158.323 115.511 157.984 116.219Z" fill="#09104F"/>
</g>
<mask id="mask62_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask62_197_8457)">
<path d="M158.643 111.789C158.648 111.78 158.657 111.775 158.666 111.766C158.85 111.642 159.019 112.254 158.728 112.235C158.553 112.222 158.549 111.904 158.643 111.789Z" fill="#09104F"/>
</g>
<mask id="mask63_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask63_197_8457)">
<path d="M156.657 111.959C156.666 111.95 156.671 111.946 156.68 111.936C156.864 111.812 157.033 112.424 156.741 112.406C156.567 112.392 156.563 112.074 156.657 111.959Z" fill="#09104F"/>
</g>
<mask id="mask64_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask64_197_8457)">
<path d="M161.881 144.886H161.17V141.091C161.17 140.116 160.361 139.325 159.363 139.325C158.365 139.325 157.556 140.116 157.556 141.091V144.886H156.845V141.091C156.845 139.734 157.975 138.626 159.368 138.626C160.761 138.626 161.891 139.73 161.891 141.091V144.886H161.881Z" fill="#344873"/>
</g>
<mask id="mask65_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask65_197_8457)">
<path d="M167.129 141.57H151.705V151.975H167.129V141.57Z" fill="#344873"/>
</g>
<mask id="mask66_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask66_197_8457)">
<path d="M167.129 141.57H151.705V145.999H167.129V141.57Z" fill="#2A3C65"/>
</g>
<mask id="mask67_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask67_197_8457)">
<path d="M155.456 144.463H154.36V147.678H155.456V144.463Z" fill="#F2CF31"/>
</g>
<mask id="mask68_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask68_197_8457)">
<path d="M164.442 144.463H163.345V147.678H164.442V144.463Z" fill="#F2CF31"/>
</g>
<mask id="mask69_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask69_197_8457)">
<path d="M161.152 138.437C160.959 138.465 160.775 138.455 160.596 138.368H160.591C160.351 137.991 159.9 137.719 158.775 137.756C158.426 137.618 158.125 137.453 157.81 137.333C157.645 137.568 157.419 138.391 156.633 138.998C156.633 138.998 157.339 139.352 157.349 139.362C157.339 139.394 157.325 139.725 157.457 140.01C157.815 140.774 159.043 140.838 159.744 140.861C160.431 140.88 160.808 140.024 160.808 140.024C160.535 139.734 160.634 139.306 160.808 139.155C161.123 139.164 161.481 139.095 161.5 138.736C161.505 138.529 161.349 138.409 161.152 138.437Z" fill="#E27E5E"/>
</g>
<mask id="mask70_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask70_197_8457)">
<path d="M157.556 136.174C156.727 134.808 154.675 134.472 153.56 133.34C152.477 132.241 151.804 130.704 151.569 129.122C151.263 127.043 151.635 124.945 152.195 122.949C152.51 121.826 152.538 120.281 152.171 119.168C151.503 117.148 150.538 118.395 149.634 119.669C146.641 123.873 144.052 130.98 146.952 135.755C147.78 137.117 149.488 137.936 150.929 138.511C152.609 139.178 155.762 140.272 157.325 138.837C157.758 138.442 157.96 137.83 157.904 137.255C157.866 136.827 157.739 136.477 157.556 136.174Z" fill="#232F49"/>
</g>
<mask id="mask71_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask71_197_8457)">
<path d="M195.793 154.192C195.793 155.774 205.898 157.058 218.366 157.058C230.834 157.058 240.939 155.774 240.939 154.192C240.939 152.61 230.834 151.326 218.366 151.326C205.898 151.326 195.793 152.61 195.793 154.192Z" fill="#E2F4F4"/>
</g>
<mask id="mask72_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask72_197_8457)">
<path d="M210.882 152.186C211.522 151.782 212.501 151.878 213.207 151.777C214.412 151.607 216.304 151.036 217.467 150.673C217.467 150.673 220.536 150.443 220.597 150.613C220.79 151.142 221.472 153.079 221.119 153.658C220.79 154.201 219.528 154.169 219.528 154.169L212.586 154.339C211.805 154.358 211.056 153.934 210.699 153.208C210.51 152.83 210.477 152.439 210.882 152.186Z" fill="#2A3C65"/>
</g>
<mask id="mask73_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask73_197_8457)">
<path d="M221.844 116.523H213.574L217.472 150.673C219.472 151.722 220.601 150.613 220.601 150.613L221.844 116.523Z" fill="#E27E5E"/>
</g>
<mask id="mask74_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask74_197_8457)">
<path d="M215.471 152.591C216.111 152.186 217.09 152.283 217.796 152.182C219.001 152.012 220.611 151.441 221.773 151.078C221.773 151.078 224.842 150.848 224.903 151.018C225.096 151.542 225.779 153.484 225.426 154.063C225.096 154.606 224.113 154.574 224.113 154.574L217.17 154.744C216.389 154.762 215.641 154.339 215.283 153.612C215.095 153.24 215.066 152.844 215.471 152.591Z" fill="#344873"/>
</g>
<mask id="mask75_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask75_197_8457)">
<path d="M219.1 117.525L228.32 116.242C228.32 116.242 228.617 118.611 227.84 121.546C226.791 125.52 226.96 129.251 226.772 133.349C226.442 140.484 224.903 151.023 224.903 151.023C223.859 151.897 221.773 151.082 221.773 151.082L219.1 117.525Z" fill="#E88B6D"/>
</g>
<mask id="mask76_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask76_197_8457)">
<path d="M221.844 133.515V116.523H213.574L214.53 132.457C215.758 133.713 221.844 133.515 221.844 133.515Z" fill="#1A2641"/>
</g>
<mask id="mask77_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask77_197_8457)">
<path d="M227.982 133.349C228.17 129.251 227.341 125.52 228.396 121.546C229.172 118.611 228.325 116.242 228.325 116.242L218.319 116.762L219.269 133.515C224.329 135.185 227.977 133.405 227.982 133.349Z" fill="#232F49"/>
</g>
<mask id="mask78_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask78_197_8457)">
<path d="M216.295 120.69C213.471 119.835 212.803 116.647 213.81 114.02C215.862 108.666 214.007 102.792 215.862 97.6672C216.883 94.8428 218.3 93.0718 221.472 93.0626H221.519C221.529 93.0626 221.533 93.0626 221.543 93.0626C221.552 93.0626 221.557 93.0626 221.566 93.0626H221.613C224.781 93.0718 227.092 94.8474 228.113 97.6718C229.968 102.796 228.033 108.933 230.085 114.287C231.093 116.914 229.61 119.835 226.786 120.69C226.767 120.695 226.744 120.704 226.725 120.709C225.045 121.21 223.303 121.486 221.557 121.546C221.552 121.546 221.548 121.546 221.548 121.546C221.543 121.546 221.543 121.546 221.538 121.546C219.787 121.486 218.046 121.215 216.37 120.709C216.333 120.699 216.314 120.695 216.295 120.69Z" fill="#71C7C2"/>
</g>
<mask id="mask79_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask79_197_8457)">
<path d="M224.122 86.1304C223.378 85.6198 221.435 85.514 220.051 85.5094C219.18 85.5048 218.427 86.0936 218.239 86.9262C217.98 88.0486 217.876 89.654 217.716 90.2336C217.556 90.8316 217.622 91.1812 217.985 91.7516C218.422 92.4416 218.945 93.1086 219.844 93.2052C219.834 93.2282 220.051 93.5732 220.225 94.7002C220.343 95.4592 222.955 95.358 223.072 94.7692C223.6 92.2116 224.875 86.6502 224.122 86.1304Z" fill="#E88B6D"/>
</g>
<mask id="mask80_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask80_197_8457)">
<path d="M219.133 88.228C218.973 87.7772 218.592 87.4736 218.126 87.4368C218.116 87.492 218.102 87.5426 218.093 87.5978C218.601 87.6254 218.964 88.0394 219.034 88.5362C219.105 89.01 218.921 89.4608 218.691 89.8656C218.639 89.9576 218.78 90.0496 218.832 89.9576C219.128 89.4332 219.345 88.8214 219.133 88.228Z" fill="#DF6041"/>
</g>
<mask id="mask81_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask81_197_8457)">
<path d="M224.409 85.0954C223.303 84.1754 221.312 84.732 220.95 84.571C220.893 84.4698 220.813 84.3778 220.705 84.2996C220.272 83.9776 219.764 84.065 219.307 84.272C219.265 84.226 219.218 84.1846 219.161 84.1478L219.157 84.1432C218.846 83.8994 218.394 83.9086 218.088 84.157C217.415 84.7044 217.396 85.7624 217.754 86.618C217.905 86.9814 218.262 87.2206 218.658 87.239C219.208 87.2666 219.792 87.147 220.376 87.0412C220.747 86.9768 221.138 86.986 221.496 87.0964C221.722 87.1654 221.933 87.2758 222.126 87.4368C222.752 87.9658 222.837 88.6834 222.682 89.3872C222.832 89.1066 223.03 88.734 223.595 88.918C223.826 88.9916 224.019 89.171 224.061 89.401C224.183 90.0174 223.355 90.4866 222.814 90.5188C222.682 91.3652 222.644 92.1518 223.826 92.3818C225.167 92.6578 226.169 86.5628 224.409 85.0954Z" fill="#F2CF31"/>
</g>
<mask id="mask82_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask82_197_8457)">
<path d="M221.463 90.9374C221.5 90.7534 221.213 91.1122 220.38 90.3808C219.961 90.0128 219.552 89.7322 219.302 89.5712C219.133 89.4608 218.926 89.4102 218.724 89.424C218.446 89.4424 218.201 89.4608 217.622 89.5712C217.504 89.5942 216.893 92.598 219.345 93.1454C221.383 93.5962 221.303 91.7102 221.463 90.9374Z" fill="white"/>
</g>
<mask id="mask83_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask83_197_8457)">
<path d="M221.082 91.241L222.682 89.3964L221.19 91.3284L221.082 91.241Z" fill="white"/>
</g>
<mask id="mask84_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask84_197_8457)">
<path d="M219.142 89.8059C219.086 89.7691 219.02 89.7415 218.954 89.7231C218.884 89.7047 218.813 89.7001 218.742 89.7047C218.545 89.7185 217.961 90.0451 217.961 90.0451C218.267 89.9991 218.507 89.9761 218.672 89.9623C218.742 89.9577 218.813 89.9669 218.884 89.9807C218.949 89.9991 219.011 90.0267 219.072 90.0635C219.284 90.2015 219.594 90.4131 219.924 90.6891C219.924 90.6845 219.397 89.9669 219.142 89.8059Z" fill="#09104F"/>
</g>
<mask id="mask85_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask85_197_8457)">
<path d="M219.044 92.7913C218.323 92.0599 218.676 90.6799 218.869 90.2061C218.789 90.7075 218.705 92.0829 219.044 92.7913Z" fill="#09104F"/>
</g>
<mask id="mask86_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask86_197_8457)">
<path d="M218.38 88.366C218.37 88.3568 218.366 88.3521 218.356 88.3429C218.173 88.2187 218.003 88.8306 218.295 88.8122C218.474 88.7984 218.479 88.4764 218.38 88.366Z" fill="#09104F"/>
</g>
<mask id="mask87_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask87_197_8457)">
<path d="M220.366 88.5362C220.357 88.527 220.352 88.5224 220.343 88.5132C220.159 88.389 219.99 89.0008 220.281 88.9824C220.46 88.9686 220.465 88.6466 220.366 88.5362Z" fill="#09104F"/>
</g>
<mask id="mask88_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask88_197_8457)">
<path d="M217.156 117.295C212.459 114.227 208.957 111.292 209.823 110.027C210.689 108.758 214.803 110.8 219.5 113.864C224.197 116.927 227.699 119.867 226.833 121.132C225.967 122.401 221.853 120.359 217.156 117.295Z" fill="#ECC385"/>
</g>
<mask id="mask89_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask89_197_8457)">
<path d="M223.576 117.277C223.694 117.594 223.736 117.861 223.75 118.123C223.764 118.386 223.746 118.629 223.703 118.869C223.661 119.108 223.595 119.342 223.496 119.577C223.397 119.816 223.28 120.051 223.072 120.322C222.837 120.078 222.719 119.793 222.658 119.517C222.602 119.237 222.597 118.956 222.649 118.685C222.701 118.413 222.795 118.156 222.941 117.912C223.091 117.677 223.28 117.447 223.576 117.277Z" fill="#D6AB6E"/>
</g>
<mask id="mask90_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask90_197_8457)">
<path d="M223.576 117.277C223.576 117.277 223.049 119.421 223.072 120.327C222.837 120.083 222.719 119.798 222.658 119.522C222.602 119.241 222.597 118.961 222.649 118.689C222.701 118.418 222.795 118.16 222.941 117.916C223.091 117.677 223.28 117.447 223.576 117.277Z" fill="#DDB171"/>
</g>
<mask id="mask91_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask91_197_8457)">
<path d="M221.129 115.676C221.251 115.994 221.289 116.26 221.303 116.523C221.317 116.785 221.298 117.029 221.256 117.268C221.213 117.507 221.147 117.742 221.049 117.976C220.945 118.215 220.832 118.45 220.625 118.721C220.39 118.478 220.272 118.192 220.211 117.916C220.154 117.636 220.15 117.355 220.201 117.084C220.248 116.812 220.347 116.555 220.493 116.311C220.644 116.081 220.832 115.851 221.129 115.676Z" fill="#D6AB6E"/>
</g>
<mask id="mask92_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask92_197_8457)">
<path d="M221.129 115.676C221.129 115.676 220.601 117.82 220.625 118.726C220.39 118.482 220.272 118.197 220.211 117.921C220.154 117.64 220.15 117.36 220.201 117.088C220.248 116.817 220.347 116.559 220.493 116.316C220.644 116.081 220.832 115.851 221.129 115.676Z" fill="#DDB171"/>
</g>
<mask id="mask93_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask93_197_8457)">
<path d="M218.681 114.08C218.804 114.397 218.841 114.664 218.855 114.926C218.869 115.189 218.851 115.432 218.808 115.672C218.766 115.911 218.7 116.145 218.601 116.385C218.498 116.624 218.385 116.858 218.178 117.13C217.942 116.886 217.825 116.601 217.763 116.325C217.707 116.044 217.702 115.764 217.754 115.492C217.801 115.221 217.9 114.963 218.046 114.719C218.196 114.48 218.385 114.255 218.681 114.08Z" fill="#D6AB6E"/>
</g>
<mask id="mask94_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask94_197_8457)">
<path d="M218.681 114.08C218.681 114.08 218.154 116.224 218.178 117.13C217.942 116.886 217.825 116.601 217.763 116.325C217.707 116.044 217.702 115.764 217.754 115.492C217.801 115.221 217.9 114.963 218.046 114.719C218.196 114.48 218.385 114.255 218.681 114.08Z" fill="#DDB171"/>
</g>
<mask id="mask95_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask95_197_8457)">
<path d="M216.238 112.484C216.361 112.801 216.398 113.068 216.413 113.33C216.427 113.592 216.408 113.836 216.365 114.075C216.323 114.315 216.257 114.549 216.158 114.788C216.055 115.028 215.942 115.262 215.735 115.538C215.499 115.294 215.382 115.009 215.321 114.733C215.264 114.453 215.259 114.172 215.311 113.901C215.358 113.629 215.457 113.372 215.598 113.128C215.749 112.884 215.937 112.654 216.238 112.484Z" fill="#D6AB6E"/>
</g>
<mask id="mask96_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask96_197_8457)">
<path d="M216.238 112.484C216.238 112.484 215.711 114.627 215.735 115.538C215.499 115.294 215.382 115.009 215.321 114.733C215.264 114.453 215.259 114.172 215.311 113.901C215.358 113.629 215.457 113.372 215.598 113.128C215.749 112.884 215.937 112.654 216.238 112.484Z" fill="#DDB171"/>
</g>
<mask id="mask97_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask97_197_8457)">
<path d="M213.791 110.883C213.913 111.2 213.951 111.467 213.965 111.729C213.979 111.992 213.96 112.235 213.918 112.475C213.876 112.714 213.81 112.948 213.711 113.183C213.607 113.422 213.494 113.657 213.287 113.928C213.052 113.684 212.934 113.399 212.873 113.123C212.817 112.843 212.812 112.562 212.864 112.291C212.911 112.019 213.01 111.762 213.156 111.518C213.301 111.283 213.49 111.058 213.791 110.883Z" fill="#D6AB6E"/>
</g>
<mask id="mask98_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask98_197_8457)">
<path d="M213.791 110.883C213.791 110.883 213.264 113.027 213.287 113.933C213.052 113.689 212.934 113.404 212.873 113.128C212.817 112.847 212.812 112.567 212.864 112.295C212.911 112.024 213.01 111.766 213.156 111.522C213.301 111.283 213.49 111.058 213.791 110.883Z" fill="#DDB171"/>
</g>
<mask id="mask99_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask99_197_8457)">
<path d="M219.222 113.905C219.222 113.905 218.775 114.393 218.427 114.531C217.349 114.494 216.657 114.972 216.653 114.972C216.398 114.926 215.998 114.747 215.796 114.591C215.476 114.351 215.264 114.761 215.41 115.028C215.645 115.46 216.187 115.672 216.389 115.69C216.436 115.929 216.243 116.408 216.201 116.679C216.102 117.323 216.483 117.429 217.024 117.838C217.73 118.376 218.483 118.634 218.771 118.105C218.921 117.829 219.688 115.966 219.679 115.934C219.688 115.925 220.394 115.57 220.394 115.57C219.613 114.963 219.387 114.14 219.222 113.905Z" fill="#E88B6D"/>
</g>
<mask id="mask100_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask100_197_8457)">
<path d="M219.472 112.746C220.3 111.38 222.352 111.044 223.468 109.912C224.55 108.813 225.223 107.277 225.459 105.694C225.765 103.615 225.393 101.517 224.833 99.521C224.517 98.3986 224.489 96.853 224.856 95.7444C225.525 93.7204 226.49 94.9716 227.393 96.2412C230.387 100.446 232.975 107.553 230.076 112.327C229.248 113.689 227.539 114.508 226.099 115.083C224.419 115.75 221.265 116.845 219.702 115.409C219.269 115.014 219.067 114.402 219.124 113.827C219.161 113.404 219.288 113.05 219.472 112.746Z" fill="#8CCFCB"/>
</g>
<mask id="mask101_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask101_197_8457)">
<path d="M293.287 193.421C293.287 195.003 283.177 196.287 270.713 196.287C258.245 196.287 248.14 195.003 248.14 193.421C248.14 191.838 258.245 190.555 270.713 190.555C283.181 190.56 293.287 191.838 293.287 193.421Z" fill="#E2F4F4"/>
</g>
<mask id="mask102_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask102_197_8457)">
<path d="M260.881 191.052C261.451 190.638 262.317 190.734 262.947 190.633C264.016 190.458 265.117 189.874 266.153 189.502C266.153 189.502 269.96 189.267 270.017 189.442C270.186 189.98 270.798 191.967 270.483 192.561C270.191 193.117 268.567 193.085 268.567 193.085L262.401 193.26C261.705 193.278 261.041 192.846 260.721 192.101C260.552 191.714 260.523 191.314 260.881 191.052Z" fill="#2A3C65"/>
</g>
<mask id="mask103_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask103_197_8457)">
<path d="M271.311 154.532H265.71L266.148 189.506C268.652 190.56 270.012 189.446 270.012 189.446L271.311 154.532Z" fill="#BCD2D2"/>
</g>
<mask id="mask104_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask104_197_8457)">
<path d="M265.47 191.466C266.035 191.052 266.906 191.148 267.536 191.047C268.605 190.872 269.706 190.288 270.742 189.916C270.742 189.916 274.549 189.681 274.606 189.856C274.775 190.394 275.387 192.381 275.072 192.975C274.78 193.531 273.156 193.499 273.156 193.499L266.99 193.674C266.294 193.692 265.63 193.26 265.31 192.515C265.136 192.128 265.108 191.728 265.47 191.466Z" fill="#344873"/>
</g>
<mask id="mask105_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask105_197_8457)">
<path d="M269.226 154.772L277.331 154.238C277.331 154.238 277.604 156.667 276.884 159.671C275.91 163.742 276.065 167.56 275.891 171.759C275.585 179.064 274.601 189.911 274.601 189.911C273.184 191.084 270.737 189.916 270.737 189.916L269.226 154.772Z" fill="#CBE2E2"/>
</g>
<mask id="mask106_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask106_197_8457)">
<path d="M278.701 155.733C276.601 150.25 279.002 140.475 277.1 135.222C276.055 132.328 273.688 130.511 270.445 130.502H270.398C270.389 130.502 270.384 130.502 270.374 130.502C270.365 130.502 270.36 130.502 270.351 130.502H270.304C267.541 130.511 266.962 134.007 266.138 135.985C265.724 136.988 265.056 138.083 265.07 139.191C265.084 140.245 265.677 141.077 266.388 141.827C266.209 146.39 266.233 151.299 264.726 155.236C263.7 157.927 279.731 158.424 278.701 155.733Z" fill="#DD4757"/>
</g>
<mask id="mask107_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask107_197_8457)">
<path d="M271.739 120.75C270.916 120.502 270.021 120.515 269.198 120.842C268.379 121.164 267.485 121.886 267.786 122.769C266.722 122.714 265.522 122.834 264.877 123.768C264.444 124.398 264.515 125.18 265.037 125.7C263.498 126.679 263.903 128.851 265.602 129.329C264.435 130.525 266.515 132.397 268.007 131.983C268.064 132.701 268.793 132.981 269.556 133.004C270.803 133.046 271.739 131.896 271.739 131.896V120.75Z" fill="#1A2641"/>
</g>
<mask id="mask108_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask108_197_8457)">
<path d="M273.024 123.409C272.262 122.884 270.271 122.779 268.854 122.769C267.96 122.765 267.193 123.367 266.995 124.223C266.732 125.373 266.571 127.006 266.463 127.609C266.087 129.692 268.078 130.543 268.995 130.645C268.986 130.668 269.254 132.071 269.033 133.391C268.901 134.168 271.829 132.857 271.951 132.25C272.488 129.637 273.796 123.942 273.024 123.409Z" fill="#AE4C33"/>
</g>
<mask id="mask109_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask109_197_8457)">
<path d="M270.059 126.891C269.974 126.845 269.876 126.817 269.796 126.804C269.504 126.748 268.732 126.877 268.868 127.319C268.892 127.388 268.944 127.434 268.995 127.471C269.245 127.618 269.617 127.622 269.89 127.563C270.05 127.526 270.219 127.438 270.271 127.273C270.323 127.093 270.21 126.969 270.059 126.891Z" fill="#A14027"/>
</g>
<mask id="mask110_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask110_197_8457)">
<path d="M267.814 127.415C267.739 127.42 267.64 127.438 267.569 127.392C267.852 126.859 268.111 126.118 267.913 125.557C267.748 125.097 267.358 124.784 266.882 124.747C266.873 124.803 266.859 124.858 266.849 124.913C267.372 124.941 267.739 125.364 267.814 125.874C267.88 126.334 267.621 126.951 267.39 127.365C267.287 127.406 267.626 127.751 267.814 127.737C268.026 127.719 268.026 127.402 267.814 127.415Z" fill="#A14027"/>
</g>
<mask id="mask111_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask111_197_8457)">
<path d="M267.146 125.695C267.136 125.686 267.132 125.681 267.122 125.672C266.934 125.543 266.76 126.173 267.061 126.15C267.24 126.137 267.249 125.81 267.146 125.695Z" fill="#311E16"/>
</g>
<mask id="mask112_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask112_197_8457)">
<path d="M269.184 125.87C269.174 125.861 269.17 125.856 269.16 125.847C268.972 125.718 268.798 126.348 269.099 126.325C269.273 126.311 269.283 125.985 269.184 125.87Z" fill="#311E16"/>
</g>
<mask id="mask113_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask113_197_8457)">
<path d="M270.916 152.78C271.226 152.559 271.49 152.329 271.777 152.136C271.998 152.329 272.422 153.102 273.349 153.525C273.349 153.525 272.733 154.04 272.723 154.049C272.742 154.082 272.836 154.404 272.77 154.721C272.601 155.563 271.391 155.912 270.695 156.092C270.017 156.267 268.892 155.876 268.892 155.876C269.315 155.195 269.932 154.9 269.226 154.776L268.661 155.416C268.266 153.98 269.781 153.001 270.916 152.78Z" fill="#AE4C33"/>
</g>
<mask id="mask114_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask114_197_8457)">
<path d="M271.575 150.687C271.989 149.896 272.86 149.21 273.575 148.667C274.69 147.816 275.476 146.584 275.811 145.24C276.55 142.273 275.34 139.081 273.9 136.505C273.311 135.456 273.514 132.098 274.385 132.31C276.545 132.839 278.324 136.528 279.623 139.348C281.176 142.729 281.694 147.103 278.917 150.015C277.354 151.653 276.408 153.944 273.975 153.829C273.213 153.792 272.445 153.493 271.942 152.932C271.212 152.122 271.222 151.363 271.575 150.687Z" fill="#DD4757"/>
</g>
<mask id="mask115_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask115_197_8457)">
<path d="M271.575 150.687C271.989 149.896 272.86 149.21 273.575 148.667C274.69 147.816 275.477 146.584 275.811 145.24C276.55 142.273 275.34 139.081 273.9 136.505C273.89 136.487 273.881 136.464 273.867 136.445C277.166 139.886 278.381 145.112 274.987 148.833C273.89 150.038 271.645 151.312 273.086 153.125C273.377 153.493 273.749 153.718 274.154 153.833C274.093 153.833 274.032 153.833 273.97 153.829C273.208 153.792 272.441 153.493 271.937 152.932C271.212 152.122 271.222 151.363 271.575 150.687Z" fill="#C73848"/>
</g>
<mask id="mask116_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask116_197_8457)">
<path d="M279.303 125.276C279.821 124.757 279.896 123.975 279.463 123.344C278.818 122.411 277.618 122.291 276.554 122.346C276.856 121.463 275.957 120.741 275.142 120.419C274.055 119.991 272.855 120.101 271.843 120.635C271.165 119.683 269.386 119.775 269.127 120.732C267.626 120.313 266.19 121.173 266.873 123.423C266.953 123.685 268.84 123.933 270.087 124.057C271.132 124.163 271.895 125.12 271.683 126.127L271.579 126.601C271.73 126.321 272.027 125.493 272.577 125.658C272.822 125.732 273.034 125.911 273.086 126.15C273.227 126.79 272.37 127.277 271.81 127.31C271.476 127.328 271.193 127.825 271.132 128.092C271.043 128.478 271.156 128.846 271.208 129.228C271.25 129.568 271.09 129.697 270.986 130.01C270.855 130.415 270.826 130.842 271.057 131.215C271.495 131.928 270.596 132.935 271.688 133.354C272.375 133.616 273.015 133.216 273.537 132.793C273.796 133.391 274.545 133.506 275.166 133.239C275.867 132.94 276.272 132.278 276.333 131.56C277.825 131.974 279.905 130.102 278.738 128.906C280.437 128.432 280.837 126.256 279.303 125.276Z" fill="#1A2641"/>
</g>
<mask id="mask117_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask117_197_8457)">
<path d="M270.45 128.239C270.487 128.05 270.191 128.418 269.334 127.668C268.901 127.291 268.487 127.001 268.228 126.836C268.054 126.721 267.842 126.67 267.635 126.684C267.353 126.702 267.099 126.721 266.506 126.836C266.388 126.859 265.752 129.945 268.275 130.507C270.365 130.971 270.285 129.035 270.45 128.239Z" fill="white"/>
</g>
<mask id="mask118_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask118_197_8457)">
<path d="M270.054 128.552L271.702 126.656L270.172 128.639L270.054 128.552Z" fill="white"/>
</g>
<mask id="mask119_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask119_197_8457)">
<path d="M268.063 127.075C268.007 127.038 267.941 127.006 267.871 126.992C267.8 126.974 267.729 126.965 267.654 126.969C267.452 126.983 266.849 127.319 266.849 127.319C267.16 127.273 267.414 127.245 267.579 127.236C267.654 127.231 267.725 127.241 267.795 127.259C267.866 127.277 267.927 127.305 267.988 127.342C268.209 127.484 268.525 127.701 268.864 127.981C268.868 127.981 268.327 127.245 268.063 127.075Z" fill="#3D6CF3"/>
</g>
<mask id="mask120_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask120_197_8457)">
<path d="M267.965 130.148C267.226 129.398 267.588 127.977 267.786 127.494C267.701 128.004 267.612 129.416 267.965 130.148Z" fill="#09104F"/>
</g>
<mask id="mask121_197_8457" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask121_197_8457)">
<path d="M238.967 186.088C238.967 185.9 239.88 183.241 238.44 181.833C238.981 181.314 239.127 181.005 239.31 180.306C239.461 180.513 239.621 180.679 239.663 180.522C239.856 179.814 239.866 179.124 239.706 178.462C239.725 178.485 240.195 178.563 240.186 178.37C240.096 176.957 237.498 174.892 237.673 175.168C238.553 176.571 239.687 180.352 237.578 181.364C236.971 181.281 235.065 181.111 233.738 181.111C230.09 181.111 228.749 181.521 226.574 177.946C226.005 177.008 225.944 175.964 225.553 174.956C225.671 174.437 224.56 172.017 224.094 171.874C223.821 171.792 223.703 173.567 223.703 173.567C223.628 173.567 223.228 173.549 223.157 173.553C223.058 172.969 222.418 172.33 222.108 172.141C221.915 172.026 221.9 173.365 221.938 173.825C221.355 174.124 221.138 174.607 220.639 175.048C219.99 175.619 219.076 175.738 218.559 175.761C218.323 175.771 218.126 175.936 218.069 176.157C217.933 176.714 217.702 177.666 217.693 177.739C217.57 178.696 219.98 179.998 222.211 178.866C222.658 180.104 222.621 180.688 222.847 181.981C223.058 183.2 223.27 184.432 223.802 185.564C224.259 186.535 224.946 187.39 225.896 187.928C226.127 188.057 226.386 188.172 226.584 188.356C226.777 188.536 227.12 190.877 226.984 191.277C226.913 191.484 225.567 191.59 225.689 191.976C225.774 192.243 226.471 192.243 226.955 192.229C227.247 192.22 228.542 192.243 228.739 191.976C228.932 191.714 228.777 191.01 228.786 190.707C228.8 190.215 229.577 187.432 229.577 187.432H234.98C235.004 189.373 236.872 190.702 236.872 190.702C236.995 190.941 237.385 191.618 237.084 191.838C237.009 191.889 236.919 191.912 236.83 191.935C236.491 192.027 235.625 192.39 236.331 192.597C236.679 192.699 237.145 192.699 237.503 192.657C237.823 192.616 238.647 192.565 238.859 192.289C237.969 187.349 238.986 188.186 238.967 186.088Z" fill="#232F49"/>
</g>
<path d="M227.125 178.098C226.094 179.694 223.807 180.923 221.891 180.619L221.99 182.105C224.296 182.468 226.645 180.794 227.902 178.857L227.125 178.098Z" fill="#F2CF31"/>
<path d="M229.064 179.814C228.278 179.814 227.501 179.777 226.739 179.694C226.607 179.681 226.508 179.566 226.522 179.432C226.537 179.303 226.654 179.202 226.791 179.221C234.373 179.993 243.156 176.829 252.899 169.804C260.608 164.243 266.755 157.757 269.174 154.799C269.259 154.698 269.414 154.68 269.518 154.762C269.621 154.845 269.64 154.997 269.556 155.098C267.122 158.074 260.942 164.597 253.19 170.186C244.318 176.585 236.213 179.814 229.064 179.814Z" fill="#F2CF31"/>
</g>
</svg>
`;
