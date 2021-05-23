import React, { useContext, useEffect, useState } from 'react';
import { CoursesContext } from '../../contexts/coursesContext'
import { LoginContext } from '../../contexts/loginContext'
import { getAllCoursesFromDB } from '../../services/professorService';
import Spinner from '../main/Spinner';
import { getAllCourses } from '../../actions/coursesActions'
import GetCourses from './GetCourses';
import { saveCoursesOnCookie } from '../../cookies/cookies';

const ProfessorCourses = () => {

    const { dispatchCoursesData } = useContext(CoursesContext);
    const { userData } = useContext(LoginContext)
    const [isPageLoaded, setIsPageLoaded] = useState(false);

    // console.log(userData)
    useEffect(() => {
        let isComponentExist = true;
        getAllCoursesFromDB(userData.token).then((courses) => {
            if (isComponentExist) {
                saveCoursesOnCookie(courses)
                dispatchCoursesData(getAllCourses(courses));
                setIsPageLoaded(true);
            }
            else
                console.log('wwfwfwf')
        }).catch((err) => { alert(err.message) });
        return () => {
            isComponentExist = false;
        };
    }, [userData.token, dispatchCoursesData]);

    return (
        <div className="allCourses">
            {
                isPageLoaded ?
                    <GetCourses /> :
                    <Spinner />
            }
        </div>
    )
}



export default ProfessorCourses;