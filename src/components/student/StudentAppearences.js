import React, { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../../contexts/loginContext';
import { getMyCoursesFromDB, updateMyAppearnces } from '../../services/studentService'
import ModalComponent from '../main/Modal';
import Spinner from '../main/Spinner';

const StudentAppearences = () => {
    const { userData } = useContext(LoginContext);
    const [myCourses, setMyCourses] = useState([]);
    const [reason, setReason] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [textError, setTextError] = useState("");
    const [isPageLoaded, setIsPageLoaded] = useState(false);

    useEffect(() => {
        let isComponentExist = true
        getMyCoursesFromDB(userData.token).then((response) => {
            if (isComponentExist) {
                setMyCourses(response.courses)
                setIsPageLoaded(true)
            }
        })
        return () => {
            isComponentExist = false
        }
    }, [userData.token])

    const reasonBlur = (e) => {
        const theReason = e.target.value.trim()
        setReason(theReason)
    }

    const studentSubmited = (lesson) => {
        updateMyAppearnces(userData.token, lesson, reason).then((response) => {
            console.log(response.response)
            if (response.response.data.message) {
                setTextError(response.response.data.message)
                setShowModal(true)
            }
            else {
                setTextError('Updated Succesfully !')
                setShowModal(true)
            }

        }).catch((e) => {
            console.log(e)
        })
    }

    return (
        <div className="studentAppearences">
            {showModal && <ModalComponent setShowModal={setShowModal} text={textError} />}

            {isPageLoaded ?
                <div className="studentAppearences-courses">
                    <h1>{userData.user.name.toUpperCase()},If you missed a lesson for some reason, Please Update It</h1>
                    {
                        myCourses.map((courseObj, i) => (
                            <div key={i} className="studentAppearences-course">
                                <h3>{courseObj.course.title}</h3>
                                <div className="studentAppearences-courseLessons">
                                    {
                                        courseObj.course.lessons.length > 0 ?
                                            courseObj.course.lessons.map((lesson, i) => (
                                                <div key={i} className="studentAppearences-lesson">
                                                    <div className="studentAppearences-lessonTitle">
                                                        <span>Title: {lesson.lesson.title}</span>
                                                        <span>Date: {lesson.lesson.date.substr(0, 10)}</span>
                                                    </div>
                                                    <div className="studentAppearences-notAppeared">
                                                        <form className="studentAppearences-notAppearedForm" onSubmit={(e) => {
                                                            e.preventDefault();
                                                            studentSubmited(lesson.lesson, courseObj.course)
                                                        }}>
                                                            <input type="text" placeholder="reason..." onBlur={reasonBlur} />
                                                            <button>Save</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            )) :
                                            <div>No Lessons in this course</div>
                                    }
                                </div>
                            </div>
                        ))


                    }
                </div>
                :
                <Spinner />
            }
        </div>
    )
}

export default StudentAppearences;