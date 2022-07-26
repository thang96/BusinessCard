import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import BusinessCardDesign from '../screens/Home/BusinessCardDesign';
import CustomDrawerContent from './CustomDrawerContent';
const Drawer = createDrawerNavigator();
const DrawerHomeNavigation = () => {
  return (
    <Drawer.Navigator
      edgeWidth={30}
      useLegacyImplementation
      drawerContent={props => <CustomDrawerContent {...props} />}
      id="ChooseTheme"
      initialRouteName="BusinessCardDesign">
      <Drawer.Screen
        name="BusinessCardDesign"
        component={BusinessCardDesign}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};
export default DrawerHomeNavigation;
