import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import Button from "../../components/main/Button";
import Input from "../../components/main/Input";
import ReadMoreComponent from "../../components/ReadMoreComponent";
import { AppColors } from "../../functions/colors";
import { AppValues } from "../../functions/values";
import mainStyle from "../../styles/mainStyle";

export default function SelectMemberType({navigation}) {
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);

  const values = new AppValues(isBn);
  const headlines = values.getValues();
  const colors = new AppColors(isDark);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[{flex:1},mainStyle.pdH20]}>
        <Text
          style={[
            mainStyle.mt32,
            mainStyle.text20,
            { color: colors.getTextColor() },
          ]}>
          {headlines._selectPayee}
        </Text>
        <Button onPress={()=>{
            navigation.navigate("AllMember")
        }} style={mainStyle.mt32} title={headlines._addFromComity} active={true}/>
        <Button onPress={()=>{
            navigation.navigate("CreateOwnMember")
        }} style={mainStyle.mt12} title={headlines._createMemberOwn} active={true}/>
        <ReadMoreComponent textColor={colors.getTextColor()}/>
      </View>
    </ScrollView>
  );
}
