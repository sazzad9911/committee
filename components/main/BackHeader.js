import React from "react";
import { Dimensions, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";
import { AppColors } from "../../functions/colors";
const { width, height } = Dimensions.get("window");

export default function BackHeader({title,onPress,navigation,style}) {
  const isDark = useSelector((state) => state.isDark);
  const colors = new AppColors(isDark);
  const textColor = colors.getTextColor();
  const backgroundColor = colors.getBackgroundColor();
  const inset = useSafeAreaInsets();
  const icon = `<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 16.5L1.5 9L9 1.5" stroke="${textColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
  return (
    <View
      style={[{
        paddingTop: inset?.top,
        backgroundColor: backgroundColor,
      }]}>
      <View
        style={[{
          flexDirection: "row",
          paddingHorizontal: 20,
          paddingVertical: 12,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: backgroundColor,
        },style]}>
        <Pressable onPress={()=>{
            if(onPress){
                onPress()
                return
            }
            navigation?.goBack()
        }}
          style={{
            position: "absolute",
            zIndex: 100,
            left: 20,
            width:50,
            height:28,
            justifyContent:"center",
           
          }}>
          <SvgXml xml={icon} />
        </Pressable>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 20,
            fontWeight: "500",
            color: textColor,
            maxWidth: width - 100,
          }}>
         {title}
        </Text>
      </View>
    </View>
  );
}
