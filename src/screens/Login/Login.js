import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {colos, icons, images} from '../../constants';
import {isValidEmail, isValidPassword} from '../../utilies/Validations';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const [usename, setUsename] = useState('');
  const [password, setPassword] = useState('');
  const [errUsename, setErrUsename] = useState('');
  const [errPassword, setErrPassword] = useState('');
  const [visibility, setVisibility] = useState(false);
  useEffect(() => {
    isValidationOK();
  }, [usename, password]);
  const isValidationOK = () =>
    usename.length > 0 &&
    password.length > 0 &&
    isValidEmail(usename) == true &&
    isValidPassword(password) == true;
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container}>
        <ImageBackground
          resizeMode="cover"
          source={require('../../assets/images/background.jpg')}
          style={styles.container}>
          <Text style={styles.textTitle}>Business Card Design</Text>
          <View style={styles.eachView}>
            <View style={styles.viewContainerLeft}>
              <Text style={styles.titleSignIn}>Sign in</Text>
              <View style={styles.viewInput}>
                <TextInput
                  placeholder="Username or email"
                  style={styles.textInput}
                  onChangeText={text => {
                    setErrUsename(
                      isValidEmail(text) == true
                        ? ''
                        : 'Email not in correct format',
                    );
                    setUsename(text);
                  }}
                  value={usename}
                />
              </View>
              {errUsename !== '' ? (
                <Text style={{color: 'red'}}>{errUsename}</Text>
              ) : (
                <Text />
              )}
              <View style={styles.viewInput}>
                <TextInput
                  secureTextEntry={visibility ? false : true}
                  onChangeText={text => {
                    setErrPassword(
                      isValidPassword(text) == true
                        ? ''
                        : 'Password must be at least 6 characters',
                    );
                    setPassword(text);
                  }}
                  placeholder="Password"
                  style={[styles.textInput, {flex: 1}]}
                  value={password}
                />
                <TouchableOpacity
                  onPress={() => {
                    setVisibility(visibility ? false : true);
                  }}>
                  <Image
                    source={visibility ? icons.visibility : icons.unvisibility}
                    style={{height: 20, width: 20, marginRight: 5}}
                  />
                </TouchableOpacity>
              </View>
              {errPassword !== '' ? (
                <Text style={{color: 'red'}}>{errPassword}</Text>
              ) : (
                <Text />
              )}
              <TouchableOpacity
                onPress={() => {
                  const use = {usename, password};
                  AsyncStorage.setItem('useInfo', JSON.stringify(use));
                }}
                disabled={isValidationOK() == true ? false : true}
                style={[
                  styles.buttonLogin,
                  {
                    backgroundColor:
                      isValidationOK() == true ? 'rgb(0,255,0)' : 'grey',
                  },
                ]}>
                <Text style={styles.textLogin}>Login</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                width: '30%',
                height: '80%',
              }}>
              <TouchableOpacity
                style={[
                  styles.viewLoginButton,
                  {backgroundColor: 'rgb(224,73,49)'},
                ]}>
                <Image
                  style={{width: 25, height: 25, marginLeft: 10}}
                  source={icons.google}
                />
                <Text style={{color: 'white', marginLeft: 10}}>
                  Login with Google
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.viewLoginButton,
                  {backgroundColor: 'rgb(2,109,253)'},
                ]}>
                <Image
                  style={{width: 25, height: 25, marginLeft: 10}}
                  source={icons.facebook}
                />
                <Text style={{color: 'white', marginLeft: 10}}>
                  Login with Facebook
                </Text>
              </TouchableOpacity>
              <Text style={{alignSelf: 'center', marginTop: 20}}>
                Dont't have account?
              </Text>
              <View style={styles.viewRowBottom}>
                <TouchableOpacity>
                  <Text style={{color: 'rgb(0,121,185)'}}>Register</Text>
                </TouchableOpacity>
                <View style={styles.viewForgotPassword} />
                <TouchableOpacity>
                  <Text style={{color: 'rgb(0,121,185)'}}>
                    Forgot password?
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'rgba(0,0,0,0.5)',
    alignSelf: 'center',
    marginTop: 10,
  },
  eachView: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  viewContainerLeft: {
    backgroundColor: 'white',
    height: '80%',
    width: '65%',
    paddingHorizontal: 20,
    paddingTop: 5,
  },
  titleSignIn: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'rgba(0,0,0,0.7)',
  },
  viewInput: {
    backgroundColor: 'rgba(128,128,128,0.4)',
    flexDirection: 'row',
    height: 50,
    marginTop: 10,
    alignItems: 'center',
  },
  textInput: {
    alignSelf: 'center',
  },
  buttonLogin: {
    height: 50,
    width: 150,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLogin: {fontWeight: 'bold', color: 'white', fontSize: 18},
  viewRowBottom: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    marginTop: 5,
  },
  viewForgotPassword: {
    width: 1,
    backgroundColor: 'grey',
    height: 20,
    marginHorizontal: 10,
  },
  viewLoginButton: {
    height: 50,

    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 5,
  },
});

export default Login;
