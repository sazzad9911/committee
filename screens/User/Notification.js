import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { get } from "../../apis/multipleApi";
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

  //console.log(user.token);
  const [data, setData] = useState();
  useEffect(() => {
    fetch();
  }, [isFocused, isLoading]);
  useEffect(() => {
    if (!data) {
      dispatch(loader.show());
    } else {
      dispatch(loader.hide());
    }
  }, [data]);
  const fetch = () => {
    get("/member/get-my-membership", user.token)
      .then((res) => {
        setData(
          res.data.membership.filter((member) =>
            member.requestBy.includes("Comity")
          )
        );
      })
      .catch((e) => {
        dispatch(toast.error(e.response.data.msg))
      });
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: inset?.top,
      }}>
      <View
        style={[
          mainStyle.flexBox,
          {
            justifyContent: "center",
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderBottomColor: colors.getBorderColor(),
          },
        ]}>
        <Text style={[mainStyle.level, { color: colors.getTextColor() }]}>
          Notification
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: colors.getBackgroundColor(),
        }}>
        {data?.map((doc, i) => (
          <MemberRequestCard
            key={i}
            data={doc}
            name={doc.comity.name}
            type={doc.category}
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
