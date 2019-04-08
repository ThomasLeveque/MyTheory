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
import { MaterialIcons } from '@expo/vector-icons';

import Store from '../../store';
import Layout from '../../components/Layout';
import { InputComponent } from '../../components/InputComponent';
import { PrimaryButton } from '../../components/ButtonComponent';

import colors from '../../assets/colors';

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
    const photoSize = 120;

    return (
      <Layout>
        <View
          style={{
            width: photoSize,
            height: photoSize,
            backgroundColor: colors.GRAY_BG,
            marginRight: 25,
            borderRadius: photoSize / 2,
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginVertical: 20,
          }}
        >
          <MaterialIcons name="photo" size={photoSize / 2} color={colors.PRIMARY} />
        </View>
        <InputComponent
          label="Nom *"
          placeholder="Nom"
          autoCapitalize="none"
          value={this.state.newName}
          onChangeText={newName => this.setState({ newName })}
        />
        <InputComponent
          label="Email *"
          placeholder="Email"
          autoCapitalize="none"
          value={this.state.newEmail}
          onChangeText={newEmail => this.setState({ newEmail })}
        />
        {this.props.store.state.updateUserError && (
          <View>
            <Text>{this.props.store.state.updateUserError.message}</Text>
            <Text>{this.props.store.state.updateUserError.code}</Text>
          </View>
        )}
        <PrimaryButton
          title="Update data"
          onPress={() =>
            this.props.store.state.user.email !== this.state.newEmail
              ? this.setModalVisible(!this.state.modalVisible)
              : this.props.store.updateUser(this.state)
          }
          loading={this.props.store.state.loading}
          startColor={colors.GRADIENT_START}
          endColor={colors.GRADIENT_END}
          pictoName="update"
          styleButton={{ alignSelf: 'center', marginTop: 10 }}
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
