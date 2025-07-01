import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index';

export const signin = (formData, navigate) => async(dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        dispatch({ type: AUTH, data });
        navigate("/");
        window.location.reload();
    } catch(error) {
        throw new Error(error.response?.data?.message || "Something went wrong");
    }
}

export const signup = (formData, navigate) => async(dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        dispatch({ type: AUTH, data });
        navigate("/");
        window.location.reload();
    } catch(error) {
        throw new Error(error.response?.data?.message || "Something went wrong");
    }
}
