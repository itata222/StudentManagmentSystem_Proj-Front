import React, { useContext, useEffect, useState } from 'react';
import { PCoursesContext } from '../../contexts/professor/coursesContext'
import { LoginContext } from '../../contexts/loginContext'
import { getAllCoursesFromDB } from '../../services/professorService';
import Spinner from '../main/Spinner';
import { getAllCourses } from '../../actions/professor/coursesActions'
import AllCourses from './AllCourses';

const ProfessorCourses = () => {

    const { dispatchCoursesData } = useContext(PCoursesContext);
    const { userData } = useContext(LoginContext)
    const [isPageLoaded, setIsPageLoaded] = useState(false);

    // console.log(userData)
    useEffect(() => {
        let isComponentExist = true;
        getAllCoursesFromDB(userData.token).then((courses) => {
            if (isComponentExist) {
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
                    <AllCourses /> :
                    <Spinner />
            }
        </div>
    )
}



export default ProfessorCourses;