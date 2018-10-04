import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default class ProfilScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>
                    Here come the profile
                </Text>
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