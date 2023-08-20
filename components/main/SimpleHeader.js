import React from "react";
import { Pressable, View,Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";
import { AppColors } from "../../functions/colors";
import mainStyle from "../../styles/mainStyle";

export default function SimpleHeader({title,navigation,onPress}) {
  const inset = useSafeAreaInsets();
  const isDark=useSelector(state=>state.isDark)
  const colors=new AppColors(isDark)
  const back=`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 19.5L7.5 12L15 4.5" stroke="${colors.getTextColor()}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`
  return (
    <View
      style={{
        paddingTop: inset.top,
        backgroundColor:colors.getBackgroundColor()
      }}>
      <View style={{
        marginVertical:12,
        flexDirection:"row",
        paddingHorizontal:20
      }}>
        <Pressable onPress={()=>{
            if(onPress){
                return onPress()
            }
            navigation.goBack()
        }}>
        <SvgXml xml={back}/>
        </Pressable>
        <Text style={{
            fontSize:16,
            fontWeight:"500",
            marginLeft:16,
            color:colors.getTextColor()
        }}>{title}</Text>
      </View>
    </View>
  );
}
