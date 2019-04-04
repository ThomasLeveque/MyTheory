import React, { Component } from 'react';
import { StyleSheet, Platform, ScrollView, View } from 'react-native';

import { commonStyle } from '../utils/commonStyles';

const Layout = ({ hasFullScreenContent = false, children }) => {
  return (
    <View
      style={[
        styles.main,
        hasFullScreenContent ? null : { paddingHorizontal: commonStyle.horizontalGlobalPadding },
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
    paddingTop: commonStyle.topGlobalPadding,
    paddingBottom: commonStyle.bottomGlobalPadding,
  },
});

export default Layout;
