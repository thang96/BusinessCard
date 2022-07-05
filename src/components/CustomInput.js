import React, {useEffect} from 'react';
import {StyleSheet, TextInput} from 'react-native';

const CustomInput = props => {
  const {
    secureTextEntry,
    changeText,
    placeholder,
    backgroundColor,
    colorText,
    style,
    value,
    selectedBold,
    selectedItalic,
    fontSize,
    fontFamily,
  } = props;
  return (
    <TextInput
      multiline
      value={value}
      secureTextEntry={secureTextEntry ?? false}
      returnKeyType="done"
      onChangeText={text => changeText(text)}
      textAlign="left"
      placeholder={placeholder}
      style={[
        styles.textInput,
        {
          backgroundColor: backgroundColor,
          color: colorText,
          fontWeight: selectedBold ? 'bold' : 'normal',
          fontStyle: selectedItalic ? 'italic' : 'normal',
          fontSize: fontSize ? fontSize : 14,
          fontFamily: fontFamily ? fontFamily : null,
        },
        style,
      ]}
    />
  );
};
const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    borderRadius: 15,
    alignSelf: 'center',
  },
});
export default CustomInput;
