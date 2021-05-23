export const initialCourseState = {
    title: "",
    description: "",
    lessonsDuringWeek: [],
    students: [],
    beginningDate: "",
    endingDate: ""
};

const courseReducer = (courseData, action) => {
    switch (action.type) {
        case 'SET_COURSE':
            return { ...action.course }
        default:
            return { ...courseData };
    }
}

export default courseReducer;