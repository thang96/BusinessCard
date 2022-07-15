import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  LogBox,
  RefreshControl,
} from 'react-native';

const CustomFunctionButton = props => {
  const {onPress, icon, styleButton, styleIcon, size, disabled} = props;
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.button, styleButton]}
      onPress={onPress}>
      <Image source={icon} style={[{height: size, width: size}, styleIcon]} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    height: 45,
    width: 50,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});
export default CustomFunctionButton;
