const initialState = {
  recipes: [],
  detailRecipe: {},
  myRecipe: [],
  addRecipe: {},
  modal: false,
  loading: false,
  error: null,
};

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_MY_RECIPE_REQUEST":
    case "GET_RECIPES_REQUEST":
    case "GET_DETAIL_RECIPE_REQUEST":
    case "POST_NEW_RECIPE_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "GET_RECIPES_SUCCESS":
      return {
        ...state,
        recipes: action.payload,
        loading: false,
      };
    case "GET_MY_RECIPE_SUCCESS":
      return {
        ...state,
        myRecipe: action.payload,
        loading: false,
      };
    case "GET_DETAIL_RECIPE_SUCCESS":
      return {
        ...state,
        detailRecipe: action.payload,
        loading: false,
      };
    case "POST_NEW_RECIPE_SUCCESS":
      return {
        ...state,
        addRecipe: action.payload,
        modal: true,
      };
    case "GET_MY_RECIPE_FAILURE":
    case "GET_RECIPES_FAILURE":
    case "GET_DETAIL_RECIPE_FAILURE":
    case "POST_NEW_RECIPE_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default recipeReducer;
