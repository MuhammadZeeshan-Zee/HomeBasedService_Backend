// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, requiredRole }) => {
  // const user = useSelector((state) => state.auth.userInfo)
  // console.log(user, "fffffffff")
  const authData = localStorage.getItem("auth");
  const authObject = JSON.parse(authData);
      console.log("authObject",authObject);
      
      const user = authObject?.user;
      // console.log("role",user.role)
      if(!user){
        return <Navigate to="/login" />;
      }
  if (user.role !== "admin") {
    // Not logged in
    return <Navigate to="/login" />;
  }

  
  return children;
};

export default PrivateRoute;