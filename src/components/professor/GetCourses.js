import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { CoursesContext } from '../../contexts/coursesContext';

const GetCourses = () => {
    const { coursesData } = useContext(CoursesContext);
    const history = useHistory();

    const OnClickAddCourse = (e) => {
        e.preventDefault();
        history.push('/professors/addCourse')
    }

    const OnClickAddStudent = (e) => {
        e.preventDefault();
        history.push('/professors/addStudentToSystem')
    }

    const openCoursePage = (title) => {
        const url = `/course/${title}`
        history.push(url)
    }

    return (
        <div className="allCoursesContainer">
            <div className="addCourse">
                <button className="addCourseButton" onClick={OnClickAddCourse}>Add Course</button>
                <button className="addCourseButton" onClick={OnClickAddStudent}>Add Student</button>
            </div>
            {
                coursesData.courses.map((course, i) => (
                    <div key={i} className="course" onClick={() => { openCoursePage(course.title) }}>
                        <div className="courseName">{course.title}</div>
                        <div className="courseDates">
                            <div><span className="courseBD">Beginning Date:</span> {course.beginningDate.substr(0, 10)}</div>
                            <div><span className="courseED">Ending Date:</span> {course.endingDate.substr(0, 10)}</div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default GetCourses