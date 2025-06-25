import React from 'react';
import moment from 'moment';
import { MoreHorizontal, ThumbsUp, Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";

import { deletePost, likePost } from '../../../actions/postsActions';

const Post = ({ post, setCurrentId }) => {

    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    const Likes = () => {
        if (post.likes.length > 0) {
            const isLikedByUser = post.likes.includes(
                user?.result?.googleId || user?.result?._id
            );

            if (isLikedByUser) {
                return (
                    <span className="inline-flex items-center text-blue-600 text-sm font-medium space-x-1">
          <FaThumbsUp className="w-4 h-4" />
          <span>
            {post.likes.length > 2
                ? `You and ${post.likes.length - 1} liked this`
                : `You liked this`}
          </span>
        </span>
                );
            } else {
                return (
                    <span className="inline-flex items-center text-gray-600 text-sm font-medium space-x-1">
          <FaRegThumbsUp className="w-4 h-4" />
          <span>
            {post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
          </span>
        </span>
                );
            }
        }

        return (
            <span className="inline-flex items-center text-gray-400 text-sm font-medium space-x-1">
      <FaRegThumbsUp className="w-4 h-4" />
      <span>Like</span>
    </span>
        );
    }

    return (
        <div className="bg-white shadow-md rounded-xl overflow-hidden">

            <div className="relative w-full">
                <img
                    src={post.selectedFile}
                    alt={post.title}
                    className="w-full h-60 object-cover"
                />

                <div className="absolute top-2 left-2  text-white px-2 py-1 text-xs">
                    <p className="font-semibold">{post.name}</p>
                    <p>{moment(post.createdAt).fromNow()}</p>
                </div>


                {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
                    <button
                        onClick={() => setCurrentId(post._id)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 bg-white/70 rounded-full p-1"
                    >
                        <MoreHorizontal size={18} />
                    </button>
                )}

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
                        // no login => no like
                        disabled={!user?.result}
                        onClick={() => dispatch(likePost(post._id))}
                        className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                    >
                        <Likes />
                    </button>
                    {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
                        <button
                            onClick={() => dispatch(deletePost(post._id))}
                            className="text-sm text-red-500 hover:text-red-700 flex items-center"
                        >
                            <Trash2 size={16} className="mr-1" />
                            Delete
                        </button>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Post;
