import React from 'react';
import moment from 'moment';
import { MoreHorizontal, ThumbsUp, Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';

import { deletePost, likePost } from '../../../actions/postsActions';

const Post = ({ post, setCurrentId }) => {

    const dispatch = useDispatch();

    return (
        <div className="bg-white shadow-md rounded-xl overflow-hidden">

            <div className="relative w-full">
                <img
                    src={post.selectedFile}
                    alt={post.title}
                    className="w-full h-60 object-cover"
                />

                {/* Autor + dată */}
                <div className="absolute top-2 left-2  text-white px-2 py-1 text-xs">
                    <p className="font-semibold">{post.creator}</p>
                    <p>{moment(post.createdAt).fromNow()}</p>
                </div>

                <button
                    onClick={() => setCurrentId(post._id)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 bg-white/70 rounded-full p-1"
                >
                    <MoreHorizontal size={18} />
                </button>
            </div>


            <div className="p-4">

                {/* Taguri */}
                <p className="text-sm text-blue-500 mb-2">
                    {post.tags.map((tag) => `#${tag} `)}
                </p>

                {/* Mesaj & titlu */}
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                    {post.title}
                </h2>
                <h5 className="text-sm text-gray-700 mb-4">
                    {post.message}
                </h5>

                {/* Butoane Like / Delete */}
                <div className="flex justify-between items-center">
                    <button
                        onClick={() => dispatch(likePost(post._id))}
                        className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                    >
                        <ThumbsUp size={16} className="mr-1" />
                        Like {post.likeCount}
                    </button>
                    <button
                        onClick={() => dispatch(deletePost(post._id))}
                        className="text-sm text-red-500 hover:text-red-700 flex items-center"
                    >
                        <Trash2 size={16} className="mr-1" />
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Post;
