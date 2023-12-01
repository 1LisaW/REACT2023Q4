import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { countriesList, genderList } from './constants';
import classes from './AuthForm.module.css';
import { setUserName } from './store/slices/nameSlice';
import { setAge } from './store/slices/ageSlice';
import { setEmail } from './store/slices/emailSlice';
import { setGender } from './store/slices/genderSlice';
import { setPassword } from './store/slices/passwordSlice';
import { setCountry } from './store/slices/countrySlice';
import { useAppDispatch } from './store/store';
// import { yupResolver } from "@hookform/resolvers";
// import { ValidationError } from 'yup';

// interface Person {
//   name: string;
//   age: number;
//   gender: 'male' | 'female' | 'other' | null;
//   email: string,
//   password: string,
//   passwordConfirmation: string,
// }

// type SelectType = typeof selectValues[number];

const validationSchema = yup.object().shape({
  name: yup.string().matches(/^[A-ZА-Я]/, "Name should begin from capital letter").required('Name should be filled'),
  age: yup.number().positive("Number couldn't be negative").required("Age should be filled"),
  gender: yup
    .mixed()
    .oneOf([...genderList])
    .defined("Gender should be selected"),
  country: yup
    .mixed()
    .oneOf([...countriesList])
    .defined("Country should be selected"),
  email: yup.string().email('must be a valid e-mail').required('e-mail required'),
  password: yup.string().min(6)
    .matches(/[A-ZА-Я]/, "Name should include uppercase letter")
    .matches(/[a-zа-я]/, "Name should include lowercase letter")
    .matches(/[!@#\\$%^&*)(+=._-]/, "Name should include special character")
    .required('password required'),
  passwordConfirmation: yup.string()
  .oneOf([yup.ref('password'), ''], 'Passwords must match'),
  accept: yup.boolean()
    .isTrue('accept terms'),
});

// interface ExampleForm extends HTMLFormElement {
//   email: HTMLInputElement;
// }

type ErrorStateType = {
  name?: string,
  age?: string,
  gender?: string,
  email?: string,
  country?: string,
  password?: string,
  passwordConfirmation?: string,
  accept?: string,
};

export default function AuthForm() {
  const [defaultSelectVal, setSelectVal] = useState<string | undefined>(undefined);
  const [defaultCountry, setSelCountry] = useState<string | undefined>(undefined);
  const [errors, setErrors] = useState<ErrorStateType>({});
  const [disabled, setDisabled] = useState(true);
  const [confirmed, setConfirmation] = useState(false);
  const dispatch = useAppDispatch();

  const handleChange= async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      name: HTMLInputElement,
      age: HTMLInputElement,
      gender: HTMLSelectElement,
      country: HTMLSelectElement,
      email: HTMLInputElement,
      password: HTMLInputElement,
      passwordConfirmation: HTMLInputElement,
      accept: HTMLInputElement,
    }
    const formData = {
      name: formElements.name.value,
      age: formElements.age.value,
      gender: formElements.gender.value,
      country: formElements.country.value,
      email: formElements.email.value,
      password: formElements.password.value,
      passwordConfirmation: formElements.passwordConfirmation.value,
      accept: formElements.accept.checked
    };

    // const errors: Promise<InferType<Schema>, ValidationError> = validationSchema.validate(formData);
    try {
      await validationSchema.validate(formData, {abortEarly: false});
      setDisabled(false);
      setErrors({});
    } catch (err: unknown) {
      if (err instanceof yup.ValidationError)
      {
        const errResp: ErrorStateType = {};
        console.log(err.inner[0].path, err.inner[0].message);
        err.inner.forEach((item) => {
          const key = item.path as keyof ErrorStateType ;
          if (key in formData)
            errResp[key] = item.message;
          }
        );
        setErrors(errResp);
      }
      // const er = err as Error;
      // er.name; // => 'ValidationError'
      // er.message; // => ['Deve ser maior que 18']
      // alert(er);
    }
    // if (errors.length > 0) {
    //   // There are errors in the form data
    //   alert(errors.join("\n"));
    // } else {
    //   // The form data is valid, do something with it
    // }
  };
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      name: HTMLInputElement,
      age: HTMLInputElement,
      gender: HTMLSelectElement,
      country: HTMLSelectElement,
      email: HTMLInputElement,
      password: HTMLInputElement,
      passwordConfirmation: HTMLInputElement,
      accept: HTMLInputElement,
    }
    const formData = {
      name: formElements.name.value,
      age: formElements.age.value,
      gender: formElements.gender.value,
      country: formElements.country.value,
      email: formElements.email.value,
      password: formElements.password.value,
      passwordConfirmation: formElements.passwordConfirmation.value,
      accept: formElements.accept.value,
    };
    dispatch(setUserName(formData.name));
    dispatch(setAge(+formData.age));
    dispatch(setEmail(formData.email));
    dispatch(setGender(formData.gender));
    dispatch(setCountry(formData.country));
    dispatch(setPassword(formData.password));
    console.log('submit!');
  }

  return (
    <div className={classes.authPage}>
      <h2>Insert your data</h2>
      <form onChange={handleChange} onSubmit={handleSubmit} className={classes.authForm}>
        <ul>
          <li className={classes.item}>
            <InputField
              name="name"
              type="text"
              err={errors.name? errors.name : undefined}
            />
          </li>
          <li className={classes.item}>
            <InputField
              name="age"
              type="number"
              err={errors.age? errors.age : undefined}
            />
          </li>
          <li className={classes.item}>
            <label htmlFor='gender'>gender: </label>
            <select id="gender" value={defaultSelectVal} onChange={e => setSelectVal(e.target.value)}>
              <option value={undefined}>--Please choose an option--</option>
              {genderList.map((item) => {
                return (
                  <option value={item} key={item}>{item}</option>
                )
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
              type="text"
              err={errors.email? errors.email : undefined}
            />
          </li>
          <li className={classes.item}>
            <InputField
              name="password"
              type="password"
              err={errors.password? errors.password : undefined}
            />
          </li>
          <li className={classes.item}>
            <InputField
              name="passwordConfirmation"
              type="password"
              err={errors.passwordConfirmation? errors.passwordConfirmation : undefined}
            />
          </li>
          <li className={classes.item}>
            <label htmlFor='accept'>accept terms:</label>
              <input id='accept'
              type="checkbox" checked={(()=>{return confirmed})()} onChange={()=>{
                setConfirmation(!confirmed)}}/>
              {errors.accept && <p className={classes.warning}> {errors.accept} </p>}

          </li>
        </ul>
        <button type="submit" disabled={disabled}>
          Submit
        </button>
      </form>
    </div>
  );
}

type InputFieldType = {
  name: string,
  type: React.HTMLInputTypeAttribute,
  err: string | undefined;
}

const InputField = ({name, type, err}: InputFieldType) => {
  return (
    <>
      <label htmlFor={name}>{name}: </label>
      <input id={name} type={type}/>
      {err &&
      <p className={classes.warning}>{err}</p>
      }
    </>
  )
}

const SelectField = ({name, defaultOpt, setOption, options, errors}: {
  name: string,
  defaultOpt: string | undefined,
  setOption: (value:string)=>void,
  options: Array<string>,
  errors: string | undefined
}) => {
  return (
    <>
      <label htmlFor={name}>{name}: </label>
            <select id={name} value={defaultOpt} onChange={e => setOption(e.target.value)}>
              <option value={undefined}>--Please choose an option--</option>
              {options.map((item) => {
                return (
                  <option value={item} key={item}>{item}</option>
                )
              })}
            </select>
            {errors && <p className={classes.warning}>{errors}</p>}
    </>
  )
}

