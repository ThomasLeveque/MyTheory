import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import { Card, Icon, Button } from 'react-native-elements';
import firebase from 'firebase';
import { Subscribe } from 'unstated';
import { createStackNavigator } from 'react-navigation';

import Store from '../../store';

import SettingScreen from './SettingScreen';

const ProfilScreen = props => (
  <Subscribe to={[Store]}>
    {store => <Child store={store} navigation={props.navigation} />}
  </Subscribe>
);

class Child extends React.Component {
  signOutUser = async () => {
    await firebase.auth().signOut();
  };

  render() {
    let content = (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
    if (this.props.store.state.user) {
      content = (
        <View>
          <Text>{this.props.store.state.user.name}</Text>
          <Text>{this.props.store.state.user.email}</Text>
          <Button
            title="Setting"
            onPress={() => {
              this.props.navigation.navigate('setting');
            }}
          />

          <FlatList
            data={this.props.store.state.userTheories}
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

    return (
      <View style={styles.container}>
        <Button title="Log Out" onPress={this.signOutUser} />
        {content}
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
