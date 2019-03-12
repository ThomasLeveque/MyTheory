import * as yup from 'yup';

export default yup.object().shape({
  name: yup.string().required('required'),
  description: yup.string().required('required'),
});
