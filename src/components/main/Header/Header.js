import React from 'react';
import { useContext } from 'react';
import { LoginContext } from '../../../contexts/loginContext';
import HeaderLowerProfessor from './HeaderLowerProfessor';
import HeaderLowerStudent from './HeaderLowerStudent';
import HeaderUpper from './HeaderUpper';

const Header = () => {
    const { userData, dispatchUserData } = useContext(LoginContext);

    return (
        <div className="header">
            <HeaderUpper userData={userData} dispatchUserData={dispatchUserData} />
            {
                !!userData.user ?
                    (!!userData.user.courses ?
                        <HeaderLowerStudent /> :
                        <HeaderLowerProfessor />)
                    :
                    console.log('no one logged ')
            }
        </div>
    )
}

export default Header;