import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
})

// const url = 'http://localhost:5000/posts';
// const url = 'https://travelapp-backend-ifo6.onrender.com/posts';

export const fetchPosts = () => {
    return API.get('/posts');
}

export const createPost = (newPost) => {
    return API.post('/posts', newPost);
}

export const updatePost = (id, updatedPost) => {
    return API.patch(`/posts/${id}`, updatedPost);
}

export const deletePost = (id) => {
    return API.delete(`/posts/${id}`);
}

export const likePost = (id) => {
    return API.patch(`/posts/${id}/likePost`);
}

export const signIn = (formData) => {
    return API.post(`/user/signin`, formData);
}

export const signUp = (formData) => {
    return API.post(`/user/signup`, formData);
}