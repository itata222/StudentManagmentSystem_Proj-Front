import React from 'react';
import { useHistory } from 'react-router';

const StudentsManagment = () => {

    const history = useHistory();

    const addExistingStudent = (e) => {
        e.preventDefault();
        history.push('/professors/addStudentToCourse');
    }

    const addNewStudent = (e) => {
        e.preventDefault();
        history.push('/professors/addStudentToSystem');
    }

    return (
        <div className="StudentsManagment">
            <button onClick={addExistingStudent}>Add Existing Student To A Course</button>
            <button onClick={addNewStudent}>Add a Student To The System</button>
        </div>
    )
}

export default StudentsManagment;