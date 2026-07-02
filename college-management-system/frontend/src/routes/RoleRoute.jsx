import { Navigate } from "react-router-dom";

const RoleRoute = ({
  children,
  allowedRoles,
}) => {
  const user = JSON.parse(
    localStorage.getItem("user") ||
      "null"
  );

  const token =
    localStorage.getItem(
      "token"
    );

  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (
    !user ||
    !allowedRoles.includes(
      user.role
    )
  ) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return children;
};

export default RoleRoute;