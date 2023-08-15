import React from 'react'
import { View,Text, Dimensions } from 'react-native'

export default function NoOption() {
  return (
    <View style={{
        height:Dimensions.get("window").height/2,
        justifyContent:"center",
        alignItems:"center",
        width:Dimensions.get("window").width
    }}>
        <Text>No Data Found!</Text>
    </View>
  )
}
