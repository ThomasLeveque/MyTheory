import React, { Component } from 'react';
import { Text, StyleSheet, Alert, Button } from 'react-native';
import firebase from 'firebase';
import { ImagePicker } from 'expo';
import { Subscribe } from 'unstated';
import { getPermAsync } from '../../utils/Utils';

import db from '../../config/Database';
import Layout from '../../components/Layout';
import InputComponent from '../../components/InputComponent';
import { PrimaryButton, SecondaryButton } from '../../components/ButtonComponent';

import colors from '../../assets/colors';
import Store from '../../store';

const AddTheoryScreen = props => (
  <Subscribe to={[Store]}>
    {store => <Child store={store} navigation={props.navigation} />}
  </Subscribe>
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
      <Layout>
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
        <PrimaryButton
          title="Add theory"
          onPress={this.handleSubmit}
          loading={this.state.loading}
          startColor={colors.GRADIENT_START}
          endColor={colors.GRADIENT_END}
          pictoName="file-upload"
        />
        <SecondaryButton
          title="Vos informations"
          onPress={() => this.props.navigation.navigate('setting')}
          pictoName="settings"
        />
        {this.state.error && <Text style={{ textAlign: 'center' }}>{this.state.error}</Text>}
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
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
});

export default AddTheoryScreen;
