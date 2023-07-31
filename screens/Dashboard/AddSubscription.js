import React from "react";
import { ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import Button from "../../components/main/Button";
import Input from "../../components/main/Input";
import { AppColors } from "../../functions/colors";
import { AppValues } from "../../functions/values";
import mainStyle from "../../styles/mainStyle";

export default function AddSubscription() {
  const isBn = useSelector((state) => state.isBn);
  const isDark = useSelector((state) => state.isDark);
  const values = new AppValues(isBn);
  const colors = new AppColors(isDark);
  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
      <View style={[mainStyle.pdH20, mainStyle.mt24]}>
        <Input level={values.getValues()._subscriptionName}
        optionalLevel={values.getValues()._required}
        subLevel={values.getValues()._max20}
        placeholder={values.getValues()._placeholder1}
         />
         <Input outSideStyle={mainStyle.mt24} level={values.getValues()._ammoutSubs}
        optionalLevel={values.getValues()._required}
        keyboardType={"numeric"}
        placeholder={values.getValues()._placeholder2}
         />
         <Button active={true} style={mainStyle.mt32} title={values.getValues()._ok}/>
      </View>
    </ScrollView>
  );
}
