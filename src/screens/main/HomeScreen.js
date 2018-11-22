import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { Card, Icon, Button } from 'react-native-elements';
import { Subscribe } from 'unstated';

import UsersMethods from '../../store/UsersMethods';
import TheoriesMethods from '../../store/TheoriesMethods';

const HomeScreen = () => (
  <Subscribe to={[UsersMethods, TheoriesMethods]}>
    {(userStore, theoryStore) => <Child userStore={userStore} theoryStore={theoryStore} />}
  </Subscribe>
);

class Child extends React.Component {
  async componentDidMount() {
    this.props.userStore.fetchUser();
    await this.props.userStore.fetchUsers();
    this.props.theoryStore.fetchData(this.props.userStore.state.users);
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
          renderItem={({ item }) => {
            // user = this.props.theoryStore.state.users.find(user => user.id === item.userId);

            return (
              <Card
                title={item.name}
                image={{
                  uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
                }}
              >
                <Text>{item.user.name}</Text>
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
            );
          }}
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
