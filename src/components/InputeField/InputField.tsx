import classes from "./InputField.module.css";

type InputFieldType = {
	name: string;
	type: React.HTMLInputTypeAttribute;
	err: string | undefined;
  };

  const InputField = ({ name, type, err }: InputFieldType) => {
	return (
	  <>
		<label htmlFor={name}>{name}: </label>
		<input id={name} type={type} />
		{err && <p className={classes.warning}>{err}</p>}
	  </>
	);
  };

  export default InputField
