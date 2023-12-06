import React, { useState } from 'react';
import * as yup from 'yup';
// import { validationSchema } from './services/validation';
import { countriesList, genderList } from './constants';
import classes from './AuthForm.module.css';
import { setUserName } from './store/slices/nameSlice';
import { setAge } from './store/slices/ageSlice';
import { setEmail } from './store/slices/emailSlice';
import { setGender } from './store/slices/genderSlice';
import { setPassword } from './store/slices/passwordSlice';
import { setCountry } from './store/slices/countrySlice';
import { useAppDispatch } from './store/store';
import AvatarInput from './components/avatarInput';
import { setAvatar } from './store/slices/avatarSlice';
import convertBase64 from './services/convertBase64';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object().shape({
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
    .test('is valid extension', 'Not a valid image extension', (value) => {
      return (
        value &&
        value instanceof FileList && value[0] &&
        (value[0].name.toLowerCase().split('.').pop() === 'jpg' ||
          value[0].name.toLowerCase().split('.').pop() === 'png')
      );
    })
    .test(
      'is-valid-size',
      'Max allowed size is 100KB',
      (value) => value
        && value instanceof FileList && value[0]
        && value[0].size <= 102400,
    ),
});

// interface ExampleForm extends HTMLFormElement {
//   email: HTMLInputElement;
// }

type ErrorStateType = {
  name?: string;
  age?: string;
  gender?: string;
  email?: string;
  country?: string;
  password?: string;
  passwordConfirmation?: string;
  accept?: string;
  avatar?: string;
};

export default function AuthForm() {
  const navigate = useNavigate();
  const [defaultSelectVal, setSelectVal] = useState<string | undefined>(undefined);
  const [defaultCountry, setSelCountry] = useState<string | undefined>(undefined);
  const [errors, setErrors] = useState<ErrorStateType>({});
  const dispatch = useAppDispatch();
  const schema = validationSchema;

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      name: HTMLInputElement;
      age: HTMLInputElement;
      gender: HTMLSelectElement;
      country: HTMLSelectElement;
      email: HTMLInputElement;
      password: HTMLInputElement;
      passwordConfirmation: HTMLInputElement;
      accept: HTMLInputElement;
      avatar: HTMLInputElement;
    };

    const formData = {
      age: formElements.age.value,
      name: formElements.name.value,
      gender: formElements.gender.value,
      country: formElements.country.value,
      email: formElements.email.value,
      password: formElements.password.value,
      passwordConfirmation: formElements.passwordConfirmation.value,
      accept: formElements.accept.checked,
      avatar: formElements.avatar.files,
    };

    try {
      console.log('aaa',formData);
      console.log('sdsa', schema);
      schema.validateSync(formData, { abortEarly: false });
      setErrors({});
      dispatch(setUserName(formData.name));
      dispatch(setAge(+formData.age));
      dispatch(setEmail(formData.email));
      dispatch(setGender(formData.gender));
      dispatch(setCountry(formData.country));
      dispatch(setPassword(formData.password));
      if (formData.avatar) {
        const base64 = (await convertBase64(formData.avatar[0])) as string;
        dispatch(setAvatar(base64));
      }
      navigate('/');
    } catch (err: unknown) {
      console.log('sss',err);
      if (err instanceof yup.ValidationError) {
        const errResp: ErrorStateType = {};
        console.log(err.inner[0].path, err.inner[0].message);
        err.inner.forEach((item) => {
          const key = item.path as keyof ErrorStateType;
          if (key in formData) errResp[key] = item.message;
        });
        setErrors(errResp);

      }
      else
      console.log('sss_',err);
    }
  };

  return (
    <div className={classes.authPage}>
      <h2>Insert your data</h2>
      <form onSubmit={handleSubmit} className={classes.authForm}>
        <ul>
          <li className={classes.item}>
            <InputField
              name="name"
              defVal=''
              type="text"
              err={errors.name ? errors.name : undefined}
            />
          </li>
          <li className={classes.item}>
            <InputField
              name="age"
              defVal={0}
              type="number"
              err={errors.age ? errors.age : undefined}
            />
          </li>
          <li className={classes.item}>
            <label htmlFor="gender">gender: </label>
            <select
              id="gender"
              value={defaultSelectVal}
              onChange={(e) => setSelectVal(e.target.value)}
            >
              <option value={undefined}>--Please choose an option--</option>
              {genderList.map((item) => {
                return (
                  <option value={item} key={item}>
                    {item}
                  </option>
                );
              })}
            </select>
            {errors.gender && <p className={classes.warning}>{errors.gender}</p>}
          </li>
          <li className={classes.item}>
            <SelectField
              name="country"
              defaultOpt={defaultCountry}
              setOption={setSelCountry}
              options={countriesList}
              errors={errors.country}
            />
          </li>
          <li className={classes.item}>
            <InputField
              name="email"
              defVal=''
              type="text"
              err={errors.email ? errors.email : undefined}
            />
          </li>
          <li className={classes.item}>
            <InputField
              name="password"
              defVal=''
              type="password"
              err={errors.password ? errors.password : undefined}
            />
          </li>
          <li className={classes.item}>
            <InputField
              name="passwordConfirmation"
              defVal=''
              type="password"
              err={errors.passwordConfirmation ? errors.passwordConfirmation : undefined}
            />
          </li>
          <li className={classes.item}>
            <label htmlFor="accept">accept terms:</label>
            <input id="accept" type="checkbox" />
            {errors.accept && <p className={classes.warning}> {errors.accept} </p>}
          </li>
          <li className={classes.item}>
            <AvatarInput />
            {errors.avatar && <p className={classes.warning}>{errors.avatar}</p>}
          </li>
        </ul>
        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

type InputFieldType = {
  name: string;
  defVal: string | number,
  type: React.HTMLInputTypeAttribute;
  err: string | undefined;
};

const InputField = ({ name, defVal, type, err }: InputFieldType) => {
  return (
    <>
      <label htmlFor={name}>{name}: </label>
      <input id={name} defaultValue={defVal} type={type} />
      {err && <p className={classes.warning}>{err}</p>}
    </>
  );
};

const SelectField = ({
  name,
  defaultOpt,
  setOption,
  options,
  errors,
}: {
  name: string;
  defaultOpt: string | undefined;
  setOption: (value: string) => void;
  options: Array<string>;
  errors: string | undefined;
}) => {
  return (
    <>
      <label htmlFor={name}>{name}: </label>
      <select id={name} value={defaultOpt} onChange={(e) => setOption(e.target.value)}>
        <option value={undefined}>--Please choose an option--</option>
        {options.map((item) => {
          return (
            <option value={item} key={item}>
              {item}
            </option>
          );
        })}
      </select>
      {errors && <p className={classes.warning}>{errors}</p>}
    </>
  );
};
