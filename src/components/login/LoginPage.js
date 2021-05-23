
import React, { useState } from "react";
import { useHistory } from "react-router";
import { studentloginToDB } from '../../services/studentService';
import { professorloginToDB } from '../../services/professorService';
import { useContext } from "react";
import { LoginContext } from "../../contexts/loginContext";
import { loginAction } from "../../actions/loginActions";
import { saveUserOnCookie } from '../../cookies/cookies'

const LoginPage = () => {
    const { dispatchUserData } = useContext(LoginContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checked, setChecked] = useState(false);
    const [isEmailinputValid, setIsEmailInputValid] = useState(true);
    const [isPasswordInputValid, setIsPasswordInputValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const history = useHistory();

    const isFormInavlid = () => {
        return email === "" || password === "";
    };

    const onBlurEmailInput = (event) => {
        const theEmail = event.target.value.trim();
        if (theEmail === "") {
            setEmail("");
            setIsEmailInputValid(false);
        } else {
            setEmail(theEmail);
            setIsEmailInputValid(true);
        }
    };

    const onBlurPasswordInput = (event) => {
        const thePassword = event.target.value.trim();
        setPassword(thePassword === "" ? "" : thePassword);
        setIsPasswordInputValid(thePassword !== "");
    };

    const onClickProfessorCheckBox = () => {
        setChecked(!checked);
    }

    const onSubmitform = (event) => {
        event.preventDefault();
        checked ?
            professorloginToDB(email, password).then(
                (response) => {
                    if (response.data) {
                        const userData = response.data;
                        saveUserOnCookie(userData)
                        dispatchUserData(loginAction(userData));
                        history.push('/professors/courses')
                    } else
                        setErrorMessage(response)
                }).catch((err) => {
                    setErrorMessage(err.message)
                }) :
            studentloginToDB(email, password).then(
                (userData) => {
                    saveUserOnCookie(userData)
                    dispatchUserData(loginAction(userData));
                    history.push('/students/my-courses')
                },
                (err) => {
                    setErrorMessage(err.message)
                }
            )
    };


    return (
        <div className="login-page">
            <div className="login-page__form">
                <div className="login-form">
                    <h3>Login</h3>
                    {errorMessage !== "" && <div className="error-message">{errorMessage}</div>}
                    <form onSubmit={onSubmitform}>
                        <input placeholder="Email" onBlur={onBlurEmailInput} />
                        {!isEmailinputValid && <div className="invalid-message">You must enter your email.</div>}
                        <input type="password" placeholder="Password" onBlur={onBlurPasswordInput} />
                        {!isPasswordInputValid && <div className="invalid-message">You must enter your password.</div>}
                        <div className="login-form__nav">
                            <div className="isStudentSection">
                                <label className="isStudentLabel">Sign in as a Professor</label>
                                <input type="checkbox" className="isStudentCheckBox" onChange={onClickProfessorCheckBox} checked={checked} />
                            </div>
                            <button type="submit" disabled={isFormInavlid()}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;