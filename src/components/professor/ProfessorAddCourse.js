import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { FormGroup } from "@material-ui/core";
import { useState } from 'react';
import { addCourseToDB } from '../../services/professorService';
import { LoginContext } from '../../contexts/loginContext';
import { useContext } from 'react';
import ModalComponent from '../main/Modal'
import { PCoursesContext } from '../../contexts/professor/coursesContext';
import { addCourse } from '../../actions/professor/coursesActions'

const ProfessorAddCourse = () => {
    const { userData } = useContext(LoginContext);
    const { coursesData, dispatchCoursesData } = useContext(PCoursesContext)
    const [showModal, setShowModal] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [lessonsDuringWeek, setLessonsInDays] = useState(['', '', '', '', '', '', '']);
    const [beginningDate, setBeginningDate] = useState(null);
    const [endingDate, setEndingDate] = useState(null);

    const onBlurTitle = (e) => {
        const theTitle = e.target.value.trim();
        setTitle(theTitle);
    }
    const onBlurDescription = (e) => {
        const theDescription = e.target.value.trim();
        setDescription(theDescription);
    }
    const onChangeChecked = (i, day) => {
        let newLessonsDays = [...lessonsDuringWeek]
        newLessonsDays[i] = day;
        setLessonsInDays(newLessonsDays)
    }
    const onChangeBD = (e) => {
        const theBD = e.target.value.trim();
        setBeginningDate(theBD)
    }
    const onChangeED = (e) => {
        const theED = e.target.value.trim();
        setEndingDate(theED)
    }

    const AvailableThemes = ["Sunday", "Monday", "Tuesday", "Wendsday", "Thursday", "Friday", "Saterday"];

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
        const lessonsFiltered = lessonsDuringWeek.filter(day => day.length > 0);
        const newCourse = { title, description, lessonsDuringWeek: lessonsFiltered, beginningDate, endingDate };
        addCourseToDB(userData.token, newCourse).then((response) => {
            console.log(coursesData)
            dispatchCoursesData(addCourse(response))
            console.log(coursesData)
            setShowModal(true)
        }).catch((e) => {
            console.log(e)
        })
    }

    return (

        <div className="professorAddCourse">
            {showModal && <ModalComponent setShowModal={setShowModal} text="Course Added !" />}
            <div className="addCourseContainer">
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5" className="addCourseHeader">
                            Add Course
                        </Typography>
                        <form className={classes.form} noValidate onSubmit={onSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="fname"
                                        name="title"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="title"
                                        label="Title"
                                        autoFocus
                                        onBlur={onBlurTitle}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="description"
                                        label="Description"
                                        name="description"
                                        autoComplete="lname"
                                        onBlur={onBlurDescription}
                                    />
                                </Grid>
                                <div className="addCourse-days">
                                    <h6>Lessons in days:</h6>
                                    <FormGroup aria-label="Temas" row={true}>
                                        {AvailableThemes.map((theme, i) => (
                                            <div className="addCourse-checkbox" key={i}>
                                                <FormControlLabel
                                                    key={theme}
                                                    value={theme}
                                                    control={
                                                        <Checkbox
                                                            color="primary"
                                                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                            name={`muiThemes`}
                                                            type="checkbox"
                                                            value={theme}
                                                            onChange={() => { onChangeChecked(i, theme) }}
                                                        />
                                                    }
                                                    label={theme}
                                                />
                                            </div>
                                        ))}
                                    </FormGroup>
                                </div>
                                <TextField
                                    required
                                    id="date"
                                    label="Beginning Date"
                                    type="date"
                                    defaultValue="YYYY-MM-DD"
                                    className='addCourse-date'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={onChangeBD}
                                />
                                <TextField
                                    required
                                    id="date"
                                    label="Ending Date"
                                    type="date"
                                    defaultValue="YYYY-MM-DD"
                                    className='addCourse-date'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={onChangeED}
                                />
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Add Course
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

export default ProfessorAddCourse;

