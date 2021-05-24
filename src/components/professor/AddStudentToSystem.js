import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState } from 'react';
import { LoginContext } from '../../contexts/loginContext';
import { useContext } from 'react';
import ModalComponent from '../main/Modal';
import { addStudentToDB } from '../../services/professorService';

const AddStudentToSystem = () => {

    const { userData } = useContext(LoginContext);
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("");
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [courses, setCourses] = useState([]);
    const [textError, setTextError] = useState("");

    const onBlurName = (e) => {
        const theName = e.target.value.trim();
        setName(theName);
    }
    const onBlurUsername = (e) => {
        const theUserName = e.target.value.trim();
        setUserName(theUserName);
    }
    const onBlurEmail = (e) => {
        const theEmail = e.target.value.trim();
        setEmail(theEmail)
    }
    const onBlurPassword = (e) => {
        const thePassword = e.target.value.trim();
        setPassword(thePassword)
    }

    const useStyles = makeStyles((theme) => ({
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(3),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
            fontFamily: `'Poppins', sans-serif`
        },
    }));

    const classes = useStyles();

    const onSubmit = (e) => {
        e.preventDefault();
        setCourses([])
        const newStudent = { name, username, email, password, courses };
        addStudentToDB(userData.token, newStudent).then((response) => {
            if (response.response.data.code === 11000)
                setTextError(`${Object.keys(response.response.data.keyValue)[0]} already Exist`)
            else
                setTextError('Student Added !')
            setShowModal(true)
        }).catch((e) => {
            console.log(e)
        })
    }

    return (

        <div className="addStudentToSystem">
            {showModal && <ModalComponent setShowModal={setShowModal} text={textError} />}
            <div className="addCourseContainer">
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5" className="addCourseHeader">
                            Add Student To The System
                        </Typography>
                        <form className={classes.form} noValidate onSubmit={onSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="fname"
                                        name="name"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="name"
                                        label="Name"
                                        autoFocus
                                        onBlur={onBlurName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        name="username"
                                        autoComplete="lname"
                                        onBlur={onBlurUsername}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        name="email"
                                        autoComplete="lname"
                                        onBlur={onBlurEmail}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="password"
                                        label="Password"
                                        name="password"
                                        autoComplete="lname"
                                        onBlur={onBlurPassword}
                                    />
                                </Grid>

                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Add Student
                            </Button>
                        </form>
                    </div>
                    <Box mt={5}>
                    </Box>
                </Container>
            </div>
        </div>

    )
}

export default AddStudentToSystem;