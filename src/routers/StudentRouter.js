import React from 'react';
import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { LoginContext } from '../contexts/loginContext';

const StudentRouter = ({ component: Component, ...rest }) => {
    const { userData } = useContext(LoginContext);

    return (
        <Route
            {...rest}
            component={(props) => (
                !!userData.token ? userData.user.courses ?
                    <Component {...props} />
                    : <Redirect to={{ pathname: "/professors/courses" }} />
                    : <Redirect to={{ pathname: "/login" }} />
            )}
        />);
};

export default StudentRouter;