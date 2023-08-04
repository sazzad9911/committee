import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { SubscriptionList } from "../screens/Dashboard/Subscription";
import SubscriptionDetails from "../screens/Dashboard/SubscriptionDetails";
import { ComityList } from "../screens/User/Subscription";
const Stack = createNativeStackNavigator();
export default function ComitySubscriptionRoute() {
  return (
    <Stack.Navigator>
      
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Comity Subscription List"
        component={SubscriptionList}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="SubscriptionDetails"
        component={SubscriptionDetails}
      />
    </Stack.Navigator>
  );
}
