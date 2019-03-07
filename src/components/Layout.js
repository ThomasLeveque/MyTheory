import React, { Component } from 'react';
import { StyleSheet, Platform, ScrollView, View } from 'react-native';

import common from '../utils/common';

const Layout = ({ hasFullScreenContent = false, children }) => {
  return (
    <View
      style={[
        styles.main,
        hasFullScreenContent ? null : { paddingHorizontal: common.horizontalGlobalPadding },
      ]}
    >
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
  },
  scroll: {
    paddingVertical: common.verticalGlobalPadding,
  },
});

export default Layout;
