import React from 'react'
import { View } from 'react-native'
import UserHome from '../../components/headers/UserHome'
import HidableHeaderLayout from '../../layouts/HidableHeaderLayout'

export default function Home({navigation}) {
  return (
    <HidableHeaderLayout header={<UserHome navigation={navigation}/>}/>
  )
}
