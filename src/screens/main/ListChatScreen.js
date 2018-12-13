import React from 'react';
import { Subscribe } from 'unstated';
import { createStackNavigator } from 'react-navigation';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
//import { Card, Icon, Button } from 'react-native-elements';
import Store from '../../store';
import ChatScreen from './ChatScreen';
import ButtonComponent from '../../components/ButtonComponent';
import CardComponnent from '../../components/CardComponent';

const ListChatScreen = props => (
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
          renderItem={({ item }) => (
            <CardComponnent user={item.user} />
            // <Card title={item.name}>
            //   <Button
            //     backgroundColor="#03A9F4"
            //     onPress={() => {
            //       this.props.navigation.navigate('chat');
            //     }}
            //     icon={<Icon name="code" color="#ffffff" />}
            //     buttonStyle={{
            //       borderRadius: 0,
            //       marginLeft: 0,
            //       marginRight: 0,
            //       marginBottom: 0,
            //     }}
            //     title="CHAT NOW"
            //   />
            // </CarD>
          )}
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
  listChat: ListChatScreen,
  chat: ChatScreen,
});
