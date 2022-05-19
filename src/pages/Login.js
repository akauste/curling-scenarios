import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";

import app from '../lib/firebase';
import { authActions } from '../store/auth-slice';
import SignUp from '../components/session/SignUp';
import { useState } from 'react';
import LoginForm from '../components/session/LoginForm';

const Login = () => {
  const [tab, setTab] = useState('login');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);
  if(user) {
    return (<div>You are already logged in!</div>);
  }
  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        const u = { displayName: user.displayName, email: user.email };

        auth.currentUser.getIdToken(/* forceRefresh */ true)
          .then((idToken) => {
            dispatch(authActions.login({ user: u, token, idToken }));
          });
        navigate('/profile');
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  return (
    <>
      <ul className="tabs">
        <li><button className={ tab === 'login' ? 'active' : null } onClick={() => setTab('login')}>Login</button></li>
        <li><button className={ tab === 'signup' ? 'active' : null } onClick={() => setTab('signup')}>Signup</button></li>
      </ul>
      { tab === 'login' && <>
        <h1>Login</h1>
        <LoginForm />
        { /*
        <p>Currently you can only login with google account</p>
        <button onClick={loginWithGoogle}>Login with google</button>
        */ }
        </> 
      }
      { tab === 'signup' && <SignUp /> }
    </>
  );
};
export default Login;
