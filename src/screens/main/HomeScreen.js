import React from 'react';
import { Subscribe } from 'unstated';
import { createStackNavigator } from 'react-navigation';
import { LinearGradient } from 'expo';
import { Text, FlatList, Dimensions, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Store from '../../store';
import CardComponent from '../../components/CardComponent';

import CategoryTheory from './CategoryTheory';
import Layout from '../../components/Layout';
import { commonStyle } from '../../utils/commonStyles';
import colors from '../../assets/colors';
import { categoryTrads } from '../../utils/Utils';

const POLITICAL = 'Political';
const HISTORY = 'History';
const VIDEO_GAMES = 'Video games';
const MOVIE_SERIES = 'Movie & Series';

const { width } = Dimensions.get('window');

const HomeScreen = props => (
  <Subscribe to={[Store]}>
    {store => <Child store={store} navigation={props.navigation} />}
  </Subscribe>
);

class Child extends React.Component {
  renderSeparator = () => {
    return (
      <View
        style={{
          width: 15,
        }}
      />
    );
  };

  renderFooter = (category, theories) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('categoryTheory', { category, theories });
        }}
        style={{ flexGrow: 1, marginBottom: 10 }}
      >
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          style={{
            width: 120,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            overflow: 'hidden',
            marginLeft: 15,
            flexGrow: 1,
          }}
          colors={[colors.GRADIENT_START, colors.GRADIENT_END]}
        >
          <MaterialIcons name="add" size={36} color="white" />
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              fontFamily: 'montserratBold',
            }}
          >
            Voir plus
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  render() {
    const numberOfTheories = 2;

    const politicalTheory = this.props.store.state.theories.filter(
      _theory => _theory.category === POLITICAL,
    );

    const historyTheory = this.props.store.state.theories.filter(
      _theory => _theory.category === HISTORY,
    );

    const gameTheory = this.props.store.state.theories.filter(
      _theory => _theory.category === VIDEO_GAMES,
    );

    const movieTheory = this.props.store.state.theories.filter(
      _theory => _theory.category === MOVIE_SERIES,
    );

    return (
      <Layout>
        <Text style={[commonStyle.titleStyle, { marginBottom: 10 }]}>
          {categoryTrads[MOVIE_SERIES]}
        </Text>
        <FlatList
          data={movieTheory.slice(0, numberOfTheories)}
          horizontal
          ItemSeparatorComponent={this.renderSeparator}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <CardComponent
                theory={item}
                navigation={this.props.navigation}
                cardStyle={{ width: width * 0.7 }}
              />
            );
          }}
          ListFooterComponent={() => this.renderFooter(MOVIE_SERIES, movieTheory)}
          keyExtractor={item => item.id}
        />
        <Text style={[commonStyle.titleStyle, { marginTop: 20, marginBottom: 10 }]}>
          {categoryTrads[POLITICAL]}
        </Text>
        <FlatList
          data={politicalTheory.slice(0, numberOfTheories)}
          horizontal
          ItemSeparatorComponent={this.renderSeparator}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <CardComponent
                theory={item}
                cardStyle={{ width: width * 0.7 }}
                navigation={this.props.navigation}
              />
            );
          }}
          ListFooterComponent={() => this.renderFooter(POLITICAL, politicalTheory)}
          keyExtractor={item => item.id}
        />
        <Text style={[commonStyle.titleStyle, { marginTop: 20, marginBottom: 10 }]}>
          {categoryTrads[HISTORY]}
        </Text>
        <FlatList
          data={historyTheory.slice(0, numberOfTheories)}
          horizontal
          ItemSeparatorComponent={this.renderSeparator}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <CardComponent
                theory={item}
                cardStyle={{ width: width * 0.7 }}
                navigation={this.props.navigation}
              />
            );
          }}
          ListFooterComponent={() => this.renderFooter(HISTORY, historyTheory)}
          keyExtractor={item => item.id}
        />
        <Text style={[commonStyle.titleStyle, { marginTop: 20, marginBottom: 10 }]}>
          {categoryTrads[VIDEO_GAMES]}
        </Text>
        <FlatList
          data={gameTheory.slice(0, numberOfTheories)}
          horizontal
          ItemSeparatorComponent={this.renderSeparator}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <CardComponent
                theory={item}
                cardStyle={{ width: width * 0.7 }}
                navigation={this.props.navigation}
              />
            );
          }}
          ListFooterComponent={() => this.renderFooter(VIDEO_GAMES, gameTheory)}
          keyExtractor={item => item.id}
        />
      </Layout>
    );
  }
}

export default createStackNavigator({
  home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null,
    },
  },
  categoryTheory: {
    screen: CategoryTheory,
    navigationOptions: {
      header: null,
    },
  },
});
