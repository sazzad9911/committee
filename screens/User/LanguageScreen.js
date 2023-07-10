import React from 'react'
import { ScrollView } from 'react-native'
import { useSelector } from 'react-redux';
import { AppColors } from '../../functions/colors';
import { AppValues } from '../../functions/values';

export default function LanguageScreen() {
    const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);
  const colors = new AppColors(isDark);
  const values = new AppValues(isBn);
  const signUpCartTitles = values.getSignUpCartTitles();
  const backgroundColor = colors.getBackgroundColor();
  const textColor = colors.getTextColor();
  return (
   <ScrollView style={{backgroundColor:backgroundColor}}>

   </ScrollView>
  )
}
