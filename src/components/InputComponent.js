import React from 'react';
import { TextInput, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { getPermAsync } from '../utils/Utils';
import colors from '../assets/colors';

const InputComponent = ({
  nameInput,
  onChangeValue,
  styleInput,
  placeholderInput,
  valueInput,
  isTextArea,
}) => {
  return (
    <View>
      <Text style={styles.nameInput}>{nameInput}</Text>
      <TextInput
        multiline={!!isTextArea}
        numberOfLines={isTextArea ? 6 : 0}
        onChangeText={onChangeValue}
        style={[styles.textInput, isTextArea && styles.heightArea, styleInput]}
        placeholder={placeholderInput}
        value={valueInput}
        placeholderTextColor={colors.GRAY_TXT}
      />
    </View>
  );
};

const AddImgComponent = ({ nameInput, onPressValue, styleAddImg, styleTextAddImg }) => {
  return (
    <View>
      <Text style={styles.nameInput}>Ajouter une image</Text>
      <TouchableOpacity style={[styles.addImgContainer, styleAddImg]} onPress={onPressValue}>
        <MaterialIcons name="add" size={36} color={colors.GRAY_TXT} />
        <Text style={[styles.textAddImage, styleTextAddImg]}>{nameInput}</Text>
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
    fontFamily: 'montserratBold',
    borderColor: colors.GRAY_TXT,
    color: 'black',
    marginBottom: inputBottomMargin,
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
  },
});

export { InputComponent, AddImgComponent };
