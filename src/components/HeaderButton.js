import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../assets/colors';

const HeaderButton = ({ navigation }) => {
  const getCurrentRouteName = navigationState => {
    if (!navigationState) {
      return;
    }
    const routes = navigationState.routes[navigationState.index];

    if (routes.routes) {
      return getCurrentRouteName(routes);
    }
    return routes.routeName;
  };

  let current = getCurrentRouteName(navigation.state),
    displayGoBack =
      current === 'setting' || current === 'addtheory' || current === 'theory' || current === 'categoryTheory' ? true : null;

  if (displayGoBack) {
    return (
      <MaterialIcons
        onPress={() => navigation.goBack(null)}
        name="chevron-left"
        size={36}
        color={colors.PRIMARY}
      />
    );
  }
  return null;
};

export default HeaderButton;
