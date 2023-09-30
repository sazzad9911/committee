import React, { useEffect } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../../components/main/Avatar";
import { setIsBn } from "../../data/isBn";
import { setIsDark } from "../../data/isDark";
import { AppColors } from "../../functions/colors";
import localStorage from "../../functions/localStorage";
import { AppValues } from "../../functions/values";
import mainStyle from "../../styles/mainStyle";

export default function Profile({ navigation }) {
  const inset = useSafeAreaInsets();
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);
  const user = useSelector((state) => state.user);
  const colors = new AppColors(isDark);
  const textColor = colors.getTextPrimaryColor();
  const borderColor = colors.getBorderColor();
  const subTextColor = colors.getSubTextColor();
  const values = new AppValues(isBn);
  const backgroudColor = colors.getBackgroundColor();
  const createCommitteeValues = values.createCommitteeValues();
  const dispatch = useDispatch();

  const color = `<svg width="40" height="19" viewBox="0 0 40 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.0577 1.51485C15.9979 1.95464 15.1346 2.54435 14.3181 3.38395C13.0449 4.69332 12.295 6.24924 12.0484 8.09169C11.9817 8.58811 11.985 9.64427 12.0517 10.1607C12.3683 12.5695 13.6615 14.6519 15.6779 15.9946C16.8577 16.7842 18.3476 17.2706 19.7607 17.3372C21.2739 17.4039 22.5737 17.1407 23.8669 16.5043C24.7001 16.0945 25.2933 15.6747 25.9633 15.025C26.8098 14.2021 27.4164 13.3125 27.8464 12.253C28.0597 11.7299 28.053 11.4667 27.813 11.2802C27.6197 11.1269 27.5064 11.1269 27.0065 11.2735C26.1632 11.5167 25.67 11.59 24.8667 11.59C23.7435 11.59 22.8037 11.3701 21.7838 10.8803C20.3306 10.1773 19.1608 9.01124 18.4675 7.57527C17.9743 6.54576 17.7543 5.60288 17.7543 4.48009C17.7543 3.67714 17.8276 3.18405 18.0709 2.34112C18.2176 1.84136 18.2176 1.72808 18.0643 1.53484C17.8743 1.29162 17.6043 1.28496 17.0577 1.51485ZM16.7844 2.95416C16.6778 3.4206 16.6244 4.33349 16.6678 4.9532C16.8044 6.97556 17.591 8.77136 18.9675 10.1907C20.1973 11.4567 21.7171 12.2563 23.5236 12.5829C23.9102 12.6528 24.0435 12.6595 24.9167 12.6562C25.6333 12.6528 25.9566 12.6395 26.1666 12.6028C26.3232 12.5729 26.4565 12.5562 26.4632 12.5629C26.4832 12.5829 26.1666 13.0793 25.9199 13.4091C24.7934 14.9184 23.037 15.9412 21.1405 16.1911C20.7039 16.2478 19.844 16.2578 19.4341 16.2078C18.6542 16.1112 17.851 15.8813 17.161 15.5481C14.9347 14.4819 13.4348 12.383 13.1349 9.91081C13.0849 9.50101 13.0949 8.64142 13.1516 8.20496C13.4282 6.08932 14.658 4.18023 16.4611 3.06077C16.6211 2.96415 16.7611 2.88086 16.7778 2.88086C16.7911 2.88086 16.7944 2.91418 16.7844 2.95416Z"  fill="${textColor}"/>
</svg>
`;
  const cmt = `<svg width="38" height="19" viewBox="0 0 38 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.5218 14.3473C16.3892 14.3473 16.2566 14.3069 16.1519 14.2204C16.0546 14.139 16 14.0292 16 13.9147C16 13.8002 16.0546 13.6904 16.1519 13.609L20.702 9.84837C21.037 9.57152 21.037 9.12162 20.702 8.84477L16.1519 5.08413C16.0546 5.00273 16 4.89289 16 4.77844C16 4.66398 16.0546 4.55415 16.1519 4.47274C16.3543 4.30547 16.6893 4.30547 16.8917 4.47274L21.4417 8.23337C21.7976 8.52753 22 8.92552 22 9.34657C22 9.76762 21.8046 10.1656 21.4417 10.4598L16.8917 14.2204C16.787 14.3011 16.6544 14.3473 16.5218 14.3473Z" fill="${textColor}" fill-opacity="0.4"/>
<path d="M15.9915 14.4122L15.9927 14.4131C16.1485 14.5419 16.3398 14.5973 16.5218 14.5973C16.7107 14.5973 16.8968 14.5322 17.0444 14.4183L17.0444 14.4185L17.0509 14.4131L21.5991 10.654C21.5995 10.6537 21.5998 10.6534 21.6001 10.6532C22.0157 10.3158 22.25 9.84908 22.25 9.34657C22.25 8.84156 22.0067 8.37599 21.601 8.04067L17.0509 4.28004C16.7561 4.03637 16.2875 4.03637 15.9927 4.28004L15.9927 4.28004L15.9915 4.28097C15.8444 4.40404 15.75 4.58131 15.75 4.77844C15.75 4.97556 15.8444 5.15283 15.9915 5.27591L15.9915 5.27591L15.9927 5.27683L20.5427 9.03747C20.6572 9.13213 20.7032 9.2451 20.7032 9.34657C20.7032 9.44804 20.6572 9.561 20.5427 9.65567L15.9927 13.4163L15.9927 13.4163L15.9915 13.4172C15.8444 13.5403 15.75 13.7176 15.75 13.9147C15.75 14.1118 15.8444 14.2891 15.9915 14.4122Z" stroke="white" stroke-opacity="0.2" stroke-width="0.5"/>
</svg>
`;

  return (
    <ScrollView
      style={{ backgroundColor: backgroudColor }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={[
          {
            marginTop: inset?.top,
          },
          mainStyle.pdH20,
        ]}
      >
        <View
          style={[
            mainStyle.flexBox,
            { marginBottom: 40, alignItems: "center" },
          ]}
        >
          <Avatar
            style={mainStyle.mt12}
            url={
              "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg"
            }
          />
          <View
            style={{
              flex: 1,
              marginHorizontal: 12,
              justifyContent: "center",
            }}
          >
            <Text style={[mainStyle.subLevel, { color: textColor }]}>
              {user.user.name}
            </Text>
            <Text style={{ fontSize: 10, color: textColor }}>
              {user.user.gender}
            </Text>
          </View>
          <Pressable
            onPress={() => {
              navigation?.navigate("EditProfileInfo", {
                user: user?.user,
              });
            }}
          >
            <SvgXml xml={editIcon} />
          </Pressable>
        </View>
        <View
          style={{
            borderColor: borderColor,
            borderWidth: 1,
            borderRadius: 8,
            marginLeft: 0,
          }}
        >
          <Clickable
            subTextColor={subTextColor}
            border={borderColor}
            color={textColor}
            subTitle={user.user?.phone || "-"}
            title={createCommitteeValues.mobile}
          />
          <Clickable
            canGo={true}
            subTextColor={subTextColor}
            border={borderColor}
            color={textColor}
            subTitle={user.user?.email || "-"}
            title={"E-mail"}
            onPress={() =>
              navigation.navigate("EditEmail", {
                user: user?.user,
              })
            }
          />
          <Clickable
            canGo={true}
            subTextColor={subTextColor}
            border={borderColor}
            color={textColor}
            subTitle={`${user.user?.address?.division}, ${user.user?.address?.district}, ${user.user?.address?.area}`}
            title={createCommitteeValues.address}
            onPress={() => navigation.navigate("EditAddress")}
          />
          <Clickable
            bottom={true}
            canGo={true}
            subTextColor={subTextColor}
            border={borderColor}
            color={textColor}
            subTitle={"Your rights, our legal duty!"}
            title={"Legal"}
            onPress={() => navigation.navigate("Legal")}
          />
        </View>
        <View
          style={{
            borderColor: borderColor,
            borderWidth: 1,
            borderRadius: 8,
            marginLeft: 0,
            marginTop: 12,
            marginBottom: 32,
          }}
        >
          <Clickable
            onPress={() => {
              navigation?.navigate("CommitteeList");
            }}
            subTextColor={subTextColor}
            border={borderColor}
            color={textColor}
            icon={cmt}
            title={"Comity"}
          />
          <Clickable
            onPress={() => {
              navigation?.navigate("Support");
            }}
            subTextColor={subTextColor}
            border={borderColor}
            color={textColor}
            icon={cmt}
            title={"Support"}
          />
          <Clickable
            onPress={() => {
              navigation?.navigate("ContactUs");
            }}
            subTextColor={subTextColor}
            border={borderColor}
            color={textColor}
            icon={cmt}
            title={"Contact Us"}
          />
          <Clickable
            onPress={() => {
              dispatch({ type: "SET_USER", value: null });
              localStorage.logout();
            }}
            subTextColor={subTextColor}
            border={borderColor}
            color={textColor}
            title={"Log Out"}
          />
          <Clickable
            icon={color}
            subTextColor={subTextColor}
            border={borderColor}
            color={textColor}
            onPress={() => {
              localStorage.setDark(isDark ? false : true);
              dispatch(setIsDark(isDark ? false : true));
            }}
            title={"Dark mode"}
          />
          <Clickable
            bottom={true}
            icon={cmt}
            subTextColor={subTextColor}
            border={borderColor}
            color={textColor}
            onPress={() => navigation?.navigate("LanguageScreen")}
            title={!isBn ? "English" : "Bangla"}
          />
        </View>
      </View>
    </ScrollView>
  );
}
export const Clickable = ({
  onPress,
  title,
  subTitle,
  color,
  subTextColor,
  border,
  canGo,
  bottom,
  icon,
  active,
  activeColor,
}) => {
  const right = `<svg width="38" height="33" viewBox="0 0 38 33" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.5218 21.3473C16.3892 21.3473 16.2566 21.3069 16.1519 21.2204C16.0546 21.139 16 21.0292 16 20.9147C16 20.8002 16.0546 20.6904 16.1519 20.609L20.702 16.8484C21.037 16.5715 21.037 16.1216 20.702 15.8448L16.1519 12.0841C16.0546 12.0027 16 11.8929 16 11.7784C16 11.664 16.0546 11.5541 16.1519 11.4727C16.3543 11.3055 16.6893 11.3055 16.8917 11.4727L21.4417 15.2334C21.7976 15.5275 22 15.9255 22 16.3466C22 16.7676 21.8046 17.1656 21.4417 17.4598L16.8917 21.2204C16.787 21.3011 16.6544 21.3473 16.5218 21.3473Z" fill="${color}" fill-opacity="0.6"/>
<path d="M15.9915 21.4122L15.9927 21.4131C16.1485 21.5419 16.3398 21.5973 16.5218 21.5973C16.7107 21.5973 16.8968 21.5322 17.0444 21.4183L17.0444 21.4185L17.0509 21.4131L21.5991 17.654C21.5994 17.6537 21.5998 17.6535 21.6001 17.6532C22.0157 17.3159 22.25 16.8491 22.25 16.3466C22.25 15.8416 22.0067 15.376 21.601 15.0407L17.0509 11.28C16.7561 11.0364 16.2875 11.0364 15.9927 11.28L15.9927 11.28L15.9915 11.281C15.8444 11.404 15.75 11.5813 15.75 11.7784C15.75 11.9756 15.8444 12.1528 15.9915 12.2759L15.9915 12.2759L15.9927 12.2768L20.5427 16.0375C20.6572 16.1321 20.7032 16.2451 20.7032 16.3466C20.7032 16.448 20.6572 16.561 20.5427 16.6557L15.9927 20.4163L15.9927 20.4163L15.9915 20.4172C15.8444 20.5403 15.75 20.7176 15.75 20.9147C15.75 21.1118 15.8444 21.2891 15.9915 21.4122Z" stroke="white" stroke-opacity="0.2" stroke-width="0.5"/>
</svg>
`;
  return (
    <Pressable
      style={{
        marginTop: 16,
        marginLeft: 12,
        paddingBottom: 16,
        borderBottomColor: border,
        borderBottomWidth: bottom ? 0 : 1,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
      onPress={onPress}
    >
      <View>
        <Text style={{ color: active ? activeColor : color, fontSize: 14 }}>
          {title}
        </Text>
        {subTitle && (
          <Text style={{ color: subTextColor, fontSize: 12, marginTop: 3 }}>
            {subTitle}
          </Text>
        )}
      </View>
      {canGo && <SvgXml xml={right} />}
      {icon && <SvgXml xml={icon} />}
    </Pressable>
  );
};

const editIcon = `<svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.99967 10.3472C11.1047 10.3472 12.1646 9.90826 12.946 9.12686C13.7274 8.34546 14.1663 7.28565 14.1663 6.18058C14.1663 5.07551 13.7274 4.01571 12.946 3.2343C12.1646 2.4529 11.1047 2.01392 9.99967 2.01392C8.89461 2.01392 7.8348 2.4529 7.0534 3.2343C6.27199 4.01571 5.83301 5.07551 5.83301 6.18058C5.83301 7.28565 6.27199 8.34546 7.0534 9.12686C7.8348 9.90826 8.89461 10.3472 9.99967 10.3472Z" stroke="#59A7D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.0085 13.464L13.0585 16.414C12.9419 16.5306 12.8335 16.7473 12.8085 16.9056L12.6502 18.0306C12.5919 18.439 12.8752 18.7223 13.2835 18.664L14.4085 18.5056C14.5669 18.4806 14.7919 18.3723 14.9002 18.2556L17.8502 15.3056C18.3585 14.7973 18.6002 14.2056 17.8502 13.4556C17.1085 12.714 16.5169 12.9556 16.0085 13.464Z" stroke="#59A7D6" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.583 13.8889C15.833 14.7889 16.533 15.4889 17.433 15.7389" stroke="#59A7D6" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.8418 18.6806C2.8418 15.4556 6.05013 12.8473 10.0001 12.8473C10.8668 12.8473 11.7001 12.9723 12.4751 13.2056" stroke="#59A7D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
