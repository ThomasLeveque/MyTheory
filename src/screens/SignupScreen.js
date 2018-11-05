import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import firebase from 'firebase';

import db from '../config/Database';

export default class SignUp extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    errorMessage: null,
  };

  storeUser = (userId, email, name, followedCategory) => {
    db.ref(`users/${userId}`).set({
      id: userId,
      email,
      name,
      followedCategory,
    });
  };

  handleSignUp = async () => {
    const { name, password } = this.state;

    const email = this.state.email.replace(/\s/g, '');

    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      const { currentUser } = firebase.auth();
      this.props.navigation.navigate('main');

      this.storeUser(currentUser.uid, email, name, {});
    } catch (error) {
      this.setState({
        errorMessage: error.message,
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>
        {this.state.errorMessage && <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>}
        <TextInput
          placeholder="Name"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={name => this.setState({ name })}
          value={this.state.name}
        />
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Sign Up" onPress={this.handleSignUp} />
        <Button
          title="Already have an account? Login"
          onPress={() => this.props.navigation.navigate('login')}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
  },
});
