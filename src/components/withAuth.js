import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const token = useSelector((state) => state.auth.token);

        if (!token) {
            return <Navigate to="/" replace />;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;