import React, {useEffect} from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

const CustomButton = props => {
  const {title, backgroundColor, textColor, onPress, style, disabled} = props;
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.button, {backgroundColor: backgroundColor}, style]}>
      <Text style={[styles.text, {color: textColor}]}>{title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 8,
  },
});
export default CustomButton;
