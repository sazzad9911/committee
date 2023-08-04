import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import SubscriptionDetails from "../screens/Dashboard/SubscriptionDetails";
import { ComityList } from "../screens/User/Subscription";
import SubscriptionList from "../screens/User/SubscriptionList";
const Stack = createNativeStackNavigator();
export default function UserSubscriptionRoute() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Subscription Screen"
        component={ComityList}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Subscription List"
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
