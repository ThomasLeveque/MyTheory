import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { Card, Icon, Button } from 'react-native-elements';
import { Subscribe } from 'unstated';

import GetTheories from '../../store/GetTheories';
import UsersMethods from '../../store/UsersMethods';

const HomeScreen = () => (
  <Subscribe to={[UsersMethods, GetTheories]}>
    {(userStore, theoryStore) => <Child userStore={userStore} theoryStore={theoryStore} />}
  </Subscribe>
);

class Child extends React.Component {
  componentDidMount() {
    this.props.theoryStore.fetchData();
    this.props.userStore.fetchUser();
  }

  render() {
    if (this.props.theoryStore.state.loading) {
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
          data={this.props.theoryStore.state.theories}
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

export default HomeScreen;
