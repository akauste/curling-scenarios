import { NavLink } from "react-router-dom";
import classes from './MainHeader.module.css';
import { useSelector } from 'react-redux';

const MainHeader = () => {
    const isActive = nav => {return nav.isActive ? classes.active : ''};
    const user = useSelector(state => state.auth.user);

    return (<header className={classes.header}>
        <h1>Curling Scenarios</h1>
        <nav className={classes.nav}>
          <ul>
            <li><NavLink className={isActive} to="/">Home</NavLink></li>
            <li><NavLink className={isActive} to="/board">Tactic board</NavLink></li>
            { user ? <li><NavLink className={isActive} to="/profile">Profile</NavLink></li>
                   : <li><NavLink className={isActive} to="/login">Login</NavLink></li>}
            { user && <li><NavLink className={isActive} to="/logout">Logout</NavLink></li> }
          </ul>
        </nav>
      </header>);
};

export default MainHeader;