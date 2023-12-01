import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../../services/validation";
import classes from './AuthHookForm.module.css';
import InputFieldController from "./InputFieldController/InputFieldController";
import { countriesList, genderList } from "../../constants";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import InputSelectorContoller from "./InputFieldController/InputSelectorController/InputSelectorController";
import AvatarInput from "./AvatarInput/AvatarInput";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUserName } from "../../store/slices/nameSlice";
import { setAge } from "../../store/slices/ageSlice";
import { setEmail } from "../../store/slices/emailSlice";
import { setGender } from "../../store/slices/genderSlice";
import { setCountry } from "../../store/slices/countrySlice";
import { setPassword } from "../../store/slices/passwordSlice";
import convertBase64 from "../../services/convertBase64";
import { setAvatar } from "../../store/slices/avatarSlice";
import { useAppDispatch } from "../../store/store";

const AuthHookForm = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [disabled, setDisabled] = useState(true);
	const schema = validationSchema;
	const {
    control,
	  handleSubmit,
	  formState: { errors },
	  trigger
	} = useForm({
	  resolver: yupResolver(schema)
	});
	useEffect(()=>{
		console.log(errors);
		if (!errors.accept && !errors.age && !errors.avatar && !errors.country && !errors.email
			&& !errors.gender && !errors.name && !errors.password && !errors.passwordConfirmation)
			setDisabled(false);
		else if (!disabled)
			setDisabled(true);
	}, [errors.name, errors.accept, errors.age, errors.avatar, errors.country, errors.email, errors.gender, errors.password,
			errors.passwordConfirmation])
	const onSubmit = async (formData: typeof validationSchema.__context) => {
		trigger();
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
		navigate("/");
	}
	return (
		<div className={classes.authPage}>
			<form onSubmit={handleSubmit(onSubmit)}>
			<ul>
				<InputFieldController name='name' defaultValue='' type='text' trigger={trigger} control={control} errors={errors} />
				<InputFieldController name='age' defaultValue={0} type="number" trigger={trigger} control={control} errors={errors} />
				<InputSelectorContoller name='gender' list={genderList} trigger={trigger} control={control} errors={errors} />
				<InputSelectorContoller name='country' list={countriesList} trigger={trigger} control={control} errors={errors} />
				<InputFieldController name='email' defaultValue='' type="email" trigger={trigger} control={control} errors={errors} />
				<InputFieldController name='password' defaultValue='' type="password" trigger={trigger} control={control} errors={errors} />
				<InputFieldController name='passwordConfirmation' defaultValue='' type="password" trigger={trigger} control={control} errors={errors} />
				<Controller
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
					<li className={classes.item}>
					<label htmlFor='accept'>accept: </label>
						<input
							type='checkbox'
							defaultChecked={false}
							id='accept'
							onBlur={onBlur}
							onChange={(e) => {
								onChange(e.target.checked);
								trigger('accept');
							}}
							checked={value}
						/>
						<ErrorMessage errName='accept' errors={errors}/>
            		</li>
          			)}
          			name='accept'
				/>
				<AvatarInput trigger={trigger} control={control} errors={errors}/>
			</ul>
			<button type="submit" disabled={disabled}>
          		Submit
        	</button>
			</form>
		</div>
	);
};

  export default AuthHookForm;
