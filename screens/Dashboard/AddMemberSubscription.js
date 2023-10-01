import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { post, put } from "../../apis/multipleApi";
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
import { createCollection, createMember } from "../../apis/api";

export default function AddMemberSubscription({ navigation, route }) {
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);
  const ac = ["#1488CC", "#2B32B2"];
  const values = new AppValues(isBn);
  const headlines = values.getValues();
  const colors = new AppColors(isDark);
  const data = route?.params?.data;
  const memberData = route?.params?.memberData;
  const subscriptionId = route?.params?.subscriptionId;
  const [amount, setAmount] = useState(data?.amount?.toString());
  const p = route?.params?.paid;
  const [paid, setPaid] = useState(data?.paid);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const update = route?.params?.update;

  const updateData = () => {
    if (data?.paid) {
      dispatch(loader.show());
      put(`/subs/unpaid/collection/${data.id}`, null, user.token)
        .then((res) => {
          dispatch(loader.hide());
          navigation.goBack();
        })
        .catch((e) => {
          dispatch(loader.hide());
          dispatch(toast.error(e.response.data.msg));
        });
      return;
    }

    dispatch(loader.show());
    put(`/subs/paid/collection/${data.id}`, null, user.token)
      .then((res) => {
        dispatch(loader.hide());
        navigation.goBack();
      })
      .catch((e) => {
        dispatch(loader.hide());
        dispatch(toast.error(e.response.data.msg));
      });
  };
  const createData = async () => {
    try {
      dispatch(loader.show());
      let newMemberId = null;
      if (memberData) {
        const { data: res } = await createMember({
          ...memberData,
        });
        newMemberId = res?.member.id;
      }
      await createCollection({
        subscriptionId: subscriptionId,
        memberId: newMemberId ? newMemberId : data?.id,
        amount: amount,
        paid: paid ? "true" : "",
      });

      dispatch(toast.success("Collection created"));
      navigation.navigate(`${paid ? headlines._paid : headlines._unPaid}`);
    } catch (error) {
      console.log(error);
      Alert.alert(error.response.data.msg);
    } finally {
      dispatch(loader.hide());
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.getBackgroundColor() }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: colors.getBackgroundColor(),
            flex: 1,
          }}
        >
          <View
            style={[
              {
                justifyContent: "center",
                alignItems: "center",
              },
              mainStyle.mt24,
              mainStyle.pdH20,
            ]}
          >
            <ProfilePicture source={{ uri: data?.member?.profilePhoto }} />
            <Text
              numberOfLines={1}
              style={[
                mainStyle.mt12,
                mainStyle.headLine,
                { color: colors.getTextColor(), marginVertical: 5 },
              ]}
            >
              {data && data?.name ? data?.name : data?.user?.name}
            </Text>
            <Text
              style={[mainStyle.subLevel, { color: colors.getBorderColor() }]}
            >
              {data && data?.gender ? data?.gender : data?.user?.gender}
            </Text>
          </View>
          <View style={[mainStyle.pdH20, mainStyle.mt24, { flex: 1 }]}>
            <Input
              editable={update ? false : true}
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
              ]}
            >
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
        </View>
        <Button
          active={Boolean(amount)}
          disabled={!Boolean(amount)}
          onPress={update ? updateData : createData}
          style={{
            marginBottom: 50,
            marginHorizontal: 20,
            position: "absolute",
            width: Dimensions.get("window").width - 40,
            top: Dimensions.get("window").height - 500,
          }}
          title={headlines._ok}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
