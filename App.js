import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { colors } from './global/styles';
import RootNavigator from './navigation/RootNavigator';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);
export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle='light-content'
        backgroundColor={colors.statusbar}
      />
      <RootNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});
