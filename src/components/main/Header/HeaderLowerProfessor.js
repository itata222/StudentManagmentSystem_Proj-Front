import React from 'react';
import { NavLink } from 'react-router-dom';
import { Divider } from '@material-ui/core';


const HeaderLowerProfessor = () => {

    return (
        <div className="lower-nav">
            <NavLink className="lower-nav-item" to="/professors/courses" activeClassName="lower-nav-active-item">All Courses</NavLink>
            <Divider orientation="vertical" flexItem />
            <NavLink className="lower-nav-item" to="/profile" activeClassName="lower-nav-active-item">Profile</NavLink>
        </div>
    )
}

export default HeaderLowerProfessor;