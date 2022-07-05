import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, Text, TouchableOpacity} from 'react-native';
import {SvgUri} from 'react-native-svg';

const Svg = props => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1, flexDirection: 'row'}}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          borderWidth: 1,
          borderRadius: 10,
          height: 50,
          marginTop: 10,
          marginLeft: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 24, fontWeight: 'bold', margin: 5}}>Back</Text>
      </TouchableOpacity>
      <SvgUri
        width="100%"
        height="100%"
        uri="http://thenewcode.com/assets/images/thumbnails/homer-simpson.svg"
      />
    </SafeAreaView>
  );
};

export default Svg;
