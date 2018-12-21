import React from 'react';
import { Text, View, FlatList, Button } from 'react-native';
import firebase from 'firebase';
import { Subscribe } from 'unstated';
import { createStackNavigator } from 'react-navigation';
import { PrimaryButton } from '../../components/ButtonComponent';
import CardComponent from '../../components/CardComponent';
import Layout from '../../components/Layout';

import Store from '../../store';

import SettingScreen from './SettingScreen';
import colors from '../../assets/colors';

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
    return (
      <Layout>
        <Button title="Log Out" onPress={this.signOutUser} />
        <View>
          <Text>{this.props.store.state.user.name}</Text>
          <Text>{this.props.store.state.user.email}</Text>
          <PrimaryButton
            title="Setting"
            onPress={() => {
              this.props.navigation.navigate('setting');
            }}
            startColor={colors.GRAY}
            endColor={colors.GRAY}
          />
          {this.props.store.state.userTheories.length === 0 && (
            <Text>RAJOUTES DES THEORIES PELO</Text>
          )}
          {this.props.store.state.userTheories && (
            <FlatList
              data={this.props.store.state.userTheories}
              keyExtractor={item => item.date.toString()}
              renderItem={({ item }) => {
                return <CardComponent user={item.user} title={item.name} />;
              }}
            />
          )}
        </View>
      </Layout>
    );
  }
}

export default createStackNavigator({
  profil: ProfilScreen,
  setting: SettingScreen,
});
