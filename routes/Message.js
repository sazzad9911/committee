import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
const Tab = createMaterialTopTabNavigator();
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { SvgXml } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import WebViews from "../screens/WebViews";
import ChatList from "../screens/ChatList";

const Stack = createStackNavigator();

const Message = (props) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
 
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="MessageScreen"
          component={ChatList}
        />
        {/* <Stack.Screen
          name="ChatScreen"
          options={{
            headerShown: false,
          }}
          component={ChatScreen}
        /> */}
        <Stack.Screen
          options={{ headerShown: false }}
          name="WebViews"
          component={WebViews}
        />
        
      </Stack.Navigator>
    </View>
  );
};

export default Message;