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
        const res = await Axios.post(developmentDB + "/professors/add-student", { token, student: newStudent }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(res.data)
    } catch (err) {
        console.log(err);
    }
}