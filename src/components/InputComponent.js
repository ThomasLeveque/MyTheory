import React from 'react';
import { TextInput, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import colors from '../assets/colors';
import { commonStyle } from '../utils/commonStyles';

const InputComponent = ({
  label,
  onChangeText,
  onBlur,
  styleInput,
  placeholder,
  value,
  isTextArea,
  hasError,
  isEditable,
  secureTextEntry,
}) => {
  return (
    <View>
      <Text style={styles.nameInput}>{label}</Text>
      <TextInput
        multiline={!!isTextArea}
        numberOfLines={isTextArea ? 6 : 0}
        onChangeText={onChangeText}
        onBlur={onBlur}
        style={[
          styles.textInput,
          isTextArea && styles.heightArea,
          styleInput,
          hasError && { borderColor: 'red' },
        ]}
        placeholder={placeholder}
        value={value}
        placeholderTextColor={colors.GRAY_TXT}
        editable={isEditable}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const AddImgComponent = ({ children, title, pressed, styleAddImg, textAlign = 'left' }) => {
  return (
    <View>
      <Text style={[styles.nameInput, { textAlign: textAlign }]}>{title}</Text>
      <TouchableOpacity style={styleAddImg} onPress={pressed}>
        {children}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: colors.GRAY_BG,
    fontSize: 16,
    borderBottomWidth: 3,
    fontFamily: 'montserratSemiBold',
    borderColor: colors.GRAY_TXT,
    color: 'black',
    marginBottom: commonStyle.inputBottomMargin,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  nameInput: {
    fontSize: 14,
    fontFamily: 'montserratBold',
    color: 'black',
    marginBottom: 10,
  },
  heightArea: {
    height: 250,
  },
});

export { InputComponent, AddImgComponent };
