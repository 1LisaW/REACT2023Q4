import * as yup from 'yup';
import { countriesList, genderList } from '../constants';

export const validationSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-ZА-Я]/, 'Name should begin from capital letter')
    .required('Name should be filled'),
  age: yup
    .number()
    .positive("Number couldn't be negative")
    .required('Age should be filled'),
  gender: yup
    .mixed()
    .oneOf([...genderList])
    .defined('Gender should be selected'),
  country: yup
    .mixed()
    .oneOf([...countriesList])
    .defined('Country should be selected'),
  email: yup.string().email('must be a valid e-mail').required('e-mail required'),
  password: yup
    .string()
    .min(6)
    .matches(/[A-ZА-Я]/, 'Password should include uppercase letter')
    .matches(/[0-9]/, 'Password should include number')
    .matches(/[a-zа-я]/, 'Password should include lowercase letter')
    .matches(/[!@#\\$%^&*)(+=._-]/, 'Password should include special character')
    .required('password required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), ''], 'Passwords must match'),
  accept: yup.boolean().isTrue('accept terms'),
  avatar: yup
    .mixed()
    .nullable()
    .required('upload avatar img')
    .test(
      'is valid extension',
      'Not a valid image extension',
      (value) =>
        value &&
        value instanceof FileList &&
        (value[0].name.toLowerCase().split('.').pop() == 'jpg' ||
          value[0].name.toLowerCase().split('.').pop() == 'png'),
    )
    .test(
      'is-valid-size',
      'Max allowed size is 100KB',
      (value) => value && value instanceof FileList && value[0].size <= 102400,
    ),
});
