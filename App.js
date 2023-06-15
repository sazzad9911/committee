import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MainRoute from "./routes/MainRoute";
import mainStyle from "./styles/mainStyle";
import { Provider } from "react-redux";
import store from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <View style={mainStyle.fullContainer}>
        <MainRoute />
      </View>
    </Provider>
  );
}
