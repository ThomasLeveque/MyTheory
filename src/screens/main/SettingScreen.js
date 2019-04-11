import React from 'react';
import firebase from 'firebase';
import { Subscribe } from 'unstated';
import { View, Text, Modal, TouchableHighlight, Dimensions, Alert, Image } from 'react-native';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { ImagePicker } from 'expo';

import Store from '../../store';
import Layout from '../../components/Layout';
import { InputComponent, AddImgComponent } from '../../components/InputComponent';
import { PrimaryButton } from '../../components/ButtonComponent';

import colors from '../../assets/colors';
import { getPermAsync } from '../../utils/Utils';
import db from '../../config/Database';
import { commonStyle } from '../../utils/commonStyles';

const { width } = Dimensions.get('window');

const SettingScreen = () => <Subscribe to={[Store]}>{store => <Child store={store} />}</Subscribe>;

class Child extends React.Component {
  state = {
    newName: this.props.store.state.user.name,
    newEmail: this.props.store.state.user.email,
    currentPassword: null,
    modalVisible: false,
    imgUrl: '',
    resultImg: null,
    updateUserError: null,
    loading: false,
  };

  componentWillMount() {
    this.ResetUserError();
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  updateUser = async ({ newName, newEmail, currentPassword }) => {
    try {
      const { currentUser } = firebase.auth();
      this.setState({ loading: true });
      if (newEmail.toLowerCase() !== currentUser.email.toLowerCase()) {
        await this.reauthenticateUser(currentPassword);
        await currentUser.updateEmail(newEmail);
      }
      if (this.state.resultImg) {
        await this.uploadImage(this.state.resultImg.uri, this.props.store.state.user.id, 'users');
      }

      await db.ref(`/users/${currentUser.uid}`).update({
        name: newName,
        email: newEmail,
        img: this.state.imgUrl,
      });

      await this.props.store.getUser();
      await this.props.store.getUsers();
      await this.props.store.getTheories();
      this.setState({ loading: false });
    } catch (error) {
      this.setState({
        updateUserError: { message: error.message, code: error.code },
        loading: false,
      });
    }
  };

  ResetUserError = () => {
    this.setState({ updateUserError: null });
  };

  reauthenticateUser = currentPassword => {
    const { currentUser } = firebase.auth();
    const cred = firebase.auth.EmailAuthProvider.credential(currentUser.email, currentPassword);
    return currentUser.reauthenticateAndRetrieveDataWithCredential(cred);
  };

  onChooseImagePress = async () => {
    const hasPermission = getPermAsync();

    if (hasPermission) {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.cancelled) {
        try {
          this.setState({ resultImg: result });
          Alert.alert('Success');
        } catch (error) {
          Alert.alert(error);
        }
      }
    }
  };

  uploadImage = async (uri, imageName, type) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const ref = firebase
      .storage()
      .ref()
      .child(`images/${type}/${imageName}`);

    await ref.put(blob);

    const imgUrl = await ref.getDownloadURL();
    this.setState({ imgUrl });
  };

  render() {
    const photoSize = 120;

    let img = <MaterialIcons name="photo" size={photoSize / 2} color={colors.PRIMARY} />;

    if (this.state.resultImg) {
      img = (
        <Image
          style={{
            width: '100%',
            height: '100%',
          }}
          resizeMode="cover"
          source={{
            uri: this.state.resultImg.uri,
          }}
        />
      );
    } else if (this.props.store.state.user.img) {
      img = (
        <Image
          style={{
            width: '100%',
            height: '100%',
          }}
          resizeMode="cover"
          source={{
            uri: this.props.store.state.user.img,
          }}
        />
      );
    }

    return (
      <Layout>
        <AddImgComponent
          pressed={this.onChooseImagePress}
          title="Ajouter votre photo"
          styleAddImg={{
            width: photoSize,
            height: photoSize,
            backgroundColor: colors.GRAY_BG,
            borderRadius: photoSize / 2,
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginBottom: 20,
          }}
          textAlign="center"
        >
          {img}
        </AddImgComponent>
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
        {this.state.updateUserError && (
          <View>
            <Text>{this.state.updateUserError.message}</Text>
          </View>
        )}
        <PrimaryButton
          title="Mise à jour des données"
          onPress={async () => {
            if (this.props.store.state.user.email !== this.state.newEmail) {
              this.setModalVisible(!this.state.modalVisible);
            } else {
              this.updateUser(this.state);
            }
          }}
          loading={this.state.loading}
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
          <TouchableHighlight
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              backgroundColor: 'rgba(52, 52, 52, 0.6)',
            }}
          >
            <View
              style={{
                backgroundColor: '#fff',
                paddingHorizontal: commonStyle.horizontalGlobalPadding,
                paddingBottom: commonStyle.horizontalGlobalPadding,
                paddingTop: 50,
                width: width - commonStyle.horizontalGlobalPadding * 2,
                position: 'relative',
              }}
            >
              <InputComponent
                label="Password *"
                placeholder="Password"
                autoCapitalize="none"
                secureTextEntry
                value={this.state.currentPassword}
                onChangeText={currentPassword => this.setState({ currentPassword })}
              />
              <PrimaryButton
                title="Mise à jour des données"
                onPress={async () => this.updateUser(this.state)}
                loading={this.state.loading}
                startColor={colors.GRADIENT_START}
                endColor={colors.GRADIENT_END}
                pictoName="update"
                styleButton={{ alignSelf: 'center', marginTop: 10 }}
              />
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
                style={{ position: 'absolute', top: 5, right: 5 }}
              >
                <Entypo name="cross" size={30} color="black" />
              </TouchableHighlight>
            </View>
          </TouchableHighlight>
        </Modal>
      </Layout>
    );
  }
}

export default SettingScreen;
