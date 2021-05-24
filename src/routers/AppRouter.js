import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Home from '../components/home/Home';
import LoginPage from '../components/login/LoginPage';
import CourseLoader from '../components/main/CourseLoader';
import Header from '../components/main/Header/Header';
import PageNotFound from '../components/main/PageNotFound';
import AddStudentToCourse from '../components/professor/AddStudentToCourse';
import AddStudentToSystem from '../components/professor/AddStudentToSystem';
import ProfessorAddCourse from '../components/professor/AddCourse';
import ProfessorCourses from '../components/professor/AllCourses';
import StudentsManagment from '../components/professor/StudentsManagment';
import StudentCourses from '../components/student/StudentsCourses';
import LoginContextProvider from '../contexts/loginContext';
import CoursesContextProvider from '../contexts/coursesContext';
import ProfessorRouter from './ProfessorRouter';
import UserRouter from './UserRouter';
import StudentRouter from './StudentRouter';
import MyProfile from '../components/main/MyProfile';
import AddLessonToCourse from '../components/professor/AddLessonToCourse';
import StudentAppearences from '../components/student/StudentAppearences';

const AppRouter = () => (

    <BrowserRouter>
        <LoginContextProvider>
            <Header />
            <Switch>
                <Route path="/" exact>
                    <Redirect to="/home" />
                </Route>
                <Route path="/home" component={Home} />
                <Route path="/login" component={LoginPage} />
                <CoursesContextProvider>
                    <ProfessorRouter path='/professors/courses' component={ProfessorCourses} />
                    <ProfessorRouter path='/professors/addCourse' component={ProfessorAddCourse} />
                    <ProfessorRouter path='/professors/studentsManagment' component={StudentsManagment} />
                    <ProfessorRouter path='/professors/addStudentToCourse' component={AddStudentToCourse} />
                    <ProfessorRouter path='/professors/addStudentToSystem' component={AddStudentToSystem} />
                    <ProfessorRouter path='/professors/addLesson/:id' component={AddLessonToCourse} />
                    <StudentRouter path='/students/my-courses' component={StudentCourses} />
                    <StudentRouter path='/students/updateMyAppearnces' component={StudentAppearences} />
                    <UserRouter path='/course/:title' component={CourseLoader} />
                    <UserRouter path='/profile' component={MyProfile} />
                </CoursesContextProvider>
                <Route path="*" component={PageNotFound} />
            </Switch>
        </LoginContextProvider>
    </BrowserRouter>
)


export default AppRouter;