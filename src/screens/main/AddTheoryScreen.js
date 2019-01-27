import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import firebase from 'firebase';
import { ImagePicker } from 'expo';
import { Subscribe } from 'unstated';
import { Formik } from 'formik';
import * as yup from 'yup';
import ModalSelector from 'react-native-modal-selector';

import { getPermAsync } from '../../utils/Utils';

import db from '../../config/Database';
import { InputComponent, AddImgComponent } from '../../components/InputComponent';

import ButtonComponent from '../../components/ButtonComponent';

import Store from '../../store';

const AddTheoryScreen = () => (
  <Subscribe to={[Store]}>{store => <Child store={store} />}</Subscribe>
);

class Child extends Component {
  state = {
    error: '',
    // image: '',
    loading: false,
    textInputValue: '',
  };

  onChooseImagePress = async () => {
    if (getPermAsync()) {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.cancelled) {
        try {
          await this.uploadImage(result.uri, 'test-image');
          Alert('Success');
        } catch (error) {
          Alert(error);
        }
      }
    }
  };

  uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    // this.setState({ image: `images/theories/${imageName}` });
    const ref = firebase
      .storage()
      .ref()
      .child(`images/theories/${imageName}`);
    return ref.put(blob);
  };

  handleSubmit = async ({ category, name, description, likes, comments, img }) => {
    try {
      if (category.length > 0 && name.length > 0 && description.length > 0) {
        this.setState({ loading: true });
        await db.ref('/theory').push({
          date: firebase.database.ServerValue.TIMESTAMP,
          category,
          name,
          description,
          likes,
          comments,
          img,
          userId: this.props.store.state.user.id,
        });
        await this.props.store.getTheories();
        this.setState({ loading: false });
      } else {
        this.setState({ error: 'Vous avez faux', loading: false });
      }
    } catch (error) {
      this.setState({ error, loading: false });
    }
  };

  render() {
    let index = 0;
    const data = [
      { key: index++, section: true, label: 'Fruits' },
      { key: index++, label: 'Red Apples' },
      { key: index++, label: 'Cherries' },
      { key: index++, label: 'Cranberries', accessibilityLabel: 'Tap here for cranberries' },
      // etc...
      // Can also add additional custom keys which are passed to the onChange callback
      { key: index++, label: 'Vegetable', customKey: 'Not a fruit' },
    ];
    return (
      <View style={styles.main}>
        <ModalSelector
          data={data}
          initValue="Select something yummy!"
          supportedOrientations={['landscape', 'portrait']}
          accessible
          scrollViewAccessibilityLabel="Scrollable options"
          cancelButtonAccessibilityLabel="Cancel Button"
          onChange={option => {
            this.setState({ textInputValue: option.label });
          }}
        >
          <InputComponent
            placeholder="Select something yummy!"
            value={this.state.textInputValue}
            isEditable={false}
          />
        </ModalSelector>

        <Text style={styles.title}>Add theory</Text>
        <Formik
          initialValues={{
            img: '',
            category: '',
            name: '',
            description: '',
            likes: [],
            comments: [],
          }}
          onSubmit={async (values, { setSubmitting }) => {
            await this.handleSubmit(values);
            setSubmitting(false);
          }}
          validationSchema={yup.object().shape({
            category: yup.string().required('required'),
            name: yup.string().required('required'),
            description: yup.string().required('required'),
          })}
        >
          {props => {
            return (
              <View>
                <AddImgComponent
                  pressed={this.onChooseImagePress}
                  styleAddImg={styles.AddImg}
                  label="Add your image"
                />
                <InputComponent
                  label="Nom de la théorie"
                  onBlur={props.handleBlur('name')}
                  onChangeText={props.handleChange('name')}
                  placeholder="Name your theory"
                  value={props.values.name}
                  hasError={!!(props.touched.name && props.errors.name)}
                />
                <InputComponent
                  label="Categorie"
                  onBlur={props.handleBlur('category')}
                  onChangeText={props.handleChange('category')}
                  placeholder="Category"
                  value={props.values.category}
                  hasError={!!(props.touched.category && props.errors.category)}
                />
                <InputComponent
                  label="Description"
                  onChangeText={props.handleChange('description')}
                  onBlur={props.handleBlur('description')}
                  placeholder="Description"
                  value={props.values.description}
                  isTextArea
                  hasError={!!(props.touched.description && props.errors.description)}
                />
                <ButtonComponent
                  textButton="Add theory"
                  onPress={props.handleSubmit}
                  loading={this.state.loading}
                  disabled={!props.isValid || props.isSubmitting}
                />
              </View>
            );
          }}
        </Formik>

        {this.state.error && <Text>{this.state.error}</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
  },
  error: { fontSize: 14, color: 'red' },
});

export default AddTheoryScreen;
