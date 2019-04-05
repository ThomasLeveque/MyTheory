import React from 'react';
import { FlatList } from 'react-native';
import { Subscribe } from 'unstated';
import { createStackNavigator } from 'react-navigation';

import Store from '../../store';
import CardComponent from '../../components/CardComponent';

import TheoryScreen from './TheoryScreen';
import Layout from '../../components/Layout';

const HomeScreen = props => (
  <Subscribe to={[Store]}>
    {store => <Child store={store} navigation={props.navigation} />}
  </Subscribe>
);

class Child extends React.Component {
  render() {
    console.log(this.props.store.state.theories);
    return (
      <Layout>
        <FlatList
          data={this.props.store.state.theories}
          keyExtractor={({ date }) => date.toString()}
          renderItem={({ item }) => {
            return <CardComponent theory={item} />;
          }}
        />
      </Layout>
    );
  }
}

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
