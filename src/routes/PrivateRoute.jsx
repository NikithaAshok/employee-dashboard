import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/storage";

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" />;
};

export default PrivateRoute;
