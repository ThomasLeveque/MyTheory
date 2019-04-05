import React from 'react';
import { Subscribe } from 'unstated';
import { createStackNavigator } from 'react-navigation';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo';

import AddTheoryScreen from './AddTheoryScreen';
import Layout from '../../components/Layout';
import Store from '../../store';
import colors from '../../assets/colors';
import { commonStyle } from '../../utils/commonStyles';

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
    currentCategory: null,
    currentTheories: null,
  };

  // can't use require in a loop, so create an object to require images with the good key
  images = {
    games,
    history,
    series,
    political,
  };

  setCurrentCategory = category => {
    const theories = this.props.store.state.theories.filter(
      theory => theory.category === category.name,
    );
    this.setState({
      currentCategory: category.name,
      currentTheories: theories,
    });
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
                onPress={() => this.setCurrentCategory(item)}
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
    if (this.state.currentCategory) {
      content = (
        <View>
          <Text
            onPress={() => {
              this.setState({ currentCategory: null });
            }}
          >
            Go back
          </Text>
          <Text style={{ fontSize: 18, fontFamily: 'montserratBold', marginBottom: 10 }}>
            {this.state.currentCategory}
          </Text>
          {this.state.currentTheories.map(theory => {
            return <Text key={theory.id}>{theory.name}</Text>;
          })}
        </View>
      );
    }
    return (
      <Layout>
        <Text style={commonStyle.titleStyle}>Theories</Text>
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
  theories: {
    screen: TheoriesScreen,
    navigationOptions: {
      header: null,
    },
  },
  addtheory: {
    screen: AddTheoryScreen,
    navigationOptions: {
      header: null,
    },
  },
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
    overflow: 'hidden',
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
    ...colors.SHADOW,
    borderRadius: 5,
  },
  categoryText: {
    width: '50%',
    padding: 20,
    textAlign: 'center',
    fontFamily: 'montserratRegular',
  },
});
