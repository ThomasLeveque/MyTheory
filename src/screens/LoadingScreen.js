import React from 'react';
import { Image, ActivityIndicator, StyleSheet } from 'react-native';
import firebase from 'firebase';
import { Subscribe } from 'unstated';
import { Font, LinearGradient } from 'expo';

import Store from '../store';
import fonts from '../assets/fonts';
import colors from '../assets/colors';

const logo = require('../assets/logo.png');

const LoadingScreen = props => (
  <Subscribe to={[Store]}>
    {store => <Child store={store} navigation={props.navigation} />}
  </Subscribe>
);

class Child extends React.Component {
  async componentDidMount() {
    await Font.loadAsync(fonts);

    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        // setting the loading to false inside the last call, getTheories here
        await this.props.store.getUser();
        await this.props.store.getUsers();
        await this.props.store.getCategories();
        await this.props.store.getTheories();
        this.props.navigation.navigate('main');
      } else {
        this.props.navigation.navigate('signUp');
      }
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

export default LoadingScreen;
