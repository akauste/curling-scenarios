import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector(state => state.auth.user);
  const idToken = useSelector(state => state.auth.idToken);
  if(!user) {
    return <h1>Please, login first</h1>;
  }
  console.log(idToken);
  console.log(JSON.parse(localStorage.getItem('user')));

  const writeHandler = () => {
    //const provider = new GoogleAuthProvider();
    //const auth = getAuth(app);
    //auth.currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
      // Send token to your backend via HTTPS
      // ...
    //  console.log('ID Token: ', idToken);

    fetch('https://pwagram-a55a8-default-rtdb.europe-west1.firebasedatabase.app/cart.json?auth='+ idToken, {
//        method: 'GET',
//        body: JSON.stringify({test: 'success'}),
      }).then((res) => { console.log('success'); return res.json(); })
      .then((data) => { console.log(data); })
      .catch((err) => {console.error('FAIL', err) });

    //}).catch(function(error) {
      // Handle error
    //  console.log('ERROR: ', error);
    //});
  }

  return (<>
    <h1>Profile: { user.displayName }</h1>
    <h2>My scenarios</h2>
    <ul>
      <li>List of scenarios</li>
    </ul>
    <button onClick={writeHandler}>Write</button>
  </>);
}
export default Profile;