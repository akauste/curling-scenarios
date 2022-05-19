import classes from './Field.module.css';

const Field = props => {
  const {label, id, error, valid, errorMessage} = props;
  return <div className={`${classes.field} ${ error ? 'error' : valid ? 'valid' : '' }`}>
    <label htmlFor={id}>{label}</label>
    <div className={`${classes.controls} ${ error ? classes.error : valid ? classes.valid : ''}`}>
      {props.children} 
    </div>
    { error && <p className={classes.errorText}>{ errorMessage }</p> }
  </div>;
};
export default Field;