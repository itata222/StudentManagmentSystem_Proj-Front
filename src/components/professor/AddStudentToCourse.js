import React, { useContext, useEffect, useState } from 'react';
import { CoursesContext } from '../../contexts/coursesContext';
import { getCoursesFromCookie } from '../../cookies/cookies';
import { addStudentToCourseFunc, getAllStudentsFromDB } from '../../services/professorService';
import { LoginContext } from '../../contexts/loginContext';
import Search from './Search';
import ModalComponent from '../main/Modal';
import Spinner from '../main/Spinner';


const AddStudentToCourse = () => {

    const { coursesData } = useContext(CoursesContext);
    const { userData } = useContext(LoginContext);
    const coursesFromCookie = getCoursesFromCookie();
    const courses = coursesData.courses || coursesFromCookie;
    const [showModal, setShowModal] = useState(false);
    const [students, setStudents] = useState([]);
    const [usersToDisplay, setUsersToDisplay] = useState([]);
    const [coursesToDisplay, setCoursesToDisplay] = useState([...courses]);
    const [selectedStudent, setSelectedStudent] = useState({});
    const [selectedCourse, setSelectedCourse] = useState({});
    const [isSelectsDone, setIsSelectsDone] = useState(false);
    const [studentAdded, setStudentAdded] = useState(false);
    const [modalText, setModalText] = useState("");

    useEffect(() => {
        let isComponentExist = true
        getAllStudentsFromDB(userData.token).then((response) => {
            if (isComponentExist) {
                setUsersToDisplay([...response]);
                setStudents([...response])
            }
        })
        return () => {
            isComponentExist = false
        };
    }, [userData.token]);

    const selectStudentOnClick = (index) => {
        setSelectedStudent(usersToDisplay[index])
        if (selectedCourse.title)
            setIsSelectsDone(true);
    }

    const selectCourseOnClick = (index) => {
        setSelectedCourse(coursesToDisplay[index])
        if (selectedStudent.name)
            setIsSelectsDone(true)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setStudentAdded(true)
        const studentID = selectedStudent._id;
        const courseID = selectedCourse._id;
        addStudentToCourseFunc(userData.token, studentID, courseID).then((response) => {
            setStudentAdded(false)
            if (response.name)
                setModalText(`${selectedStudent.name} was Added Successfully to ${selectedCourse.title}`);
            else
                setModalText(response.message)
            setShowModal(true)

        }).catch((err) => {
            setStudentAdded(false)
        })
    }


    const searchUsers = (searchValue) => {
        const users = [...students];
        setUsersToDisplay(searchValue === "" ?
            users :
            users.filter((user) => user.name.toLowerCase().includes(searchValue)));
    };

    const searchCourses = (searchValue) => {
        setCoursesToDisplay(searchValue === "" ?
            courses :
            courses.filter((course) => course.title.toLowerCase().includes(searchValue)));
    };

    return (
        <div className="addStudentToCourse">
            {studentAdded && <Spinner />}
            { showModal && <ModalComponent setShowModal={setShowModal} text={modalText} />}
            <h1>Add Student To A Course</h1>
            <div className="addStudentToCourse-studentsSection">
                <h2>Choose a Student</h2>
                <Search search={searchUsers} placeholder="Student Name" />
                <div className="addStudentToCourse-students">
                    {
                        usersToDisplay.map((student, i) => (
                            <div className="addStudentToCourse-student" key={i} onClick={() => selectStudentOnClick(i)}>
                                <span>{student.name}</span>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="addStudentToCourse-divider"></div>

            <div className="addStudentToCourse-coursesSection">
                <h2>Choose a Course</h2>
                <Search search={searchCourses} placeholder="Course Title" />
                <div className="addStudentToCourse-courses">
                    {
                        coursesToDisplay.map((course, i) => (
                            <div className="addStudentToCourse-course" key={i} onClick={() => selectCourseOnClick(i)}>
                                <span>{course.title}</span>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="addStudentToCourse-divider2"></div>

            <form className="addStudentToCourse-form" onSubmit={onSubmit}>
                <div className="addingDescription">
                    Add <span>{selectedStudent.name || "_______"} </span>
                    To <span>{selectedCourse.title || "_______"}</span> Course !
                </div>
                <button disabled={!isSelectsDone}>
                    Add !
                </button>
            </form>

        </div >
    )
}

export default AddStudentToCourse;