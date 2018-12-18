import React, { Component } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-navigation';

const Layout = props => <SafeAreaView style={styles.main}>{props.children}</SafeAreaView>;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingBottom: Platform.OS === 'ios' ? 120 : 0,
  },
});

export default Layout;
