import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Dimensions,
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
import { useEffect, useState } from "react";
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

export default function App() {
  const LoaderComponent = () => {
    const load = useSelector((state) => state.loader);
    const dispatch = useDispatch();
    const t = useSelector((state) => state.toast);
    const comity = useSelector((state) => state.comity);
    const isDark = useSelector((state) => state.isDark);
    const colors = new AppColors(isDark);
    const isBn = useSelector((state) => state.isBn);
    const [update, setUpdate] = useState(true);

    useEffect(() => {
      setTimeout(() => {
        dispatch(toast.hide());
      }, 5000);
    }, [t]);
    useEffect(() => {
      getData();
      checkUpdate();
    }, []);
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
