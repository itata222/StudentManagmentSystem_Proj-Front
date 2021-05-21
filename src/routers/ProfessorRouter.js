import React from 'react';
import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { LoginContext } from '../contexts/loginContext';


const ProfessorRouter = ({ component: Component, ...rest }) => {
    const { userData } = useContext(LoginContext);

    return (
        <Route
            {...rest}
            component={(props) => (
                !!userData.token ? !userData.courses ?
                    <Component {...props} />
                    : <Redirect to={{ pathname: "/students/my-courses" }} />
                    : <Redirect to={{ pathname: "/login" }} />
            )}
        />);
};

export default ProfessorRouter;