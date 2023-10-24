import React, { useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { post } from "../../apis/multipleApi";
import Button from "../../components/main/Button";
import Input from "../../components/main/Input";
import RadioButton from "../../components/main/RadioButton";
import ReadMoreComponent from "../../components/ReadMoreComponent";
import loader from "../../data/loader";
import toast from "../../data/toast";
import { AppColors } from "../../functions/colors";
import { AppValues } from "../../functions/values";
import mainStyle from "../../styles/mainStyle";

export default function AcceptMember({ navigation, route }) {
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);

  const values = new AppValues(isBn);
  const headlines = values.getValues();
  const colors = new AppColors(isDark);
  const [position, setPosition] = useState();
  const id = route?.params?.id;
  const nId = route?.params?.nId;
  const comity = useSelector((state) => state.comity);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [explain, setExplain] = useState();

  const accept = () => {
    dispatch(loader.show());
    post(
      `/member/request/accept/${id}`,
      {
        notificationId: nId,
        position: explain,
        category: position,
      },
      user.token
    )
      .then((res) => {
        dispatch(loader.hide());
        dispatch(toast.success("Request accepted"));
        navigation.goBack();
      })
      .catch((err) => {
        dispatch(loader.hide());
        dispatch(toast.error(err.response.data.msg));
      });
  };

  return (
    <ScrollView
      style={{
        backgroundColor: colors.getBackgroundColor(),
      }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: colors.getBackgroundColor(),
          marginHorizontal: 20,
        }}
      >
        <Input
          maxLength={20}
          level={headlines._position}
          placeholder={headlines._exampleGeneral}
          subLevel={headlines._max20}
          value={explain}
          onChange={setExplain}
          optionalLevel={headlines._required}
          outSideStyle={[mainStyle.mt32]}
        />
        <Text
          style={[
            mainStyle.mt24,
            mainStyle.text20,
            { color: colors.getTextColor() },
          ]}
        >
          {headlines._selectAmembershipPlan}
        </Text>
        <View
          style={[
            mainStyle.flexBox,
            { paddingVertical: 15, justifyContent: "flex-start" },
          ]}
        >
          <RadioButton
            value={position == "General" ? true : false}
            title={headlines._generalMember}
            onChange={() => setPosition("General")}
          />
          <RadioButton
            value={position == "Special" ? true : false}
            style={mainStyle.ml16}
            title={headlines._specialMember}
            onChange={() => setPosition("Special")}
          />
        </View>
        <Button
          onPress={() => {
            accept();
          }}
          style={[mainStyle.mt32]}
          active={position && explain ? true : false}
          disabled={!position || !explain ? true : false}
          title={headlines._ok}
        />
        <ReadMoreComponent
          message={headlines._positionAndCategoryText}
          textColor={colors.getTextColor()}
        />
      </View>
    </ScrollView>
  );
}
