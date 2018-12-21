import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import firebase from 'firebase';

import db from '../config/Database';
import { PrimaryButton, TextButton } from '../components/ButtonComponent';

import colors from '../assets/colors';

export default class SignUpScreen extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    errorMessage: null,
    loading: false,
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

    this.setState({ loading: true });
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);

      const { currentUser } = firebase.auth();
      await this.storeUser(currentUser.uid, email, name, {});

      this.props.navigation.navigate('main');
      this.setState({ loading: false });
    } catch (error) {
      this.setState({
        errorMessage: error.message,
        loading: false,
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontFamily: 'montserratBold' }}>Sign Up</Text>
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
        <PrimaryButton
          title="Sign Up"
          onPress={this.handleSignUp}
          loading={this.state.loading}
          startColor={colors.GRADIENT_START}
          endColor={colors.GRADIENT_END}
          styleButton={{ alignSelf: 'center' }}
        />
        <TextButton
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
});
