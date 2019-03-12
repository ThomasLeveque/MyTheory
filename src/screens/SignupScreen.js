import React from 'react';
import { Text, View } from 'react-native';
import { Formik } from 'formik';
import { Subscribe } from 'unstated';

import { PrimaryButton, TextButton } from '../components/ButtonComponent';
import { InputComponent } from '../components/InputComponent';
import ErrorsComponent from '../components/ErrorsComponent';

import { SignupSchema } from '../schema/userSchema';
import { userStyle } from '../utils/commonStyles';
import colors from '../assets/colors';
import Store from '../store';

const SignUpScreen = ({ navigation }) => {
  return (
    <Subscribe to={[Store]}>
      {store => (
        <View style={userStyle.userContainer}>
          <Text style={userStyle.userTitle}>Sign Up</Text>
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
            }}
            onSubmit={async (values, { setSubmitting }) => {
              await store.handleSignUp(values);
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
                    loading={store.state.loading}
                    startColor={colors.GRADIENT_START}
                    endColor={colors.GRADIENT_END}
                    pictoName="create"
                    disabled={!props.isValid || props.isSubmitting}
                    styleButton={{ alignSelf: 'center', marginTop: 10 }}
                  />
                  {store.state.error && <ErrorsComponent error={store.state.error} />}
                  <TextButton
                    title="Already have an account? login"
                    onPress={() => navigation.navigate('login')}
                    styleButton={{ alignSelf: 'center', marginTop: 10 }}
                  />
                </View>
              );
            }}
          </Formik>
        </View>
      )}
    </Subscribe>
  );
};

export default SignUpScreen;
