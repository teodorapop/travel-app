import React from 'react';
import { useSelector } from 'react-redux';
import Post from './Post/Post';

const Posts = ({ setCurrentId }) => {
    const {posts, isLoading} = useSelector((state) => state.posts);
    const user = JSON.parse(localStorage.getItem('profile'));

    // filter
    const userId = user?.result?.sub || user?.result?._id;

    const visiblePosts = !user
        ? (posts || []).filter(post => post.isPublic === 'public')
        : (posts || []).filter(post =>
            post.isPublic === 'public' || post.creator === userId
        );

    if (isLoading) {
        return (
            <div className="text-center py-10">
                <h2 className="text-xl text-gray-500 animate-pulse">Loading posts...</h2>
            </div>
        );
    }

    if (!visiblePosts.length) {
        return (
            <div className="text-center py-10">
                <h1 className="text-2xl font-semibold text-gray-500">No posts :(</h1>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-6 p-4">
            {visiblePosts.map((post) => (
                <div key={post._id}>
                    <Post post={post} setCurrentId={setCurrentId} />
                </div>
            ))}
        </div>
    );
}

export default Posts;
