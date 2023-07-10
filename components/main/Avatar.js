import React from 'react'
import { Image, Pressable } from 'react-native'

export default function Avatar({onPress,url,source,style}) {
  return (
    <Pressable onPress={onPress} style={[{
        width:40,
        height:40,
        borderRadius:style?.height?style.height/2:40/2,
        overflow:"hidden"
    },style]}>
        <Image style={{
            height:style?.height?style.height:40,
            width:style?.width?style.width:40,
        }} source={source?source:{uri:url}}/>
    </Pressable>
  )
}
