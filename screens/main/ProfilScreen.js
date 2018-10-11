import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import firebase from 'firebase'

export default class ProfilScreen extends React.Component {
    state = {
        currentUser: null,
        user: null
    }

    componentWillMount () {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
    }

    componentDidMount () {
        this.getUserData()
    }

    getUserData = async () => {
        const { currentUser } = this.state
        
        let database = firebase.database()
        
        let user = await database.ref('/users/' + currentUser.uid).once('value')
        this.setState({ user: user.val() })
        
    }

    render() {
        const { user } = this.state
    
        if (!user) {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size="large"/>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <Text>{user.name}</Text>
                <Text>{user.email}</Text>
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