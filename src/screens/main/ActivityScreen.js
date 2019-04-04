import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Subscribe } from 'unstated';

import Layout from '../../components/Layout';
import CardComponent from '../../components/CardComponent';
import Store from '../../store/index';

const ActivityScreen = props => (
  <Subscribe to={[Store]}>
    {store => <Child store={store} navigation={props.navigation} />}
  </Subscribe>
);

const Child = props => {
  return (
    <Layout>
      <SafeAreaView forceInset={{ bottom: 'never' }} style={styles.container}>
        <FlatList
          data={props.store.state.theories}
          keyExtractor={({ date }) => date.toString()}
          renderItem={({ item }) => {
            return (
              <CardComponent
                image={item.image}
                title={item.name}
                category={item.category}
                user={item.user}
                description={item.description}
              />
            );
          }}
        />
      </SafeAreaView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default ActivityScreen;
