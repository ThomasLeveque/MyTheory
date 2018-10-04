import React from 'react'
import firebase from 'firebase'

import { StyleSheet, Platform, Image, Text, View, Button } from 'react-native'
export default class Main extends React.Component {
    state = { currentUser: null }

    signOutUser = async () => {
        try {
            await firebase.auth().signOut();
        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
    }

    render() {
        const { currentUser } = this.state
        return (
            <View style={styles.container}>
                <Text>
                    Hi {currentUser && currentUser.email}!
                </Text>
                <Button
                    onPress={this.signOutUser}
                    title="Sign out"
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})