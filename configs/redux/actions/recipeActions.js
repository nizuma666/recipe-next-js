import axios from "axios";

const itemsPerPage = 6;
export const getRecipe = (page) => async (dispatch) => {
  dispatch({ type: "GET_RECIPE_REQUEST" });
  try {
    const recipes = await axios(
      `${process.env.NEXT_PUBLIC_BASE_URL}/recipes?page=${page}&limit=${itemsPerPage}`
    );
    const result = recipes.data.data;
    dispatch({ type: "GET_RECIPES_SUCCESS", payload: result });
  } catch (err) {
    dispatch({
      type: "GET_RECIPES_FAILURE",
      payload: err.response.data.message,
    });
    console.error(err);
  }
};
export const getDetailRecipe = (id) => async (dispatch) => {
  dispatch({ type: "GET_DETAIL_RECIPE_REQUEST" });
  try {
    const recipes = await axios(
      `${process.env.NEXT_PUBLIC_BASE_URL}/recipes/${id}`
    );
    const result = recipes.data.data;
    dispatch({ type: "GET_DETAIL_RECIPE_SUCCESS", payload: result });
  } catch (err) {
    dispatch({
      type: "GET_DETAIL_RECIPE_FAILURE",
      payload: err.response.data.message,
    });
    console.error(err);
  }
};
export const getMyRecipe = (token) => async (dispatch) => {
  dispatch({ type: "GET_MY_RECIPE_REQUEST" });
  try {
    const recipes = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/recipes/self`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = recipes.data.data;
    dispatch({ type: "GET_MY_RECIPE_SUCCESS", payload: result });
  } catch (err) {
    dispatch({
      type: "GET_MY_RECIPE_FAILURE",
      payload: err.response.data.message,
    });
    console.error(err);
  }
};
export const addRecipe = (data, token) => async (dispatch) => {
  dispatch({ type: "POST_NEW_RECIPE_REQUEST" });
  try {
    const recipe = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/recipes`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = recipe.data.data;
    dispatch({ type: "POST_NEW_RECIPE_SUCCESS", payload: result });
  } catch (error) {
    dispatch({
      type: "POST_NEW_RECIPE_FAILURE",
      payload: error,
    });
  }
};
