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
            source={{ uri: user.user.profilePhoto }}
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
            title={createCommitteeValues.email}
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
            subTitle={
              `${user.user?.address?.division || ""}${
                user.user?.address?.district ? ", " : ""
              }${user.user?.address?.district || ""}${
                user.user?.address?.area ? ", " : ""
              }${user.user?.address?.area || ""}` ||
              `${isBn ? "আপনার ঠিকানা আপডেট করুন" : "Update your address"}`
            }
            title={createCommitteeValues.address}
            onPress={() => navigation.navigate("EditAddress")}
          />
          <Clickable
            bottom={true}
            canGo={true}
            subTextColor={subTextColor}
            border={borderColor}
            color={textColor}
            subTitle={createCommitteeValues.legalText}
            title={isBn ? "আইন" : "Legal"}
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
            title={createCommitteeValues.comity}
          />
          <Clickable
            onPress={() => {
              navigation?.navigate("Support");
            }}
            subTextColor={subTextColor}
            border={borderColor}
            color={textColor}
            icon={cmt}
            title={createCommitteeValues.support}
          />

          <Clickable
            onPress={() => {
              dispatch({ type: "SET_USER", value: null });
              localStorage.logout();
              navigation.navigate("LoginOrRegister")
            }}
            subTextColor={subTextColor}
            border={borderColor}
            color={textColor}
            icon={isDark ? logoutDark : logoutLight}
            title={createCommitteeValues.logout}
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
            title={
              isDark
                ? createCommitteeValues.lightMode
                : createCommitteeValues.darkMode
            }
          />
          <Clickable
            bottom={true}
            // icon={cmt}
            subTextColor={subTextColor}
            border={borderColor}
            color={textColor}
            icon={isDark ? langDark : langLight}
            onPress={() => navigation?.navigate("LanguageScreen")}
            title={!isBn ? "English" : "বাংলা"}
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
  outlineStyle,
}) => {
  const right = `<svg width="38" height="33" viewBox="0 0 38 33" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.5218 21.3473C16.3892 21.3473 16.2566 21.3069 16.1519 21.2204C16.0546 21.139 16 21.0292 16 20.9147C16 20.8002 16.0546 20.6904 16.1519 20.609L20.702 16.8484C21.037 16.5715 21.037 16.1216 20.702 15.8448L16.1519 12.0841C16.0546 12.0027 16 11.8929 16 11.7784C16 11.664 16.0546 11.5541 16.1519 11.4727C16.3543 11.3055 16.6893 11.3055 16.8917 11.4727L21.4417 15.2334C21.7976 15.5275 22 15.9255 22 16.3466C22 16.7676 21.8046 17.1656 21.4417 17.4598L16.8917 21.2204C16.787 21.3011 16.6544 21.3473 16.5218 21.3473Z" fill="${color}" fill-opacity="0.6"/>
<path d="M15.9915 21.4122L15.9927 21.4131C16.1485 21.5419 16.3398 21.5973 16.5218 21.5973C16.7107 21.5973 16.8968 21.5322 17.0444 21.4183L17.0444 21.4185L17.0509 21.4131L21.5991 17.654C21.5994 17.6537 21.5998 17.6535 21.6001 17.6532C22.0157 17.3159 22.25 16.8491 22.25 16.3466C22.25 15.8416 22.0067 15.376 21.601 15.0407L17.0509 11.28C16.7561 11.0364 16.2875 11.0364 15.9927 11.28L15.9927 11.28L15.9915 11.281C15.8444 11.404 15.75 11.5813 15.75 11.7784C15.75 11.9756 15.8444 12.1528 15.9915 12.2759L15.9915 12.2759L15.9927 12.2768L20.5427 16.0375C20.6572 16.1321 20.7032 16.2451 20.7032 16.3466C20.7032 16.448 20.6572 16.561 20.5427 16.6557L15.9927 20.4163L15.9927 20.4163L15.9915 20.4172C15.8444 20.5403 15.75 20.7176 15.75 20.9147C15.75 21.1118 15.8444 21.2891 15.9915 21.4122Z" stroke="white" stroke-opacity="0.2" stroke-width="0.5"/>
</svg>
`;

  return (
    <Pressable
      style={[
        {
          marginTop: 16,
          marginLeft: 12,
          paddingBottom: 16,
          borderBottomColor: border,
          borderBottomWidth: bottom ? 0 : 1,
          flexDirection: "row",
          justifyContent: "space-between",
        },
        outlineStyle,
      ]}
      onPress={onPress}
    >
      <View>
        <Text style={{ color: active ? activeColor : color, fontSize: 14 }}>
          {title}
        </Text>
        {subTitle ? (
          <Text style={{ color: subTextColor, fontSize: 12, marginTop: 3 }}>
            {subTitle}
          </Text>
        ) : null}
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

const logoutDark = `<svg width="40" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.16667 13.75C1.70833 13.75 1.31583 13.603 0.989168 13.309C0.662501 13.015 0.499446 12.662 0.500001 12.25V1.75C0.500001 1.3375 0.663335 0.984251 0.990001 0.690251C1.31667 0.396251 1.70889 0.249501 2.16667 0.250001H8V1.75H2.16667V12.25H8V13.75H2.16667ZM11.3333 10.75L10.1875 9.6625L12.3125 7.75H5.5V6.25H12.3125L10.1875 4.3375L11.3333 3.25L15.5 7L11.3333 10.75Z" fill="white"/>
</svg>
`;

const logoutLight = `<svg width="40" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.16667 15.75C3.70833 15.75 3.31583 15.603 2.98917 15.309C2.6625 15.015 2.49945 14.662 2.5 14.25V3.75C2.5 3.3375 2.66333 2.98425 2.99 2.69025C3.31667 2.39625 3.70889 2.2495 4.16667 2.25H10V3.75H4.16667V14.25H10V15.75H4.16667ZM13.3333 12.75L12.1875 11.6625L14.3125 9.75H7.5V8.25H14.3125L12.1875 6.3375L13.3333 5.25L17.5 9L13.3333 12.75Z" fill="black"/>
</svg>
`;

const langLight = `<svg width="40" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<rect width="20" height="20" fill="url(#pattern0)"/>
<defs>
<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_1998_11775" transform="scale(0.00195312)"/>
</pattern>
<image id="image0_1998_11775" width="512" height="512" xlink:href="data:image/png;base64,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"/>
</defs>
</svg>
`;
const langDark = `<svg width="40" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.26563 2.58986C1.90625 2.71095 1.65625 2.8672 1.39844 3.12892C1.15235 3.38283 0.933598 3.78908 0.863286 4.13283C0.835942 4.27345 0.820317 5.25001 0.820317 7.10158C0.820317 10.1055 0.816411 10.0547 1.04297 10.5313C1.19532 10.8516 1.57813 11.2461 1.91016 11.4219C2.19532 11.5703 2.55469 11.6797 2.76172 11.6797H2.89063V12.1563C2.89063 12.7422 2.92969 12.8867 3.13282 13.1094C3.41016 13.4102 3.8711 13.4727 4.20704 13.2539C4.30079 13.1914 4.55469 12.8906 4.89844 12.418L5.44141 11.6797H6.46875H7.5V13.1953C7.5 14.8438 7.51172 14.9688 7.72657 15.3672C7.85938 15.6211 8.32422 16.0938 8.55469 16.211C8.64844 16.2578 8.82422 16.336 8.94532 16.3828C9.15625 16.461 9.22657 16.4649 11.6797 16.4766L14.1992 16.4883L14.9805 17.2656C15.4805 17.7617 15.8125 18.0664 15.9063 18.1055C16.2422 18.2422 16.6797 18.1406 16.9023 17.875C17.0703 17.668 17.1094 17.4961 17.1094 16.9649V16.5L17.4453 16.4375C17.9063 16.3516 18.2344 16.1797 18.5508 15.8633C18.8477 15.5703 19.0313 15.2461 19.1211 14.8789C19.207 14.5078 19.207 9.2422 19.1211 8.87111C18.9883 8.31642 18.543 7.75001 18.0469 7.50783C17.5703 7.27345 17.4883 7.26564 14.875 7.26564H12.5V5.7383V4.21486L12.4023 3.91798C12.1719 3.2383 11.6406 2.73439 10.957 2.5547C10.8008 2.51173 9.95313 2.50001 6.64063 2.50001L2.51954 2.50392L2.26563 2.58986ZM10.8477 3.44533C11.1484 3.55861 11.4414 3.85158 11.5547 4.15236C11.6367 4.3672 11.6406 4.43751 11.6406 5.82033V7.25783L10.4023 7.27345C9.24219 7.28908 9.14454 7.29689 8.92969 7.37501C8.80079 7.42189 8.6211 7.50392 8.52735 7.55861L8.35938 7.66017L8.26954 7.45314C7.54297 5.81642 7.04297 4.76955 6.94922 4.6758C6.86719 4.60158 6.79297 4.57033 6.6875 4.57033C6.36719 4.57033 6.40625 4.50392 5.22266 7.1133C4.03125 9.7383 4.0586 9.65626 4.28125 9.89064C4.42188 10.0352 4.70704 10.0469 4.85938 9.91017C4.91797 9.85939 5.09375 9.52345 5.28516 9.10158L5.61329 8.37892L6.67579 8.3672C7.25782 8.3633 7.73438 8.3672 7.73438 8.37892C7.73438 8.39064 7.70704 8.45705 7.66797 8.52736C7.52735 8.8008 7.5 9.02345 7.5 9.9297V10.8203H6.27735C5.25391 10.8203 5.04297 10.8281 4.97266 10.8789C4.92579 10.9102 4.63672 11.2813 4.32813 11.6992L3.76954 12.4649L3.75 11.75C3.73829 11.3555 3.71485 11.0117 3.69922 10.9844C3.62891 10.8789 3.44141 10.8281 3.04688 10.8125C2.53516 10.7891 2.3086 10.6992 2.03907 10.4141C1.67969 10.0352 1.69922 10.211 1.69922 7.07033V4.31642L1.82813 4.0547C1.97266 3.75783 2.19141 3.5508 2.48829 3.43751C2.66797 3.3672 2.85938 3.3633 6.64844 3.35939H10.6211L10.8477 3.44533ZM7.00782 6.81251C7.17188 7.1758 7.30079 7.48048 7.29297 7.4883C7.28516 7.49611 6.9961 7.49611 6.64844 7.4922L6.02344 7.48048L6.33985 6.78517C6.51172 6.40236 6.66797 6.10548 6.6836 6.12111C6.69922 6.13673 6.84375 6.44923 7.00782 6.81251ZM17.5664 8.25783C17.8477 8.38673 18.0898 8.62501 18.2148 8.89845C18.3008 9.08205 18.3008 9.09376 18.3008 11.875V14.668L18.1914 14.8906C18.0625 15.1524 17.8398 15.3633 17.5547 15.4961C17.3867 15.5703 17.2539 15.5977 16.9063 15.6133C16.4922 15.6367 16.4609 15.6445 16.3594 15.7461L16.25 15.8516V16.5703V17.2852L15.4297 16.4649L14.6094 15.6445L11.9805 15.625C9.01172 15.6016 9.15625 15.6172 8.78907 15.2852C8.67969 15.1875 8.54297 15.0156 8.48438 14.9063L8.37891 14.707V11.875V9.04298L8.48438 8.84767C8.67579 8.48439 9.01563 8.23048 9.41407 8.16408C9.51172 8.14845 11.3281 8.13673 13.457 8.14064L17.3242 8.14455L17.5664 8.25783Z" fill="white"/>
<path d="M13.1172 9.19924C12.9336 9.30471 12.8906 9.44143 12.8906 9.94143V10.3906H12.0312C11.1094 10.3906 11.0117 10.4063 10.8828 10.5938C10.7617 10.7656 10.8398 11.1172 11.0117 11.211C11.0625 11.2344 11.6719 11.25 12.707 11.25H14.3281L14.2734 11.4922C14.1641 11.9805 13.6094 12.8906 13.3711 12.9883C13.2773 13.0235 12.9219 12.6406 12.7344 12.3047C12.5195 11.918 12.4258 11.836 12.1992 11.836C11.9258 11.8399 11.7578 12 11.7578 12.2578C11.7578 12.4258 11.9727 12.8125 12.2695 13.1836L12.5312 13.5078L12.4297 13.5508C12.2266 13.6328 11.8555 13.711 11.6797 13.711C11.2305 13.7149 11.0156 13.8594 11.0156 14.1524C11.0156 14.3477 11.0898 14.4688 11.2617 14.5547C11.5391 14.6992 12.5703 14.5039 13.1953 14.1836C13.3438 14.1094 13.3672 14.1055 13.4492 14.1563C13.7422 14.3477 14.4453 14.5469 14.9844 14.5899C15.3594 14.625 15.5117 14.5664 15.6133 14.3594C15.7812 14 15.5039 13.7149 14.9766 13.711C14.8086 13.711 14.2227 13.5742 14.1719 13.5235C14.1562 13.5078 14.2344 13.3906 14.3398 13.2617C14.75 12.7735 15.0508 12.1328 15.1562 11.5313L15.207 11.25H15.4102C15.5781 11.25 15.625 11.2344 15.7188 11.1406C15.8516 10.9961 15.8867 10.793 15.8047 10.6328C15.6875 10.4063 15.6055 10.3906 14.6289 10.3906H13.75V9.89065V9.39065L13.6367 9.28127C13.5 9.14846 13.2695 9.1133 13.1172 9.19924Z" fill="white"/>
</svg>
`;
