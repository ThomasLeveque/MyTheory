import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
// import { Card, Icon, Button } from 'react-native-elements';
import { Subscribe } from 'unstated';
import { createStackNavigator } from 'react-navigation';

import Store from '../../store';
import CardComponent from '../../components/CardComponent';

import TheoryScreen from './TheoryScreen';

const HomeScreen = props => (
  <Subscribe to={[Store]}>
    {store => <Child store={store} navigation={props.navigation} />}
  </Subscribe>
);

class Child extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.store.state.theories}
          keyExtractor={({ date }) => date.toString()}
          renderItem={({ item }) => {
            return <CardComponent user={item.user} title={item.name} />;
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});

export default createStackNavigator({
  home: HomeScreen,
  theory: TheoryScreen,
});
