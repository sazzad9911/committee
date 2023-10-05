import React, { useEffect } from "react";
import {
  Image,
  ScrollView,
  View,
  Dimensions,
  ImageBackground,
  Pressable,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { AppColors } from "../../functions/colors";
import { AppValues } from "../../functions/values";
import mainStyle from "../../styles/mainStyle";
const { width, height } = Dimensions.get("window");
import Button from "../../components/main/Button";
import localStorage from "../../functions/localStorage";
import loader from "../../data/loader";
import { post } from "../../apis/multipleApi";
import { getComityById, leaveComity, sendMemberRequest } from "../../apis/api";
import toast from "../../data/toast";
import MoreText from "../../components/main/MoreText";

export default function ComityProfile({ navigation, route }) {
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);
  const colors = new AppColors(isDark);
  const values = new AppValues(isBn);
  const backgroundColor = colors.getBackgroundColor();
  const textColor = colors.getTextColor();
  const borderColor = colors.getBorderColor();
  const allHeadlines = values.getHeadLines();
  const dispatch = useDispatch();
  const comityId = route?.params?.comityId;
  const [comity, setComity] = React.useState(null);
  const [refetch, setRefetch] = React.useState(false);
  const user = useSelector((state) => state.user);

  //console.log(comity);
  //console.log(comity);
  const location = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20.6211 8.45C19.5711 3.83 15.5411 1.75 12.0011 1.75H11.9911C8.46107 1.75 4.42107 3.82 3.37107 8.44C2.20107 13.6 5.36107 17.97 8.22107 20.72C9.23479 21.7012 10.5903 22.2498 12.0011 22.25C13.3611 22.25 14.7211 21.74 15.7711 20.72C18.6311 17.97 21.7911 13.61 20.6211 8.45ZM12.0011 13.46C11.5874 13.46 11.1778 13.3785 10.7956 13.2202C10.4134 13.0619 10.0662 12.8299 9.77369 12.5374C9.48118 12.2449 9.24915 11.8976 9.09085 11.5155C8.93255 11.1333 8.85107 10.7237 8.85107 10.31C8.85107 9.89634 8.93255 9.48672 9.09085 9.10455C9.24915 8.72237 9.48118 8.37512 9.77369 8.08261C10.0662 7.79011 10.4134 7.55808 10.7956 7.39978C11.1778 7.24148 11.5874 7.16 12.0011 7.16C12.8365 7.16 13.6377 7.49187 14.2285 8.08261C14.8192 8.67335 15.1511 9.47457 15.1511 10.31C15.1511 11.1454 14.8192 11.9466 14.2285 12.5374C13.6377 13.1281 12.8365 13.46 12.0011 13.46Z" fill="${textColor}"/>
  </svg>
  `;
  const call = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M11.05 14.95L9.2 16.8C8.81 17.19 8.19 17.19 7.79 16.81C7.68 16.7 7.57 16.6 7.46 16.49C6.44877 15.472 5.5161 14.3789 4.67 13.22C3.85 12.08 3.19 10.94 2.71 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C10.83 13.32 10.94 13.42 11.04 13.52C11.44 13.91 11.45 14.55 11.05 14.95ZM21.97 18.33C21.9687 18.7074 21.8833 19.0798 21.72 19.42C21.55 19.78 21.33 20.12 21.04 20.44C20.55 20.98 20.01 21.37 19.4 21.62C19.39 21.62 19.38 21.63 19.37 21.63C18.78 21.87 18.14 22 17.45 22C16.43 22 15.34 21.76 14.19 21.27C13.04 20.78 11.89 20.12 10.75 19.29C10.36 19 9.97 18.71 9.6 18.4L12.87 15.13C13.15 15.34 13.4 15.5 13.61 15.61C13.66 15.63 13.72 15.66 13.79 15.69C13.87 15.72 13.95 15.73 14.04 15.73C14.21 15.73 14.34 15.67 14.45 15.56L15.21 14.81C15.46 14.56 15.7 14.37 15.93 14.25C16.16 14.11 16.39 14.04 16.64 14.04C16.83 14.04 17.03 14.08 17.25 14.17C17.47 14.26 17.7 14.39 17.95 14.56L21.26 16.91C21.52 17.09 21.7 17.3 21.81 17.55C21.91 17.8 21.97 18.05 21.97 18.33Z" fill="${textColor}"/>
  </svg>
  `;
  const member = `<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15.2619 9.52381C18.1548 9.52381 20.5 11.869 20.5 14.7619C20.5 17.6548 18.1548 20 15.2619 20C12.369 20 10.0238 17.6548 10.0238 14.7619C10.0238 11.869 12.369 9.52381 15.2619 9.52381ZM15.2619 11.4278L15.1763 11.4355C14.9819 11.4708 14.8287 11.6241 14.7934 11.8184L14.7857 11.904L14.7854 14.285L12.4025 14.2857L12.3169 14.2934C12.1226 14.3287 11.9693 14.4819 11.934 14.6763L11.9263 14.7619L11.934 14.8475C11.9693 15.0419 12.1226 15.1951 12.3169 15.2304L12.4025 15.2381L14.7863 15.2374L14.7868 17.6224L14.7944 17.708C14.8297 17.9023 14.983 18.0556 15.1774 18.0909L15.263 18.0986L15.3486 18.0909C15.5429 18.0556 15.6962 17.9023 15.7315 17.708L15.7392 17.6224L15.7387 15.2374L18.1234 15.2381L18.209 15.2304C18.4034 15.1951 18.5566 15.0419 18.5919 14.8475L18.5996 14.7619L18.5919 14.6763C18.5566 14.4819 18.4034 14.3287 18.209 14.2934L18.1234 14.2857L15.7378 14.285L15.7381 11.904L15.7304 11.8184C15.6951 11.6241 15.5419 11.4708 15.3475 11.4355L15.2619 11.4278ZM10.0447 11.4284C9.42862 12.3906 9.07143 13.5345 9.07143 14.7619C9.07143 15.6036 9.23942 16.4061 9.54371 17.1377C7.11148 17.007 5.7381 15.9744 5.7381 14.0476V13.0952C5.7381 12.1748 6.48429 11.4286 7.40476 11.4286L10.0447 11.4284ZM6.33428 6.66675C6.25595 6.97112 6.21429 7.29022 6.21429 7.61905C6.21429 8.68146 6.64919 9.64229 7.35067 10.3332L7.50501 10.4771L7.40476 10.4762C7.11777 10.4762 6.84155 10.5224 6.58314 10.6077C5.75957 10.8795 5.11681 11.549 4.88211 12.3887L4.84932 12.3896C2.07892 12.3896 0.5 11.3516 0.5 9.28571V8.33333C0.5 7.45888 1.17344 6.74172 2.02997 6.67219L2.16667 6.66667L6.33428 6.66675ZM10.0238 4.7619C11.6018 4.7619 12.881 6.04109 12.881 7.61905C12.881 9.197 11.6018 10.4762 10.0238 10.4762C8.44585 10.4762 7.16667 9.197 7.16667 7.61905C7.16667 6.04109 8.44585 4.7619 10.0238 4.7619ZM17.881 6.66667C18.8014 6.66667 19.5476 7.41286 19.5476 8.33333L19.5466 9.24959C19.5653 9.60087 19.5369 9.92292 19.4633 10.2156C18.3589 9.19469 16.8832 8.57143 15.2619 8.57143C14.7045 8.57143 14.1643 8.64511 13.6504 8.78325C13.7696 8.41739 13.8333 8.02566 13.8333 7.61905C13.8333 7.29022 13.7917 6.97112 13.7133 6.66675L17.881 6.66667ZM4.78571 0C6.36367 0 7.64286 1.27919 7.64286 2.85714C7.64286 4.4351 6.36367 5.71429 4.78571 5.71429C3.20776 5.71429 1.92857 4.4351 1.92857 2.85714C1.92857 1.27919 3.20776 0 4.78571 0ZM15.2619 0C16.8399 0 18.119 1.27919 18.119 2.85714C18.119 4.4351 16.8399 5.71429 15.2619 5.71429C13.6839 5.71429 12.4048 4.4351 12.4048 2.85714C12.4048 1.27919 13.6839 0 15.2619 0Z" fill="${colors.getBorderColor()}"/>
  </svg>
  `;
  const message = `<svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20.1211 5.45312C20.2734 5.33203 20.5 5.44531 20.5 5.63672V13.625C20.5 14.6602 19.6602 15.5 18.625 15.5H2.375C1.33984 15.5 0.5 14.6602 0.5 13.625V5.64062C0.5 5.44531 0.722656 5.33594 0.878906 5.45703C1.75391 6.13672 2.91406 7 6.89844 9.89453C7.72266 10.4961 9.11328 11.7617 10.5 11.7539C11.8945 11.7656 13.3125 10.4727 14.1055 9.89453C18.0898 7 19.2461 6.13281 20.1211 5.45312ZM10.5 10.5C11.4062 10.5156 12.7109 9.35938 13.3672 8.88281C18.5508 5.12109 18.9453 4.79297 20.1406 3.85547C20.3672 3.67969 20.5 3.40625 20.5 3.11719V2.375C20.5 1.33984 19.6602 0.5 18.625 0.5H2.375C1.33984 0.5 0.5 1.33984 0.5 2.375V3.11719C0.5 3.40625 0.632812 3.67578 0.859375 3.85547C2.05469 4.78906 2.44922 5.12109 7.63281 8.88281C8.28906 9.35938 9.59375 10.5156 10.5 10.5Z" fill="${colors.getBorderColor()}"/>
  </svg> 
  `;

  const fetchData = async () => {
    try {
      dispatch(loader.show());
      const { data } = await getComityById(comityId);
      setComity(data.comity);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(loader.hide());
    }
  };

  const handelDelete = async () => {
    try {
      dispatch(loader.show());
      await leaveComity(comity?.id);
      dispatch(toast.success("You leave the comity!"));
      navigation.pop(2);
    } catch (error) {
      console.log(error);
      dispatch(toast.error(error?.response?.data?.msg));
    } finally {
      dispatch(loader.hide());
    }
  };

  const handelRequest = async () => {
    try {
      dispatch(loader.show());
      if (comity?.iAmMember) {
        navigation.navigate("DeleteConfirmation", {
          title: isBn
            ? "আপনি কি নিশ্চিত আপনি এই কমিটি ছেড়ে যেতে চান?"
            : "Are you sure you want to leave this comity?",
          onPress: () => handelDelete(),
          rmTitle: isBn ? "গুরুত্বপূর্ণ মেসেজ" : "Important message",
          rmMessage: isBn
            ? "নিশ্চিত করার মাধ্যমে, আপনাকে এই কমিটির তালিকা থেকে সরিয়ে দেওয়া হবে এবং এই কমিটিতে আপনি আপনার সকল অর্থপ্রদানের তথ্য এবং ডেটা আর অ্যাক্সেস করতে পারবেন না৷ যাইহোক, আপনি যদি ভবিষ্যতে এই কমিটিতে পুনরায় যোগদান করেন তবে পুনরায় আপনি এই কমিটির সকল ডেটা অ্যাক্সেস করতে পারবেন"
            : "By confirming, you will be removed from the committee list, and your payment information and data for this committee will no longer be accessible. However, should you choose to rejoin the committee in the future, your data will be reinstated",
        });
      } else if (!comity?.memberStatus) {
        await sendMemberRequest(comity.id);
        dispatch(toast.success("Request sent"));
        setRefetch(!refetch);
      } else {
        Alert.alert(
          "Are your sure?",
          "Are you sure you want to cancel the request?",
          [
            {
              text: "Yes",
              onPress: async () => {
                try {
                  dispatch(loader.show());
                  await leaveComity(comity?.id);
                  dispatch(toast.success("You cancel the request!"));
                } catch (error) {
                  dispatch(toast.error(error?.response?.data?.msg));
                } finally {
                  dispatch(loader.hide());
                  setRefetch(!refetch);
                }
              },
            },
            {
              text: "No",
            },
          ]
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(toast.error(error?.response?.data?.msg));
    } finally {
      dispatch(loader.hide());
    }
  };

  useEffect(() => {
    fetchData();
  }, [refetch]);

  return (
    <ScrollView
      style={{ backgroundColor: colors.getBackgroundColor() }}
      showsVerticalScrollIndicator={false}
    >
      <ImageBackground
        style={{
          height: height / 2 + 80,
        }}
        source={{
          uri: "https://cdn.pixabay.com/photo/2017/11/12/16/19/car-2942982_640.jpg",
        }}
      >
        <View style={[mainStyle.mt24, mainStyle.flexBox, mainStyle.pdH20]}>
          <Pressable
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
            }}
          >
            <SvgXml xml={backIcon} />
          </Pressable>
        </View>
      </ImageBackground>
      <View
        style={{
          backgroundColor: backgroundColor,
          marginTop: -20,
          borderRadius: 25,
        }}
      >
        <Text
          numberOfLines={2}
          style={[
            style.headLie,
            { color: textColor },
            mainStyle.mt24,
            mainStyle.pdH20,
          ]}
        >
          {comity?.name}
        </Text>
        <View style={mainStyle.mt24} />
        <ProfileCart
          onPress={() => {
            if (comity?.membersPrivacy === "Public") {
              navigation.navigate("MemberPage");
            } else if (comity?.membersPrivacy === "MembersOnly") {
              if (comity?.iAmMember) {
                navigation.navigate("MemberPage");
              }
            }
          }}
          borderColor={borderColor}
          privacy={comity?.membersPrivacy}
          number={
            comity?.membersPrivacy === "Private"
              ? "---"
              : comity?.membersPrivacy === "Public"
              ? comity?.totalMembers || "0"
              : comity?.membersPrivacy === "MembersOnly" && comity?.iAmMember
              ? comity?.totalMembers || "0"
              : "---"
          }
          title={allHeadlines.totalMember}
          color={textColor}
        />
        <View style={{ height: 16 }} />
        <ProfileCart
          onPress={() => {
            if (comity?.specialMembersPrivacy === "Public") {
              navigation.navigate("MemberPage", { special: true });
            } else if (comity?.specialMembersPrivacy === "MembersOnly") {
              if (comity?.iAmMember) {
                navigation.navigate("MemberPage", { special: true });
              }
            }
          }}
          borderColor={borderColor}
          privacy={comity?.specialMembersPrivacy}
          number={
            comity?.specialMembersPrivacy === "Private"
              ? "---"
              : comity?.specialMembersPrivacy === "Public"
              ? comity?.specialMembers || "0"
              : comity?.specialMembersPrivacy === "MembersOnly" &&
                comity?.iAmMember
              ? comity?.specialMembers || "0"
              : "---"
          }
          title={allHeadlines.specialMember}
          color={textColor}
        />
        <View style={{ height: 16 }} />
        <ProfileCart
          onPress={() => {
            if (comity?.balancePrivacy === "Public") {
              navigation.navigate("CurrentBalance");
            } else if (comity?.balancePrivacy === "MembersOnly") {
              if (comity?.iAmMember) {
                navigation.navigate("CurrentBalance");
              }
            }
          }}
          borderColor={borderColor}
          privacy={comity?.balancePrivacy}
          number={
            comity?.balancePrivacy === "Private"
              ? "---"
              : comity?.balancePrivacy === "Public"
              ? comity?.balance || "0"
              : comity?.balancePrivacy === "MembersOnly" && comity?.iAmMember
              ? comity?.balance || "0"
              : "---"
          }
          title={allHeadlines.presentBalance}
          color={textColor}
        />
        <View style={{ height: 16 }} />
        <ProfileCart
          onPress={() => {
            if (comity?.noticePrivacy === "Public") {
              navigation.navigate("Notice");
            } else if (comity?.noticePrivacy === "MembersOnly") {
              if (comity?.iAmMember) {
                navigation.navigate("Notice");
              }
            }
          }}
          borderColor={borderColor}
          privacy={comity?.noticePrivacy}
          number={
            comity?.noticePrivacy === "Private"
              ? "---"
              : comity?.noticePrivacy === "Public"
              ? comity?.totalNotices || "0"
              : comity?.noticePrivacy === "MembersOnly" && comity?.iAmMember
              ? comity?.totalNotices || "0"
              : "---"
          }
          title={allHeadlines.notice}
          color={textColor}
        />
        <View style={{ height: 16 }} />

        <View
          style={[mainStyle.pdH20, { flexDirection: "row" }, mainStyle.mt32]}
        >
          <SvgXml xml={location} />
          <Text
            style={{
              marginLeft: 10,
              color: textColor,
              fontSize: 16,
              flex: 1,
            }}
          >
            {`${comity?.address}, ${comity?.thana}, ${comity?.district}, ${comity?.division}`}
          </Text>
        </View>
        <View
          style={[mainStyle.pdH20, { flexDirection: "row" }, mainStyle.mt24]}
        >
          <SvgXml xml={call} />
          <Text
            style={{
              marginLeft: 10,
              color: textColor,
              fontSize: 16,
            }}
          >
            {comity?.phone}
          </Text>
        </View>
        <Text
          style={[
            mainStyle.pdH20,
            { color: textColor, fontSize: 24, fontWeight: "600" },
            mainStyle.mt24,
          ]}
        >
          {allHeadlines.aboutComity}
        </Text>

        <View style={[mainStyle.pdH20, mainStyle.mt12]}>
          <MoreText text={comity?.about ? comity.about : ""} />
          <View
            style={{
              flexDirection: "row",
              marginTop: 12,
              justifyContent: "space-between",
              alignItems: "center",
              borderTopWidth: 1,
              paddingTop: 12,
              borderTopColor: colors.getShadowColor(),
            }}
          >
            {comity?.memberStatus !== "Rejected" && (
              <Button
                color={
                  comity?.memberStatus
                    ? "red"
                    : isDark
                    ? "white"
                    : "rgba(0,0,0,0.8)"
                }
                onPress={handelRequest}
                LeftIcon={() => <SvgXml xml={member} />}
                style={{
                  width: width / 2 - 30,
                  ...(!comity?.memberStatus && { color: "red" }),
                }}
                title={
                  comity?.iAmMember
                    ? "Leave from comity"
                    : !comity?.memberStatus
                    ? "Member"
                    : "Cancel request"
                }
              />
            )}
            <Button
              onPress={async () => {
                dispatch(loader.show());
                try {
                  const res = await post(
                    "/chat/conversation/create",
                    {
                      userId: comity.userId,
                      comityId: comity.id,
                    },
                    user.token
                  );
                  //console.log(res.data);
                  navigation.navigate("ChatScreen", {
                    conversationId: res.data.conversation.id,
                    data:res.data.conversation
                  });
                  dispatch(loader.hide());
                } catch (e) {
                  console.error(e.message);
                  dispatch(loader.hide());
                  dispatch(toast.error("Error loading"));
                }
              }}
              LeftIcon={() => <SvgXml xml={message} />}
              style={{
                width: width / 2 - 30,
              }}
              color={isDark ? "white" : "rgba(0,0,0,0.8)"}
              title={"Message"}
            />
          </View>
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
      ]}
    >
      <View>
        <Text
          style={{
            color: borderColor,
            fontSize: 16,
          }}
        >
          {title}
        </Text>
        {number ? (
          <Text
            style={{
              fontSize: 20,
              color: color,
              fontWeight: "800",
              marginTop: 1,
            }}
          >
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
          }}
        >
          {privacy && <SvgXml xml={eye} />}
          <Text
            style={{
              color: borderColor,
              marginHorizontal: 5,
            }}
          >
            {privacy}
          </Text>
          {number !== "---" && <SvgXml style={iconStyle} xml={right} />}
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
