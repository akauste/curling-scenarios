import { useState, useRef } from "react";
import { apiCall } from "../../lib/api";
import Field from "../UI/Field";

const SignUpForm = props => {
  const {onSignup} = props;
  const userRef = useRef();
  const passRef = useRef();
  const pass2Ref = useRef();
  const dispnameRef = useRef();
  const [isValid, setIsValid] = useState({ user: false, pass: false, pass2: false, disp: false });
  const [isTouched, setIsTouched] = useState({ user: false, pass: false, pass2: false, disp: false });
  const [help, setHelp] = useState({ user: '', pass: '', pass2: '', disp: '' });

  const validateName = (e) => {
    setIsTouched(old => ({...old, user: true}));
    if(userRef.current.value.match(/\w+@\w+\.\w+/) ) {
      setIsValid(old => ({...old, user: true}));
      setHelp(old => ({...old, user: ''}));
    }
    else {
      setIsValid(old => ({...old, user: false}));
      setHelp(old => ({...old, user: 'Enter valid email'}));
    }
  }

  const validatePass = (e) => {
    setIsTouched(old => ({...old, pass: true}));
    if(passRef.current.value.length > 7 ) {
      setIsValid(old => ({...old, pass: true}));
      setHelp(old => ({...old, pass: ''}));
    }
    else {
      setIsValid(old => ({...old, pass: false}));
      setHelp(old => ({...old, pass: 'Password is too short'}));
    }
  }

  const validatePass2 = (e) => {
    setIsTouched(old => ({...old, pass2: true}));
    if(passRef.current.value === pass2Ref.current.value ) {
      setIsValid(old => ({...old, pass2: true}));
      setHelp(old => ({...old, pass2: ''}));
    }
    else {
      setIsValid(old => ({...old, pass2: false}));
      setHelp(old => ({...old, pass2: "Passwords don't match"}));
    }
  }

  const signupHandler = async (e) => {
    e.preventDefault();
    if(isValid.user && isValid.pass && isValid.pass2) {
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
        setIsValid(old => {
          const val = {...old};
          if(data.username.error)
            val.user = false;
          if(data.password?.error)
            val.pass = false;
          if(data.displayname?.error)
            val.disp = false;
          return val;
        });
        setHelp(old => {
          const val = {...old};
          if(data.username?.error)
            val.user = data.username.error;
          if(data.password?.error)
            val.pass = data.password?.error;
          if(data.displayname?.error)
            val.disp = data.displayname.error;
          return val;
        });
      }
    }
    else {
      setIsTouched(old => Object.fromEntries(
        Object.entries(old).map(([key,val]) => [key, !val])
      ));
      setTimeout(() => console.log('Mark all touched', isTouched, 
        Object.fromEntries(Object.entries(isTouched).map(([key,val]) => [key, !val]))), 100);
    }
  };

  return <>
    <h1>Create account</h1>
    <form onSubmit={signupHandler}>
    <Field label="E-mail" id="email" error={ isTouched.user && !isValid.user } valid={ isTouched.user && isValid.user } errorMessage={ help.user }>
        <input type="text" name="email" ref={userRef} onBlur={validateName} />
      </Field>
      <Field label="Password" id="password" error={ isTouched.pass && !isValid.pass } valid={ isTouched.pass && isValid.pass } errorMessage={ help.pass }>
        <input type="password" name="password" ref={passRef} onBlur={validatePass} />
      </Field>
      <Field label="Retype password" id="password2" error={ isTouched.pass2 && !isValid.pass2 } valid={ isTouched.pass2 && isValid.pass2 } errorMessage={ help.pass2 }>
        <input type="password" name="password2" ref={pass2Ref} onBlur={validatePass2} />
      </Field>
      <Field label="Displayname" id="displayname" error={ isTouched.disp && !isValid.disp } valid={ isTouched.disp && isValid.disp } errorMessage={ help.disp }>
        <input type="text" name="displayname" ref={dispnameRef} />
      </Field>
      <button type="submit" className="primaryBtn">Create</button>
    </form>
  </>;
};

export default SignUpForm;