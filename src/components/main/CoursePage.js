import React, { useContext, useState, useEffect } from 'react';
import { CourseContext } from '../../contexts/courseContext'
import { LoginContext } from '../../contexts/loginContext'
// import ModalComponent from '../main/Modal';
import Avatar from '@material-ui/core/Avatar';
import Spinner from './Spinner'
import { useHistory } from 'react-router';
import { getStudentsOfSpecificCourse } from '../../services/professorService';


const CoursePage = () => {
    const { userData } = useContext(LoginContext);
    const { courseData } = useContext(CourseContext);
    const [students, setStudents] = useState([...courseData.students]);
    const [isCourseLoaded, setIsCourseLoaded] = useState(false);
    const history = useHistory()

    useEffect(() => {
        setIsCourseLoaded(true)
    }, [courseData]);

    const addStudent = (e) => {
        e.preventDefault();
        history.push('/professors/studentsManagment')
    }


    useEffect(() => {
        getStudentsOfSpecificCourse(userData.token, courseData).then((response) => {
            setStudents(response)
        })
    }, [userData.token, courseData]);


    return (
        <div className="coursePage-course">
            {/* {showModal && <ModalComponent setShowModal={setShowModal} text="Password Changed !" />} */}
            {
                isCourseLoaded ?
                    <div>
                        <Avatar>H</Avatar>
                        <div className="title">
                            <span className="label">Title: </span>
                            <span> {courseData.title}</span>
                        </div>
                        <div className="description">
                            <span className="label">Description: </span>
                            <span> {courseData.description}</span>
                        </div>
                        <div className="lessonsDuringWeek">
                            <span className="label">Lessons In Days:</span>
                            <div className="days">
                                {
                                    courseData.lessonsDuringWeek.map((day, i) => (
                                        <div className="day" key={i}>{day}</div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="students">
                            <span className="label">Students:</span>
                            <div className="studentsNames">
                                {
                                    students.length > 0 ?
                                        students.map((student, i) => (
                                            <div className="student" key={i}>{student.student.name}</div>
                                        )) :
                                        <span className="student">No Students in this Course !</span>
                                }
                            </div>
                        </div>
                        <div className="dates">
                            <div className="beginningDate">
                                <span className="label">Beginning Date: </span>
                                <span> {courseData.beginningDate.substr(0, 10)}</span>
                            </div>
                            <div className="endingDate">
                                <span className="label">Ending Date: </span>
                                <span> {courseData.endingDate.substr(0, 10)}</span>
                            </div>
                        </div>

                        {
                            userData.courses ?
                                <div className="course-student">
                                    I'm a Student
                            </div>
                                :
                                <div className="course-professor">
                                    <div className="addStudent">
                                        <button onClick={addStudent}>Add Student to this Course</button>
                                    </div>
                                </div>
                        }
                    </div> :
                    <Spinner />
            }
        </div>
    )
}

export default CoursePage;