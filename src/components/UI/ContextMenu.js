import classes from './ContextMenu.module.css';

const ContextMenu = props => {
  console.log('Clih:', props.ev, props.targetEl);
  const styling = {
    left: props.x, 
    top: props.y,
  };
  const baseclass = props.y > 0.6*window.innerHeight ? classes.menuAbove : classes.menuBelow;

  return (<>
    <div style={{position: 'absolute', width: '100%', height: '100vh'}} onClick={props.closeHandler}></div>
    <div style={styling} className={ baseclass }>
      <ul className={classes.menu}>
        <li><button type="button" onClick={(event) => {event.preventDefault()}}>First</button></li>
        <li><button type="button" onClick={(event) => {event.preventDefault(); console.log('click')}}>Second</button></li>
        <li><button type="button" onClick={(event) => {console.log('click')}}>Third</button></li>
      </ul>
    </div>
  </>);
};
export default ContextMenu;