import React from 'react';
import { NavLink } from 'react-router-dom';
import { Divider } from '@material-ui/core';


const HeaderLowerStudent = () => {

    return (
        <div className="lower-nav">
            <NavLink className="lower-nav-item" to="/students/my-courses" activeClassName="lower-nav-active-item">My Courses</NavLink>
            <Divider orientation="vertical" flexItem />
            <NavLink className="lower-nav-item" to="/students/my-profile" activeClassName="lower-nav-active-item">Profile</NavLink>
        </div>
    )
}

export default HeaderLowerStudent;