import { Navigate, Outlet } from "react-router-dom";
import PublicNavBar from "../PublicNavBar";
import { useAuth } from "../context/AuthContext";
const PublicLayout = () => {
  const auth = useAuth();
  if (auth) {
    return <Navigate to="/" />;
  }
  return <>
  <PublicNavBar/>
  <Outlet/>
  </>
};
export default PublicLayout;
