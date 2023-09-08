import React from "react";
const Stack = createNativeStackNavigator();
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BackHeader from "../../components/main/BackHeader";
import { useSelector } from "react-redux";
import { AppValues } from "../../functions/values";
import CommitteeProfile from "./CommitteeProfile";
import EditProfileInfo from "../User/EditProfileInfo";
import MemberPage from "./MemberPage";
import CurrentBalance from "./CurrentBalance";
import EditCommitteeInfo from "./EditCommitteeInfo";
import Notice from "./Notice";

export default function Profile() {
  const isBn = useSelector((state) => state.isBn);
  const values = new AppValues(isBn);
  const languageTitle = values.getLanguageHeadline();
  const editProfileInfo = values.getEditProfileHeadLine();
  const getComityHeadLine=values.getComityHeadLine()
  const headlines=values.getHeadLines()
  
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="CommitteeProfile"
        component={CommitteeProfile}
      />
      
    </Stack.Navigator>
  );
}
