import React from 'react';
import { TextInput, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { getPermAsync } from '../utils/Utils';
import colors from '../assets/colors';

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

const AddImgComponent = ({ label, pressed, styleAddImg, styleTextAddImg }) => {
  return (
    <View>
      <Text style={styles.nameInput}>Ajouter une image</Text>
      <TouchableOpacity style={[styles.addImgContainer, styleAddImg]} onPress={pressed}>
        <MaterialIcons name="add" size={36} color={colors.GRAY_TXT} />
        <Text style={[styles.textAddImage, styleTextAddImg]}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const inputBottomMargin = 16;

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
    marginBottom: inputBottomMargin,
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
  textAddImage: {
    color: colors.GRAY_TXT,
    fontSize: 16,
    fontFamily: 'montserratBold',
  },
  addImgContainer: {
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: colors.GRAY_BG,
    borderBottomWidth: 3,
    borderColor: colors.GRAY_TXT,
    marginBottom: inputBottomMargin,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
});

export { InputComponent, AddImgComponent };
