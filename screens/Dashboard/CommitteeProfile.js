import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  View,
  Dimensions,
  ImageBackground,
  Pressable,
  Text,
  StyleSheet,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { AppColors } from "../../functions/colors";
import { AppValues } from "../../functions/values";
import mainStyle from "../../styles/mainStyle";
const { width, height } = Dimensions.get("window");
import SeeMore from "react-native-see-more-inline";
import Button from "../../components/main/Button";
import localStorage from "../../functions/localStorage";
import { deletes, get, post, put } from "../../apis/multipleApi";
import loader from "../../data/loader";
import toast from "../../data/toast";
import { pickImage } from "../../components/main/ProfilePicture";
import { useIsFocused } from "@react-navigation/native";

export default function CommitteeProfile({ navigation }) {
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);
  const colors = new AppColors(isDark);
  const values = new AppValues(isBn);
  const backgroundColor = colors.getBackgroundColor();
  const textColor = colors.getTextColor();
  const borderColor = colors.getBorderColor();
  const allHeadlines = values.getHeadLines();
  const comity = useSelector((state) => state.comity);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [background, setBackground] = useState(
    comity && comity.profilePhoto
      ? comity.profilePhoto
      : "https://cdn.pixabay.com/photo/2017/11/12/16/19/car-2942982_640.jpg"
  );
  const isFocused = useIsFocused();

  //console.log(comity);
  const location = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20.6211 8.45C19.5711 3.83 15.5411 1.75 12.0011 1.75H11.9911C8.46107 1.75 4.42107 3.82 3.37107 8.44C2.20107 13.6 5.36107 17.97 8.22107 20.72C9.23479 21.7012 10.5903 22.2498 12.0011 22.25C13.3611 22.25 14.7211 21.74 15.7711 20.72C18.6311 17.97 21.7911 13.61 20.6211 8.45ZM12.0011 13.46C11.5874 13.46 11.1778 13.3785 10.7956 13.2202C10.4134 13.0619 10.0662 12.8299 9.77369 12.5374C9.48118 12.2449 9.24915 11.8976 9.09085 11.5155C8.93255 11.1333 8.85107 10.7237 8.85107 10.31C8.85107 9.89634 8.93255 9.48672 9.09085 9.10455C9.24915 8.72237 9.48118 8.37512 9.77369 8.08261C10.0662 7.79011 10.4134 7.55808 10.7956 7.39978C11.1778 7.24148 11.5874 7.16 12.0011 7.16C12.8365 7.16 13.6377 7.49187 14.2285 8.08261C14.8192 8.67335 15.1511 9.47457 15.1511 10.31C15.1511 11.1454 14.8192 11.9466 14.2285 12.5374C13.6377 13.1281 12.8365 13.46 12.0011 13.46Z" fill="${textColor}"/>
  </svg>
  `;
  const call = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M11.05 14.95L9.2 16.8C8.81 17.19 8.19 17.19 7.79 16.81C7.68 16.7 7.57 16.6 7.46 16.49C6.44877 15.472 5.5161 14.3789 4.67 13.22C3.85 12.08 3.19 10.94 2.71 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C10.83 13.32 10.94 13.42 11.04 13.52C11.44 13.91 11.45 14.55 11.05 14.95ZM21.97 18.33C21.9687 18.7074 21.8833 19.0798 21.72 19.42C21.55 19.78 21.33 20.12 21.04 20.44C20.55 20.98 20.01 21.37 19.4 21.62C19.39 21.62 19.38 21.63 19.37 21.63C18.78 21.87 18.14 22 17.45 22C16.43 22 15.34 21.76 14.19 21.27C13.04 20.78 11.89 20.12 10.75 19.29C10.36 19 9.97 18.71 9.6 18.4L12.87 15.13C13.15 15.34 13.4 15.5 13.61 15.61C13.66 15.63 13.72 15.66 13.79 15.69C13.87 15.72 13.95 15.73 14.04 15.73C14.21 15.73 14.34 15.67 14.45 15.56L15.21 14.81C15.46 14.56 15.7 14.37 15.93 14.25C16.16 14.11 16.39 14.04 16.64 14.04C16.83 14.04 17.03 14.08 17.25 14.17C17.47 14.26 17.7 14.39 17.95 14.56L21.26 16.91C21.52 17.09 21.7 17.3 21.81 17.55C21.91 17.8 21.97 18.05 21.97 18.33Z" fill="${textColor}"/>
  </svg>
  `;
  useEffect(() => {
    fetch();
    //console.log(comity);
  }, [isFocused]);
  const fetch = async () => {
    try {
      const res = await get(`/comity/get/${comity.id}`, user.token);
      dispatch({ type: "SET_COMITY", value: res.data.comity });
      localStorage.comityLogIn(res.data.comity);
    } catch (e) {
      console.error(e.message);
    }
  };
  const uploadPicture = async (file) => {
    dispatch(loader.show());
    try {
      const data = new FormData();
      data.append("files", file);
      const res = await post("/upload", data, user.token);
      await put(
        "/comity/update",
        {
          profilePhoto: res.data.files[0],
          comityId: comity.id,
        },
        user.token
      );
      dispatch(loader.hide());
      dispatch(toast.success("Image updated"));
    } catch (e) {
      dispatch(toast.error("Error updating"));
      dispatch(loader.hide());
    }
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.getBackgroundColor() }}
      showsVerticalScrollIndicator={false}>
      <ImageBackground
        style={{
          height: height / 2 + 80,
        }}
        source={{
          uri: background,
        }}>
        <View style={[mainStyle.mt24, mainStyle.flexBox, mainStyle.pdH20]}>
          {/* <Pressable
            onPress={() => {
              navigation?.goBack();
            }}
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.20)",
              width: 30,
              height: 30,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 15,
            }}>
            <SvgXml xml={backIcon} />
          </Pressable> */}
          <View />
          <Pressable
            onPress={async () => {
              const img = await pickImage();
              setBackground(img.uri);
              uploadPicture(img)
            }}>
            <SvgXml xml={cameraIcon} />
          </Pressable>
        </View>
      </ImageBackground>
      <View
        style={{
          backgroundColor: backgroundColor,
          marginTop: -20,
          borderRadius: 25,
        }}>
        <Text
          numberOfLines={2}
          style={[
            style.headLie,
            { color: textColor },
            mainStyle.mt24,
            mainStyle.pdH20,
          ]}>
          {comity?.name}
        </Text>
        <View style={mainStyle.mt24} />
        <ProfileCart
          onPress={() => {
            navigation.navigate("MemberPage");
          }}
          borderColor={borderColor}
          privacy={allHeadlines.private}
          number={comity?.totalMembers?.toString()}
          title={allHeadlines.totalMember}
          color={textColor}
        />
        <View style={{ height: 16 }} />
        <ProfileCart
          onPress={() => {
            navigation.navigate("MemberPage", { special: true });
          }}
          borderColor={borderColor}
          privacy={allHeadlines.private}
          number={comity?.specialMembers?.toString()}
          title={allHeadlines.specialMember}
          color={textColor}
        />
        <View style={{ height: 16 }} />
        <ProfileCart
          onPress={() => {
            navigation.navigate("CurrentBalance");
          }}
          borderColor={borderColor}
          privacy={allHeadlines.private}
          number={comity?.balance?.toString()}
          title={allHeadlines.presentBalance}
          color={textColor}
        />
        <View style={{ height: 16 }} />
        <ProfileCart
          onPress={() => {
            navigation.navigate("Notice");
          }}
          borderColor={borderColor}
          privacy={allHeadlines.private}
          number={comity?.totalNotices?.toString()}
          title={allHeadlines.notice}
          color={textColor}
        />
        <View style={{ height: 16 }} />
        <View
          style={[mainStyle.pdH20, { flexDirection: "row" }, mainStyle.mt32]}>
          <SvgXml xml={location} />
          <Text
            style={{
              marginLeft: 10,
              color: textColor,
              fontSize: 16,
            }}>
            {`${comity?.address}, ${comity.thana}, ${comity.district}, ${comity.division}`}
          </Text>
        </View>
        <View
          style={[mainStyle.pdH20, { flexDirection: "row" }, mainStyle.mt24]}>
          <SvgXml xml={call} />
          <Text
            style={{
              marginLeft: 10,
              color: textColor,
              fontSize: 16,
            }}>
            {comity.phone}
          </Text>
        </View>
        <Text
          style={[
            mainStyle.pdH20,
            { color: textColor, fontSize: 24, fontWeight: "600" },
            mainStyle.mt24,
          ]}>
          {allHeadlines.aboutComity}
        </Text>

        <View style={[mainStyle.pdH20, mainStyle.mt12]}>
          <SeeMore
            style={{
              color: borderColor,
              fontSize: 16,
              fontWeight: "400",
            }}
            seeMoreText={"See More"}
            numberOfLines={3}
            linkStyle={{ fontWeight: "500" }}>
            {comity.about}
          </SeeMore>
          <Button
            onPress={() => {
              navigation.navigate("EditCommitteeInfo");
            }}
            active={true}
            style={[mainStyle.mt24]}
            title={"Edit the information"}
          />
          <Button
            onPress={() => {
              //navigation.navigate("Notice");
              localStorage.comityLogOut();
              dispatch({ type: "SET_COMITY", value: null });
              navigation.navigate("Dashboard");
            }}
            active={true}
            style={[mainStyle.mt24]}
            title={"Sign out From Comity"}
          />
          <Button
            onPress={async () => {
              dispatch(loader.show());
              try {
                await deletes(`/comity/delete/${comity?.id}`, user.token);
                dispatch(loader.hide());
                dispatch(toast.success("Comity deleted"));
                localStorage.comityLogOut();
                dispatch({ type: "SET_COMITY", value: null });
              } catch (e) {
                dispatch(loader.hide());
                dispatch(toast.error("Problem deleting"));
              }
            }}
            style={[mainStyle.mt24, { borderColor: "#F00" }]}
            color={"#F00"}
            title={"Delete the community profile"}
          />
          <View style={mainStyle.mt32} />
        </View>
      </View>
    </ScrollView>
  );
}
export const ProfileCart = ({
  title,
  number,
  privacy,
  color,
  borderColor,
  onPress,
  style,
  iconStyle,
  icon,
}) => {
  const eye = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.1663 6.09998C12.6263 3.67998 10.373 2.28665 7.99967 2.28665C6.81301 2.28665 5.65967 2.63332 4.60634 3.27998C3.55301 3.93332 2.60634 4.88665 1.83301 6.09998C1.16634 7.14665 1.16634 8.84665 1.83301 9.89332C3.37301 12.32 5.62634 13.7067 7.99967 13.7067C9.18634 13.7067 10.3397 13.36 11.393 12.7133C12.4463 12.06 13.393 11.1067 14.1663 9.89332C14.833 8.85332 14.833 7.14665 14.1663 6.09998ZM7.99967 10.6933C6.50634 10.6933 5.30634 9.48665 5.30634 7.99998C5.30634 6.51332 6.50634 5.30665 7.99967 5.30665C9.49301 5.30665 10.693 6.51332 10.693 7.99998C10.693 9.48665 9.49301 10.6933 7.99967 10.6933Z" fill="${borderColor}" fill-opacity="0.6"/>
<path d="M7.99904 6.09332C7.49424 6.09332 7.01012 6.29385 6.65318 6.6508C6.29623 7.00774 6.0957 7.49186 6.0957 7.99666C6.0957 8.50145 6.29623 8.98557 6.65318 9.34252C7.01012 9.69946 7.49424 9.89999 7.99904 9.89999C9.0457 9.89999 9.9057 9.04666 9.9057 7.99999C9.9057 6.95332 9.0457 6.09332 7.99904 6.09332Z" fill="black" fill-opacity="0.6"/>
</svg>
`;
  const right = `<svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.991541 11.0649L0.992658 11.0658C1.14848 11.1946 1.33984 11.25 1.52179 11.25C1.71073 11.25 1.8968 11.1849 2.04436 11.0711L2.04444 11.0712L2.05093 11.0658L6.59914 7.30668C6.59945 7.30643 6.59976 7.30618 6.60007 7.30592C7.01573 6.96858 7.25 6.5018 7.25 5.99928C7.25 5.49427 7.00668 5.0287 6.60098 4.69338L2.05093 0.93275C1.75611 0.689083 1.28747 0.689083 0.992658 0.93275L0.992655 0.932746L0.991541 0.933678C0.844379 1.05675 0.75 1.23402 0.75 1.43115C0.75 1.62827 0.844379 1.80554 0.991541 1.92862L0.991538 1.92862L0.992658 1.92954L5.54271 5.69018C5.65725 5.78484 5.70321 5.89781 5.70321 5.99928C5.70321 6.10075 5.65725 6.21371 5.54271 6.30838L0.992658 10.069L0.992655 10.069L0.991541 10.0699C0.84438 10.193 0.75 10.3703 0.75 10.5674C0.75 10.7645 0.844379 10.9418 0.991541 11.0649Z" fill="${borderColor}" stroke="${borderColor}" stroke-width="0.5"/>
</svg>
`;

  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          flexDirection: "row",
          justifyContent: "space-between",
          paddingBottom: 16,
          borderBottomWidth: 1,
          marginLeft: 20,
          borderBottomColor: "#F3F3F3",
        },
        style,
      ]}>
      <View>
        <Text
          style={{
            color: borderColor,
            fontSize: 16,
          }}>
          {title}
        </Text>
        {number ? (
          <Text
            style={{
              fontSize: 20,
              color: color,
              fontWeight: "800",
              marginTop: 1,
            }}>
            {number}
          </Text>
        ) : null}
      </View>

      {icon ? (
        icon
      ) : (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginRight: 20,
          }}>
          {privacy && <SvgXml xml={eye} />}
          <Text
            style={{
              color: borderColor,
              marginHorizontal: 5,
            }}>
            {privacy}
          </Text>

          <SvgXml style={iconStyle} xml={right} />
        </View>
      )}
    </Pressable>
  );
};
const style = StyleSheet.create({
  headLie: {
    fontSize: 24,
    fontWeight: "600",
  },
});

const backIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 19.5L7.5 12L15 4.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const cameraIcon = `<svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="33" height="32" rx="16" fill="#59A7D6"/>
<path d="M16.8893 14.2222C15.444 14.2222 14.2227 15.4436 14.2227 16.8889C14.2227 18.3342 15.444 19.5556 16.8893 19.5556C18.3347 19.5556 19.556 18.3342 19.556 16.8889C19.556 15.4436 18.3347 14.2222 16.8893 14.2222Z" fill="#F2F2F6"/>
<path d="M24 10.6667H21.7013L19.2951 8.26044C19.1289 8.09333 18.9031 8 18.6667 8H15.1111C14.8747 8 14.6489 8.09333 14.4827 8.26044L12.0764 10.6667H9.77778C8.79733 10.6667 8 11.464 8 12.4444V22.2222C8 23.2027 8.79733 24 9.77778 24H24C24.9804 24 25.7778 23.2027 25.7778 22.2222V12.4444C25.7778 11.464 24.9804 10.6667 24 10.6667ZM16.8889 21.3333C14.48 21.3333 12.4444 19.2978 12.4444 16.8889C12.4444 14.48 14.48 12.4444 16.8889 12.4444C19.2978 12.4444 21.3333 14.48 21.3333 16.8889C21.3333 19.2978 19.2978 21.3333 16.8889 21.3333Z" fill="#F2F2F6"/>
</svg>
`;
