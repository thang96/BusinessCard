import React, {useEffect} from 'react';

import {SafeAreaView, StyleSheet} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import AppContainer from './src/screens/AppContainer';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
const App = () => {
  useEffect(() => {
    Orientation.lockToLandscape();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={styles.container}>
        <Provider store={store}>
          <AppContainer />
        </Provider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
