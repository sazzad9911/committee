import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";
import { useSelector, useDispatch } from "react-redux";
const { width, height } = Dimensions.get("window");
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  useIsFocused,
} from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { DataTable, FAB } from "react-native-paper";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { AppColors } from "../../functions/colors";
import SquireCard from "../../components/cart/SquireCard";
import FlatCard from "../../components/cart/FlatCard";
import ProfilePicture from "../../components/main/ProfilePicture";
import { AppValues } from "../../functions/values";
import loader from "../../data/loader";
import { deletes, post } from "../../apis/multipleApi";
import toast from "../../data/toast";
import RadioButton from "../../components/main/RadioButton";
import mainStyle from "../../styles/mainStyle";

const Tab = createMaterialTopTabNavigator();

export default function UserProfile({ navigation, route }) {
  const isDark = useSelector((state) => state.isDark);
  const colors = new AppColors(isDark);
  const textColor = colors.getTextColor();
  const primaryColor = colors.getMainColor();
  const assentColor = colors.getShadowColor();
  const ref = React.useRef();
  const inset = useSafeAreaInsets();
  const data = route?.params?.data;
  const isBn = useSelector((state) => state.isBn);
  const values = new AppValues(isBn);
  const headlines = values.getValues();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const comity = useSelector((state) => state.comity);

  console.log(data);
  //console.log(user)
  const styles = StyleSheet.create({
    subContainer: {
      paddingVertical: 16,
      paddingHorizontal: 12,
      borderRadius: 12,
      marginTop: 20,
      paddingRight: 0,
      backgroundColor: colors.getSchemeColor(),
    },
  });

  return (
    <View
      style={{
        flex: 1,
        paddingTop: inset?.top,
        alignItems: "center",
        backgroundColor: colors.getBackgroundColor(),
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <SvgXml
            onPress={() => navigation.goBack()}
            style={{ marginTop: 12 }}
            xml={back}
          />
          <ProfilePicture
            containerStyle={{ marginTop: 12 }}
            edit={false}
            source={{
              uri: data?.profilePhoto,
            }}
          />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("EditMemberInfo", { member: data })
            }
          >
            <SvgXml style={{ marginTop: 12 }} xml={edit} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 20,
            alignItems: "center",
            flex: 1,
            paddingHorizontal: 40,
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              fontSize: 32,
              fontWeight: "500",
              flex: 1,
              color: colors.getTextColor(),
            }}
          >
            {data?.name || data?.user?.name}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              color: colors.getTextColor(),
            }}
          >
            {data?.gender || data?.user?.gender}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              color: colors.getTextColor(),
            }}
          >
            {data?.position}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            justifyContent: "center",
          }}
        >
          <SquireCard
            onPress={() => {
              navigation.navigate("MemberSubs", {
                userId: data.userId,
                memberId: data.id,
              });
            }}
            title={isBn ? "চাঁদা" : "Subscription"}
            icon={cart}
          />

          {data.userId && (
            <SquireCard
              onPress={async () => {
                dispatch(loader.show());
                try {
                  const res = await post(
                    "/chat/conversation/create",
                    {
                      userId: data.userId,
                      comityId: comity.id,
                    },
                    user.token
                  );
                  navigation.navigate("ChatScreen", {
                    conversationId: res.data.conversation.id,
                    data: res.data.conversation,
                  });
                  dispatch(loader.hide());
                } catch (e) {
                  console.error(e.message);
                  dispatch(loader.hide());
                  dispatch(toast.error("Error loading"));
                }
              }}
              style={{
                marginHorizontal: 24,
              }}
              title={isBn ? "চ্যাট" : "Message"}
              icon={love}
            />
          )}
        </View>
        <View style={styles.subContainer}>
          <FlatCard
            onPress={() => {
              //navigation.navigate("Mobile");
            }}
            style={{ paddingTop: 0 }}
            icon={call}
            title={headlines._mobile}
            value={data?.mobile || data?.user?.mobile || "N/A"}
            type={"Private"}
            disableGo={true}
            Private={false}
          />
          <FlatCard
            onPress={() => {
              //navigation.navigate("Email");
            }}
            icon={email}
            title={headlines._email}
            type={"Private"}
            value={data?.email || data?.user?.email || "N/A"}
            disableGo={true}
            Private={false}
          />
          <FlatCard
            onPress={() => {
              //console.log(user?.user)
              //navigation.navigate("UserLocation");
            }}
            icon={location}
            title={headlines._address}
            type={"Private"}
            disableGo={true}
            value={data?.address || data?.user?.address?.address || "N/A"}
            Private={data?.addressIsPublic}
            style={{ borderBottomWidth: 0, paddingBottom: 0 }}
          />
        </View>
        {!data?.userId && (
          <View style={[styles.subContainer, { marginBottom: 20 }]}>
            <FlatCard
              onPress={() => {
                navigation.navigate("MemberList", { id: data.id });
              }}
              icon={addIcon}
              title={headlines._addHisComityAccount}
              type={""}
              color="red"
              style={{
                borderBottomWidth: 0,
                paddingTop: 0,
                paddingBottom: 0,
                color: "red",
              }}
            />
          </View>
        )}
        <View style={[styles.subContainer, { marginBottom: 20 }]}>
          <FlatCard
            onPress={() => {
              navigation.navigate("DeleteMemberConfirmation", { data: data });
            }}
            icon={noteIcon}
            title={headlines._deleteThisAccount}
            type={""}
            color="red"
            style={{
              borderBottomWidth: 0,
              paddingTop: 0,
              paddingBottom: 0,
              color: "red",
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const noteIcon = `<svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="24" height="26" rx="4" fill="#FF0000"/>
<path d="M20 5H16L14.8571 4H9.14286L8 5H4V7H20M5.14286 20C5.14286 20.5304 5.38367 21.0391 5.81233 21.4142C6.24098 21.7893 6.82236 22 7.42857 22H16.5714C17.1776 22 17.759 21.7893 18.1877 21.4142C18.6163 21.0391 18.8571 20.5304 18.8571 20V8H5.14286V20Z" fill="white"/>
</svg>
`;
const addIcon = `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="28" height="28" rx="4" fill="#65C466"/>
<path d="M14 4C8.47826 4 4 8.47826 4 14C4 19.5217 8.47826 24 14 24C19.5217 24 24 19.5217 24 14C24 8.47826 19.5217 4 14 4ZM14.8043 22.2174C14.7609 22.2174 14.7174 22.2174 14.6522 22.2391V17.5217C15.7826 17.5 16.8043 17.4783 17.7391 17.413C16.913 19.9565 15.3696 21.6522 14.8043 22.2174ZM13.1957 22.2174C12.6087 21.6304 11.087 19.9348 10.2609 17.413C11.1739 17.4783 12.2174 17.5217 13.3478 17.5217V22.2391C13.3043 22.2391 13.2609 22.2174 13.1957 22.2174ZM5.73913 14C5.73913 13.4565 5.80435 12.913 5.8913 12.3913C6.36957 12.3043 7.28261 12.1739 8.56522 12.0435C8.45652 12.6739 8.3913 13.3261 8.3913 14.0217C8.3913 14.7174 8.45652 15.3696 8.54348 15.9783C7.28261 15.8478 6.34783 15.7174 5.86957 15.6304C5.80435 15.087 5.73913 14.5435 5.73913 14ZM9.71739 14C9.71739 13.2609 9.80435 12.5652 9.93478 11.913C10.9348 11.8478 12.0652 11.7826 13.3478 11.7826V16.2174C12.087 16.1957 10.9348 16.1522 9.91304 16.0652C9.80435 15.4348 9.71739 14.7391 9.71739 14ZM14.7826 5.78261C15.3696 6.36957 16.8696 8.1087 17.7174 10.587C16.8043 10.5217 15.7826 10.4783 14.6522 10.4783V5.76087C14.6957 5.76087 14.7391 5.78261 14.7826 5.78261ZM13.3478 5.76087V10.4783C12.2174 10.5 11.1957 10.5217 10.2826 10.587C11.1087 8.1087 12.6304 6.36957 13.1957 5.78261C13.2609 5.78261 13.3043 5.76087 13.3478 5.76087ZM14.6522 16.2174V11.7826C15.913 11.8043 17.0652 11.8478 18.0652 11.913C18.1957 12.5652 18.2826 13.2609 18.2826 14C18.2826 14.7391 18.2174 15.4348 18.087 16.087C17.087 16.1522 15.9348 16.1957 14.6522 16.2174ZM19.413 12.0435C20.6957 12.1739 21.6087 12.3043 22.087 12.3913C22.1957 12.913 22.2609 13.4565 22.2609 14C22.2609 14.5435 22.1957 15.087 22.1087 15.6087C21.6304 15.6957 20.7174 15.8261 19.4348 15.9565C19.5435 15.3261 19.587 14.6739 19.587 13.9783C19.587 13.3261 19.5217 12.6522 19.413 12.0435ZM21.6957 11C21.087 10.913 20.2174 10.8043 19.1087 10.6957C18.587 8.82609 17.6739 7.32609 16.913 6.26087C19.1087 7.08696 20.8478 8.82609 21.6957 11ZM11.087 6.26087C10.3043 7.30435 9.41304 8.80435 8.8913 10.6739C7.80435 10.7609 6.93478 10.8913 6.30435 10.9783C7.15217 8.82609 8.91304 7.08696 11.087 6.26087ZM6.30435 17C6.91304 17.087 7.78261 17.1957 8.86957 17.3043C9.3913 19.1739 10.2609 20.6739 11.0435 21.7174C8.86957 20.8696 7.15217 19.1522 6.30435 17ZM16.9565 21.7174C17.7391 20.6739 18.6087 19.1957 19.1304 17.3261C20.2174 17.2391 21.087 17.1087 21.6957 17.0217C20.8478 19.1522 19.1304 20.8696 16.9565 21.7174Z" fill="white"/>
</svg>
`;

const cart = `<svg width="57" height="52" viewBox="0 0 57 52" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.5 8C0.5 3.58172 4.08172 0 8.5 0H48.5C52.9183 0 56.5 3.58172 56.5 8V44C56.5 48.4183 52.9183 52 48.5 52H8.5C4.08172 52 0.5 48.4183 0.5 44V8Z" fill="#4ADE80"/>
<path d="M17.6543 14.2726C18.2321 11.5948 22.7314 11.1906 24.0575 13.5569C24.4553 16.1168 24.2564 18.7188 24.247 21.2956C30.3187 21.2956 36.3999 21.2872 42.4716 21.3124C42.4811 21.885 42.4905 23.0387 42.5 23.6197C36.4188 23.6113 30.3376 23.6197 24.2659 23.6113C24.3606 27.2154 23.9628 30.8448 24.4553 34.432C25.8762 38.4993 33.2077 38.7098 35.4147 35.1141C35.9357 33.8847 35.7273 32.5458 35.8031 31.2658C33.3593 31.9816 30.0913 33.0173 28.1874 30.8027C25.9709 28.6385 29.1157 25.7249 31.8058 26.0028C36.7788 26.4575 40.7666 31.8637 38.3796 36.0067C34.9506 41.6402 23.9628 41.2613 21.3674 35.1983C20.477 31.4005 21.0927 27.4765 20.9506 23.6281C18.8193 23.6113 16.6976 23.6113 14.5663 23.6029C14.5474 23.0303 14.5189 21.8766 14.5 21.304C16.6407 21.304 18.7909 21.2956 20.9411 21.2872C20.9317 19.8977 20.9317 18.4999 20.9127 17.102C19.7003 16.3442 17.6637 15.8894 17.6543 14.2726Z" fill="#F3F6F9" stroke="white" stroke-width="0.5"/>
</svg>
`;
const love = `<svg width="56" height="52" viewBox="0 0 56 52" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 8C0 3.58172 3.58172 0 8 0H48C52.4183 0 56 3.58172 56 8V44C56 48.4183 52.4183 52 48 52H8C3.58172 52 0 48.4183 0 44V8Z" fill="#FF6C50"/>
<path d="M34.4 12H21.6C15.2 12 12 14.8 12 20.4V38.6C12 39.37 12.72 40 13.6 40H34.4C40.8 40 44 37.2 44 31.6V20.4C44 14.8 40.8 12 34.4 12ZM31.2 30.55H20C19.344 30.55 18.8 30.074 18.8 29.5C18.8 28.926 19.344 28.45 20 28.45H31.2C31.856 28.45 32.4 28.926 32.4 29.5C32.4 30.074 31.856 30.55 31.2 30.55ZM36 23.55H20C19.344 23.55 18.8 23.074 18.8 22.5C18.8 21.926 19.344 21.45 20 21.45H36C36.656 21.45 37.2 21.926 37.2 22.5C37.2 23.074 36.656 23.55 36 23.55Z" fill="white"/>
</svg>
`;
const call = `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="28" height="28" rx="4" fill="#65C466"/>
<path d="M13.0636 16.95L11.2108 18.8C10.8202 19.19 10.1993 19.19 9.7987 18.81C9.68853 18.7 9.57837 18.6 9.4682 18.49C8.45545 17.472 7.52138 16.3789 6.67401 15.22C5.85278 14.08 5.19179 12.94 4.71107 11.81C4.24036 10.67 4 9.58 4 8.54C4 7.86 4.12018 7.21 4.36054 6.61C4.6009 6 4.98147 5.44 5.51227 4.94C6.15323 4.31 6.85428 4 7.59539 4C7.87581 4 8.15623 4.06 8.40661 4.18C8.667 4.3 8.89735 4.48 9.07762 4.74L11.4011 8.01C11.5814 8.26 11.7116 8.49 11.8017 8.71C11.8918 8.92 11.9419 9.13 11.9419 9.32C11.9419 9.56 11.8718 9.8 11.7316 10.03C11.6014 10.26 11.4111 10.5 11.1708 10.74L10.4096 11.53C10.2994 11.64 10.2494 11.77 10.2494 11.93C10.2494 12.01 10.2594 12.08 10.2794 12.16C10.3095 12.24 10.3395 12.3 10.3595 12.36C10.5398 12.69 10.8503 13.12 11.2909 13.64C11.7416 14.16 12.2223 14.69 12.7431 15.22C12.8433 15.32 12.9534 15.42 13.0536 15.52C13.4542 15.91 13.4642 16.55 13.0636 16.95ZM24 20.33C23.9987 20.7074 23.9131 21.0798 23.7496 21.42C23.5794 21.78 23.359 22.12 23.0686 22.44C22.5779 22.98 22.0371 23.37 21.4261 23.62C21.4161 23.62 21.4061 23.63 21.3961 23.63C20.8052 23.87 20.1642 24 19.4732 24C18.4517 24 17.36 23.76 16.2083 23.27C15.0566 22.78 13.9049 22.12 12.7631 21.29C12.3726 21 11.982 20.71 11.6114 20.4L14.8863 17.13C15.1667 17.34 15.4171 17.5 15.6274 17.61C15.6775 17.63 15.7376 17.66 15.8077 17.69C15.8878 17.72 15.968 17.73 16.0581 17.73C16.2283 17.73 16.3585 17.67 16.4687 17.56L17.2298 16.81C17.4802 16.56 17.7206 16.37 17.9509 16.25C18.1813 16.11 18.4116 16.04 18.662 16.04C18.8523 16.04 19.0526 16.08 19.2729 16.17C19.4932 16.26 19.7236 16.39 19.974 16.56L23.2889 18.91C23.5493 19.09 23.7296 19.3 23.8398 19.55C23.9399 19.8 24 20.05 24 20.33Z" fill="white"/>
</svg>
`;
const email = `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="28" height="28" rx="4" fill="#59A7D6"/>
<path d="M5.4056 19.0194C5.57684 20.3787 6.69106 21.4525 8.07336 21.595C9.98612 21.7919 11.9685 22 14 22C16.0315 22 18.0139 21.7919 19.9266 21.595C21.3089 21.4525 22.4231 20.3787 22.5944 19.0194C22.7988 17.3964 23 15.718 23 14C23 12.282 22.7988 10.6036 22.5944 8.9807C22.4231 7.62138 21.3089 6.54755 19.9266 6.40513C18.0139 6.20807 16.0315 6 14 6C11.9685 6 9.9861 6.20807 8.07336 6.40513C6.69106 6.54755 5.57684 7.62138 5.40559 8.9807C5.20115 10.6036 5 12.282 5 14C5 15.718 5.20115 17.3964 5.4056 19.0194Z" fill="white" stroke="#09090A" stroke-linejoin="round"/>
<path d="M5.44531 8.61316L12.2164 13.8748C13.2622 14.6875 14.7369 14.6875 15.7827 13.8748L22.5537 8.61316" stroke="#09090A" stroke-linejoin="round"/>
</svg>
`;
const location = `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="28" height="28" rx="4" fill="#EB4E3D"/>
<path d="M21.7747 10.5366C20.8282 6.02927 17.1955 4 14.0045 4H13.9955C10.8135 4 7.17181 6.01951 6.22533 10.5268C5.17068 15.561 8.01914 19.8244 10.5972 22.5073C11.511 23.4646 12.7328 23.9998 14.0045 24C15.2304 24 16.4563 23.5024 17.4028 22.5073C19.9809 19.8244 22.8293 15.5707 21.7747 10.5366ZM14.0045 15.4244C13.6316 15.4244 13.2624 15.3449 12.9179 15.1905C12.5734 15.036 12.2604 14.8096 11.9967 14.5243C11.7331 14.2389 11.5239 13.9001 11.3812 13.5273C11.2385 13.1544 11.1651 12.7548 11.1651 12.3512C11.1651 11.9476 11.2385 11.548 11.3812 11.1752C11.5239 10.8023 11.7331 10.4635 11.9967 10.1782C12.2604 9.89279 12.5734 9.66642 12.9179 9.51198C13.2624 9.35754 13.6316 9.27805 14.0045 9.27805C14.7576 9.27805 15.4798 9.60183 16.0123 10.1782C16.5448 10.7545 16.844 11.5362 16.844 12.3512C16.844 13.1663 16.5448 13.9479 16.0123 14.5243C15.4798 15.1006 14.7576 15.4244 14.0045 15.4244Z" fill="white"/>
</svg>
`;
const edit = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 12C13.3261 12 14.5979 11.4732 15.5355 10.5355C16.4732 9.59785 17 8.32608 17 7C17 5.67392 16.4732 4.40215 15.5355 3.46447C14.5979 2.52678 13.3261 2 12 2C10.6739 2 9.40215 2.52678 8.46447 3.46447C7.52678 4.40215 7 5.67392 7 7C7 8.32608 7.52678 9.59785 8.46447 10.5355C9.40215 11.4732 10.6739 12 12 12Z" stroke="#59A7D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19.211 15.74L15.671 19.28C15.531 19.42 15.401 19.68 15.371 19.87L15.181 21.22C15.111 21.71 15.451 22.05 15.941 21.98L17.291 21.79C17.481 21.76 17.751 21.63 17.881 21.49L21.421 17.95C22.031 17.34 22.321 16.63 21.421 15.73C20.531 14.84 19.821 15.13 19.211 15.74Z" stroke="#59A7D6" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18.6992 16.25C18.9992 17.33 19.8392 18.17 20.9192 18.47" stroke="#59A7D6" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.41016 22C3.41016 18.13 7.26016 15 12.0002 15C13.0402 15 14.0402 15.15 14.9702 15.43" stroke="#59A7D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const back = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 19.5L7.5 12L15 4.5" stroke="#59A7D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
