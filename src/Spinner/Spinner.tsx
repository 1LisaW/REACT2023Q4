import classes from './Spinner.module.css';

const Spinner = () => {
  return (
    <div className={classes.spinner} data-testid="spinner">
      <div className={classes.ldsRoller}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
