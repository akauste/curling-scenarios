import { useState, useRef, useReducer } from "react";
import { apiCall } from "../../lib/api";
import Field from "../UI/Field";

const initState = {
  touched: false,
  valid: false,
  error: false,
  errorMessage: '',
  value: '',
  validator: () => {},
};

const fieldReducer = (state, action) => {
  switch(action.type) {
    case 'validate':
      const [isValid, message] = state.validator(action.value);
      return {
        validator: state.validator,
        touched: true,
        valid: isValid,
        error: !isValid,
        errorMessage: message,
        value: action.value,
      }
    case 'add-error':
      return {
        ...state,
        valid: false,
        error: true,
        errorMessage: action.message,
      }
    default:
      throw new Error('Invalid action.type', action);
  }
};

const usernameValidator = (uname) => {
  if(uname.match(/\w+@\w+.\w/))
    return [true, ''];
  return [false, 'Enter valid e-mail'];
}

const passwordValidator = (pass) => {
  if(pass.length > 7)
    return [true, ''];
  return [false, 'Password is too short'];
}

const SignUp = props => {
  const userRef = useRef();
  const passRef = useRef();
  const pass2Ref = useRef();
  const dispnameRef = useRef();

  const password2Validator = (pass2) => {
    if(pass2 === passRef.current.value)
      return [true, ''];
      return [false, 'Password is too short'];
  }
  
  const [username, usernameDispatch] = useReducer(fieldReducer, {...initState, validator: usernameValidator});
  const [password, passwordDispatch] = useReducer(fieldReducer, {...initState, validator: passwordValidator});
  const [password2, password2Dispatch] = useReducer(fieldReducer, {...initState, validator: password2Validator});
  const [displayname, displaynameDispatch] = useReducer(fieldReducer, {...initState, validator: () => [true, '']});

  const signupHandler = async (e) => {
    e.preventDefault();
    if(username.valid && password.valid && password2.valid) {
      const {res, data} = await apiCall('/signup', 'POST', {
        username: userRef.current.value,
        password: passRef.current.value,
        displayname: dispnameRef.current.value,
      });
      console.log('GOT FROM API', res, data);
      if(res.ok) {
        console.log('User created', data);
      }
      else {
        if(data.username?.error)
          usernameDispatch({type: 'add-error', message: data.username.error});
        if(data.password?.error)
          passwordDispatch({type: 'add-error', message: data.password.error});
        if(data.displayname?.error)
          displaynameDispatch({type: 'add-error', message: data.displayname.error});
      }
    }
    else {
      /*setIsTouched(old => Object.fromEntries(
        Object.entries(old).map(([key,val]) => [key, !val])
      ));
      setTimeout(() => console.log('Mark all touched', isTouched, 
        Object.fromEntries(Object.entries(isTouched).map(([key,val]) => [key, !val]))), 100);*/
    }
  };

  

  return <>
    <h1>Create account</h1>
    <form onSubmit={signupHandler}>
    <Field label="E-mail" id="email" error={ username.error } valid={ username.valid } errorMessage={ username.errorMessage }>
        <input type="text" name="email" ref={userRef} onBlur={e => usernameDispatch({type: 'validate', value: e.target.value})} />
      </Field>
      <Field label="Password" id="password" error={ password.error } valid={ password.valid } errorMessage={ password.errorMessage }>
        <input type="password" name="password" ref={passRef} onBlur={e => passwordDispatch({type: 'validate', value: e.target.value})} />
      </Field>
      <Field label="Retype password" id="password2" error={ password2.error } valid={ password2.valid } errorMessage={ password2.errorMessage }>
        <input type="password" name="password2" ref={pass2Ref} onBlur={e => password2Dispatch({type: 'validate', value: e.target.value})} />
      </Field>
      <Field label="Displayname" id="displayname" error={ displayname.error } valid={ displayname.valid } errorMessage={ displayname.errorMessage }>
        <input type="text" name="displayname" ref={dispnameRef} onBlur={e => displaynameDispatch({type: 'validate', value: e.target.value})} />
      </Field>
      <button type="submit" className="primaryBtn">Create</button>
    </form>
  </>;
};

export default SignUp;