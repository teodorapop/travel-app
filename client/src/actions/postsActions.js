import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes';

import * as api from '../api';

// action creators
export const getPosts = () => async(dispatch) => {
    try{
        const { data } = await api.fetchPosts(); // response from backend
        const action = { type: FETCH_ALL, payload: data};
        dispatch(action);

    } catch (error){
        console.log(error.message);
    }
}

export const createPost = (post) => async (dispatch) => {
    try{
        const { data} = await api.createPost(post);

        dispatch({ type: CREATE, payload: data });
    } catch(error){
        console.log(error.message);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try{
        const { data } = await api.updatePost(id, post);

        dispatch({ type: UPDATE, payload: data });
    } catch (error){
        console.log(error.message);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try{
        await api.deletePost(id);

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error.message);
    }
}

export const likePost = (id) => async (dispatch) => {
    try{
        const { data } = await api.likePost(id);
        dispatch({ type: UPDATE, payload: data });

    } catch(error){
        console.log(error.message);
    }
}