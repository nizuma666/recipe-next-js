import axios from "axios";
import { GetTokenFromLocalStorage } from "../../../services/GetToken";

const token = GetTokenFromLocalStorage();
export const getSaveRecipe = () => async (dispatch) => {
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
      const result = res.data.data
      console.log("data save: ",result);
      dispatch({ type: "GET_SAVE_RECIPE_SUCCESS", payload: result});
    } catch (error) {
      dispatch({type: "GET_SAVE_FAILURE", payload: error})
    }
  };