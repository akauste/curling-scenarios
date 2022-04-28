import classes from './ContextMenu.module.css';

const SubMenu = props => {
  return (<div className={classes.submenu}>
    {props.title}
    <ul>
      {props.children}
    </ul>
  </div>);
};
export default SubMenu;