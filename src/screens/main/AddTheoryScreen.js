import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, ActivityIndicator } from 'react-native';
import firebase from 'firebase';

import { db } from '../../config/Database';
import InputComponent from '../../components/InputComponent';

export default class AddTheoryScreen extends Component {
  state = {
    topic: '',
    name: '',
    description: '',
    likes: [],
    comments: [],
    currentUser: null,
    user: null,
    error: '',
    loading: false,
  };

  componentWillMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData = async () => {
    const { currentUser } = this.state;

    let user = await db.ref('/users/' + currentUser.uid).once('value');
    this.setState({ user: user.val() });
  };

  handleSubmit = async () => {
    const { topic, name, description, likes, comments, user, loading } = this.state;

    if (topic.length > 0 && name.length > 0 && description.length > 0) {
      this.setState({ loading: true });
      await db.ref('/theory').push({
        date: firebase.database.ServerValue.TIMESTAMP,
        topic,
        name,
        description,
        likes,
        comments,
        user,
      });
      this.setState({ loading: false });
      console.log('Theory added');
    } else {
      this.setState({ error: 'Vous avez faux' });
    }
  };
  render() {
    return (
      <View style={styles.main}>
        <Text style={styles.title}>Add theory</Text>
        <InputComponent
          value={this.state.topic}
          onChangeValue={topic => this.setState({ topic })}
          placeholderInput={'Topic'}
          styleInput={styles.itemInput}
        />
        <InputComponent
          value={this.state.name}
          onChangeValue={name => this.setState({ name })}
          placeholderInput={'Name your theory'}
          styleInput={styles.itemInput}
        />
        <InputComponent
          value={this.state.description}
          onChangeValue={description => this.setState({ description })}
          placeholderInput={'Description'}
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
