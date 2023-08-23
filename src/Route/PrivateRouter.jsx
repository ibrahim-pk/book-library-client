/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRouter = ({ children }) => {
  const token = JSON.parse(localStorage.getItem("book-user"));
  let location = useLocation();
  console.log(token);
  if (token?.token) {
    return children;
  }

  return (
    <Navigate to="/user/login" state={{ from: location }} replace></Navigate>
  );
};
