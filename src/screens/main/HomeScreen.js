import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { Card, Icon, Button } from 'react-native-elements';
import firebase from 'firebase';

import { db } from '../../config/Database';

export default class Main extends React.Component {
  state = {
    currentUser: null,
    page: 0,
    loading: false,
    theories: [],
  };

  signOutUser = async () => {
    try {
      await firebase.auth().signOut();
    } catch (e) {
      console.log(e);
    }
  };

  componentWillMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
  }

  fetchData = async () => {
    this.setState({ loading: true });
    const allTheories = await db.ref('/theory').once('value');
    const theories = Object.values(allTheories.val());
    this.setState({
      theories,
      loading: false,
    });
  };

  handleEnd = () => {
    this.setState(state => ({ page: state.page + 1 }), () => this.fetchData());
    this.fetchData();
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { theories, loading } = this.state;

    if (loading) {
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
          data={theories}
          onEndReached={() => this.handleEnd()}
          onEndReachedThreshold={0}
          ListFooterComponent={() =>
            this.state.loading ? null : <ActivityIndicator size="large" animating />
          }
          keyExtractor={({ date }) => date.toString()}
          renderItem={({ item }) => (
            <Card
              title={item.name}
              image={{
                uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
              }}
            >
              <Text style={{ marginBottom: 10 }}>{item.description}</Text>
              <Button
                backgroundColor="#03A9F4"
                onPress={() => {}}
                icon={<Icon name="code" color="#ffffff" />}
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
    backgroundColor: 'white',
    height: '110%',
  },
});
