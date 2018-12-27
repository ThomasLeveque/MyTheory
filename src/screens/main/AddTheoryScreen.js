import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import firebase from 'firebase';
import { ImagePicker } from 'expo';
import { Subscribe } from 'unstated';
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
    topic: '',
    name: '',
    description: '',
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
        <AddImgComponent
          onPressValue={this.onChooseImagePress}
          styleAddImg={styles.AddImg}
          nameInput="Add your image"
        />
        <InputComponent
          nameInput="Sujet"
          onChangeValue={topic => this.setState({ topic })}
          placeholderInput="Topic"
          value={this.state.topic}
        />
        <InputComponent
          nameInput="Nom de la théorie"
          onChangeValue={name => this.setState({ name })}
          placeholderInput="Name your theory"
          value={this.state.name}
        />
        <InputComponent
          nameInput="Description"
          onChangeValue={description => this.setState({ description })}
          placeholderInput="Description"
          value={this.state.description}
          isTextArea
        />
        <ButtonComponent
          textButton="Add theory"
          onPress={this.handleSubmit}
          loading={this.state.loading}
        />
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
});

export default AddTheoryScreen;
