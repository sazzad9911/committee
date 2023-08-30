import React, { useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { post } from "../../apis/multipleApi";
import Avatar from "../../components/main/Avatar";
import Button from "../../components/main/Button";
import Input from "../../components/main/Input";
import ProfilePicture from "../../components/main/ProfilePicture";
import RadioButton from "../../components/main/RadioButton";
import loader from "../../data/loader";
import toast from "../../data/toast";
import { AppColors } from "../../functions/colors";
import { AppValues } from "../../functions/values";
import mainStyle from "../../styles/mainStyle";

export default function AddMemberSubscription({ navigation, route }) {
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);
  const ac = ["#1488CC", "#2B32B2"];
  const values = new AppValues(isBn);
  const headlines = values.getValues();
  const colors = new AppColors(isDark);
  const data = route?.params?.data;
  const [amount, setAmount] = useState();
  const [paid, setPaid] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <View
      style={{
        backgroundColor: colors.getBackgroundColor(),
        flex: 1,
      }}>
      <View
        style={[
          {
            justifyContent: "center",
            alignItems: "center",
          },
          mainStyle.mt24,
          mainStyle.pdH20,
        ]}>
        <ProfilePicture />
        <Text
          numberOfLines={1}
          style={[
            mainStyle.mt12,
            mainStyle.headLine,
            { color: colors.getTextColor(), marginVertical: 5 },
          ]}>
          {data && data?.name ? data?.name : data?.user?.name}
        </Text>
        <Text style={[mainStyle.subLevel, { color: colors.getBorderColor() }]}>
          {data && data?.gender ? data?.gender : data?.user?.gender}
        </Text>
      </View>
      <View style={[mainStyle.pdH20, mainStyle.mt24, { flex: 1 }]}>
        <Input
          value={amount}
          onChange={setAmount}
          keyboardType={"numeric"}
          level={headlines._amount}
          placeholder={"00 TK"}
        />
        <View
          style={[
            mainStyle.flexBox,
            { justifyContent: "flex-start" },
            mainStyle.mt24,
          ]}>
          <RadioButton
            value={paid}
            onChange={() => setPaid((v) => !v)}
            title={headlines._paid}
          />
          <View style={mainStyle.ml16} />
          <RadioButton
            value={!paid}
            onChange={() => setPaid((v) => !v)}
            title={headlines._unPaid}
          />
        </View>
      </View>
      <Button
        active={Boolean(amount)}
        disabled={!Boolean(amount)}
        onPress={async () => {
          dispatch(loader.show());
          try {
            await post(
              `/subs/create/collection`,
              {
                subscriptionId: "cllm9q3pk0001i41f92c0nkgc",
                memberId: "cllmbitut000bi81f81s6jvox",
                amount: "1000",
                paid: "false",
              },
              user.token
            );
            dispatch(loader.hide());
            dispatch(toast.success("Collection created"));
            getMember();
          } catch (e) {
            dispatch(loader.hide());
            dispatch(toast.error("Request failed"));
            console.error(e);
          }
        }}
        style={{
          marginBottom: 50,
          marginHorizontal: 20,
        }}
        title={headlines._ok}
      />
    </View>
  );
}
