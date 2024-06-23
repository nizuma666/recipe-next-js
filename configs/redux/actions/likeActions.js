// import axios from "axios";
// import { GetTokenFromLocalStorage } from "../../../services/GetToken";

// const token = GetTokenFromLocalStorage();
// export const likeRecipe = (recipe) => async (dispatch) => {
//   dispatch({ type: "GET_LIKE_RECIPE_PROCESS" });
//   try {
//     const res = await axios.get(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/recipes/like`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     dispatch({ type: "GET_LIKE_RECIPE_SUCCESS" });
//     const existLike = res.data.data.find((r) => r.recipe_id === recipe.id);
//     if (existLike) {
//       dispatch({ type: "DELETE_LIKE_RECIPE_PROCESS" });
//       await axios.delete(
//         `${process.env.NEXT_PUBLIC_BASE_URL}/recipes/like/${existLike.id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       dispatch({ type: "DELETE_LIKE_RECIPE_SUCCESS" });
//       alert("Delete Like Recipe Success");
//     } else {
//       dispatch({ type: "POST_LIKE_RECIPE_PROCESS" });
//       await axios.post(
//         `${process.env.NEXT_PUBLIC_BASE_URL}/recipes/like`,
//         { recipe_id: recipe.id },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       dispatch({ type: "POST_LIKE_RECIPE_SUCCESS" });
//       alert("Thank you for liking this recipe");
//     }
//   } catch (error) {
//     dispatch({
//       type: "GET_LIKE_RECIPE_FAILURE",
//       payload: error.response.data.message,
//     });
//   }
// };
// export const getLikeRecipe = () => async (dispatch) => {
//   dispatch({ type: "GET_LIKE_RECIPE_PROCESS" });
//   try {
//     const res = await axios.get(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/recipes/like`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     const result = res.data.data;
//     console.log("data like: ", result);
//     dispatch({ type: "GET_LIKE_RECIPE_SUCCESS", payload: result });
//   } catch (error) {
//     dispatch({ type: "GET_LIKE_FAILURE", payload: error });
//   }
// };
import axios from 'axios';
export const FETCH_LIKED_RECIPES_REQUEST = 'FETCH_LIKED_RECIPES_REQUEST';
export const FETCH_LIKED_RECIPES_SUCCESS = 'FETCH_LIKED_RECIPES_SUCCESS';
export const FETCH_LIKED_RECIPES_FAILURE = 'FETCH_LIKED_RECIPES_FAILURE';

export const FETCH_SAVED_RECIPES_REQUEST = 'FETCH_SAVED_RECIPES_REQUEST';
export const FETCH_SAVED_RECIPES_SUCCESS = 'FETCH_SAVED_RECIPES_SUCCESS';
export const FETCH_SAVED_RECIPES_FAILURE = 'FETCH_SAVED_RECIPES_FAILURE';

export const LIKE_RECIPE_REQUEST = 'LIKE_RECIPE_REQUEST';
export const LIKE_RECIPE_SUCCESS = 'LIKE_RECIPE_SUCCESS';
export const LIKE_RECIPE_FAILURE = 'LIKE_RECIPE_FAILURE';

export const SAVE_RECIPE_REQUEST = 'SAVE_RECIPE_REQUEST';
export const SAVE_RECIPE_SUCCESS = 'SAVE_RECIPE_SUCCESS';
export const SAVE_RECIPE_FAILURE = 'SAVE_RECIPE_FAILURE';

const fetchLikedRecipesRequest = () => ({ type: FETCH_LIKED_RECIPES_REQUEST });
const fetchLikedRecipesSuccess = (recipes) => ({ type: FETCH_LIKED_RECIPES_SUCCESS, payload: recipes });
const fetchLikedRecipesFailure = (error) => ({ type: FETCH_LIKED_RECIPES_FAILURE, payload: error });

const fetchSavedRecipesRequest = () => ({ type: FETCH_SAVED_RECIPES_REQUEST });
const fetchSavedRecipesSuccess = (recipes) => ({ type: FETCH_SAVED_RECIPES_SUCCESS, payload: recipes });
const fetchSavedRecipesFailure = (error) => ({ type: FETCH_SAVED_RECIPES_FAILURE, payload: error });

const likeRecipeRequest = () => ({ type: LIKE_RECIPE_REQUEST });
const likeRecipeSuccess = (recipe) => ({ type: LIKE_RECIPE_SUCCESS, payload: recipe });
const likeRecipeFailure = (error) => ({ type: LIKE_RECIPE_FAILURE, payload: error });

const saveRecipeRequest = () => ({ type: SAVE_RECIPE_REQUEST });
const saveRecipeSuccess = (recipe) => ({ type: SAVE_RECIPE_SUCCESS, payload: recipe });
const saveRecipeFailure = (error) => ({ type: SAVE_RECIPE_FAILURE, payload: error });
export const likeRecipe = (recipeId, token) => async (dispatch) => {
  dispatch(likeRecipeRequest());
  try {
    console.log("token in redux", token);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/recipes/like`,
      { recipe_id: recipeId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(likeRecipeSuccess({ id: recipeId, ...response.data }));
  } catch (error) {
    dispatch(likeRecipeFailure(error.response.data));
  }
};

export const saveRecipe = (recipeId, token) => async (dispatch) => {
  dispatch(saveRecipeRequest());
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/recipes/save`,
      { recipe_id: recipeId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(saveRecipeSuccess({ id: recipeId, ...response.data }));
  } catch (error) {
    console.log(error.response.data);
    dispatch(saveRecipeFailure(error.response.data));
  }
};
export const fetchLikedRecipes = (token) => async (dispatch) => {
  dispatch(fetchLikedRecipesRequest());
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/recipes/like`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(fetchLikedRecipesSuccess(response.data.data));
  } catch (error) {
    dispatch(fetchLikedRecipesFailure(error.response.data));
  }
};

export const fetchSavedRecipes = (token) => async (dispatch) => {
  dispatch(fetchSavedRecipesRequest());
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/recipes/save`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(fetchSavedRecipesSuccess(response.data.data));
  } catch (error) {
    dispatch(fetchSavedRecipesFailure(error.response.data));
  }
};
