import React, {useEffect, useState, useRef} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  ImageBackground,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userInfo, userInfoSlice, updateUser} from '../redux/features/userSlice';
import {useDispatch, useSelector} from 'react-redux';
const Splash = () => {
  const [isReady, setIsReady] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // const InfoUse = useSelector(state => state.user.user);
  const InfoUse = useSelector(userInfo);
  // console.log(InfoUse, 'user');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const spinValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      }),
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      }),
    ]).start();
  };
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-360deg'],
  });

  useEffect(() => {
    // Orientation.lockToLandscape();
    fadeIn();
  }, []);

  useEffect(() => {
    const login = setTimeout(() => {
      AsyncStorage.getItem('useInfo')
        .then(value => {
          // console.log(value, 'value');
          dispatch(updateUser(JSON.parse(value)));
          setIsReady(true);
          // console.log(JSON.parse(value), 'asyncstorage');
          clearTimeout(login);
        })
        .catch(e => {
          setIsReady(true);
          clearTimeout(login);
        });
    }, 2000);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    navigation.navigate(
      InfoUse?.usename === '' ||
        InfoUse?.usename === undefined ||
        InfoUse?.usename === null
        ? 'StackLoginNavigation'
        : 'StackHomeNavigation',
    );
  }, [isReady, InfoUse]);
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/images/backgroundhome.jpg')}
        style={styles.container}>
        <Animated.View
          style={[
            styles.fadingContainer,
            {
              opacity: fadeAnim,
            },
            {transform: [{rotate: spin}, {scale: scaleValue}]},
          ]}>
          <Text style={styles.textTitle}>Business Card Design</Text>
        </Animated.View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  textTitle: {
    fontSize: 60,
    color: 'rgb(0,0,0)',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontStyle: 'italic',
    transform: [{skewX: '-9deg'}, {skewY: '-8deg'}],
  },
});

export default Splash;
