import React from 'react';
import { Subscribe } from 'unstated';
import { createStackNavigator } from 'react-navigation';

import { Text } from 'react-native';
import Store from '../../store';
import CardComponent from '../../components/CardComponent';

import TheoryScreen from './TheoryScreen';
import Layout from '../../components/Layout';
import { commonStyle } from '../../utils/commonStyles';

const POLITICAL = 'Political';
const HISTORY = 'History';
const VIDEO_GAMES = 'Video games';
const MOVIE_SERIES = 'Movie & Series';

const HomeScreen = props => (
  <Subscribe to={[Store]}>
    {store => <Child store={store} navigation={props.navigation} />}
  </Subscribe>
);

class Child extends React.Component {
  render() {
    return (
      <Layout>
        <Text style={commonStyle.titleStyle}>{POLITICAL}</Text>
        {this.props.store.state.theories
          .filter(_theory => _theory.category === POLITICAL)
          .map(theory => (
            <CardComponent key={theory.id} theory={theory} />
          ))}
        <Text style={[commonStyle.titleStyle, { marginTop: 30 }]}>{HISTORY}</Text>
        {this.props.store.state.theories
          .filter(_theory => _theory.category === HISTORY)
          .map(theory => (
            <CardComponent key={theory.id} theory={theory} />
          ))}
        <Text style={[commonStyle.titleStyle, { marginTop: 30 }]}>{VIDEO_GAMES}</Text>
        {this.props.store.state.theories
          .filter(_theory => _theory.category === VIDEO_GAMES)
          .map(theory => (
            <CardComponent key={theory.id} theory={theory} />
          ))}
        <Text style={[commonStyle.titleStyle, { marginTop: 30 }]}>{MOVIE_SERIES}</Text>
        {this.props.store.state.theories
          .filter(_theory => _theory.category === MOVIE_SERIES)
          .map(theory => (
            <CardComponent key={theory.id} theory={theory} />
          ))}
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
  theory: {
    screen: TheoryScreen,
    navigationOptions: {
      header: null,
    },
  },
});
