import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { createSwitchNavigator } from 'react-navigation'
// import the different screens
import Loading from './screens/LoadingScreen'
import SignUp from './screens/SignupScreen'
import Login from './screens/LoginScreen'
import Main from './screens/MainScreen'
// create our app's navigation stack
const App = createSwitchNavigator(
    {
        Loading,
        SignUp,
        Login,
        Main
    },
    {
        initialRouteName: 'Loading'
    }
)
export default App