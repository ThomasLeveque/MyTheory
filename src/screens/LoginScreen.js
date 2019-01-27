import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import firebase from 'firebase';

import { PrimaryButton, TextButton } from '../components/ButtonComponent';
import colors from '../assets/colors';

export default class LoginScreen extends React.Component {
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
        <PrimaryButton
          title="Login"
          onPress={this.handleLogin}
          loading={this.state.loading}
          startColor={colors.GRADIENT_START}
          endColor={colors.GRADIENT_END}
          styleButton={{ alignSelf: 'center' }}
        />
        <TextButton
          title="Don't have an account? Sign Up"
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
});
