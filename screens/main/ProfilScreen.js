
import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import firebase from 'firebase'

export default class ProfilScreen extends React.Component {
    state = {
        currentUser: null,
        user: null,
        userTheorys: []
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
        
        const database = firebase.database()
        
        const user = await database.ref('/users/' + currentUser.uid).once('value')

        const getTheorys = await database.ref('/theory').once('value')
        
        const arrayTheorys = Object.values(getTheorys.val())

        const userTheorys = arrayTheorys.filter((theory) => theory.user.id === currentUser.uid)
        
        this.setState({ 
            user: user.val(),
            userTheorys
         })
    }

    render() {
        const { user, userTheorys } = this.state
        
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

                {userTheorys.map(theory => {
                    return (
                        <View key={theory.date} style={{marginTop: 20}}>
                            <Text>{theory.name}</Text>
                            <Text>{theory.description}</Text>
                            <Text>{theory.topic}</Text>
                            <Text>{theory.topic}</Text>
                            <Text>{theory.user.name}</Text>
                            <Text>{theory.user.email}</Text>
                        </View>
                    )
                })}

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