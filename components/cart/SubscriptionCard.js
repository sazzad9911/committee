import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { useSelector } from 'react-redux';
import { AppColors } from '../../functions/colors';
import { AppValues } from '../../functions/values';
import mainStyle from '../../styles/mainStyle';

export default function SubscriptionCard({title,onPress}) {
    const isDark = useSelector((state) => state.isDark);
    const isBn = useSelector((state) => state.isBn);
    const values = new AppValues(isBn);
    const colors = new AppColors(isDark);

  return (
    <Pressable style={[mainStyle.flexBox,{
        marginHorizontal:20,
        marginVertical:6,
        padding:12,
        borderWidth:1,
        borderRadius:8,
        borderColor:colors.getBorderColor()
    }]} onPress={onPress}>
        <Text style={[mainStyle.subLevel,{color:colors.getTextColor()}]}>{title}</Text>
        <Text style={[mainStyle.subLevel,{color:colors.getTextColor()}]}>{values.getValues()._details}</Text>
    </Pressable>
  )
}
