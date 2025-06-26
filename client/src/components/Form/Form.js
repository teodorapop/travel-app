import React, { useState, useEffect } from 'react';
// import FileBase from 'react-file-base64';
import { useDispatch } from "react-redux";
import { createPost, updatePost } from "../../actions/postsActions";

import { useSelector } from "react-redux";

// GET THE CURRENT ID

const Form = ({ currentId, setCurrentId}) => {

    const [postData, setPostData] = useState({
        // creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: '',
        isPublic: true,
    });

    // update post
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);

    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem("profile"));

    useEffect(() => {
        if(post) setPostData(post);
    }, [post])

    const handleSubmit = async(e) => {
        e.preventDefault();

        const newData = {
            ...postData,
            isPublic: postData.isPublic === "public",
            name: user?.result?.name,
        };

        if(!currentId){
            dispatch(createPost({...postData, name: user?.result?.name}));
            clear();
        } else {
            dispatch(updatePost(currentId, {...postData, name: user?.result?.name}));
            clear();
        }
    }

    if(!user?.result?.name){
        return(
            <div>
                <p>Please sign in to create your own memories and like other's memories.</p>
            </div>
        )
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({
            // creator: '',
            title: '',
            message: '',
            tags: '',
            selectedFile: '',
            isPublic: ''
        });
    };


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setPostData({ ...postData, selectedFile: reader.result });
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };


    return(
        <div className="max-w-xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
            <form autoComplete="off" noValidate onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800">{ currentId ? 'Editing' : 'Creating' } a Memory</h2>

                {/* Creator */}
                {/*<div>*/}
                {/*    <label className="block text-sm font-medium text-gray-700 mb-1">Creator</label>*/}
                {/*    <input*/}
                {/*        type="text"*/}
                {/*        name="creator"*/}
                {/*        value={postData.creator}*/}
                {/*        onChange={(e) => setPostData({ ...postData, creator: e.target.value })}*/}
                {/*        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"*/}
                {/*        placeholder="Enter your name"*/}
                {/*    />*/}
                {/*</div>*/}

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={postData.title}
                        onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Memory title"
                    />
                </div>

                {/* Message */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                        name="message"
                        value={postData.message}
                        onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                        rows={4}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Write your memory..."
                    />
                </div>

                {/*tags*/}

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                    <textarea
                        name="tags"
                        value={postData.tags}
                        onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="tags"
                    />
                </div>

                {/* Visibility Dropdown */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Visibility</label>
                    <select
                        name="visibility"
                        value={postData.isPublic}
                        onChange={(e) => setPostData({ ...postData, isPublic: e.target.value })}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select visibility</option>
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                    </select>
                </div>

                {/*<div>*/}
                {/*    <FileBase*/}
                {/*        type="file"*/}
                {/*        multiple={false}*/}
                {/*        onDone={({base64}) => setPostData({...postData, selectedFile: base64})}*/}
                {/*    />*/}
                {/*</div>*/}

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                    />
                </div>


                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
                >
                    Submit
                </button>

                <button
                    onClick={clear}
                    className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-200"
                >
                    Clear
                </button>


            </form>
        </div>
    )
}

export default Form;