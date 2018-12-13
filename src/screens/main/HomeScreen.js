import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
// import { Card, Icon, Button } from 'react-native-elements';
import { Subscribe } from 'unstated';

import Store from '../../store';
import CardComponent from '../../components/CardComponent';

const HomeScreen = () => <Subscribe to={[Store]}>{store => <Child store={store} />}</Subscribe>;

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
          renderItem={({ item }) => {
            return (
              <CardComponent user={item.user} />
              // <Text>{item.user.name}</Text>
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
