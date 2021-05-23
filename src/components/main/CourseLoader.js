import React from 'react';
import CourseContextProvider from '../../contexts/courseContext';
import CoursePage from './CoursePage';

const CourseLoader = (props) => {
    const courseTitle = props.match.params.title;

    return (
        <CourseContextProvider courseTitle={courseTitle}>
            <CoursePage />
        </CourseContextProvider>
    );
};

export default CourseLoader;