import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/auth-slice";

const Logout = () => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch(authActions);
  const navigate = useNavigate();
  dispatch(authActions.logout());
  useEffect(() => {
    if(!user) {
      navigate('/');
    }
  }, [user, navigate])
  return <div>Logging out...</div>
}
export default Logout;