import React from 'react';
import { createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';
import { Provider } from 'unstated';

// import the different screens
import LoadingScreen from './screens/LoadingScreen';
import SignUpScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/main/HomeScreen';
import ActivityScreen from './screens/main/ActivityScreen';
import ProfilScreen from './screens/main/ProfilScreen';
import ListChatScreen from './screens/main/ListChatScreen';
import theoriesScreen from './screens/main/TheoriesScreen';

// create our app's navigation stack
const App = () => {
  const MainNavigator = createSwitchNavigator(
    {
      loading: LoadingScreen,
      signUp: SignUpScreen,
      login: LoginScreen,
      main: createBottomTabNavigator(
        {
          home: HomeScreen,
          theories: theoriesScreen,
          activity: ActivityScreen,
          profil: ProfilScreen,
          listChat: ListChatScreen,
        },
        {
          initialRouteName: 'theories',
        },
      ),
    },
    {
      initialRouteName: 'loading',
    },
  );

  return (
    <Provider>
      <MainNavigator />
    </Provider>
  );
};

export default App;
