import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector(state => state.auth.user);
  if(!user) {
    return <h1>Please, login first</h1>;
  }

  return (<>
    <h1>Profile: { user.displayName }</h1>

    <h2>My scenarios</h2>
    <ul>
      <li>List of scenarios</li>
    </ul>
  </>);
}
export default Profile;