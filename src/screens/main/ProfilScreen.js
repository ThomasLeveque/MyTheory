import React from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import firebase from 'firebase';
import { Subscribe } from 'unstated';
import { createStackNavigator } from 'react-navigation';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { SecondaryButton } from '../../components/ButtonComponent';
import CardComponent from '../../components/CardComponent';
import Layout from '../../components/Layout';
import colors from '../../assets/colors';

import Store from '../../store';

import SettingScreen from './SettingScreen';
import { commonStyle } from '../../utils/commonStyles';

const ProfilScreen = props => (
  <Subscribe to={[Store]}>
    {store => <Child store={store} navigation={props.navigation} />}
  </Subscribe>
);

class Child extends React.Component {
  state = {
    loading: false,
  };

  signOutUser = async () => {
    this.setState({ loading: true });
    await firebase.auth().signOut();
    this.setState({ loading: false });
  };

  render() {
    const photoSize = 80;

    let logoutButton = (
      <TouchableOpacity onPress={this.signOutUser} style={styles.logoutButton}>
        <Entypo name="log-out" size={28} color="black" />
      </TouchableOpacity>
    );

    if (this.state.loading) {
      logoutButton = (
        <View style={styles.logoutButton}>
          <ActivityIndicator size="small" color="black" />
        </View>
      );
    }

    return (
      <Layout>
        <Text style={commonStyle.titleStyle}>Profil</Text>
        {logoutButton}
        <View style={{ flexDirection: 'row', flex: 1, marginBottom: 40 }}>
          <View
            style={{
              width: photoSize,
              height: photoSize,
              backgroundColor: colors.GRAY_BG,
              marginRight: 25,
              borderRadius: 50,
              overflow: 'hidden',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <MaterialIcons name="photo" size={photoSize / 2} color={colors.PRIMARY} />
          </View>
          <View>
            <Text style={{ fontSize: 16, color: colors.BLACK, fontFamily: 'montserratSemiBold' }}>
              {this.props.store.state.user.name}
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: colors.GRAY,
                fontFamily: 'montserratRegular',
                marginBottom: 15,
              }}
            >
              {this.props.store.state.user.email}
            </Text>
            <SecondaryButton
              title="Update settings"
              onPress={() => {
                this.props.navigation.navigate('setting');
              }}
              pictoName="settings"
            />
          </View>
        </View>
        <Text style={commonStyle.mediumTitleStyle}>Mes theories</Text>
        {this.props.store.state.userTheories.length === 0 && <Text>Aucunes theories</Text>}
        {this.props.store.state.userTheories && (
          <FlatList
            data={this.props.store.state.userTheories}
            keyExtractor={item => item.date.toString()}
            renderItem={({ item }) => {
              return <CardComponent theory={item} />;
            }}
          />
        )}
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  logoutButton: {
    position: 'absolute',
    top: commonStyle.topGlobalPadding + 10,
    right: 0,
  },
});

export default createStackNavigator({
  profil: {
    screen: ProfilScreen,
    navigationOptions: {
      header: null,
    },
  },
  setting: {
    screen: SettingScreen,
    navigationOptions: {
      header: null,
    },
  },
});
