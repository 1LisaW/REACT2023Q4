import { Control, Controller, FieldErrors, UseFormTrigger } from "react-hook-form";
import classes from "./InputSelectorController.module.css";
import { validationSchema } from "../../../../services/validation";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";

const InputSelectorContoller = ({name, list, control, trigger, errors}
	: {
	name: string,
	list: string[],
	control: Control<typeof validationSchema.__outputType>,
	trigger: UseFormTrigger<typeof validationSchema.__outputType>,
	errors: FieldErrors
  })=> {
	const key = name as keyof typeof validationSchema.__outputType;
	const onNameChange = async() => {
    await trigger(key);
  }
	return (
		<Controller
				control={control}
				defaultValue={undefined}
				render={({ field: { onChange, value } }) => (
					<li className={classes.item}>
					<label htmlFor={name}>{name}: </label>
					<select id={name} value={typeof value === 'string' ? value: undefined}
						onChange={(e) => {
							onChange(e.currentTarget.value)
							onNameChange();
						}}>
						<option value={undefined}>--Please choose an option--</option>
						{list.map((item) => {
							return (
							<option value={item} key={item}>
								{item}
						</option>
						);
		  			})}
					</select>
					<ErrorMessage errors={errors} errName={name}/>
					</li>
				)}
	  			name={key}/>

	)
}

export default InputSelectorContoller;
