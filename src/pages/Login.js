import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useSelector } from "react-redux";

import app from '../lib/firebase';

const Login = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);
  if(user) {
    return (<div>
        <h2>Hello { user.displayName }</h2>
        { user.email }
        <button>Logout</button>
    </div>);
  }
  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log(token);
        localStorage.setItem('auth-token', JSON.stringify(token));
        // The signed-in user info.
        const user = result.user;
        localStorage.setItem('user', JSON.stringify(user));
        console.log('User: ', user);
        // ...
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
      });
  };

  return (
    <>
      <h1>Login / signup form</h1>
      <p>
        Not yet here, will be implemented, when there's sections that will need
        that
      </p>
      <button onClick={loginWithGoogle}>Login with google</button>
    </>
  );
};
export default Login;
