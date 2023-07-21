import React from 'react'
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Profile from '../screens/Dashboard/Profile';
import Home from '../screens/User/Home';
import Subscription from '../screens/User/Subscription';
import Inbox from '../screens/User/Inbox';
import UserBottomBar from '../components/UserBottomBar';
import DashboardBottomBar from '../components/DashboardBottomBar';
import Dashboard from '../screens/Dashboard/Dashboard';
import Member from '../screens/Dashboard/Member';
import DashboardRoutes from './ExpenseRoutes';

const Tab = createBottomTabNavigator();

export default function DashboardRoute() {
  return (
    <Tab.Navigator tabBar={(props)=><DashboardBottomBar {...props}/>} screenOptions={{
      headerShown:false,
    }} >
     
      <Tab.Screen name="Subscription" component={Subscription} />
      <Tab.Screen name="Inbox" component={Inbox} />
      {/* <Tab.Screen name="Notification" component={Notification} /> */}
      <Tab.Screen name="Member" component={Member} />
      <Tab.Screen name="Dashboard" component={DashboardRoutes} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}
