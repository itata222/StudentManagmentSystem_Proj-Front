import React from 'react';
import { logoutAction } from '../../../actions/loginActions';
import { NavLink, useHistory } from 'react-router-dom';
import brand from '../../../brand.png';
import { deleteUserFromCookie } from '../../../cookies/cookies';


const HeaderUpper = (props) => {

    const history = useHistory();

    const onClickLogout = () => {
        props.dispatchUserData(logoutAction());
        deleteUserFromCookie()
        history.push("/home");
    };

    return (
        <div className="upper-nav">
            <NavLink className="upper-nav-item" to="/home" activeClassName="upper-nav-active-item">
                Home
                </NavLink>
            <div className="upper-nav-brand" >
                <img src={brand} alt="site's brand" />
            </div>
            {
                !!props.userData.token ?
                    <div className="upper-nav-item" onClick={onClickLogout}>Logout</div> :
                    <NavLink className="upper-nav-item" to="/login" activeClassName="upper-nav-active-item">Login</NavLink>
            }
        </div>
    )
}

export default HeaderUpper;