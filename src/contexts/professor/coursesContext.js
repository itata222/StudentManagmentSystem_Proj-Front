import React, { createContext, useReducer } from 'react';
import coursesReducer, { initialCoursesState } from '../../reducers/professor/coursesReducer';

export const PCoursesContext = createContext();

const PCoursesContextProvider = (props) => {
    const [coursesData, dispatchCoursesData] = useReducer(coursesReducer, initialCoursesState)

    return (
        <PCoursesContext.Provider value={{ coursesData, dispatchCoursesData }}>
            {props.children}
        </PCoursesContext.Provider>
    )
}

export default PCoursesContextProvider;