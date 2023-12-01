import { FieldErrors } from "react-hook-form";
import classes from "./ErrorMessage.module.css";

const ErrorMessage = ({errors, errName} : { errors: FieldErrors, errName:string }) => {
  const text: string = errors[errName]?.message?.toString() || '';
	return(
    <>
    {errName in errors &&
      <p className={classes.warning}>{text}</p>
    }
    </>
  )
}

export default ErrorMessage;
