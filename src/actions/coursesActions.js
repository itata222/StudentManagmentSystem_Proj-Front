export const getAllCourses = (courses) => ({
    type: 'GET_ALL_COURSES',
    courses
})

export const addCourse = ({ course }) => ({
    type: 'ADD_COURSE',
    course
})
