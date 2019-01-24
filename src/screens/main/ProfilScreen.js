import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Button } from 'react-native';
import firebase from 'firebase';
import { Subscribe } from 'unstated';
import { createStackNavigator } from 'react-navigation';
import ButtonComponent from '../../components/ButtonComponent';
import CardComponent from '../../components/CardComponent';

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
          <ButtonComponent
            textButton="Setting"
            onPress={() => {
              this.props.navigation.navigate('setting');
            }}
          />

          <FlatList
            data={this.props.store.state.userTheories}
            keyExtractor={item => item.date.toString()}
            renderItem={({ item }) => {
              return <CardComponent user={item.user} />;
            }}
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
