import React from 'react'
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Profile from '../screens/Dashboard/Profile';
import Home from '../screens/User/Home';
import Inbox from '../screens/User/Inbox';
import UserBottomBar from '../components/UserBottomBar';
import DashboardBottomBar from '../components/DashboardBottomBar';
import Dashboard from '../screens/Dashboard/Dashboard';
import Member from '../screens/Dashboard/Member';
import DashboardRoutes from './ExpenseRoutes';
import Message from './Message';
import Subscription from '../screens/Dashboard/Subscription';
import CommitteeProfile from '../screens/Dashboard/CommitteeProfile';

const Tab = createBottomTabNavigator();

export default function DashboardRoute() {
  return (
    <Tab.Navigator tabBar={(props)=><DashboardBottomBar {...props}/>} screenOptions={{
      headerShown:false,
    }} >
     
     <Tab.Screen name="Subscription" component={Subscription} />
      <Tab.Screen name="Inbox" component={Message} />
      {/* <Tab.Screen name="Notification" component={Notification} /> */}
      <Tab.Screen name="Member" component={Member} />
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Profile" component={CommitteeProfile} />
    </Tab.Navigator>
  )
}
