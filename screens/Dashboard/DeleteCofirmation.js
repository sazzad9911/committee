import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import Button from "../../components/main/Button";
import ReadMoreComponent from "../../components/ReadMoreComponent";
import { AppColors } from "../../functions/colors";
import { AppValues } from "../../functions/values";
import mainStyle from "../../styles/mainStyle";

export default function DeleteConfirmation({ navigation,route }) {
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);
  const values = new AppValues(isBn);
  const headlines = values.getValues();
  const colors = new AppColors(isDark);
  const onPress=route?.params?.onPress;
  const title=route?.params?.title;
  const style=route?.params?.style;


  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[{ flex: 1 },mainStyle.pdH20]}>
        <Text style={[mainStyle.mt32,mainStyle.level,{color:"#f00"},style]}>{title?title:headlines._deleteCofirmation}</Text>
        <Button onPress={onPress} style={mainStyle.mt32} active={true} title={headlines._ok}/>
        <ReadMoreComponent/>
      </View>
    </ScrollView>
  );
}
