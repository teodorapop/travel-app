import React from 'react';
import { useSelector } from 'react-redux';
import Post from './Post/Post';

const Posts = ({setCurrentId}) => {

    const posts = useSelector((state) => state.posts);
    console.log(posts);

    return (
        !posts.length ? (
            <div className="text-center py-10">
                <h1 className="text-2xl font-semibold text-gray-500">No posts :(</h1>
            </div>
        ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-6 p-4">
                {posts.map((post) => (
                    <div key={post._id}>
                        <Post post={post} setCurrentId={setCurrentId}/>
                    </div>
                ))}
            </div>
        )
    );
}

export default Posts;