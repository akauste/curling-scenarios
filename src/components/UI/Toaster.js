import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useSelector } from 'react-redux';
import Toast from './Toast';

import classes from './Toaster.module.css';

const Toaster = () => {
  const toasts = useSelector(state => state.toaster.messages);

  useEffect(() => {console.log('Display toasts: '+ toasts.length);}, [toasts]);

  return ReactDOM.createPortal(<div className={classes.toaster} role="listbox">
    <TransitionGroup component="div">
        { toasts.map(t => (<CSSTransition key={t.id} timeout={500} classNames={{ 
        enter: classes.itemAppear,
        enterActive: classes.itemAppearActive,
        exitActive: classes.itemExitActive,
        exitDone: classes.itemExitDone,
      }}>
        <Toast {...t} />
      </CSSTransition>)) }
    </TransitionGroup>
  </div>, document.getElementById('toaster'));
};

export default Toaster;