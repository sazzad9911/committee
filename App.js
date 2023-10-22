import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MainRoute from "./routes/MainRoute";
import mainStyle from "./styles/mainStyle";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store";
import "react-native-reanimated";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AnimatedLoader from "react-native-animated-loader";
import React, { useEffect, useState } from "react";
import ToastComponent from "./components/main/ToastCoponent";
import toast from "./data/toast";
import AdminRoute from "./routes/AdminRoute";
import Constants from "expo-constants";
import UpdatePage from "./screens/UpdatePage";
import { AppColors } from "./functions/colors";
import { setIsBn } from "./data/isBn";
import { setIsDark } from "./data/isDark";
import localStorage from "./functions/localStorage";
import { get } from "./apis/multipleApi";
import loader from "./data/loader";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { updateDeviceToken } from "./apis/authApi";

Notifications.setNotificationHandler(null);

export default function App() {
  const LoaderComponent = () => {
    const load = useSelector((state) => state.loader);
    const dispatch = useDispatch();
    const t = useSelector((state) => state.toast);
    const comity = useSelector((state) => state.comity);
    const isDark = useSelector((state) => state.isDark);
    const colors = new AppColors(isDark);
    const user = useSelector((state) => state.user);
    const isBn = useSelector((state) => state.isBn);
    const [update, setUpdate] = useState(true);
    const [expoPushToken, setExpoPushToken] = React.useState("");
    const [notification, setNotification] = React.useState(false);
    const notificationListener = React.useRef();
    const responseListener = React.useRef();

    useEffect(() => {
      setTimeout(() => {
        dispatch(toast.hide());
      }, 5000);
    }, [t]);
    useEffect(() => {
      getData();
      checkUpdate();
    }, []);
    useEffect(() => {
      user &&expoPushToken&&
        updateDeviceToken(user.token, expoPushToken)
          .then((res) => {
            console.log("Success");
          })
          .catch((e) => {
            console.log(e.response.data.msg);
          });
    }, [expoPushToken, user]);
    React.useEffect(() => {
      regNotification();
      //getNetworkStatus();
      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          setNotification(notification);
        });

      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log(response);
        });

      return () => {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, [user]);
    const getData = async () => {
      const bangla = await localStorage.isBn();
      const dark = await localStorage.isDark();
      dispatch(setIsBn(bangla));
      dispatch(setIsDark(dark));
    };
    const checkUpdate = async () => {
      dispatch(loader.show());
      const { data } = await get(
        `/comity/check-for-update?version=${
          Constants.platform.ios
            ? Constants.platform.ios.buildNumber
            : Constants.platform.android.versionCode
        }&platform=${Constants.platform.ios ? "ios" : "android"}`
      );
      setUpdate(data);
      //console.log(data);
      dispatch(loader.hide());
    };
    const regNotification = async () => {
      const token = await registerForPushNotificationsAsync();
      console.log(token);
      setExpoPushToken(token);
      //dispatch(setDeviceToken(token))
      //console.log(token)
      // if (!Array.isArray(user) && user?.token && token) {
      //   await updateDeviceToken(user.token, token);
      // }
    };
    // const getNetworkStatus=async()=>{

    //   const res=await Network.getNetworkStateAsync();
    //   if(!res.isConnected){
    //     setIsOffline(true)
    //     Alert.alert("Ops!","You are offline")
    //   }else{
    //     setIsOffline(false)
    //   }
    // }
    if (!update) {
      return;
    }
    if (update.update) {
      return (
        <UpdatePage
          isBn={isBn}
          background={colors.getTextColor()}
          number={update.currentVersion}
          url={update.url}
          color={colors.getBackgroundColor()}
        />
      );
    }
    return (
      <View style={{ flex: 1 }}>
        {comity ? <AdminRoute /> : <MainRoute />}
        {/* <AnimatedLoader
          source={require("./assets/animation.json")}
          visible={loader}
          overlayColor="rgba(255,255,255,0.25)"
          animationStyle={styles.lottie}
          speed={1}
        ></AnimatedLoader> */}
        {load && (
          <View
            style={{
              position: "absolute",
              zIndex: 10,
              top: 0,
              left: 0,
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").height,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: !isDark
                ? "rgba(255, 255, 255, 0.50)"
                : "rgba(0, 0, 0, 0.50)",
            }}>
            <ActivityIndicator
              color={isDark ? "#fff" : "#000"}
              size={"large"}
            />
          </View>
        )}
      </View>
    );
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <View style={mainStyle.fullContainer}>
          <LoaderComponent />
          <ToastComponent />
        </View>
      </Provider>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  lottie: {
    width: 250,
    height: 250,
  },
});
async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (await Notifications.getExpoPushTokenAsync({ projectId: 'c5ce2e0f-9c87-4c1d-b678-9bb563000533' })).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}
