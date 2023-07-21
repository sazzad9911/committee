import React from "react";
import AllCollections from "../screens/Dashboard/AllCollections";
import AllExpenses from "../screens/Dashboard/AllExpenses";
import Dashboard from "../screens/Dashboard/Dashboard";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DateShort from "../screens/Dashboard/DateShort";
import BackHeader from "../components/main/BackHeader";
import SelectDate from "../screens/Dashboard/SelectDate";
const Stack = createNativeStackNavigator();

export default function DashboardRoutes() {
  
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="MainCollection"
        component={Dashboard}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="AllCollections"
        component={AllCollections}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="AllExpenses"
        component={AllExpenses}
      />
      
    </Stack.Navigator>
  );
}
