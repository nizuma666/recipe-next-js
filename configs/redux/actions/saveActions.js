import axios from "axios";
import { GetTokenFromLocalStorage } from "../../../services/GetToken";

const token = GetTokenFromLocalStorage();
export const saveRecipe = (recipe) => async (dispatch) => {
  dispatch({ type: "GET_SAVE_RECIPE_PROCESS" });
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/recipes/save`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: "GET_SAVE_RECIPE_SUCCESS" });
    const existSave = res.data.data.find((r) => r.recipe_id === recipe.id);
    if (existSave) {
      dispatch({ type: "DELETE_SAVE_RECIPE_PROCESS" });
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/recipes/save/${existSave.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: "DELETE_SAVE_RECIPE_SUCCESS" });
      alert("Delete Save Recipe Success")
    } else {
      dispatch({ type: "POST_SAVE_RECIPE_PROCESS" });
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/recipes/save`,
        { recipe_id: recipe.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: "POST_SAVE_RECIPE_SUCCESS" });
      alert("Save Recipe Success")
    }
  } catch (error) {
    dispatch({
      type: "GET_SAVE_RECIPE_FAILURE",
      payload: error.response.data.message,
    });
  }
};

