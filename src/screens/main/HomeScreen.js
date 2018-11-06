import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { Card, Icon, Button } from 'react-native-elements';
import firebase from 'firebase';
import { Subscribe } from 'unstated';

import GetTheories from '../../store/GetTheories';

const Main = () => <Subscribe to={[GetTheories]}>{data => <Child data={data} />}</Subscribe>;

class Child extends React.Component {
  componentDidMount() {
    this.props.data.fetchData();
  }

  signOutUser = async () => {
    await firebase.auth().signOut();
  };

  render() {
    return (
      <Subscribe to={[GetTheories]}>
        {data => {
          if (data.state.loading) {
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
                data={data.state.theories}
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
        }}
      </Subscribe>
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

export default Main;
