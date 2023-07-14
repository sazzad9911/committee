import React from 'react'
const Stack = createNativeStackNavigator();
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BackHeader from '../../components/main/BackHeader';
import ProfileScreen from './ProfileScreen';
import { useSelector } from 'react-redux';
import { AppValues } from '../../functions/values';
import LanguageScreen from './LanguageScreen';
import EditProfileInfo from './EditProfileInfo';
import CommitteeList from './CommitteeList';

export default function Profile() {
  const isBn=useSelector(state=>state.isBn)
  const values=new AppValues(isBn)
  const languageTitle=values.getLanguageHeadline()
  const editProfileInfo=values.getEditProfileHeadLine()
  return (
    <Stack.Navigator>
      <Stack.Screen options={{
        headerShown:false
      }} name="ProfileScree" component={ProfileScreen} />
      <Stack.Screen options={{
        headerShown:false
      }} name="CommitteeList" component={CommitteeList} />
    </Stack.Navigator>
  );
  
}
