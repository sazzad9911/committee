import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { get, socket } from "../../apis/multipleApi";
import MemberRequestCard from "../../components/cart/MemberRequestCard";
import NoOption from "../../components/main/NoOption";
import loader from "../../data/loader";
import { AppColors } from "../../functions/colors";
import { AppValues } from "../../functions/values";
import mainStyle from "../../styles/mainStyle";

export default function DashboardNotification() {
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);
  const user = useSelector((state) => state.user);
  const comity = useSelector((state) => state.comity);
  const colors = new AppColors(isDark);
  const values = new AppValues(isBn);
  const inset = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.isLoading);

  //console.log(user.token);
  const [data, setData] = useState();
  useEffect(() => {
    !data && dispatch(loader.show());
    fetch();
    socket.on("newNotification", (e) => {
      console.log(e);
      fetch();
    });
    // socket.off("newNotification")
  }, [isFocused]);

  const fetch = async () => {
    try {
      const res = await get(
        `/notification/comity/get/${comity?.id}`,
        user.token
      );
      //console.log(res.data.notifications);
      setData(res.data.notifications);
      dispatch(loader.hide());
    } catch (e) {
      dispatch(loader.hide());
      console.error(e.message);
    }
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: colors.getBackgroundColor(),
        }}>
        <View style={{ height: 12 }} />
        {data?.map((doc, i) => (
          <MemberRequestCard
            key={i}
            data={doc}
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
        <View style={{ height: 12 }} />
      </ScrollView>
    </View>
  );
}
