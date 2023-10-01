import React, { useState } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { deletes, post, put } from "../../apis/multipleApi";
import Button from "../../components/main/Button";
import Input from "../../components/main/Input";
import loader from "../../data/loader";
import toast from "../../data/toast";
import { AppColors } from "../../functions/colors";
import { AppValues } from "../../functions/values";
import mainStyle from "../../styles/mainStyle";
import { deleteSubs } from "../../apis/api";

export default function EditSubscription({ navigation, route }) {
  const { isDark, user, comity } = useSelector((state) => state);
  const isBn = useSelector((state) => state.isBn);
  const values = new AppValues(isBn);
  const data = route?.params?.data;
  const colors = new AppColors(isDark);
  const [name, setName] = useState(data?.name);
  const [quantity, setQuantity] = useState(data?.amount?.toString());
  const dispatch = useDispatch();

  //console.log(route?.params?.route);
  const save = async () => {
    // navigation?.navigate("DeleteConfirmation")
    // return

    dispatch(loader.show());
    put(
      "/subs/update",
      {
        name: name,
        amount: quantity,
        subscriptionId: data.id,
      },
      user.token
    )
      .then((res) => {
        dispatch(loader.hide());
        navigation?.goBack();
      })
      .catch((e) => {
        dispatch(toast.error(e.response.data.msg));
        dispatch(loader.hide());
      });
  };
  const style = {
    color: "green",
    fontSize: 20,
    fontWeight: "400",
  };

  const handelDelete = async () => {
    try {
      dispatch(loader.show());
      await deleteSubs(data?.id);
      dispatch(toast.success("Subscription deleted successfully"));
      navigation.pop(3);
    } catch (error) {
      console.log(error);
      dispatch(toast.error(error?.response?.data?.msg));
    } finally {
      dispatch(loader.hide());
    }
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.getBackgroundColor() }}
      showsHorizontalScrollIndicator={false}
    >
      <View style={[mainStyle.pdH20, mainStyle.mt24]}>
        <Input
          value={name}
          onChange={setName}
          level={values.getValues()._subscriptionName}
          optionalLevel={values.getValues()._required}
          subLevel={values.getValues()._max20}
          placeholder={values.getValues()._placeholder1}
        />
        <Input
          value={quantity}
          onChange={setQuantity}
          outSideStyle={mainStyle.mt24}
          level={values.getValues()._ammoutSubs}
          optionalLevel={values.getValues()._required}
          keyboardType={"numeric"}
          placeholder={values.getValues()._placeholder2}
        />
        <Button
          onPress={save}
          disabled={name && quantity ? false : true}
          active={name && quantity ? true : false}
          style={mainStyle.mt32}
          title={values.getValues()._ok}
        />
        <Button
          onPress={() => {
            navigation.navigate("DeleteConfirmation", {
              title: values.getValues()._subsDeleteMessage,
              onPress: () => handelDelete(),
              rmTitle: isBn ? "গুরুত্বপূর্ণ মেসেজ" : "Important message",
              rmMessage: isBn
                ? "অনুগ্রহ করে সচেতন থাকুন যে আপনি যখন 'নিশ্চিত করুন' বাটনে ক্লিক করবেন, সদস্যতা স্থায়ীভাবে মুছে যাবে, এবং এই ক্রিয়াটি পূর্বাবস্থায় ফেরানো যাবে না। সতর্কতার সাথে এগিয়ে যান, কারণ সমস্ত সম্পর্কিত ডেটা একবার মুছে ফেলার পরে অপসারণযোগ্য হবে"
                : "Please be aware that when you click the 'Confirm' button, the subscription will be permanently deleted, and this action cannot be undone. Proceed with caution, as all associated data will be irretrievable once deleted",
            });
          }}
          style={{
            position: "absolute",
            width: Dimensions.get("window").width - 40,
            top: Dimensions.get("window").height - 450,
            borderColor: "#F00",
          }}
          color={"#F00"}
          title={values.getValues()._deleteSubscription}
        />
      </View>
    </ScrollView>
  );
}
