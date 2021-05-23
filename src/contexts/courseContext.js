import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { setCourseData } from '../actions/courseActions';
import courseReducer, { initialCourseState } from '../reducers/courseReducer';
import { getCourseData } from '../services/loggedService';
import { LoginContext } from './loginContext';

export const CourseContext = createContext();

const CourseContextProvider = (props) => {
    const { userData } = useContext(LoginContext);
    const [courseData, dispatchCourseData] = useReducer(courseReducer, initialCourseState);

    useEffect(() => {
        let isComponentExist = true;
        getCourseData(userData.token, props.courseTitle).then((response) => {
            if (isComponentExist) {
                dispatchCourseData(setCourseData(response))
            }
        }).catch((err) => {
            console.log('err', err)
        })
        return () => {
            isComponentExist = false
        };
    }, [userData.token, props.courseTitle]);


    return (
        <CourseContext.Provider value={{ courseData, dispatchCourseData }}>
            {props.children}
        </CourseContext.Provider>
    )

}

export default CourseContextProvider;