import Axios from 'axios';

const developmentDB = process.env.REACT_APP_DB;

export const getCourseData = async (token, title) => {
    try {
        const res = await Axios.get(developmentDB + "/course?title=" + title, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};