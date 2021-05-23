export const initialCoursesState = [];

const coursesReducer = (coursesState, action) => {
    switch (action.type) {
        case 'GET_ALL_COURSES':
            return { courses: [...action.courses] };
        case 'ADD_COURSE':
            return { course: action.course }
        default:
            return [...coursesState]
    }
}

export default coursesReducer