import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index';

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);  // POST /user/signin
        dispatch({ type: AUTH, data });
        navigate("/");
    } catch (error) {
        console.error(error);
    }
};

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);  // POST /user/signup
        dispatch({ type: AUTH, data });
        navigate("/");
    } catch (error) {
        console.error(error);
    }
};
