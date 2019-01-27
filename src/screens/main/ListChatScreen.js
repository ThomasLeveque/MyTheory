import React from 'react';
import { Subscribe } from 'unstated';
import { createStackNavigator } from 'react-navigation';
import { FlatList } from 'react-native';

import Store from '../../store';
import ChatScreen from './ChatScreen';
import CardComponnent from '../../components/CardComponent';
import Layout from '../../components/Layout';

const ListChatScreen = props => (
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
          renderItem={({ item }) => <CardComponnent title={item.name} />}
        />
      </Layout>
    );
  }
}

export default createStackNavigator({
  listChat: ListChatScreen,
  chat: ChatScreen,
});
