import React from 'react';
import { Image, ActivityIndicator, StyleSheet } from 'react-native';
import firebase from 'firebase';
import { Font, LinearGradient } from 'expo';

import fonts from '../assets/fonts';
import colors from '../assets/colors';

const logo = require('../assets/logo.png');

export default class Loading extends React.Component {
  async componentDidMount() {
    await Font.loadAsync(fonts);

    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'main' : 'signUp');
    });
  }

  render() {
    return (
      <LinearGradient
        style={styles.container}
        colors={[colors.GRADIENT_START, colors.GRADIENT_END]}
      >
        <Image source={logo} style={styles.logo} />
        <ActivityIndicator size="large" color="white" />
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginBottom: 50,
    width: 80,
    height: 80,
  },
});
