import Axios from 'axios';

const developmentDB = process.env.REACT_APP_DB;

export const studentloginToDB = async (email, password) => {
    try {
        const res = await Axios.post(developmentDB + "/students/login", { email, password });

        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const studentlogoutFromDB = async (token) => {
    try {
        const res = await Axios.post(developmentDB + "/students/logout", { token }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data
    } catch (err) {
        console.log(err);
    }
}

export const studentChangePassword = async (token, newPassword) => {
    try {
        const res = await Axios.patch(developmentDB + "/students/changePassword", { token, password: newPassword }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const getMyCoursesFromDB = async (token) => {
    try {
        const res = await Axios.get(developmentDB + "/students/my-courses", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data
    } catch (err) {
        console.log(err);
    }
}

export const updateMyAppearnces = async (token, lesson, reason) => {
    try {
        const res = await Axios.post(developmentDB + "/students/update-appearences", { lesson, reason }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data
    } catch (err) {
        return err
    }
}