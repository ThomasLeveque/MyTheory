import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
} from 'react-native'
import { Card, Icon, Button } from 'react-native-elements'
import firebase from 'firebase'

import { db } from '../../config/Database'

export default class ProfilScreen extends React.Component {
  state = {
    currentUser: null,
    user: null,
    userTheorys: [],
  }

  componentWillMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
  }

  componentDidMount() {
    this.getUserData()
  }

  getUserData = async () => {
    const { currentUser } = this.state

    const user = await db.ref('/users/' + currentUser.uid).once('value')

    const getTheorys = await db.ref('/theory').once('value')

    const arrayTheorys = Object.values(getTheorys.val())

    const userTheorys = arrayTheorys.filter(
      theory => theory.user.id === currentUser.uid
    )

    this.setState({
      user: user.val(),
      userTheorys,
    })
  }

  render() {
    const { user, userTheorys } = this.state

    if (!user) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Text>{user.name}</Text>
        <Text>{user.email}</Text>

        <FlatList
          data={userTheorys}
          keyExtractor={item => item.date.toString()}
          renderItem={({ item }) => (
            <Card
              title={item.name}
              image={{
                uri:
                  'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
              }}>
              <Text style={{ marginBottom: 10 }}>{item.description}</Text>
              <Text>{item.topic}</Text>
              <Text>{item.user.name}</Text>
              <Text>{item.user.email}</Text>
              <Button
                icon={<Icon name="code" color="#ffffff" />}
                backgroundColor="#03A9F4"
                onPress={() => {}}
                buttonStyle={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  marginBottom: 0,
                }}
                title="VIEW NOW"
              />
            </Card>
          )}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
  },
})
