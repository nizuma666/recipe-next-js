const initialState = {
  user: {},
  loadingUser: false,
  errorUser: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PROFILE_PROCESS":
      return {
        ...state,
        loadingUser: true,
        errorUser: null,
      };
    case "GET_PROFILE_SUCCESS":
      return {
        ...state,
        loadingUser: false,
        user: action.payload,
        errorUser: null,
      };
    case "GET_PROFILE_FAILURE":
      return {
        ...state,
        loadingUser: false,
        errorUser: action.payload,
      };
    default:
      return state;
  }
};
export default profileReducer
