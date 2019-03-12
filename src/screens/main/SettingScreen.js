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

import Store from '../../store';
import Layout from '../../components/Layout';

const { width } = Dimensions.get('window');

const SettingScreen = () => <Subscribe to={[Store]}>{store => <Child store={store} />}</Subscribe>;

class Child extends React.Component {
  state = {
    newName: this.props.store.state.user.name,
    newEmail: this.props.store.state.user.email,
    currentPassword: null,
    modalVisible: false,
  };

  componentWillMount() {
    this.props.store.ResetUserError();
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <Layout>
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
        {this.props.store.state.updateUserError && (
          <View>
            <Text>{this.props.store.state.updateUserError.message}</Text>
            <Text>{this.props.store.state.updateUserError.code}</Text>
          </View>
        )}
        <Button
          title="Update data"
          onPress={() =>
            this.props.store.state.user.email !== this.state.newEmail
              ? this.setModalVisible(!this.state.modalVisible)
              : this.props.store.updateUser(this.state)
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
              <Button title="Confirm" onPress={() => this.props.store.updateUser(this.state)} />
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
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
  },
});

export default SettingScreen;
