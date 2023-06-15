import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainRoute from './routes/MainRoute';
import mainStyle from './styles/mainStyle';

export default function App() {
  return (
    <View style={mainStyle.fullContainer}>
      <MainRoute/>
    </View>
  );
}

