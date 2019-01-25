import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import firebase from 'firebase';
import { ImagePicker } from 'expo';
import { Subscribe } from 'unstated';
import { Formik } from 'formik';
import * as yup from 'yup';

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
    likes: [],
    comments: [],
    error: '',
    image: '',
    loading: false,
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
    this.setState({ image: `images/theories/${imageName}` });
    const ref = firebase
      .storage()
      .ref()
      .child(`images/theories/${imageName}`);
    return ref.put(blob);
  };

  handleSubmit = async () => {
    const { topic, name, description, likes, comments, image } = this.state;

    if (topic.length > 0 && name.length > 0 && description.length > 0) {
      this.setState({ loading: true });
      await db.ref('/theory').push({
        date: firebase.database.ServerValue.TIMESTAMP,
        topic,
        name,
        description,
        likes,
        comments,
        image,
        userId: this.props.store.state.user.id,
      });
      await this.props.store.getTheories();
      this.setState({ loading: false });
    } else {
      this.setState({ error: 'Vous avez faux' });
    }
  };

  render() {
    return (
      <View style={styles.main}>
        <Text style={styles.title}>Add theory</Text>
        <Formik
          initialValues={{ img: '', topic: '', name: '', description: '' }}
          onSubmit={() => {}}
          validationSchema={yup.object().shape({
            topic: yup.string().required('required'),
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
                  label="Sujet"
                  onBlur={props.handleBlur('topic')}
                  onChangeText={props.handleChange('topic')}
                  placeholder="Topic"
                  value={props.values.topic}
                  hasError={!!(props.touched.topic && props.errors.topic)}
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
