import * as yup from 'yup';

const SignupSchema = yup.object().shape({
  name: yup.string().required('required'),
  email: yup
    .string()
    .required('required')
    .email('Not an email'),
  password: yup
    .string()
    .required('required')
    .min(6, 'To short !'),
});

const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .required('required')
    .email('Not an email'),
  password: yup
    .string()
    .required('required')
    .min(6, 'To short !'),
});

export { SignupSchema, LoginSchema };
