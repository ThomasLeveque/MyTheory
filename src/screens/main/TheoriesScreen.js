import React from 'react';
import { Subscribe } from 'unstated';
import { createStackNavigator } from 'react-navigation';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo';

import AddTheoryScreen from './AddTheoryScreen';
import Layout from '../../components/Layout';
import Store from '../../store';

import games from '../../assets/imageCategory/games.png';
import history from '../../assets/imageCategory/history.png';
import series from '../../assets/imageCategory/series.png';
import political from '../../assets/imageCategory/political.jpg';

const TheoriesScreen = props => (
  <Subscribe to={[Store]}>
    {store => <Child store={store} navigation={props.navigation} />}
  </Subscribe>
);

class Child extends React.Component {
  state = {
    currentCategory: '',
  };

  // can't use require in a loop, so create an object to require images with the good key
  images = {
    games,
    history,
    series,
    political,
  };

  render() {
    let content = (
      <View>
        <Text style={{ fontSize: 18, fontFamily: 'montserratBold', marginBottom: 10 }}>
          Categories
        </Text>
        <FlatList
          data={this.props.store.state.categories}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.category}
                onPress={() => {
                  this.setState({ currentCategory: item.name });
                }}
              >
                <LinearGradient
                  start={{ x: 0, y: 0.75 }}
                  end={{ x: 1, y: 0.25 }}
                  colors={[item.startColor, item.endColor]}
                  style={styles.imageContainer}
                >
                  <ImageBackground source={this.images[item.img]} style={styles.imageBack} />
                </LinearGradient>
                <Text style={styles.categoryText}>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
    if (this.state.currentCategory !== '') {
      content = (
        <View>
          <Text
            onPress={() => {
              this.setState({ currentCategory: '' });
            }}
          />
          <Text style={{ fontSize: 18, fontFamily: 'montserratBold', marginBottom: 10 }}>
            {this.state.currentCategory}
          </Text>
          <Text>TO DO</Text>
        </View>
      );
    }
    return (
      <Layout>
        <Text style={{ fontSize: 35, fontFamily: 'montserratBold', marginBottom: 20 }}>
          Theories
        </Text>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('addtheory');
          }}
          style={{ borderRadius: 5 }}
        >
          <ImageBackground
            source={{ uri: 'https://facebook.github.io/react/logo-og.png' }}
            style={(styles.imageBack, styles.addTheory)}
          >
            <Text style={{ color: 'black' }}>Add Theory</Text>
          </ImageBackground>
        </TouchableOpacity>
        {content}
      </Layout>
    );
  }
}

export default createStackNavigator({
  theories: TheoriesScreen,
  addtheory: AddTheoryScreen,
});

const styles = StyleSheet.create({
  addTheory: {
    width: '100%',
    height: 100,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  imageContainer: {
    width: '50%',
    height: 60,
    borderRadius: 5,
  },
  imageBack: {
    width: '100%',
    height: '100%',
    opacity: 0.4,
  },
  category: {
    backgroundColor: 'white',
    marginBottom: 10,
    flexDirection: 'row',
    shadowColor: '#E8E8E8',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    borderRadius: 5,
  },
  categoryText: {
    width: '50%',
    padding: 20,
    textAlign: 'center',
    fontFamily: 'montserratRegular',
  },
});
