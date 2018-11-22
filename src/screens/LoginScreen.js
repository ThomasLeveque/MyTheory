import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import firebase from 'firebase';

import ButtonComponent from '../components/ButtonComponent';

export default class Login extends React.Component {
  state = {
    email: '',
    password: '',
    errorMessage: null,
    loading: false,
  };

  handleLogin = async () => {
    const { email, password } = this.state;

    this.setState({ loading: true });
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      this.props.navigation.navigate('main');
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ errorMessage: error.message, loading: false });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        {this.state.errorMessage && <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <ButtonComponent
          textButton="Login"
          onPress={this.handleLogin}
          loading={this.state.loading}
        />
        <ButtonComponent
          textButton="Don't have an account? Sign Up"
          onPress={() => this.props.navigation.navigate('signUp')}
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