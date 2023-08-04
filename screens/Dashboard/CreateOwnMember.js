import React from "react";
import { ScrollView, View,Text } from "react-native";
import { useSelector } from "react-redux";
import Avatar from "../../components/main/Avatar";
import Button from "../../components/main/Button";
import Input from "../../components/main/Input";
import ProfilePicture from "../../components/main/ProfilePicture";
import RadioButton from "../../components/main/RadioButton";
import TextArea from "../../components/main/TextArea";
import { AppColors } from "../../functions/colors";
import { AppValues } from "../../functions/values";
import mainStyle from "../../styles/mainStyle";

export default function CreateOwnMember() {
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);
  const colors = new AppColors(isDark);
  const values = new AppValues(isBn);
  const headlines = values.getValues();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[{ flex: 1 ,paddingBottom:32}, mainStyle.pdH20]}>
        <View
          style={[
            mainStyle.flexBox,
            { justifyContent: "center" },
            mainStyle.mt24,
          ]}>
          <ProfilePicture
            edit={true}
            source={{
              uri: "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
            }}
          />
        </View>
        <Input
          outSideStyle={mainStyle.mt24}
          level={headlines._name}
          optionalLevel={headlines._required}
          subLevel={headlines._max20}
          placeholder={headlines.write}
        />
        <Input
          level={headlines._position}
          placeholder={headlines._positionPlaceholder}
          subLevel={headlines._max20}
          optionalLevel={headlines._required}
          outSideStyle={[mainStyle.mt24]}
        />
        <Text
          style={[
            mainStyle.mt32,
            mainStyle.text20,
            { color: colors.getTextColor() },
          ]}>
          {headlines._selectAmembershipPlan}
        </Text>
        <View
          style={[
            mainStyle.flexBox,
            { paddingVertical: 5, justifyContent: "flex-start" },
          ]}>
          <RadioButton title={headlines._generalMember} />
          <RadioButton
            style={mainStyle.ml16}
            title={headlines._specialMember}
          />
          
        </View>
        <Input
          outSideStyle={mainStyle.mt24}
          level={headlines._age}
          optionalLevel={headlines._notRequired}
          placeholder={headlines.write}
        />
        <Input
          level={headlines._mobile}
          placeholder={headlines.write}
          subLevel={headlines._max11}
          optionalLevel={headlines._required}
          outSideStyle={[mainStyle.mt24]}
        />
         <Input
          level={headlines._email}
          placeholder={headlines.write}
          subLevel={headlines._max30}
          optionalLevel={headlines._required}
          outSideStyle={[mainStyle.mt24]}
        />
        <TextArea
          level={headlines._address}
          placeholder={headlines.write}
          subLevel={headlines._max50}
          optionalLevel={headlines._notRequired}
          outSideStyle={[mainStyle.mt24]}
        />
        <Button active={true} style={mainStyle.mt24} title={headlines._ok}/>
      </View>
    </ScrollView>
  );
}
