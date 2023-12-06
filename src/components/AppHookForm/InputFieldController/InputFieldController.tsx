import { Control, Controller, FieldErrors, UseFormTrigger } from "react-hook-form";
import classes from "./InputFieldController.module.css";
import { validationSchema } from "../../../services/validation";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const InputFieldController = ( {name, defaultValue, type, control, trigger, errors}
  : {
  name: string,
  type: string,
  defaultValue: string | number,
  control: Control<typeof validationSchema.__outputType>,
  trigger: UseFormTrigger<typeof validationSchema.__outputType>,
  errors: FieldErrors
}
) => {
  const key = name as keyof typeof validationSchema.__outputType;
	const onNameChange = async() => {
    await trigger(key);
  }

		return (
			// <div className={classes.authPage}>
				<Controller
					control={control}
					defaultValue={defaultValue}
					render={({ field: { onChange, onBlur, value } }) => (
            <li className={classes.item}>
              <label htmlFor={name}>{name}: </label>
              <input
                type={type}
                id={key}
                onBlur={onBlur}
                onChange={({ target: { value } }) => {
                  onChange(value);
                  onNameChange();
                }}
                value={(typeof value === 'string' || typeof value === 'number')? value: undefined}
              />
  					<ErrorMessage errName={name} errors={errors}/>
            </li>
          )}
          name={key}
					/>
			// </div>
		);
}

export default InputFieldController;
