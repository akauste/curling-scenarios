import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toasterActions } from "../../store/toaster-slice";

import classes from './Toaster.module.css';

const Toast = props => {
  const { id, type, title, message, autoRemove, displayTime } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    if(autoRemove && displayTime) {
      const timerId = setTimeout(() => { 
        dispatch(toasterActions.remove(id));
      }, displayTime);
      return () => { clearTimeout(timerId); };
    }
  }, [autoRemove, dispatch, displayTime, id, title]);

  const closeHandler = event => {
    event.preventDefault();
    dispatch(toasterActions.remove(id));
  };

  return <div className={`${classes.toast} ${classes[type]}`} onClick={closeHandler} data-testid={`toast-${id}`}>
      <div className={classes.title}>{ title }</div>
      { message && <div className={classes.message}>{message}</div> }
    </div>;
};

export default Toast;