// Librares
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
// Store
import { getIsLoggedIn } from "../../store/user/users.store";

const RequireAuth = ({ children }) => {
  const location = useLocation();

  return children;
};

export default RequireAuth;
