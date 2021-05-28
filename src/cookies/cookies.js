import Cookies from 'js-cookie';

const USER_DATA = "user-data";
const COURSES_DATA = "courses-data"

export const saveUserOnCookie = (userData) => {
    const jsonUserData = JSON.stringify(userData);
    Cookies.set(USER_DATA, jsonUserData, { expires: 1 / 24, sameSite: "strict", secure: true });
};

export const saveCoursesOnCookie = (courses) => {
    try {
        const jsonCoursesData = JSON.stringify(courses);
        Cookies.set(COURSES_DATA, jsonCoursesData, { expires: 1 / 24, sameSite: "strict", secure: true });
    } catch (e) {
        console.log(e)
    }
}

export const deleteUserFromCookie = () => {
    Cookies.remove(USER_DATA, { secure: true, sameSite: "strict" });
};

export const deleteCoursesFromCookie = () => {
    Cookies.remove(COURSES_DATA, { secure: true, sameSite: "strict" });
};

export const getCoursesFromCookie = () => {
    try {
        const jsonCookiesData = Cookies.get(COURSES_DATA);
        if (jsonCookiesData === undefined || !jsonCookiesData) return null;

        return JSON.parse(jsonCookiesData);
    } catch (err) {
        return undefined;
    }
};

export const getUserFromCookie = () => {
    try {
        const jsonUserData = Cookies.get(USER_DATA);
        if (jsonUserData === undefined || !jsonUserData) return null;

        return JSON.parse(jsonUserData);
    } catch (err) {
        return undefined;
    }
};