import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const Authenticate = () => {
  const token = Cookies.get("token");
  if (token) return <Outlet />;
  return <Navigate to="/login" />;
};

export default Authenticate;
