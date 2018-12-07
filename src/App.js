import React from 'react';
import { createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';
import { Provider } from 'unstated';

// import the different screens
import LoadingScreen from './screens/LoadingScreen';
import SignUpScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/main/HomeScreen';
import AddTheoryScreen from './screens/main/AddTheoryScreen';
import ActivityScreen from './screens/main/ActivityScreen';
import ProfilScreen from './screens/main/ProfilScreen';
import ChatScreen from './screens/main/ChatScreen';
import ListChatScreen from './screens/main/ListChatScreen';

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
          addTheory: AddTheoryScreen,
          activity: ActivityScreen,
          profil: ProfilScreen,
          listChat: ListChatScreen,
        },
        {
          initialRouteName: 'listChat',
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
