import React from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';
import { Formik } from 'formik';

import { PrimaryButton, TextButton } from '../components/ButtonComponent';
import { InputComponent } from '../components/InputComponent';
import ErrorsComponent from '../components/ErrorsComponent';

import db from '../config/Database';
import { SignupSchema } from '../schema/userSchema';
import { userStyle } from '../utils/commonStyles';
import colors from '../assets/colors';

export default class SignUpScreen extends React.Component {
  state = {
    error: null,
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
        error,
        loading: false,
      });
    }
  };

  render() {
    return (
      <View style={userStyle.userContainer}>
        <Text style={userStyle.userTitle}>Sign Up</Text>
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
          validationSchema={SignupSchema}
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
                {this.state.error && <ErrorsComponent error={this.state.error} />}
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
