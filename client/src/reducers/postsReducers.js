
import {FETCH_ALL, CREATE, UPDATE, DELETE, FETCH_BY_SEARCH} from '../constants/actionTypes';

// export default (state = [], action) => { // you can rename the state to posts
//     // if(action.type === 'CREATE') {
//     //     return something;
//     // }

const initialState = {
    posts: [],
    currentPage: 1,
    numberOfPages: 1,
    isLoading: true,
};

const postsReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'START_LOADING':
            return { ...state, isLoading: true };
        case 'END_LOADING':
            return { ...state, isLoading: false };
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload };
        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] };
        case UPDATE:
        case 'LIKE':
            return {
                ...state,
                posts: state.posts.map((post) =>
                    post._id === action.payload._id ? action.payload : post
                ),
            };
        case DELETE:
            return {
                ...state,
                posts: state.posts.filter((post) => post._id !== action.payload),
            };
        default:
            return state;
    }
};


export default postsReducer;
