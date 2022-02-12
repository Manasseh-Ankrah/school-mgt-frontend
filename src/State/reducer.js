export const initialState = {
  adminToken: "",
  admin: {},
  studentState: [],
  staff: [],
  courseState: [],
  events: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_CURRENT_ADMIN":
      return {
        ...state,
        adminToken: action.item.adminToken,
        admin: action.item.admin,
      };
    case "GET_STUDENT_DATA":
      return {
        ...state,
        studentState: action.item.studentState,
      };
    case "GET_STAFF_DATA":
      return {
        ...state,
        staff: action.item.staff,
      };
    case "GET_COURSE_DATA":
      return {
        ...state,
        courseState: action.item.courseState,
      };
    case "GET_EVENT_DATA":
      return {
        ...state,
        events: action.item.events,
      };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
