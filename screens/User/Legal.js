import React from 'react'
import { ScrollView,Text,View } from 'react-native'
import { useSelector } from 'react-redux'
import { AppColors } from '../../functions/colors'

export default function Legal() {
    const isDark=useSelector(state=>state.isDark)
    const colors=new AppColors(isDark)

  return (
    <ScrollView style={{backgroundColor:colors.getBackgroundColor()}}>
        <View style={{
            marginHorizontal:20,
            marginVertical:12,
            borderRadius:12,
            borderWidth:1,
            borderColor:colors.getShadowColor()
        }}>
            <Card border title={"About Comity"} color={colors.getTextColor()} bg={colors.getShadowColor()}/>
            <Card border title={"Agreements"} color={colors.getTextColor()} bg={colors.getShadowColor()}/>
            <Card border title={"Term & condition "} color={colors.getTextColor()} bg={colors.getShadowColor()}/>
            <Card title={"Privacy Policy"} color={colors.getTextColor()} bg={colors.getShadowColor()}/>
        </View>
    </ScrollView>
  )
}
const Card=({color,bg,title,border})=>{
    return(
        <View style={{
            paddingLeft:12,
            paddingTop:16
        }}>
            <Text style={{
                color:color,
                fontSize:14,
                fontWeight:"500",
                marginBottom:16
            }}>{title}</Text>
            {border&&(<View style={{
                width:"100%",
                height:1,
                backgroundColor:bg,
                
            }}/>)}
        </View>
    )
}