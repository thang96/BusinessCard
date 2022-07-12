import React from 'react';
import {NameCard} from '../screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChooseTextinputStyles from '../components/ChooseTextinputStyles';
import EditTextinputStyles from '../components/EditTextinputStyles';
import CreateColor from '../components/CreateColor';
import Svg from '../components/Svg';
import BusinessCardDesign from '../screens/Home/BusinessCardDesign';

const Stack = createNativeStackNavigator();

const StackRegisterNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="BusinessCardDesign">
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
        name="BusinessCardDesign"
        component={BusinessCardDesign}
      />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Svg"
        component={Svg}
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
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="NameCard"
        component={NameCard}
      />
    </Stack.Navigator>
  );
};
export default StackRegisterNavigation;
