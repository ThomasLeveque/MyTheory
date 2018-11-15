import React from 'react';
import { Subscribe } from 'unstated';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  TouchableHighlight,
  Dimensions,
  Alert,
} from 'react-native';

import UsersMethods from '../../store/UsersMethods';

const { width } = Dimensions.get('window');

const SettingScreen = () => (
  <Subscribe to={[UsersMethods]}>{userStore => <Child userStore={userStore} />}</Subscribe>
);

class Child extends React.Component {
  state = {
    newName: this.props.userStore.state.user.name,
    newEmail: this.props.userStore.state.user.email,
    currentPassword: null,
    modalVisible: false,
  };

  componentWillMount() {
    this.props.userStore.ResetUserError();
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Name</Text>
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Name"
          value={this.state.newName}
          onChangeText={newName => this.setState({ newName })}
        />
        <Text>Email</Text>
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          value={this.state.newEmail}
          onChangeText={newEmail => this.setState({ newEmail })}
        />
        {this.props.userStore.state.updateUserError && (
          <View>
            <Text>{this.props.userStore.state.updateUserError.message}</Text>
            <Text>{this.props.userStore.state.updateUserError.code}</Text>
          </View>
        )}
        <Button
          title="Update data"
          onPress={() =>
            this.props.userStore.state.user.email !== this.state.newEmail
              ? this.setModalVisible(!this.state.modalVisible)
              : this.props.userStore.updateUser(this.state)
          }
        />
        <Modal
          animationType="fade"
          transparent
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >
          <View
            style={{
              marginTop: 22,
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}
          >
            <View style={{ backgroundColor: '#fff', padding: 30, width: width * 0.9 }}>
              <Text>Password</Text>
              <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                secureTextEntry
                placeholder="Password"
                value={this.state.currentPassword}
                onChangeText={currentPassword => this.setState({ currentPassword })}
              />
              <Button title="Confirm" onPress={() => this.props.userStore.updateUser(this.state)} />
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
  },
});

export default SettingScreen;
