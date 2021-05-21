import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { PCoursesContext } from '../../contexts/professor/coursesContext';

const AllCourses = () => {
    const { coursesData } = useContext(PCoursesContext);

    const history = useHistory();

    const OnClickAddCourse = (e) => {
        e.preventDefault();
        history.push('/professors/addCourse')
    }

    const openCoursePage = (e) => {
        e.preventDefault();
        const url = '/professors/courses/' + e.target.innerHTML
        history.push(url)
    }

    return (
        <div className="allCoursesContainer">
            <div className="addCourse">
                <button className="addCourseButton" onClick={OnClickAddCourse}>Add Course</button>
            </div>
            {
                coursesData.courses.map((course, i) => (
                    <div key={i} className="course" onClick={openCoursePage}>
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

export default AllCourses