import React, { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../../contexts/loginContext';
import { getCourseDataById, getStudentAppearences } from '../../services/professorService';

const ProfessorStudentAppearences = (props) => {

    const { userData } = useContext(LoginContext);
    const studentID = props.match.params.studentID;
    const studentName = props.location.state.studentName;
    const [studentAppearences, setStudentAppearences] = useState([]);
    const [courseLessons, setCourseLessons] = useState([]);
    const courseID = props.location.state.courseDataID;

    useEffect(() => {
        let isComponentExist = true;
        if (isComponentExist) {
            getStudentAppearences(userData.token, studentID, courseID).then((response) => {
                if (isComponentExist) {
                    setStudentAppearences(response)
                    console.log(response)
                }
            })
            getCourseDataById(userData.token, courseID).then((response) => {
                if (isComponentExist) {
                    setCourseLessons(response.lessons)
                }
            })
        }
        return () => {
            isComponentExist = false;
        };
    }, [userData.token, studentID, courseID]);



    return (
        <div className="professorStudentAppearences">
            <h1>{`${studentName} Appearences`}</h1>
            <div className="studentAppearencesContainer">
                <div className="courseLessons">
                    <h2>Date</h2>
                    {
                        courseLessons.map((lesson, i) => (
                            <div key={i} className="lessonDate">
                                {lesson.lesson.date.substr(0, 10)}
                            </div>
                        ))
                    }
                </div>
                <div className="studentAttended">
                    <h2>Attended</h2>
                    {
                        courseLessons.map((lesson, i) => (
                            <div key={i} className="lessonAttended">
                                {
                                    studentAppearences[i]?.lesson.substr(0, 10) === lesson.lesson.date.substr(0, 10) ?
                                        <div>{studentAppearences[i]?.attended === false ? "No" : "Yes"}</div> :
                                        <div>No</div>
                                }
                            </div>
                        ))
                    }
                </div>
                <div className="studentReasons">
                    <h2>Reasons</h2>
                    {
                        courseLessons.map((lesson, i) => (
                            <div key={i} className="lessonReason">
                                {
                                    studentAppearences[i]?.lesson.substr(0, 10) === lesson.lesson.date.substr(0, 10) ?
                                        <div>{studentAppearences[i]?.reason || "Attended!"}</div> :
                                        <div>{studentAppearences[i]?.reason || 'No Reason'}</div>
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}


export default ProfessorStudentAppearences;


// {
//     (!!studentAppearences[0] && studentAppearences[1] === i) && (
//         studentAppearences[0].length > 0 ?
//             <div className="student-expend">
//                 <div className="expend-header">Missings Lessons:</div>
//                 {

//                     studentAppearences.map((appearence, i) => {
//                         console.log(studentAppearences, appearence)
//                         if (!!appearence?.length) {
//                             return appearence.map((miss, j) => (
//                                 <div key={i + j} className="studentAppearence">
//                                     <span>{miss?.lesson}:</span>
//                                     <span>{miss?.reason}</span>
//                                 </div>
//                             ))
//                         }
//                         else
//                             return null
//                         // return appearence[0].map((miss) => (
//                         //     <div key={i} className="studentAppearence">
//                         //         <span>{miss?.lesson}:</span>
//                         //         <span>{miss?.reason}</span>
//                         //     </div>
//                         // ))
//                         // if (appearence[0]?.lesson)
//                         //     return (
//                         //         <div key={i} className="studentAppearence">
//                         //             <span>{appearence[0]?.lesson}:</span>
//                         //             <span>{appearence[0]?.reason}</span>
//                         //         </div>
//                         //     )
//                         // else
//                         //     return undefined
//                     })
//                 }
//             </div> :
//             <div className="studentAppearenceGood">Attended in all lessons</div>
//     )
// }