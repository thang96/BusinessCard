import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Splash} from '../screens';
import {createStackNavigator} from '@react-navigation/stack';
import StackHomeNavigation from '../navigation/StackHomeNavigation';
import StackLoginNavigation from '../navigation/StackLoginNavigation';
const Stack = createStackNavigator();

const AppContainer = () => {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: false}}
            component={Splash}
            name={'Splash'}
          />
          <Stack.Screen
            options={{headerShown: false}}
            component={StackLoginNavigation}
            name={'StackLoginNavigation'}
          />
          <Stack.Screen
            options={{headerShown: false}}
            component={StackHomeNavigation}
            name={'StackHomeNavigation'}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppContainer;
