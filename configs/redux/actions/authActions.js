import { setCookie } from "cookies-next";
import axios from "../../../services/axiosConfig";

export const login = (data) => async (dispatch) => {
  dispatch({ type: "LOGIN_PROCESS" });
  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
      data
    );
    const user = result.data.data;
    console.log(user);
    setCookie('token', user.token);
    setCookie('refreshToken', user.refreshToken);
    // localStorage.setItem("token", user.token);
    // localStorage.setItem("refreshToken", user.refreshToken);
    dispatch({ type: "LOGIN_SUCCESS", payload: user });
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error.response });
  }
};

export const register = (data) => async (dispatch) => {
  dispatch({ type: "REGISTER_PROCESS" });
  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`,
      data
    );
    const user = result.data.data;
    console.log(user);
    dispatch({ type: "REGISTER_SUCCESS", payload: user });
  } catch (error) {
    dispatch({
      type: "REGISTER_FAILURE",
      payload: error.response.data.message,
    });
  }
};
