import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import { Card, Icon, Button } from 'react-native-elements';
import firebase from 'firebase';
import { Subscribe } from 'unstated';
import { createStackNavigator } from 'react-navigation';

import UsersMethods from '../../store/UsersMethods';
import GetTheories from '../../store/GetTheories';

import SettingScreen from './SettingScreen';

const ProfilScreen = props => (
  <Subscribe to={[UsersMethods, GetTheories]}>
    {(userStore, theoryStore) => (
      <Child userStore={userStore} theoryStore={theoryStore} navigation={props.navigation} />
    )}
  </Subscribe>
);

class Child extends React.Component {
  state = {
    userTheorys: [],
  };

  componentDidMount() {
    this.FilterTheories();
  }

  FilterTheories = async () => {
    const { currentUser } = firebase.auth();

    const userTheorys = this.props.theoryStore.state.theories.filter(
      theory => theory.user.id === currentUser.uid,
    );

    this.setState({
      userTheorys,
    });
  };

  signOutUser = async () => {
    await firebase.auth().signOut();
  };

  render() {
    const { userTheorys } = this.state;

    if (!this.props.userStore.state.user) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text>{this.props.userStore.state.user.name}</Text>
        <Text>{this.props.userStore.state.user.email}</Text>
        <Button
          title="Setting"
          onPress={() => {
            this.props.navigation.navigate('setting');
          }}
        />
        <Button title="Log Out" onPress={this.signOutUser} />
        <FlatList
          data={userTheorys}
          keyExtractor={item => item.date.toString()}
          renderItem={({ item }) => (
            <Card
              title={item.name}
              image={{
                uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
              }}
            >
              <Text style={{ marginBottom: 10 }}>{item.description}</Text>
              <Text>{item.topic}</Text>
              <Text>{item.user.name}</Text>
              <Text>{item.user.email}</Text>
              <Button
                icon={<Icon name="code" color="#ffffff" />}
                backgroundColor="#03A9F4"
                onPress={() => {}}
                buttonStyle={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  marginBottom: 0,
                }}
                title="VIEW NOW"
              />
            </Card>
          )}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
  },
});

export default createStackNavigator({
  profil: ProfilScreen,
  setting: SettingScreen,
});
