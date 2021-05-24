import React, { useEffect } from 'react';
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
import Spinner from '../main/Spinner'
import { addLessonToCourse, getCourseDataById } from '../../services/professorService';

const AddLessonToCourse = (props) => {
    const courseID = props.match.params.id;

    const { userData } = useContext(LoginContext);
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [date, setDate] = useState(null);
    const [course, setCourse] = useState(undefined);
    const [textError, setTextError] = useState("");

    useEffect(() => {
        let isComponentExist = true
        getCourseDataById(userData.token, courseID).then((response) => {
            if (isComponentExist) {
                setCourse(response)
            }
        })
        return () => {
            isComponentExist = false;
        };
    }, [userData.token, courseID]);

    const onBlurTitle = (e) => {
        const theTitle = e.target.value.trim();
        setTitle(theTitle);
    }
    const onChangeDate = (e) => {
        const theDate = e.target.value.trim();
        setDate(theDate)
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
        const newLesson = { title, date, course: course._id };
        addLessonToCourse(userData.token, newLesson, courseID).then((response) => {
            console.log(response)
            if (response.message)
                setTextError(response.message)
            // setTextError(`${Object.keys(response.response.data.keyValue)[0]} already Exist`)
            else
                setTextError('Lesson Added !')
            setShowModal(true)
        }).catch((e) => {
            console.log(e)
        })
    }

    return (

        <div className="addStudentToSystem">
            {showModal && <ModalComponent setShowModal={setShowModal} text={textError} />}
            {!!course ?
                <div className="addCourseContainer">
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className={classes.paper}>
                            <Typography component="h1" variant="h5" className="addCourseHeader">
                                Add a Lesson To {course.title}
                            </Typography>
                            <div className="lessonsInDays">
                                <h3>*Lessons should only be in:*</h3>
                                {
                                    course.lessonsDuringWeek.map((day, i) => (
                                        <div key={i} className="courseDay">
                                            {day}
                                        </div>
                                    ))
                                }
                            </div>
                            <form className={classes.form} noValidate onSubmit={onSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            autoComplete="fname"
                                            name="lessonTitle"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="lessonTitle"
                                            label="Lesson Title"
                                            autoFocus
                                            onBlur={onBlurTitle}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="date"
                                            label="Lesson Date"
                                            type="date"
                                            defaultValue="2021-05-24"
                                            className='addCourse-date'
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            inputProps={{
                                                min: `${course.beginningDate.substr(0, 10)}`,
                                                max: `${course.endingDate.substr(0, 10)}`
                                            }}
                                            onChange={onChangeDate}
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
                                    Add Lesson
                            </Button>
                            </form>
                        </div>
                        <Box mt={5}>
                        </Box>
                    </Container>
                </div> :
                <Spinner />
            }
        </div>

    )
}

export default AddLessonToCourse;