import React, { useContext, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { LoginContext } from '../../contexts/loginContext';
import { professorChangePassword } from '../../services/professorService';
import { studentChangePassword } from '../../services/studentService';
import ModalComponent from './Modal';

const MyProfile = () => {
    const { userData } = useContext(LoginContext);
    const [changePassword, setChangePassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isPasswodsMatch, setIsPasswodsMatch] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const isFormInvalid = () => {
        return isPasswodsMatch === true && isPasswordValid === true
    }

    const passwordBlur = (e) => {
        const thePassword = e.target.value.trim();
        if (thePassword.length > 0) {
            setIsPasswordValid(true)
            setErrorMessage('')
        }
        else {
            setIsPasswordValid(false)
            setErrorMessage('New Password Cant be empty')
        }
        setPassword(thePassword);
        // e.target.value = "";
    }

    const repeatedPassBlur = (e) => {
        const theRepeatedPass = e.target.value.trim();
        if (theRepeatedPass === password) {
            setIsPasswodsMatch(true)
            setErrorMessage('')
        }
        else {
            setIsPasswodsMatch(false);
            setErrorMessage('Passwords not match');
        }
        // e.target.value = "";
    }

    const showForm = (e) => {
        e.preventDefault();
        setChangePassword(true)
    }

    const submitForm = (e) => {
        e.preventDefault();
        const changePasswordFunction = userData.user.courses ? studentChangePassword : professorChangePassword;
        changePasswordFunction(userData.token, password).then((response) => {
            setShowModal(true)
            setErrorMessage("")
        }).catch((err) => {
            setErrorMessage(err.message)
        })
    }

    return (
        <div className="profile">
            {showModal && <ModalComponent setShowModal={setShowModal} text="Password Changed !" />}
            <Avatar>H</Avatar>
            <div className="name">
                <span className="label">Name: </span>
                <span> {userData.user.name}</span>
            </div>
            <div className="username">
                <span className="label">User Name: </span>
                <span> {userData.user.username}</span>
            </div>
            <div className="email">
                <span className="label">Email: </span>
                <span> {userData.user.email}</span>
            </div>
            {
                changePassword ?
                    <div className="changePasswordContainer">
                        <h3>Change Password</h3>
                        {
                            errorMessage !== "" &&
                            <div className="error">{errorMessage}</div>
                        }
                        <form className="changePasswordForm" onSubmit={submitForm}>
                            <input onBlur={passwordBlur} type="password" placeholder="Password" required />
                            <input onBlur={repeatedPassBlur} type="password" placeholder="Repeat Password" required />
                            <button disabled={!isFormInvalid()}>Change !</button>
                        </form>
                    </div>
                    :
                    <div className="isWantChangePasswordSection">
                        <button onClick={showForm}>Change my Password !</button>
                    </div>
            }

        </div>
    )
}

export default MyProfile;