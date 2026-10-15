import React, { useContext } from 'react'
import { useNavigate, Navigate } from 'react-router'
import { AuthContext } from '../auth.context'
import useAuth from '../hooks/useAuth'


const ProtectedComponent = ({ children }) => {
  const { user, loading } = useAuth();


  // show the loader only for the very first check
  if (loading && !user) return <h1>Loading...</h1>;



    if (!user) return <Navigate to="/login" />;





  return children;
};


export default ProtectedComponent
