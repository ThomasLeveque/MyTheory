import React from 'react';
import { Subscribe } from 'unstated';
import { createStackNavigator } from 'react-navigation-stack';
import { FlatList } from 'react-native';

import Store from '../../store';
import ChatScreen from './ChatScreen';
import CardComponent from '../../components/CardComponent';
import Layout from '../../components/Layout';

const ListChatScreen = props => (
  <Subscribe to={[Store]}>
    {store => <ListChatChild store={store} navigation={props.navigation} />}
  </Subscribe>
);

class ListChatChild extends React.Component {
  render() {
    return (
      <Layout>
        <FlatList
          data={this.props.store.state.theories}
          keyExtractor={({ date }) => date.toString()}
          renderItem={({ item }) => <CardComponent theory={item} />}
        />
      </Layout>
    );
  }
}

export default createStackNavigator({
  listChat: ListChatScreen,
  chat: ChatScreen,
});
