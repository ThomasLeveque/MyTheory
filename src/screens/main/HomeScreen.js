import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
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
  async componentDidMount() {
    this.props.store.getUser();
    await this.props.store.getUsers();
    this.props.store.getTheories();
  }

  render() {
    if (this.props.store.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Loading</Text>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.store.state.theories}
          keyExtractor={({ date }) => date.toString()}
          renderItem={({ item }) => {
            return <CardComponent user={item.user} />;
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: 'white',
    height: '110%',
  },
});

export default createStackNavigator({
  home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null,
    },
  },
  theory: {
    screen: TheoryScreen,
    navigationOptions: {
      header: null,
    },
  },
});
