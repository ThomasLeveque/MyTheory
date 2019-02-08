import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';

import { Formik } from 'formik';
import * as yup from 'yup';
import db from '../config/Database';
import { PrimaryButton, TextButton } from '../components/ButtonComponent';
import { InputComponent } from '../components/InputComponent';

import colors from '../assets/colors';
import common from '../utils/common';

export default class SignUpScreen extends React.Component {
  state = {
    errorMessage: null,
    loading: false,
  };

  storeUser = (userId, email, name, followedCategory) => {
    db.ref(`users/${userId}`).set({
      id: userId,
      email,
      name,
      followedCategory,
    });
  };

  handleSignUp = async ({ email, name, password }) => {
    const formatedEmail = email.replace(/\s/g, '');

    this.setState({ loading: true });
    try {
      await firebase.auth().createUserWithEmailAndPassword(formatedEmail, password);

      const { currentUser } = firebase.auth();
      await this.storeUser(currentUser.uid, formatedEmail, name, {});

      this.props.navigation.navigate('main');
    } catch (error) {
      this.setState({
        errorMessage: error.message,
        loading: false,
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        {this.state.errorMessage && <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>}
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
          }}
          onSubmit={async (values, { setSubmitting }) => {
            await this.handleSignUp(values);
            setSubmitting(false);
          }}
          validationSchema={yup.object().shape({
            name: yup.string().required('required'),
            email: yup
              .string()
              .required('required')
              .email('Not an email'),
            password: yup
              .string()
              .required('required')
              .min(6, 'To short !'),
          })}
        >
          {props => {
            return (
              <View>
                <InputComponent
                  label="Nom *"
                  onBlur={props.handleBlur('name')}
                  onChangeText={props.handleChange('name')}
                  placeholder="Nom"
                  value={props.values.name}
                  hasError={!!(props.touched.name && props.errors.name)}
                />
                <InputComponent
                  label="Email *"
                  onBlur={props.handleBlur('email')}
                  onChangeText={props.handleChange('email')}
                  placeholder="Email"
                  value={props.values.email}
                  hasError={!!(props.touched.email && props.errors.email)}
                />
                <InputComponent
                  label="Password *"
                  onChangeText={props.handleChange('password')}
                  onBlur={props.handleBlur('password')}
                  placeholder="Password"
                  value={props.values.password}
                  hasError={!!(props.touched.password && props.errors.password)}
                  secureTextEntry
                />
                <PrimaryButton
                  title="Sign up"
                  onPress={props.handleSubmit}
                  loading={this.state.loading}
                  startColor={colors.GRADIENT_START}
                  endColor={colors.GRADIENT_END}
                  pictoName="create"
                  disabled={!props.isValid || props.isSubmitting}
                  styleButton={{ alignSelf: 'center', marginTop: 10 }}
                />
                <TextButton
                  title="Already have an account? login"
                  onPress={() => this.props.navigation.navigate('login')}
                  styleButton={{ alignSelf: 'center', marginTop: 10 }}
                />
              </View>
            );
          }}
        </Formik>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: common.horizontalGlobalPadding,
  },
  title: {
    fontFamily: 'montserratBold',
    textAlign: 'center',
    fontSize: 34,
    marginBottom: 30,
  },
});
