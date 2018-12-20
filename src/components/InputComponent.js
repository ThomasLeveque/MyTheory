import React from 'react';
import { TextInput, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getPermAsync } from '../utils/Utils';

const TextInputComponent = ({ nameInput, onChangeValue, styleInput, placeholderInput, valueInput }) => {
  return (
    <View>
      <Text style={styles.nameInput}>{nameInput}</Text>
      <TextInput
        onChangeText={onChangeValue}
        style={[styleInput, styles.textInput]}
        placeholder={placeholderInput}
        value={valueInput}
      />
    </View>
  );
};

const TextAreaComponent = ({ nameInput, onChangeValue, styleInput, placeholderInput, valueInput }) => {
  return (
    <View>
      <Text style={styles.nameInput}>{nameInput}</Text>
      <TextInput
        multiline={true}
        numberOfLines={6}
        onChangeText={onChangeValue}
        style={[styleInput, styles.textInput, styles.heightArea]}
        placeholder={placeholderInput}
        value={valueInput}
      />
    </View>
  );
};

const AddImgComponent = ({ nameInput, onPressValue, styleAddImg }) => {
  return (
    <View>
      <Text style={styles.nameInput}>Ajouter une image</Text>
      <TouchableOpacity style={[styleAddImg, styles.addImg]} onPress={onPressValue}>``
        <Text style={[styleAddImg, styles.textAddImage]}>
          <MaterialIcons name='add' size={40} color="white" style={[styles.iconAddImage]} />
          {"\n"}{nameInput}...
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#F6F6F6',
    fontSize: 23,
    borderBottomWidth: 3,
    borderColor: '#E0E0E0',
    color: '#000000',
    fontWeight: '400',
    height: 50,
  },
  textAddImage: {
    textAlign:'center',
    marginTop: 20,
    marginBottom: 20,
    fontWeight: '900',
    color: '#E0E0E0',
  },
  iconAddImage: {
    color: '#E0E0E0',
  },
  addImg: {
    backgroundColor: '#F6F6F6',
    borderBottomWidth: 3,
    borderColor: '#E0E0E0',
  },
  nameInput: {
    marginTop: 12,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  heightArea: {
    height: 250,
  },
});

export { TextInputComponent, TextAreaComponent, AddImgComponent };
