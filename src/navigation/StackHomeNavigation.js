import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChooseTextinputStyles from '../components/ChooseTextinputStyles';
import EditTextinputStyles from '../components/EditTextinputStyles';
import CreateColor from '../components/CreateColor';
import BusinessCardDesign from '../screens/Home/BusinessCardDesign';
import DrawerHomeNavigation from './DrawerHomeNavigation';

const Stack = createNativeStackNavigator();

const StackRegisterNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="DrawerHomeNavigation">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="EditTextinputStyles"
        component={EditTextinputStyles}
      />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="DrawerHomeNavigation"
        component={DrawerHomeNavigation}
      />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="CreateColor"
        component={CreateColor}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="ChooseTextinputStyles"
        component={ChooseTextinputStyles}
      />
    </Stack.Navigator>
  );
};
export default StackRegisterNavigation;
