import React from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { useAuth } from './customHooks/AuthContext';

const ProtectedRoute = props => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const isAuthenticated = currentUser !== null ? true : false;
  const isVerified = currentUser?.emailVerified;

  return isAuthenticated ? (
    isVerified ? (
      <Route {...props} />
    ) : (
      <Redirect
        to={{
          pathname: '/notverified',
          state: { from: location },
        }}
      />
    )
  ) : (
    <Redirect
      to={{
        pathname: '/login',
        state: { from: location },
      }}
    />
  );
};

export default ProtectedRoute;
