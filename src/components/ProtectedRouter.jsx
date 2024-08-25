import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRouter = ({ children, isAuthenticated }) => {
  if (isAuthenticated) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRouter;
