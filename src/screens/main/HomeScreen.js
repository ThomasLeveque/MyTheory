import React from 'react';
import { FlatList } from 'react-native';
// import { Card, Icon, Button } from 'react-native-elements';
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
    return (
      <Layout>
        <FlatList
          data={this.props.store.state.theories}
          keyExtractor={({ date }) => date.toString()}
          renderItem={({ item }) => {
            return <CardComponent user={item.user} title={item.name} />;
          }}
        />
      </Layout>
    );
  }
}

export default createStackNavigator({
  home: HomeScreen,
  theory: TheoryScreen,
});
