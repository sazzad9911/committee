import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MainRoute from "./routes/MainRoute";
import mainStyle from "./styles/mainStyle";
import { Provider } from "react-redux";
import store from "./store";
import "react-native-reanimated";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView style={{flex:1}}>
      <Provider store={store}>
        <View style={mainStyle.fullContainer}>
          <MainRoute />
        </View>
      </Provider>
    </GestureHandlerRootView>
  );
}
