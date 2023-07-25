import React from 'react'
import { Pressable, View } from 'react-native'
import { SvgXml } from 'react-native-svg'

export default function FloatingButton({onPress}) {
  return (
    <Pressable style={{
      position:"absolute",
      bottom:40,
      right:20
    }} onPress={onPress}>
      <SvgXml xml={icon}/>
    </Pressable>
  )
}
const icon=`<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25 0C11.225 0 0 11.225 0 25C0 38.775 11.225 50 25 50C38.775 50 50 38.775 50 25C50 11.225 38.775 0 25 0ZM35 26.875H26.875V35C26.875 36.025 26.025 36.875 25 36.875C23.975 36.875 23.125 36.025 23.125 35V26.875H15C13.975 26.875 13.125 26.025 13.125 25C13.125 23.975 13.975 23.125 15 23.125H23.125V15C23.125 13.975 23.975 13.125 25 13.125C26.025 13.125 26.875 13.975 26.875 15V23.125H35C36.025 23.125 36.875 23.975 36.875 25C36.875 26.025 36.025 26.875 35 26.875Z" fill="url(#paint0_linear_678_15469)"/>
<defs>
<linearGradient id="paint0_linear_678_15469" x1="0" y1="25" x2="50" y2="25" gradientUnits="userSpaceOnUse">
<stop stop-color="#1488CC"/>
<stop offset="1" stop-color="#2B32B2"/>
</linearGradient>
</defs>
</svg>
`