import React from 'react';
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoute = () => {
    const auth = () => {
        const role = sessionStorage.getItem('_role')
        if( role !== 'Admin' )
            return false
    
        return true
    }
    const teste = auth();
    return (
        
        teste ? <Outlet /> : <Navigate to='/login' />
        
    )
  
};

export default PrivateRoute;

