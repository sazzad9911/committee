import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, Pressable } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { AppColors } from "../../functions/colors";
import { AppValues } from "../../functions/values";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { deleteCollection, getAllCollectionsByMember } from "../../apis/api";
const Tab = createMaterialTopTabNavigator();
import loader from "../../data/loader";
import NoOption from "../../components/main/NoOption";
import CollectionCart from "../../components/cart/CollectionCart";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProfilePicture from "../../components/main/ProfilePicture";
import mainStyle from "../../styles/mainStyle";
import { SvgXml } from "react-native-svg";
import { useIsFocused } from "@react-navigation/native";

export default function MemberSubDetails({ navigation, route }) {
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);
  const inset = useSafeAreaInsets();
  const [data, setData] = useState(null);
  const values = new AppValues(isBn);
  const headlines = values.getValues();
  const colors = new AppColors(isDark);
  const textColor = colors.getTextColor();
  const borderColor = colors.getBorderColor();
  const { subscriptionId, memberId } = route?.params;
  const [paidList, setPaidList] = useState([]);
  const dispatch = useDispatch();
  const isFocus = useIsFocused();

  const handelDelete = async () => {
    try {
      dispatch(loader.show());
      for (let i = 0; i < paidList.length; i++) {
        await deleteCollection(paidList[i].id);
      }
      navigation.pop(2);
    } catch (error) {
      console.log(error);
      dispatch(toast.error(error?.response?.data?.msg));
    } finally {
      dispatch(loader.hide());
    }
  };
  const fetch = async () => {
    try {
      dispatch(loader.show());
      const { data: cData } = await getAllCollectionsByMember(
        subscriptionId,
        memberId
      );
      setPaidList(cData.collections);
      setData(cData.collections[0]);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(loader.hide());
    }
  };
  useEffect(() => {
    fetch();
  }, [isFocus]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.getBackgroundColor() }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingTop: inset.top,
            backgroundColor: colors.getSchemeColor(),
            flex: 1,
          }}
        >
          <View
            style={{
              height: 32,
            }}
          />
          <Pressable
            onPress={async () => {
              navigation.navigate("DeleteConfirmation", {
                title: values.getValues()._subsMemberDeleteMessage,
                onPress: () => handelDelete(),
                rmTitle: isBn ? "গুরুত্বপূর্ণ মেসেজ" : "Important message",
                rmMessage: isBn
                  ? "অনুগ্রহ করে সচেতন থাকুন যে আপনি যখন 'নিশ্চিত করুন' বোতামে ক্লিক করবেন, সংগ্রহটি স্থায়ীভাবে মুছে যাবে, এবং এই ক্রিয়াটিকে পূর্বাবস্থায় ফেরানো যাবে না"
                  : "Please be aware that when you click the 'Confirm' button, the collection will be permanently deleted, and this action cannot be undone",
              });
            }}
            style={{
              position: "absolute",
              right: 20,
              top: inset.top + 20,
            }}
          >
            <SvgXml xml={deleteIcon} />
          </Pressable>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 20,
              paddingBottom: 20,
            }}
          >
            <ProfilePicture
              size={54}
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUInq67sadNgn_XinuvN43Tx5LdBN83plfwUJTCUk&s",
              }}
            />
            <Text
              numberOfLines={1}
              style={[
                mainStyle.headLine,
                {
                  color: colors.getTextColor(),
                  marginVertical: 0,
                  marginTop: 10,
                },
              ]}
            >
              {data?.member?.name || data?.member?.user?.name || "N/A"}
            </Text>
            <Text
              style={[
                mainStyle.text14,
                { color: colors.getTextColor(), marginTop: 5 },
              ]}
            >
              {data?.member?.gender || data?.member?.user?.gender || "Male"}
            </Text>
            <Text
              style={[
                mainStyle.text14,
                { color: colors.getTextColor(), marginTop: 10 },
              ]}
            >
              {data?.member?.mobile || data?.member?.user?.mobile || "N/A"}
            </Text>
            <Text
              style={[
                mainStyle.text14,
                { color: colors.getTextColor(), marginTop: 5 },
              ]}
            >
              {data ? data.member.address : "N/A"}
            </Text>
          </View>
        </View>
        <View style={{ height: 6 }} />
        {paidList &&
          paidList.map((doc, i) => (
            <CollectionCart
              textColor={colors.getTextColor()}
              borderColor={colors.getBorderColor()}
              isDark={isDark}
              data={doc}
              key={i}
              onPress={() => {
                navigation.navigate("AddMemberSubscription", {
                  data: doc,
                  subscriptionId: subscriptionId,
                  update: true,
                });
              }}
              title={doc.name}
            />
          ))}
        {paidList?.length == 0 && <NoOption title={"No collection found"} />}
        <View style={{ height: 6 }} />
      </ScrollView>
    </View>
  );
}

const deleteIcon = `<svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 1H12L10.8571 0H5.14286L4 1H0V3H16M1.14286 16C1.14286 16.5304 1.38367 17.0391 1.81233 17.4142C2.24098 17.7893 2.82236 18 3.42857 18H12.5714C13.1776 18 13.759 17.7893 14.1877 17.4142C14.6163 17.0391 14.8571 16.5304 14.8571 16V4H1.14286V16Z" fill="white"/>
</svg>
`;
