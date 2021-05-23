import React from 'react';
import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { LoginContext } from '../contexts/loginContext';

const UserRouter = ({ component: Component, ...rest }) => {
    const { userData } = useContext(LoginContext);
    return (
        <Route
            {...rest}
            component={(props) => (
                !!userData.token ?
                    <Component {...props} />
                    : <Redirect to={{ pathname: "/login" }} />
            )}
        />);
};

export default UserRouter;