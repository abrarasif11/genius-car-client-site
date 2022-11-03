import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Login/Context/AuthProvider/AuthProvider';

const PrivateRoute = ({children}) => {
    const {user , loading} = useContext(AuthContext);
    const location = useLocation();
    if(loading){
        return <h1 className='text-5xl'>Loading...</h1>
    }
    if(user){
        return children;
    }
    return <Navigate state={{from : location}}></Navigate>
};

export default PrivateRoute;