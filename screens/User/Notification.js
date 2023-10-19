import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { get, socket } from "../../apis/multipleApi";
import MemberRequestCard from "../../components/cart/MemberRequestCard";
import NoOption from "../../components/main/NoOption";
import loader from "../../data/loader";
import toast from "../../data/toast";
import { AppColors } from "../../functions/colors";
import { AppValues } from "../../functions/values";
import mainStyle from "../../styles/mainStyle";

export default function Notification() {
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);
  const user = useSelector((state) => state.user);
  const colors = new AppColors(isDark);
  const values = new AppValues(isBn);
  const inset = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.isLoading);
  const toast = useSelector((state) => state.toast);
  const [change, setChange] = useState();
  //console.log(user.token);
  const [data, setData] = useState();
  useEffect(() => {
    !data && dispatch(loader.show());
    fetch();
  }, [isFocused, toast, change]);
  useEffect(() => {
    socket.on("newNotification", (e) => {
      setChange(e);
    });
    return () => {
      socket.off("newNotification");
    };
  }, []);
  const fetch = () => {
    get("/notification/user/get", user.token)
      .then((res) => {
        dispatch(loader.hide());
        console.log(res.data.notifications[0]);
        setData(res.data.notifications);
      })
      .catch((e) => {
        dispatch(loader.hide());
        dispatch(toast.error(e.response.data.msg));
      });
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: inset?.top,
        backgroundColor: colors.getBackgroundColor(),
      }}
    >
      <View
        style={[
          mainStyle.flexBox,
          {
            justifyContent: "center",
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderBottomColor: colors.getBorderColor(),
          },
        ]}
      >
        <Text style={[mainStyle.level, { color: colors.getTextColor() }]}>
          Notification
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: colors.getBackgroundColor(),
        }}
      >
        {data?.map((doc, i) => (
          <MemberRequestCard
            key={i}
            doc={doc}
            type={doc.notificationType}
            comity={doc.availableFor.match("Comity") ? true : false}
            mainColor={colors.getMainColor()}
            shadowColor={colors.getShadowColor()}
            textColor={colors.getTextColor()}
            id={doc?.id}
          />
        ))}
        {data?.length === 0 && (
          <NoOption title={"Hey!"} subTitle={"No Notification available"} />
        )}
      </ScrollView>
    </View>
  );
}
