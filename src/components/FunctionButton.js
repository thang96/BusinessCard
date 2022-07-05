import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
} from 'react-native';

const FunctionButton = props => {
  const {onPress, title} = props;
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonTopTab}>
      <Text style={styles.textTopTab}>{title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  buttonTopTab: {
    height: 45,
    width: 150,
    marginRight: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  textTopTab: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'rgba(0,0,0,0.5)',
  },
});
export default FunctionButton;
