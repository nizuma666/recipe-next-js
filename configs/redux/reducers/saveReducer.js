const initialState = {
  saveRecipes: [],
  loading: false,
  error: null,
};

const saveReducer = (state = initialState, action) => {
  switch (action.payload) {
    case "GET_SAVE_RECIPE_PROCESS":
    case "POST_SAVE_RECIPE_PROCESS":
    case "DELETE_SAVE_RECIPE_PROCESS":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "GET_SAVE_RECIPE_SUCCESS":
    case "POST_SAVE_RECIPE_SUCCESS":
    case "DELETE_SAVE_RECIPE_SUCCESS":
      return {
        ...state,
        loading: false,
        saveRecipes: action.payload,
        error: null,
      };
    case "GET_SAVE_RECIPE_FAILURE":
    case "POST_SAVE_RECIPE_FAILURE":
    case "DELETE_SAVE_RECIPE_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
// export const saveRecipeState = state => state.saveRecipe;
export default saveReducer;
