
import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes';

// export default (state = [], action) => { // you can rename the state to posts
//     // if(action.type === 'CREATE') {
//     //     return something;
//     // }


const postsReducer = (posts = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...posts, action.payload];
        case UPDATE:
        case 'LIKE':
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
        case DELETE:
            return posts.filter((post) => post._id !== action.payload);

        default:
            return posts;
    }
};

export default postsReducer;
