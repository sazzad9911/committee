import React from "react";
import { ScrollView, View,Text } from "react-native";
import { useSelector } from "react-redux";
import Button from "../../components/main/Button";
import Input from "../../components/main/Input";
import RadioButton from "../../components/main/RadioButton";
import ReadMoreComponent from "../../components/ReadMoreComponent";
import { AppColors } from "../../functions/colors";
import { AppValues } from "../../functions/values";
import mainStyle from "../../styles/mainStyle";

export default function AddMember() {
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);

  const values = new AppValues(isBn);
  const headlines = values.getValues();
  const colors = new AppColors(isDark);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, backgroundColor: colors.getBackgroundColor(),marginHorizontal:20 }}>

        <Input level={headlines._position} 
        placeholder={headlines.write}
        subLevel={headlines._max20}
        optionalLevel={headlines._required}
         outSideStyle={[mainStyle.mt32]} />
         <Text style={[mainStyle.mt32,mainStyle.text20,{color:colors.getTextColor()}]}>{headlines._selectAmembershipPlan}</Text>
         <View style={[mainStyle.flexBox,{paddingVertical:5,justifyContent:"flex-start"}]}>
            <RadioButton title={headlines._generalMember}/>
            <RadioButton style={mainStyle.ml16} title={headlines._specialMember}/>
         </View>
         <Button style={[mainStyle.mt32]} active={true} title={headlines._requestForMember}/>
         <ReadMoreComponent textColor={colors.getTextColor()}/>
      </View>
    </ScrollView>
  );
}
