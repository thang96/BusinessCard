import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  useDrawerProgress,
} from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import {icons} from '../constants';
import {getListSvg} from '../redux/features/listSvgSlice';
import {useDispatch} from 'react-redux';
import {svgimages, svgvehicle, svgweather} from '../constants';
import {useNavigation} from '@react-navigation/native';
const CustomDrawerContent = props => {
  const progress = useDrawerProgress();
  const dispatch = useDispatch();
  const translateX = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });
  const navigate = useNavigation();
  return (
    <DrawerContentScrollView {...props}>
      <Animated.View style={{transform: [{translateX}]}}>
        {/* <DrawerItemList {...props} /> */}
        <DrawerItem
          label={({focused, color}) => (
            <Text style={[styles.text, {color: 'rgb(244,164,96)'}]}>
              Animal
            </Text>
          )}
          icon={() => <Image source={icons.dog} style={styles.image} />}
          onPress={() => {
            dispatch(getListSvg(svgimages));
            props.navigation.toggleDrawer();
          }}
          style={[
            styles.style,
            {
              borderColor: 'rgb(244,164,96)',
              backgroundColor: 'rgba(244,164,96,0.1)',
            },
          ]}
        />
        <DrawerItem
          label={({focused, color}) => (
            <Text style={[styles.text, {color: 'rgb(0,191,255)'}]}>
              Vehicle
            </Text>
          )}
          icon={() => <Image source={icons.vehicle} style={[styles.image]} />}
          onPress={() => {
            dispatch(getListSvg(svgvehicle));
            props.navigation.toggleDrawer();
          }}
          style={[
            styles.style,
            {
              borderColor: 'rgb(0,191,255)',
              backgroundColor: ' rgba(0,191,255,0.1)',
            },
          ]}
        />
        <DrawerItem
          label={({focused, color}) => (
            <Text style={[styles.text, {color: 'rgb(202,225,255)'}]}>
              Weather
            </Text>
          )}
          icon={() => <Image source={icons.weather} style={[styles.image]} />}
          onPress={() => {
            dispatch(getListSvg(svgweather));
            props.navigation.toggleDrawer();
          }}
          style={[
            styles.style,
            {
              borderColor: 'rgb(202,225,255)',
              backgroundColor: 'rgba(202,225,255,0.1)',
            },
          ]}
        />
      </Animated.View>
    </DrawerContentScrollView>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 25,
    height: 25,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  style: {
    borderWidth: 1,
  },
});
export default CustomDrawerContent;
