import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import firebase from 'firebase'

export default class Loading extends React.Component {
    componentDidMount() {

        let config = {
            apiKey: "AIzaSyBHZn9I7pannM6aEVR6jG6F2rXHb91Hank",
            authDomain: "mytheorie-317c9.firebaseapp.com",
            databaseURL: "https://mytheorie-317c9.firebaseio.com",
            projectId: "mytheorie-317c9",
            storageBucket: "mytheorie-317c9.appspot.com",
            messagingSenderId: "675898618947"
        };

        firebase.initializeApp(config);
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'main' : 'signUp')
        })

    }

    render()
    {
        return (
            <View style={styles.container}>
                <Text>Loading</Text>
                <ActivityIndicator size="large"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})