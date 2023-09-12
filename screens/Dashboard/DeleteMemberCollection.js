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
import mainStyle from "../../styles/mainStyle";

export default function DeleteMemberCollection({ navigation, route }) {
  const isDark = useSelector((state) => state.isDark);
  const colors = new AppColors(isDark);
  const inset = useSafeAreaInsets();
  const user = useSelector((state) => state.user);
  const { paid, subscriptionId } = route?.params;
  const dispatch = useDispatch();
  const [data, setData] = useState(route?.params?.data);
  const isFocused = useIsFocused();

  useEffect(() => {
    dispatch(loader.show());
    get(`/subs/get-collection-by-id/${data.id}`, user.token)
      .then((res) => {
        setData(res.data.collection);
        dispatch(loader.hide());
      })
      .catch((err) => {
        dispatch(loader.hide());
        console.error(err.response.data.msg);
      });
  }, [isFocused]);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          paddingTop: inset.top,
          backgroundColor: colors.getSchemeColor(),
          flex: 1,
        }}>
        <View
          style={{
            height: 32,
          }}
        />
        <Pressable
          onPress={async () => {
            dispatch(loader.show());
            deletes(`/subs/delete/collection/${data.id}`, user.token)
              .then((res) => {
                dispatch(loader.hide());
                dispatch(toast.success("Success"));
                navigation.goBack();
              })
              .catch((err) => {
                dispatch(loader.hide());
                dispatch(toast.error(err.response.data.msg));
              });
          }}
          style={{
            position: "absolute",
            right: 20,
            top: inset.top + 20,
          }}>
          <SvgXml xml={deleteIcon} />
        </Pressable>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 20,
            paddingBottom: 20,
          }}>
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
            ]}>
            {data ? data.member.name : "Easin arafat aryan xyz"}
          </Text>
          <Text
            style={[
              mainStyle.text14,
              { color: colors.getTextColor(), marginTop: 5 },
            ]}>
            {data ? data.member.gender : "Male"}
          </Text>
          <Text
            style={[
              mainStyle.text14,
              { color: colors.getTextColor(), marginTop: 10 },
            ]}>
            {data ? data.member.mobile : "01676182543"}
          </Text>
          <Text
            style={[
              mainStyle.text14,
              { color: colors.getTextColor(), marginTop: 5 },
            ]}>
            {data
              ? data.member.address
              : "ss s road bandar narayanaganj ss s road bandar narayanaganj"}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: colors.getBackgroundColor(),
            paddingTop: 20,
          }}>
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
            title={data.name}
          />
        </View>
      </View>
    </ScrollView>
  );
}
const deleteIcon = `<svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 1H12L10.8571 0H5.14286L4 1H0V3H16M1.14286 16C1.14286 16.5304 1.38367 17.0391 1.81233 17.4142C2.24098 17.7893 2.82236 18 3.42857 18H12.5714C13.1776 18 13.759 17.7893 14.1877 17.4142C14.6163 17.0391 14.8571 16.5304 14.8571 16V4H1.14286V16Z" fill="white"/>
</svg>
`;
