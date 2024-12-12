import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

/**
 * PrivateRoute Component - Restricts access to certain routes based on user roles or exceptions.
 *
 * This component checks the user's role against a list of allowed roles for a specific route.
 * If the user's role matches or if their username is in the exceptions list, they are granted access.
 * Otherwise, they are redirected to the "/unauthorized" page.
 *
 * @param {React.ElementType} element - The component to be rendered if access is granted.
 * @param {Array<string>} allowedRoles - A list of roles that are permitted to access the route.
 * @param {Array<string>} exceptions - A list of userNames that are given access despite their roles.
 *
 * @returns {JSX.Element} - The specified component if access is allowed, or a redirect to "/unauthorized" if not.
 *
 * TODO: Improve security by integrating Role-Based Access Control (RBAC) more thoroughly.
 * Consider adding stronger validation and potentially a centralized security management system.
 */
const PrivateRoute = ({
  element: Element,
  allowedRoles = [],
  exceptions = [],

  //isLoggedIn
}) => {
    const userData = JSON.parse(localStorage.getItem("auth")); // Get the current user's role from Redux store.
   // Get the current user's username.

  // Check if the user's role or username grants them access to the route.
  return userData && userData.isLoggedIn && allowedRoles.includes(userData.type) ? ( 
//   allowedRoles.includes(userRole) || exceptions.includes(userName) ? (
    <Element /> // Render the component if the user has permission.
  ) : (
    <Navigate to="/unauthorized" replace /> // Redirect to "unauthorized" if access is denied.
  );
};

export default PrivateRoute;
