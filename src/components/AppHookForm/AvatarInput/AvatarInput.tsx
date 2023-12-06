import { Control, Controller, FieldErrors, UseFormTrigger } from "react-hook-form";
import classes from "./AvatarInput.module.css"
import { validationSchema } from "../../../services/validation";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function AvatarInput({control, trigger, errors}
	: {
    control: Control<typeof validationSchema.__outputType>,
    trigger: UseFormTrigger<typeof validationSchema.__outputType>,
    errors: FieldErrors
  }) {
	const onNameChange = async() => {
    await trigger('avatar');
  }
	return (
	  <Controller
      name="avatar"
      control={control}
	    // defaultValue={null}
	    render={({ field: { onChange } }) => (
      <li className={classes.item}>
         <div className="margin: 16px; padding: 16px">
          <input
            className="form-control form-control-lg"
            id="avatar"
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e)=>{
              onChange(e.target.files);
              onNameChange();
              }
            }
          />
        </div>
        <ErrorMessage errors={errors} errName="avatar"/>
      </li>
    )}
	  />)

  }
