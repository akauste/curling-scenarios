import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Field from "../UI/Field";
import { authActions } from "../../store/auth-slice";
import { apiCall } from "../../lib/api";
import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {
  const formRef = useRef();
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const navigate = useNavigate();

  const loginHandler = async (event) => {
    event.preventDefault();
    console.log(formRef.current);
    console.log(event);
    const formData = new FormData(event.target);
    // console.log(event.target.username.value);
    console.log(formData);
    const {res, data} = await apiCall('/login', 'POST', formData);
    /*const res = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {'Accept': 'application/json'},
      body: new URLSearchParams(formData) // formData directly is multipart, this is required to turn it to regular formdata
    });*/
    if (res.ok) {
      //const data = await res.json();
      dispatch(authActions.login(data));
      navigate('/profile');

    } else {
      //const data = await res.json();
      setError(data.message);
    }
  };

  return (
    <form onSubmit={loginHandler} ref={formRef}>
      {error && <p className="errorText">{error}</p>}
      <Field label="E-mail" id="username">
        <input type="text" name="username" />
      </Field>
      <Field label="Password" id="password">
        <input type="password" name="password" />
      </Field>
      <Field>
        <button type="submit" className="btnPrimary">
          Login
        </button>
      </Field>
    </form>
  );
};

export default LoginForm;
