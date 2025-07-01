import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

const PostDetails = ({ postId, onClose }) => {
    const post = useSelector((state) =>
        state.posts.posts.find((p) => p._id === postId)
    );

    if (!post) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                >
                    ×
                </button>
                <img src={post.selectedFile} alt={post.title} className="w-full h-60 object-cover rounded" />
                <h2 className="text-2xl font-bold mt-4">{post.title}</h2>
                <p className="text-gray-500 text-sm mb-2">{moment(post.createdAt).fromNow()}</p>
                <p className="text-gray-700">{post.message}</p>
                <div className="mt-4 text-sm text-blue-600">
                    {post.tags.map((tag) => `#${tag} `)}
                </div>
            </div>
        </div>
    );
};

export default PostDetails;
