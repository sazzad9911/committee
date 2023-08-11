import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MainRoute from "./routes/MainRoute";
import mainStyle from "./styles/mainStyle";
import { Provider, useSelector } from "react-redux";
import store from "./store";
import "react-native-reanimated";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AnimatedLoader from "react-native-animated-loader";

export default function App() {
  const LoaderComponent = () => {
    const loader = useSelector((state) => state.loader);
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
          <LoaderComponent/>
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
