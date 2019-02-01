import React, { Component } from 'react';
import { StyleSheet, Platform, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import common from '../utils/common';

const Layout = props => {
  return (
    <SafeAreaView style={[styles.main, props.additionalGlobalStyle]}>{props.children}</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingBottom: Platform.OS === 'ios' ? common.bottomGlobalPadding : 0,
    backgroundColor: 'white',
  },
});

export default Layout;
