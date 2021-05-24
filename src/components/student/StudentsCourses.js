import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { LoginContext } from '../../contexts/loginContext';
import { getMyCoursesFromDB } from '../../services/studentService';
import Spinner from '../main/Spinner';

const StudentCourses = () => {
    const { userData } = useContext(LoginContext);
    const [myCourses, setMyCourses] = useState(undefined);
    const history = useHistory();

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
        history.push('/course/' + course.title)
    }

    return (
        <div className="my-courses">
            {myCourses ?
                <div className="courses">
                    {
                        myCourses.length > 0 ?
                            myCourses.map((course, i) => (
                                <div key={i} className="myCourses-course" onClick={() => openCourse(course.course)}>
                                    <div className="myCourses-courseName">{course.course.title}</div>
                                    <div className="myCourses-courseDates">
                                        <div><span className="myCourses-courseBD">Beginning Date:</span> {course.course.beginningDate.substr(0, 10)}</div>
                                        <div><span className="myCourses-courseED">Ending Date:</span> {course.course.endingDate.substr(0, 10)}</div>
                                    </div>
                                </div>
                            )) :
                            <div className="myCourses-course" >
                                <div className="not-included">
                                    You're not include in any course
                            </div>
                            </div>
                    }
                </div> :
                <Spinner />
            }

        </div>
    )
}

export default StudentCourses;