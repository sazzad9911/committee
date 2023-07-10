import React from 'react'
const Stack = createNativeStackNavigator();
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BackHeader from '../../components/main/BackHeader';
import ProfileScreen from './ProfileScreen';
import { useSelector } from 'react-redux';
import { AppValues } from '../../functions/values';
import LanguageScreen from './LanguageScreen';

export default function Profile() {
  const isBn=useSelector(state=>state.isBn)
  const values=new AppValues(isBn)
  const languageTitle=values.getLanguageHeadline()
  return (
    <Stack.Navigator>
      <Stack.Screen options={{
        headerShown:false
      }} name="ProfileScree" component={ProfileScreen} />
      <Stack.Screen options={{
        header:props=><BackHeader title={languageTitle} {...props}/>
      }} name="LanguageScreen" component={LanguageScreen} />
     
    </Stack.Navigator>
  );
  
}
