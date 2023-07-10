import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import Button from "../../components/main/Button";
import Input from "../../components/main/Input";
import TextArea from "../../components/main/TextArea";
import { AppColors } from "../../functions/colors";
import { AppValues } from "../../functions/values";
import mainStyle from "../../styles/mainStyle";

export default function CreateCommittee({ navigation }) {
  const isBn = useSelector((state) => state.isBn);
  const isDark = useSelector((state) => state.isDark);
  const values = new AppValues(isBn);
  const colors = new AppColors(isDark);
  const createCommitteeValues = values.createCommitteeValues();
  const textColor = colors.getTextColor();
  const borderColor = colors.getBorderColor();
  const backgroundColor = colors.getBackgroundColor();
  return (
    <ScrollView style={{backgroundColor:backgroundColor}} showsVerticalScrollIndicator={false}>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        <Input
          level={`${createCommitteeValues.name} `}
          optionalLevel={`${createCommitteeValues.required}`}
          subLevel={`${createCommitteeValues.highest30}`}
          placeholder={createCommitteeValues.write}
        />

        <Input
          outSideStyle={mainStyle.mt24}
          level={`${createCommitteeValues.mobile} `}
          optionalLevel={`${createCommitteeValues.required}`}
          placeholder={createCommitteeValues.write}
        />

        <Text
          style={[
            mainStyle.level,
            {
              color: textColor,
            },
            mainStyle.mt24,
          ]}>
          {createCommitteeValues.address}
          <Text style={[mainStyle.subLevel, { color: borderColor }]}>
            {" "}
            ({createCommitteeValues.required})
          </Text>
        </Text>

        <Text
          style={[mainStyle.mt12, { color: textColor }, mainStyle.subLevel]}>
          {createCommitteeValues.division}
        </Text>
        <Input
          onPress={() => console.log("ok")}
          outSideStyle={mainStyle.mt8}
          editable={false}
          placeholder={createCommitteeValues.select}
        />
        <View style={[mainStyle.mt12, mainStyle.flexBox]}>
          <View>
            <Text style={[{ color: textColor }, mainStyle.subLevel]}>
              {createCommitteeValues.district}
            </Text>
            <Input placeholder={createCommitteeValues.write} outSideStyle={mainStyle.halfInput} />
          </View>
          <View>
            <Text style={[{ color: textColor }, mainStyle.subLevel]}>
              {createCommitteeValues.thana}
            </Text>
            <Input placeholder={createCommitteeValues.write} outSideStyle={mainStyle.halfInput} />
          </View>
        </View>

        <TextArea outSideStyle={mainStyle.mt12
        } level={`${createCommitteeValues.address} `}
        optionalLevel={createCommitteeValues.notRequired}
         placeholder={createCommitteeValues.write} />

         <Button onPress={()=>{
          navigation?.navigate("CreateCommitteeNext")
         }} active={true} style={mainStyle.mt24} title={createCommitteeValues.next}/>
         <View style={mainStyle.ht32}/>
      </View>
    </ScrollView>
  );
}
