import React from 'react';
import { Text } from 'react-native';

import errors from '../utils/errors';

const ErrorsComponent = ({ error }) => {
  return (
    <Text
      style={{ color: 'red', textAlign: 'center', marginTop: 15, fontFamily: 'montserratSemiBold' }}
    >
      {errors[error.code]}
    </Text>
  );
};

export default ErrorsComponent;
