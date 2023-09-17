import React from 'react'
import { Pressable, View } from 'react-native'
import { SvgXml } from 'react-native-svg'

export default function FloatingButton({onPress,icon}) {
  return (
    <Pressable style={{
      position:"absolute",
      bottom:40,
      right:20
    }} onPress={onPress}>
      <SvgXml xml={icon?icon:Icon}/>
    </Pressable>
  )
}
const Icon=`<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="24.5" cy="24.5" r="21.5" fill="white"/>
<path d="M0.5 25C0.5 11.5011 11.5011 0.5 25 0.5C38.4989 0.5 49.5 11.5011 49.5 25C49.5 38.4989 38.4989 49.5 25 49.5C11.5011 49.5 0.5 38.4989 0.5 25ZM27.375 35V27.375H35C36.3011 27.375 37.375 26.3011 37.375 25C37.375 23.6989 36.3011 22.625 35 22.625H27.375V15C27.375 13.6989 26.3011 12.625 25 12.625C23.6989 12.625 22.625 13.6989 22.625 15V22.625H15C13.6989 22.625 12.625 23.6989 12.625 25C12.625 26.3011 13.6989 27.375 15 27.375H22.625V35C22.625 36.3011 23.6989 37.375 25 37.375C26.3011 37.375 27.375 36.3011 27.375 35Z" fill="url(#paint0_linear_1306_20508)" stroke="white"/>
<defs>
<linearGradient id="paint0_linear_1306_20508" x1="0" y1="25" x2="50" y2="25" gradientUnits="userSpaceOnUse">
<stop stop-color="#1488CC"/>
<stop offset="1" stop-color="#2B32B2"/>
</linearGradient>
</defs>
</svg>

`