import Axios from 'axios';

const developmentDB = process.env.REACT_APP_DB;

export const professorloginToDB = async (email, password) => {
    try {
        const res = await Axios.post(developmentDB + "/professors/login", { email, password });

        return res;
    } catch (err) {
        return err.response.data.message;
    }
};

export const professorlogoutFromDB = async (token) => {
    try {
        const res = await Axios.post(developmentDB + "/professors/logout", { token }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data
    } catch (err) {
        console.log(err);
    }
}

export const professorChangePassword = async (token, newPassword) => {
    try {
        const res = await Axios.patch(developmentDB + "/professors/changePassword", { token, password: newPassword }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(res.data)

        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const getAllCoursesFromDB = async (token) => {
    try {
        const res = await Axios.get(developmentDB + "/professors/all-courses", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data
    } catch (err) {
        console.log(err);
    }
}

export const getAllStudentsFromDB = async (token) => {
    try {
        const res = await Axios.get(developmentDB + "/professors/all-students", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data
    } catch (err) {
        console.log(err);
    }
}

export const addCourseToDB = async (token, newCourse) => {
    try {
        const res = await Axios.post(developmentDB + "/professors/add-course", { token, course: newCourse }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(res.data)
        return res.data
    } catch (err) {
        console.log(err);
    }
}

export const addStudentToDB = async (token, newStudent) => {
    try {
        const res = await Axios.post(developmentDB + "/professors/add-student", { user: newStudent }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data
    } catch (err) {
        return err
    }
}

export const addStudentToCourseFunc = async (token, studentID, courseID) => {
    try {
        const res = await Axios.post(developmentDB + "/professors/add-studentToCourse", { studentID, courseID }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data
    } catch (err) {
        return err
    }
}

export const getStudentsOfSpecificCourse = async (token, course) => {
    try {
        const res = await Axios.post(developmentDB + "/professors/get-courseStudents", { course }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data
    } catch (e) {
        return e
    }
}

export const addLessonToCourse = async (token, lesson, courseID) => {
    try {
        const res = await Axios.post(developmentDB + "/professors/add-lessonToCourse?courseID=" + courseID, { lesson }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (res.data)
            return res.data
        else
            throw res
    } catch (e) {
        return e
    }
}

export const getCourseDataById = async (token, courseID) => {
    try {
        const res = await Axios.get(developmentDB + "/professors/getCourseData?courseID=" + courseID, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data
    } catch (e) {
        return e
    }
}

export const getStudentMissedAppearences = async (token, studentID, courseID) => {
    try {
        const res = await Axios.get(developmentDB + "/professors/getStudentAppearences?courseID=" + courseID + "&studentID=" + studentID, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data
    } catch (e) {
        return e
    }
}