import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';

const ButtonComponent = ({ textButton, styleButton, styleText, onPress, loading }) => {
  return (
    <TouchableOpacity style={[styleButton, styles.container]} onPress={onPress}>
      {loading && <ActivityIndicator size="large" color="green" />}
      <Text style={[styleText, styles.text]}>{textButton}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'blue',
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
});

export default ButtonComponent;
