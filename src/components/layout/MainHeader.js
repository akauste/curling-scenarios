import { NavLink, useNavigate } from "react-router-dom";
import classes from './MainHeader.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth-slice';

const MainHeader = () => {
    const isActive = nav => {return nav.isActive ? classes.active : ''};
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch(authActions);
    const navigate = useNavigate();

    const logoutHandler = event => {
      event.preventDefault();
      dispatch(authActions.logout());
      navigate('/');
    };

    return (<header className={classes.header}>
        <h1>Curling Scenarios</h1>
        <nav className={classes.nav}>
          <ul>
            <li><NavLink className={isActive} to="/">Home</NavLink></li>
            <li><NavLink className={isActive} to="/board">Tactic board</NavLink></li>
            { user ? <li><NavLink className={isActive} to="/profile">Profile</NavLink></li>
                   : <li><NavLink className={isActive} to="/login">Login</NavLink></li>}
            { user && <li><button type="button" onClick={logoutHandler}>Logout</button></li> }
          </ul>
        </nav>
      </header>);
};

export default MainHeader;