import React from 'react';
import { Navigate } from 'react-router-dom';

const authenticate = (WrappedComponent) => {

    return (props) => {
        const token = sessionStorage.getItem("authToken");
        if (!token) {
            return <Navigate to="/login" replace />;
        }

        return <WrappedComponent {...props} />;
    };
};

export default authenticate;