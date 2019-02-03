import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import firebase from 'firebase';
import { ImagePicker } from 'expo';
import { Subscribe } from 'unstated';
import { Formik } from 'formik';
import * as yup from 'yup';
import ModalSelector from 'react-native-modal-selector';

import { getPermAsync } from '../../utils/Utils';
import db from '../../config/Database';

import Layout from '../../components/Layout';
import { InputComponent, AddImgComponent } from '../../components/InputComponent';
import { PrimaryButton, SecondaryButton } from '../../components/ButtonComponent';

import colors from '../../assets/colors';
import Store from '../../store';

const AddTheoryScreen = props => (
  <Subscribe to={[Store]}>
    {store => <Child store={store} navigation={props.navigation} />}
  </Subscribe>
);

class Child extends Component {
  state = {
    error: '',
    // image: '',
    loading: false,
    textInputValue: '',
    hasError: true,
    modalClosed: false,
  };

  onChooseImagePress = async () => {
    if (getPermAsync()) {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.cancelled) {
        try {
          await this.uploadImage(result.uri, 'test-image');
          Alert('Success');
        } catch (error) {
          Alert(error);
        }
      }
    }
  };

  uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    // this.setState({ image: `images/theories/${imageName}` });
    const ref = firebase
      .storage()
      .ref()
      .child(`images/theories/${imageName}`);
    return ref.put(blob);
  };

  handleSubmit = async ({ category, name, description, likes, comments, img }) => {
    try {
      this.setState({ loading: true });
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
    const categories = this.props.store.state.categories.map((cat, index) => {
      return {
        key: index,
        label: cat.name,
        accessibilityLabel: `Tap here for ${cat.name}`,
      };
    });

    return (
      <Layout>
        <Text style={styles.title}>Add theory</Text>
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
            const formatedValues = { ...values, category: this.state.textInputValue };

            await this.handleSubmit(formatedValues);
            setSubmitting(false);
          }}
          validationSchema={yup.object().shape({
            name: yup.string().required('required'),
            description: yup.string().required('required'),
          })}
        >
          {props => {
            return (
              <View>
                <AddImgComponent
                  pressed={this.onChooseImagePress}
                  styleAddImg={styles.AddImg}
                  label="Add your image"
                />
                <InputComponent
                  label="Nom de la théorie"
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
                    label="Categorie"
                    onBlur={props.handleBlur('category')}
                    onChangeText={props.handleChange('category')}
                    placeholder="Category"
                    value={this.state.textInputValue}
                    hasError={!!(this.state.hasError && this.state.modalClosed)}
                    isEditable={false}
                  />
                </ModalSelector>
                <InputComponent
                  label="Description"
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
                <SecondaryButton
                  title="Vos informations"
                  onPress={() => this.props.navigation.navigate('setting')}
                  pictoName="settings"
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
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
  },
  error: { fontSize: 14, color: 'red' },
});

export default AddTheoryScreen;
