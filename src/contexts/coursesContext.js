import React, { createContext, useReducer } from 'react';
import coursesReducer, { initialCoursesState } from '../reducers/coursesReducer';

export const CoursesContext = createContext();

const CoursesContextProvider = (props) => {
    const [coursesData, dispatchCoursesData] = useReducer(coursesReducer, initialCoursesState)

    return (
        <CoursesContext.Provider value={{ coursesData, dispatchCoursesData }}>
            {props.children}
        </CoursesContext.Provider>
    )
}

export default CoursesContextProvider;