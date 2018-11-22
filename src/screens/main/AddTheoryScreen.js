import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
  Alert,
  Button,
} from 'react-native';
import firebase from 'firebase';
import { ImagePicker } from 'expo';
import { Subscribe } from 'unstated';
import { getPermAsync } from '../../utils/Utils';

import db from '../../config/Database';
import InputComponent from '../../components/InputComponent';
import UsersMethods from '../../store/UsersMethods';

const AddTheoryScreen = () => (
  <Subscribe to={[UsersMethods]}>{userStore => <Child userStore={userStore} />}</Subscribe>
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
        userId: this.props.userStore.state.user.id,
      });
      this.setState({ loading: false });
    } else {
      this.setState({ error: 'Vous avez faux' });
    }
  };

  render() {
    return (
      <View style={styles.main}>
        <Text style={styles.title}>Add theory</Text>
        <Button title="Choose image..." onPress={this.onChooseImagePress} />
        <InputComponent
          value={this.state.topic}
          onChangeValue={topic => this.setState({ topic })}
          placeholderInput="Topic"
          styleInput={styles.itemInput}
        />
        <InputComponent
          value={this.state.name}
          onChangeValue={name => this.setState({ name })}
          placeholderInput="Name your theory"
          styleInput={styles.itemInput}
        />
        <InputComponent
          value={this.state.description}
          onChangeValue={description => this.setState({ description })}
          placeholderInput="Description"
          styleInput={styles.itemInput}
        />
        <TouchableHighlight style={styles.button} underlayColor="white" onPress={this.handleSubmit}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableHighlight>
        {this.state.error && <Text>{this.state.error}</Text>}
        {this.state.loading && (
          <View>
            <ActivityIndicator size="large" color="red" />
          </View>
        )}
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
    backgroundColor: '#2a8ab7',
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
  },
  itemInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white',
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center',
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
});

export default AddTheoryScreen;
