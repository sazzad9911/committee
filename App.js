import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MainRoute from "./routes/MainRoute";
import mainStyle from "./styles/mainStyle";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store";
import "react-native-reanimated";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AnimatedLoader from "react-native-animated-loader";
import { useEffect } from "react"
import ToastComponent from "./components/main/ToastCoponent";
import toast from "./data/toast";

export default function App() {
  const LoaderComponent = () => {
    const loader = useSelector((state) => state.loader);
    const dispatch=useDispatch()
    const t = useSelector((state) => state.toast);

    useEffect(()=>{
      setTimeout(()=>{
        dispatch(toast.hide())
      }, 5000)
    },[t])
    return (
      <AnimatedLoader
        source={require("./assets/animation.json")}
        visible={loader}
        overlayColor="rgba(255,255,255,0.25)"
        animationStyle={styles.lottie}
        speed={1}></AnimatedLoader>
    );
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <View style={mainStyle.fullContainer}>
          <MainRoute />
          <LoaderComponent />
         <ToastComponent/>
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
