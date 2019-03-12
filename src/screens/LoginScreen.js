import React from 'react';
import { Text, View } from 'react-native';
import { Formik } from 'formik';
import { Subscribe } from 'unstated';

import { PrimaryButton, TextButton } from '../components/ButtonComponent';
import { InputComponent } from '../components/InputComponent';
import ErrorsComponent from '../components/ErrorsComponent';

import colors from '../assets/colors';
import { userStyle } from '../utils/commonStyles';
import { LoginSchema } from '../schema/userSchema';
import Store from '../store/index';

const LoginScreen = ({ navigation }) => {
  return (
    <Subscribe to={[Store]}>
      {store => (
        <View style={userStyle.userContainer}>
          <Text style={userStyle.userTitle}>Login</Text>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={async (values, { setSubmitting }) => {
              await store.handleLogin(values);
              setSubmitting(false);
            }}
            validationSchema={LoginSchema}
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
                    loading={store.state.loading}
                    startColor={colors.GRADIENT_START}
                    endColor={colors.GRADIENT_END}
                    pictoName="subdirectory-arrow-right"
                    disabled={!props.isValid || props.isSubmitting}
                    styleButton={{ alignSelf: 'center', marginTop: 10 }}
                  />
                  {store.state.error && <ErrorsComponent error={store.state.error} />}
                  <TextButton
                    title="Don't have an account? Sign Up"
                    onPress={() => navigation.navigate('signUp')}
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

export default LoginScreen;
