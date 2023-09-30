import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { setUser } from '../../slices/authSlice';

const withAuth = (WrappedComponent) => {
    const AuthComponent = (props) => {
        const [isLoading, setIsLoading] = useState(true); // Track loading state
        const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
        // const dispatch = useDispatch();

        // useEffect(() => {
        //     // Check local storage for user data and set isAuthenticated accordingly
        //     const user = JSON.parse(localStorage.getItem('user'));

        //     if (user) {
        //         dispatch(setUser(user));
        //     }

        //     setIsLoading(false); // Set loading state to false once user check is done
        // }, [dispatch]);

        // if (isLoading) {
        //     // Show loading indicator if still checking user data
        //     return <p>Loading...</p>;
        // }

        if (isAuthenticated) {
            return <WrappedComponent {...props} />;
        } else {
            // Redirect to the login page if not authenticated
            return <Navigate to="/login" />;
        }
    };

    return AuthComponent;
};

export default withAuth;
