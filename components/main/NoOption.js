import React from 'react'
import { View,Text, Dimensions } from 'react-native'
import { useSelector } from 'react-redux'
import { AppColors } from '../../functions/colors'
import { AppValues } from '../../functions/values'

export default function NoOption({title,subTitle}) {
  const {isBn,isDark}=useSelector(state=>state)
  const colors=new AppColors(isDark)
  const headlines=new AppValues(isBn)

  return (
    <View style={{
        height:Dimensions.get("window").height/2,
        justifyContent:"center",
        alignItems:"center",
        width:Dimensions.get("window").width-40,
        marginLeft:20
    }}>
        <Text style={{
          color:colors.getShadowColor(),
          fontSize:16,
          fontWeight:"500",
          textAlign:"center",
        }}>{title?title:"No Data Found!"}</Text>
        {subTitle&&(<Text style={{
          color:colors.getBorderColor(),
          fontSize:16,
          fontWeight:"600",
          marginTop:16,
          textAlign:"center",
        }}>{subTitle}</Text>)}
    </View>
  )
}
