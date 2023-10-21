import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { deletes, get } from "../../apis/multipleApi";
import CollectionCart from "../../components/cart/CollectionCart";
import ProfilePicture from "../../components/main/ProfilePicture";
import loader from "../../data/loader";
import toast from "../../data/toast";
import { AppColors } from "../../functions/colors";
import { AppValues } from "../../functions/values";
import mainStyle from "../../styles/mainStyle";
import { LinearGradient } from "expo-linear-gradient";

export default function DeleteMemberCollection({ navigation, route }) {
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);
  const colors = new AppColors(isDark);
  const values = new AppValues(isBn);
  const inset = useSafeAreaInsets();
  const user = useSelector((state) => state.user);
  const { paid, subscriptionId } = route?.params;
  const dispatch = useDispatch();
  const [data, setData] = useState(route?.params?.data);
  const isFocused = useIsFocused();
  const ac = ["#1488CC", "#2B32B2"];
  const dc = ["#FF5C5C", "#FF6B6B"];
  const st = {
    fontSize: 20,
    color: colors.getTextColor(),
  };

  useEffect(() => {
    dispatch(loader.show());
    get(`/subs/get-collection-by-id/${data.id}`, user.token)
      .then((res) => {
        setData(res.data.collection);
        // console.log(res.data.collection);
        dispatch(loader.hide());
      })
      .catch((err) => {
        dispatch(loader.hide());
        console.error(err.response.data.msg);
      });
  }, [isFocused]);
  const back = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15 19.5L7.5 12L15 4.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;
  return (
    <ScrollView
      style={{ backgroundColor: colors.getBackgroundColor() }}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        style={{
          paddingTop: inset.top,
          backgroundColor: "green",
          flex: 1,
        }}
        colors={data?.paid ? ac : dc}
      >
        <View
          style={{
            height: 24,
          }}
        />
        <View style={[mainStyle.flexBox, mainStyle.pdH20]}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
          >
            <SvgXml xml={back} />
          </Pressable>
          <Pressable
            onPress={async () => {
              navigation.navigate("DeleteConfirmation", {
                title: values.getValues()._subsMemberDeleteMessage,
                style: st,
                onPress: async () => {
                  dispatch(loader.show());
                  deletes(`/subs/delete/collection/${data.id}`, user.token)
                    .then((res) => {
                      dispatch(loader.hide());
                      dispatch(toast.success("Success"));
                      navigation.goBack();
                      setTimeout(() => {
                        navigation.goBack();
                      }, 100);
                    })
                    .catch((err) => {
                      dispatch(loader.hide());
                      dispatch(toast.error(err.response.data.msg));
                    });
                },
                rmTitle: isBn ? "গুরুত্বপূর্ণ মেসেজ" : "Important message",
                rmMessage: isBn
                  ? "অনুগ্রহ করে সচেতন থাকুন যে আপনি যখন 'নিশ্চিত করুন' বাটনে ক্লিক করবেন, কালেকশনটি স্থায়ীভাবে মুছে যাবে, এবং একবার মুছে ফেলার পর এটি কে আগের অবস্থায় ফেরানো যাবে না৷ সতর্কতার সাথে এগিয়ে যান, কারণ এই কালেকশনটি একবার মুছে ফেলার পরে পুনরায় ফিরিয়ে আনা সম্ভব নয়৷"
                  : "Please be aware that when you click the 'Confirm' button, the collection will be permanently deleted, and this action cannot be undone.Proceed with caution, as this payment collection data will be irretrievable once deleted",
              });
            }}
          >
            <SvgXml xml={deleteIcon} />
          </Pressable>
        </View>
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
            {data?.member?.name || data?.member?.user?.name}
          </Text>
          <Text
            style={[
              mainStyle.text14,
              { color: colors.getTextColor(), marginTop: 5 },
            ]}
          >
            {data?.member?.gender || data?.member?.user?.gender || "Mele"}
          </Text>
          <Text
            style={[
              mainStyle.text14,
              { color: colors.getTextColor(), marginTop: 5 },
            ]}
          >
            {data.member?.position}
          </Text>
          <Text
            style={[
              mainStyle.text14,
              { color: colors.getTextColor(), marginTop: 10 },
            ]}
          >
            {data?.member?.mobile}
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
        <View
          style={{
            flex: 1,
            backgroundColor: colors.getBackgroundColor(),
            paddingTop: 20,
          }}
        >
          <CollectionCart
            onPress={() => {
              navigation.navigate("AddMemberSubscription", {
                data: data,
                subscriptionId: subscriptionId,
                update: true,
              });
            }}
            textColor={colors.getTextColor()}
            borderColor={colors.getBorderColor()}
            isDark={isDark}
            data={data}
            title={data?.name}
          />
        </View>
      </LinearGradient>
    </ScrollView>
  );
}
const deleteIcon = `<svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 1H12L10.8571 0H5.14286L4 1H0V3H16M1.14286 16C1.14286 16.5304 1.38367 17.0391 1.81233 17.4142C2.24098 17.7893 2.82236 18 3.42857 18H12.5714C13.1776 18 13.759 17.7893 14.1877 17.4142C14.6163 17.0391 14.8571 16.5304 14.8571 16V4H1.14286V16Z" fill="white"/>
</svg>
`;
