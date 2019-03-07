import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Text } from 'react-native';
import { Provider } from 'unstated';

// import the different screens
import LoadingScreen from './screens/LoadingScreen';
import SignUpScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/main/HomeScreen';
import ActivityScreen from './screens/main/ActivityScreen';
import ProfilScreen from './screens/main/ProfilScreen';
import TheoriesScreen from './screens/main/TheoriesScreen';

// create our app's navigation stack
const App = () => {
  const TabsNavigator = createBottomTabNavigator(
    {
      home: HomeScreen,
      theories: TheoriesScreen,
      activity: ActivityScreen,
      profil: ProfilScreen,
    },
    {
      initialRouteName: 'home',
    },
  );

  TabsNavigator.navigationOptions = {
    header: null,
  };

  TabsNavigator.navigationOptions = ({ navigation }) => {
    const { routeName } = navigation.state.routes[navigation.state.index];
    const headerTitle = routeName;
    return {
      headerLeft: <Text>oui</Text>,
      headerTitle,
      headerRight: <Text>oui</Text>,
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
      main: TabsNavigator,
    },
    {
      initialRouteName: 'loading',
    },
  );

  return (
    <Provider style={{ margin: 20 }}>
      <MainNavigator />
    </Provider>
  );
};

export default App;
