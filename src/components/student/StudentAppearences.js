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
    const [attendedSelect, setAttendedSelect] = useState([]);
    const [showTextBoxesInIndexes, setShowTextBoxesInIndexes] = useState([]);

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
        const attended = attendedSelect[0] === "No" ? false : true
        updateMyAppearnces(userData.token, lesson, attended, reason).then((response) => {
            if (response.date) {
                setTextError('Updated Succesfully !')
                setShowModal(true)
            }
            else {
                setTextError(response.response.data.message)
                setShowModal(true)
            }

        }).catch((e) => {
            setTextError(e.message)
            setShowModal(true)
        })
    }

    const selectChange = (e, index) => {
        setAttendedSelect([e.target.value, index]);
        if (e.target.value === "No")
            setShowTextBoxesInIndexes([...showTextBoxesInIndexes, index])
    }

    return (
        <div className="studentAppearences">
            {showModal && <ModalComponent setShowModal={setShowModal} text={textError} />}

            {isPageLoaded ?
                <div className="studentAppearences-courses">
                    <h1>{userData.user.name.toUpperCase()}, Please Update Your Appearences, Chronology</h1>
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
                                                        <span className="secondSpan">Date: {lesson.lesson.date.substr(0, 10)}</span>
                                                    </div>
                                                    <div className="studentAppearences-notAppeared">
                                                        <form className="studentAppearences-notAppearedForm" onSubmit={(e) => {
                                                            e.preventDefault();
                                                            studentSubmited(lesson.lesson, i)
                                                        }}>
                                                            <div className="selectAttended">
                                                                <select id="attended" onChange={(e) => selectChange(e, i)} defaultValue="Choose">
                                                                    <option value="Yes">Yes</option>
                                                                    <option value="No" >No</option>
                                                                    <option value="Choose">Choose</option>
                                                                </select>
                                                            </div>
                                                            <div className="textandbutton">
                                                                {
                                                                    showTextBoxesInIndexes.map((currentIndex, is) => {
                                                                        if (currentIndex === i)
                                                                            return (
                                                                                < textarea key={is} className="textArea" placeholder="reason..." onBlur={reasonBlur} />
                                                                            )
                                                                        else
                                                                            return undefined
                                                                    })
                                                                }
                                                                <button>Save</button>
                                                            </div>
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