import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { Text, Image } from 'react-native';
import { Provider } from 'unstated';
import { createAppContainer } from 'react-navigation';

// import the different screens
import LoadingScreen from './screens/LoadingScreen';
import SignUpScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/main/HomeScreen';
import ChatScreen from './screens/main/ChatScreen';
import ActivityScreen from './screens/main/ActivityScreen';
import ProfilScreen from './screens/main/ProfilScreen';
import TheoriesScreen from './screens/main/TheoriesScreen';
import TheoryScreen from './screens/main/TheoryScreen';

// import button component for header
import HeaderButton from './components/HeaderButton';

// Nav picto
import HomeImage from './assets/Navigation/logo.png';
import TheoryImage from './assets/Navigation/theory.png';
import ProfilImage from './assets/Navigation/profil.png';
import NotifImage from './assets/Navigation/notif.png';
import ChatImage from './assets/Navigation/chat.png';

import colors from './assets/colors';

const TabsNavigator = createBottomTabNavigator(
  {
    theories: {
      screen: TheoriesScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image source={TheoryImage} style={{ width: 35, height: 35, tintColor }} />
        ),
      },
    },
    chat: {
      screen: ChatScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image source={ChatImage} style={{ width: 35, height: 35, tintColor }} />
        ),
      },
    },
    accueil: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image source={HomeImage} style={{ width: 35, height: 35, tintColor }} />
        ),
      },
    },
    activite: {
      screen: ActivityScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image source={NotifImage} style={{ width: 35, height: 35, tintColor }} />
        ),
      },
    },
    profil: {
      screen: ProfilScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image source={ProfilImage} style={{ width: 35, height: 35, tintColor }} />
        ),
      },
    },
  },
  {
    initialRouteName: 'accueil',
    tabBarOptions: {
      inactiveTintColor: colors.GRAY,
      activeTintColor: colors.PRIMARY,
      style: {
        shadowColor: '#E8E8E8',
        shadowOffset: {
          width: 0,
          height: -4,
        },
        shadowOpacity: 0.4,
        borderTopWidth: 0,
        height: 80,
      },
      labelStyle: {
        color: 'black',
        paddingBottom: 10,
        fontFamily: 'montserratSemiBold',
        fontSize: 11,
      },
      tabStyle: {
        // backgroundColor: 'white',
      },
    },
  },
);

TabsNavigator.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];

  const Capitalize = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return {
    headerLeft: <HeaderButton navigation={navigation} />,
    headerTitle: <Text style={{ fontFamily: 'montserratBold' }}>{Capitalize(routeName)}</Text>,
    headerRight: null,
  };
};

const MainNavigator = createStackNavigator(
  {
    loading: {
      screen: LoadingScreen,
      navigationOptions: {
        header: null,
      },
    },
    signUp: {
      screen: SignUpScreen,
      navigationOptions: {
        header: null,
      },
    },
    login: {
      screen: LoginScreen,
      navigationOptions: {
        header: null,
      },
    },
    theory: {
      screen: TheoryScreen,
    },
    main: TabsNavigator,
  },
  {
    initialRouteName: 'loading',
  },
);

const AppContainer = createAppContainer(MainNavigator);

const App = () => {
  return (
    <Provider>
      <AppContainer />
    </Provider>
  );
};

export default App;
