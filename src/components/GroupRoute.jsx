import React from 'react';
import { Outlet, Navigate } from 'react-router-dom'


const GroupRoute = () => {
    const auth = () => {
        const role = sessionStorage.getItem('_role')
        if(role !== 'Musico' && role !== 'Admin' && role !== 'Aluno')
            return false
    
        return true
    }
    const teste = auth();
    return (
        
        teste ? <Outlet /> : <Navigate to='/login' />
        
    )
}

export default GroupRoute



