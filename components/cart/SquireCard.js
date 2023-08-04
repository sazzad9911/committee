import React from 'react'
import { View ,Text,Pressable} from 'react-native'
import { SvgXml } from 'react-native-svg'
import { useSelector } from 'react-redux'
import { AppColors } from '../../functions/colors'

export default function SquireCard({style,icon,title,onPress}) {
  const isDark=useSelector(state=>state.isDark)
  const colors=new AppColors(isDark)
  return (
    <Pressable onPress={onPress} style={[{
        alignItems:"center"
    },style]}>
        <SvgXml xml={icon}/>
        <Text style={{
            marginTop:8,
            fontSize:12,
            color:colors.getTextColor(),
        }}>{title}</Text>
    </Pressable>
  )
}