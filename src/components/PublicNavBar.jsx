import { NavLink } from "react-router-dom";

const PublicNavBar = () => {
  return (
    <nav className="primary-link">
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/signup">SignUp</NavLink>
    </nav>
  );
}
export default PublicNavBar