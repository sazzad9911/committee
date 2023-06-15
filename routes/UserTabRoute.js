import React from 'react'
import { View } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Home from '../screens/User/Home';
import Profile from '../screens/User/Profile';
import Subscription from '../screens/User/Subscription';
import Inbox from '../screens/User/Inbox';
import Notification from '../screens/User/Notification';

const Tab = createMaterialBottomTabNavigator();

export default function UserTabRoute() {
  return (
    <Tab.Navigator >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Subscription" component={Subscription} />
      <Tab.Screen name="Inbox" component={Inbox} />
      <Tab.Screen name="Notification" component={Notification} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}
