import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '~/common/context/UserContext';


const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { user } = useUser();

    if (!user) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <Component {...rest} />
            <Outlet />
        </>
    );
};

export default ProtectedRoute;
