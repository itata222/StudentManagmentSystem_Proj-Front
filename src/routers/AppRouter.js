import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Home from '../components/home/Home';
import LoginPage from '../components/login/LoginPage';
import CoursePage from '../components/main/CoursePage';
import Header from '../components/main/Header/Header';
import PageNotFound from '../components/main/PageNotFound';
import ProfessorAddCourse from '../components/professor/ProfessorAddCourse';
import ProfessorCourses from '../components/professor/ProfessorCourses';
import ProfessorProfile from '../components/professor/ProfessorProfile';
import StudentProfile from '../components/student/StudentProfile';
import StudentCourses from '../components/student/StudentsCourses';
import LoginContextProvider from '../contexts/loginContext';
import PCoursesContextProvider from '../contexts/professor/coursesContext';
import ProfessorRouter from './ProfessorRouter';
import StudentRouter from './StudentRouter';

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
                <PCoursesContextProvider>
                    <ProfessorRouter path='/professors/courses' component={ProfessorCourses} />
                    <ProfessorRouter path='/professors/course/:name' component={CoursePage} />
                    {/* <ProfessorRouter path='/professors/courses/:id/addStudent' component={ProfessorCourses} /> */}
                    <ProfessorRouter path='/professors/profile' component={ProfessorProfile} />
                    <ProfessorRouter path='/professors/addCourse' component={ProfessorAddCourse} />
                    {/* <ProfessorRouter path='/professors/addStudent' component={ProfessorCourses} /> */}
                </PCoursesContextProvider>
                <StudentRouter path='/students/my-profile' component={StudentProfile} />
                <StudentRouter path='/students/my-courses' component={StudentCourses} />
                <Route path="*" component={PageNotFound} />
            </Switch>
        </LoginContextProvider>
    </BrowserRouter>
)


export default AppRouter;