import axios from "axios";

export const getProfile = (token) => async(dispatch) => {
    dispatch({type: "GET_PROFILE_PROCESS"})
    try{
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/users/profile`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        const result = response.data.data
        dispatch({type: "GET_PROFILE_SUCCESS", payload: result})
    }catch(error){
        dispatch({type: "GET_PROFILE_FAILURE", payload: error.response})
    }
}