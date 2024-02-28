import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/auth';

function ProtectedRoute({ element, ...rest }) {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
       element ={user ? <Navigate to="/" replace /> : element} 
    />
  );
}

export default ProtectedRoute;
