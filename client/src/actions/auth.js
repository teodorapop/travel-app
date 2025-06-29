import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index';

export const signin = (formData, navigate) => async(dispatch) => {

    try{
        //log in the user
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data });

        navigate("/");
        window.location.reload(); // refresh
    } catch(error){
        console.log(error);
    }
}

export const signup = (formData, navigate) => async(dispatch) => {

    try{
        //sign in the user
        const { data } = await api.signUp(formData);

        dispatch({ type: AUTH, data });

        navigate("/");
        window.location.reload(); // refresh
    } catch(error){
        console.log(error);
    }
}