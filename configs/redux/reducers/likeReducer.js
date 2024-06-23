// const initialState = {
//     likeRecipes: [],
//     loading: false,
//     error: null,
//   };

//   const likeReducer = (state = initialState, action) => {
//     switch (action.payload) {
//       case "GET_LIKE_RECIPE_PROCESS":
//       case "POST_LIKE_RECIPE_PROCESS":
//       case "DELETE_LIKE_RECIPE_PROCESS":
//         return {
//           ...state,
//           loading: true,
//           error: null,
//         };
//       case "GET_LIKE_RECIPE_SUCCESS":
//       case "POST_LIKE_RECIPE_SUCCESS":
//       case "DELETE_LIKE_RECIPE_SUCCESS":
//         console.log('Payload: ', action.payload);
//         return {
//           ...state,
//           loading: false,
//           likeRecipes: action.payload,
//           error: null,
//         };
//       case "GET_LIKE_RECIPE_FAILURE":
//       case "POST_LIKE_RECIPE_FAILURE":
//       case "DELETE_LIKE_RECIPE_FAILURE":
//         return {
//           ...state,
//           loading: false,
//           error: action.payload,
//         };
//       default:
//         return state;
//     }
//   };
// //   export const likeRecipeState = state => state.likeRecipe;
//   export default likeReducer;
import {
  LIKE_RECIPE_REQUEST,
  LIKE_RECIPE_SUCCESS,
  LIKE_RECIPE_FAILURE,
  SAVE_RECIPE_REQUEST,
  SAVE_RECIPE_SUCCESS,
  SAVE_RECIPE_FAILURE,
  FETCH_LIKED_RECIPES_REQUEST,
  FETCH_LIKED_RECIPES_SUCCESS,
  FETCH_LIKED_RECIPES_FAILURE,
  FETCH_SAVED_RECIPES_REQUEST,
  FETCH_SAVED_RECIPES_SUCCESS,
  FETCH_SAVED_RECIPES_FAILURE,
} from "../actions/likeActions";

const initialState = {
  likedRecipes: [], // ID resep yang sudah dilike
  savedRecipes: [], // ID resep yang sudah disimpan
  loading: false,
  error: null,
};

const likeReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIKE_RECIPE_REQUEST:
    case SAVE_RECIPE_REQUEST:
    case FETCH_LIKED_RECIPES_REQUEST:
    case FETCH_SAVED_RECIPES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LIKE_RECIPE_SUCCESS:
      return {
        ...state,
        likedRecipes: [...state.likedRecipes, action.payload.id],
        loading: false,
        error: null,
      };
    case SAVE_RECIPE_SUCCESS:
      return {
        ...state,
        savedRecipes: [...state.savedRecipes, action.payload.id],
        loading: false,
        error: null,
      };
    case FETCH_LIKED_RECIPES_SUCCESS:
      return {
        ...state,
        likedRecipes: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_SAVED_RECIPES_SUCCESS:
      return {
        ...state,
        savedRecipes: action.payload,
        loading: false,
        error: null,
      };
    case LIKE_RECIPE_FAILURE:
    case SAVE_RECIPE_FAILURE:
    case FETCH_LIKED_RECIPES_FAILURE:
    case FETCH_SAVED_RECIPES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default likeReducer;
