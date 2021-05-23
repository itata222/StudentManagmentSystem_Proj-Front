import React, { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../../contexts/loginContext';
import { getMyCoursesFromDB } from '../../services/studentService';
import Spinner from '../main/Spinner';

const StudentCourses = () => {
    const { userData } = useContext(LoginContext);
    const [myCourses, setMyCourses] = useState(undefined);

    useEffect(() => {
        let isComponentExist = true
        getMyCoursesFromDB(userData.token).then((response) => {
            if (isComponentExist) setMyCourses(response.courses)
        })
        return () => {
            isComponentExist = false;
        };
    }, [userData.token]);

    const openCourse = (course) => {
        console.log(course)
    }

    return (
        <div className="my-courses">
            {myCourses ?
                <div className="courses">
                    {
                        myCourses.map((course, i) => (
                            <div key={i} className="course" onClick={() => openCourse(course.course)}>
                                <div className="courseName">{course.course.title}</div>
                                <div className="courseDates">
                                    <div><span className="courseBD">Beginning Date:</span> {course.course.beginningDate.substr(0, 10)}</div>
                                    <div><span className="courseED">Ending Date:</span> {course.course.endingDate.substr(0, 10)}</div>
                                </div>
                            </div>
                        ))
                    }
                </div> :
                <Spinner />
            }

        </div>
    )
}

export default StudentCourses;