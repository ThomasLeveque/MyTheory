import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { Subscribe } from 'unstated';
import { createStackNavigator } from 'react-navigation-stack';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';

import Store from '../../store';

const ChatScreen = props => (
  <Subscribe to={[Store]}>
    {store => <ChatChild store={store} navigation={props.navigation} />}
  </Subscribe>
);

ChatScreen.navigationOptions = {
  header: null,
};

class ChatChild extends React.Component {
  state = {
    messages: [],
  };

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: '1',
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: '2',
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} enabled>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
});

export default createStackNavigator({
  chat: ChatScreen,
});
