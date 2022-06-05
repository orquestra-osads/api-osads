import React from 'react';
import { Outlet, Navigate } from 'react-router-dom'

const MusicoRoute = () => {
    const auth = () => {
        const role = sessionStorage.getItem('_role')
        if(role !== 'Musico' && role !== 'Admin')
            return false
    
        return true
    }
    const teste = auth();
    return (
        
        teste ? <Outlet /> : <Navigate to='/login' />
        
    )
  
};

export default MusicoRoute;