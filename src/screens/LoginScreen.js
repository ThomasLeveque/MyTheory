import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';

import { Formik } from 'formik';
import * as yup from 'yup';
import { PrimaryButton, TextButton } from '../components/ButtonComponent';
import { InputComponent } from '../components/InputComponent';

import colors from '../assets/colors';
import common from '../utils/common';

export default class LoginScreen extends React.Component {
  state = {
    errorMessage: null,
    loading: false,
  };

  handleLogin = async ({ email, password }) => {
    this.setState({ loading: true });
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);

      this.props.navigation.navigate('main');
    } catch (error) {
      this.setState({ errorMessage: error.message, loading: false });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        {this.state.errorMessage && <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>}
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={async (values, { setSubmitting }) => {
            await this.handleLogin(values);
            setSubmitting(false);
          }}
          validationSchema={yup.object().shape({
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
                  label="Email"
                  onBlur={props.handleBlur('email')}
                  onChangeText={props.handleChange('email')}
                  placeholder="Email"
                  value={props.values.email}
                  hasError={!!(props.touched.email && props.errors.email)}
                />
                <InputComponent
                  label="Password"
                  onChangeText={props.handleChange('password')}
                  onBlur={props.handleBlur('password')}
                  placeholder="Password"
                  value={props.values.password}
                  hasError={!!(props.touched.password && props.errors.password)}
                  secureTextEntry
                />
                <PrimaryButton
                  title="Login"
                  onPress={props.handleSubmit}
                  loading={this.state.loading}
                  startColor={colors.GRADIENT_START}
                  endColor={colors.GRADIENT_END}
                  pictoName="subdirectory-arrow-right"
                  disabled={!props.isValid || props.isSubmitting}
                  styleButton={{ alignSelf: 'center', marginTop: 10 }}
                />
                <TextButton
                  title="Don't have an account? Sign Up"
                  onPress={() => this.props.navigation.navigate('signUp')}
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
