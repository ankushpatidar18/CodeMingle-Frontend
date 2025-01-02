import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { 
  addUser, 
  removeUser, 
  setLoading, 
  setError,
  selectUser,
  selectIsAuthenticated,
  selectLoading 
} from '../utils/slices/userSlice'; 

const PrivateRoute = ({ children }) => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const loading = useSelector(selectLoading);

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                dispatch(setLoading(true));
                const response = await axios.get('http://localhost:8080/profile/view', {
                    withCredentials: true
                });
                console.log(response.data.data)
                dispatch(addUser(response.data.data));
            } catch (error) {
                dispatch(removeUser());
                dispatch(setError(error.response?.data?.message || 'Authentication failed'));
            }
        };

        if (!user && !isAuthenticated) {
            verifyAuth();
        }
    }, [user, isAuthenticated, dispatch]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivateRoute;