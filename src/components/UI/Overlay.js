import ReactDOM from 'react-dom';
import classes from './ContextMenu.module.css';

const Overlay = props => {
  const portalEl = document.getElementById('overlay');

  return ReactDOM.createPortal(<>
    <div className={classes.backdrop} onClick={props.closeHandler} />
    <div className={classes.overlay}>
      {props.children}
    </div>
  </>, portalEl);
};
export default Overlay;