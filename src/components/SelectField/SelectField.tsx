import classes from "./SelectField.module.css";

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

export default SelectField;
