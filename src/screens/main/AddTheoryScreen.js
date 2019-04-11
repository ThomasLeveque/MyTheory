import React, { Component } from 'react';
import { View, Text, Alert, StyleSheet, Image } from 'react-native';
import firebase from 'firebase';
import { Subscribe } from 'unstated';
import { Formik } from 'formik';
import ModalSelector from 'react-native-modal-selector';
import { ImagePicker } from 'expo';

import { MaterialIcons } from '@expo/vector-icons';
import { InputComponent, AddImgComponent } from '../../components/InputComponent';
import { PrimaryButton } from '../../components/ButtonComponent';

import db from '../../config/Database';
import Layout from '../../components/Layout';
import colors from '../../assets/colors';
import Store from '../../store';
import TheorySchema from '../../schema/theorySchema';
import { commonStyle } from '../../utils/commonStyles';
import { getPermAsync } from '../../utils/Utils';

const AddTheoryScreen = props => (
  <Subscribe to={[Store]}>
    {store => <Child store={store} navigation={props.navigation} />}
  </Subscribe>
);

class Child extends Component {
  state = {
    error: '',
    loading: false,
    textInputValue: '',
    hasError: true,
    modalClosed: false,
    imgUrl: '',
    resultImg: null,
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

  handleSubmit = async ({ category, name, description, likes, comments, img }) => {
    try {
      await db.ref('/theory').push({
        date: firebase.database.ServerValue.TIMESTAMP,
        category,
        name,
        description,
        likes,
        comments,
        img,
        userId: this.props.store.state.user.id,
      });
      await this.props.store.getTheories();
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ error, loading: false });
    }
  };

  validateCategory = value => {
    if (value === '') {
      this.setState({ hasError: true, modalClosed: true });
    } else {
      this.setState({ hasError: false, modalClosed: false });
    }
  };

  render() {
    let img = (
      <React.Fragment>
        <MaterialIcons name="add" size={36} color={colors.GRAY_TXT} />
        <Text style={styles.textAddImage}>Add img</Text>
      </React.Fragment>
    );

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
    }

    const categories = this.props.store.state.categories.map((cat, index) => {
      return {
        key: index,
        label: cat.name,
        accessibilityLabel: `Tap here for ${cat.name}`,
      };
    });

    return (
      <Layout>
        <Text style={[commonStyle.titleStyle, { textAlign: 'center' }]}>Add theory</Text>
        <Formik
          initialValues={{
            img: '',
            category: '',
            name: '',
            description: '',
            likes: [],
            comments: [],
          }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              this.setState({ loading: true });

              if (this.state.resultImg) {
                await this.uploadImage(this.state.resultImg.uri, values.name, 'theories');
              }

              const formatedValues = {
                ...values,
                category: this.state.textInputValue,
                img: this.state.imgUrl,
              };

              await this.handleSubmit(formatedValues);
              setSubmitting(false);
            } catch (error) {
              Alert.alert(error);
              setSubmitting(false);
            }
          }}
          validationSchema={TheorySchema}
        >
          {props => {
            return (
              <View>
                <AddImgComponent
                  pressed={this.onChooseImagePress}
                  title="Ajouter une image"
                  styleAddImg={styles.addImgContainer}
                >
                  {img}
                </AddImgComponent>
                <InputComponent
                  label="Nom de la théorie *"
                  onBlur={props.handleBlur('name')}
                  onChangeText={props.handleChange('name')}
                  placeholder="Name your theory"
                  value={props.values.name}
                  hasError={!!(props.touched.name && props.errors.name)}
                />
                <ModalSelector
                  data={categories}
                  initValue="Category"
                  supportedOrientations={['landscape', 'portrait']}
                  accessible
                  scrollViewAccessibilityLabel="Scrollable options"
                  cancelButtonAccessibilityLabel="Cancel Button"
                  onChange={category => {
                    this.setState({ textInputValue: category.label }, () =>
                      this.validateCategory(this.state.textInputValue),
                    );
                  }}
                  onModalClose={() => this.validateCategory(this.state.textInputValue)}
                >
                  <InputComponent // this.state.textInputValue
                    label="Categorie *"
                    onBlur={props.handleBlur('category')}
                    onChangeText={props.handleChange('category')}
                    placeholder="Category"
                    value={this.state.textInputValue}
                    hasError={!!(this.state.hasError && this.state.modalClosed)}
                    isEditable={false}
                  />
                </ModalSelector>
                <InputComponent
                  label="Description *"
                  onChangeText={props.handleChange('description')}
                  onBlur={props.handleBlur('description')}
                  placeholder="Description"
                  value={props.values.description}
                  isTextArea
                  hasError={!!(props.touched.description && props.errors.description)}
                />
                <PrimaryButton
                  title="Add theory"
                  onPress={props.handleSubmit}
                  loading={this.state.loading}
                  startColor={colors.GRADIENT_START}
                  endColor={colors.GRADIENT_END}
                  pictoName="file-upload"
                  disabled={!props.isValid || props.isSubmitting || this.state.hasError}
                />
              </View>
            );
          }}
        </Formik>
        {this.state.error && <Text>{this.state.error}</Text>}
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  textAddImage: {
    color: colors.GRAY_TXT,
    fontSize: 16,
    fontFamily: 'montserratBold',
  },
  addImgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    backgroundColor: colors.GRAY_BG,
    borderBottomWidth: 3,
    borderColor: colors.GRAY_TXT,
    marginBottom: commonStyle.inputBottomMargin,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    overflow: 'hidden',
  },
});

export default AddTheoryScreen;
