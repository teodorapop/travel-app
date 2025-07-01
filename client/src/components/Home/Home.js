import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Pagination from "../Pagination";
import { getPosts, getPostBySearch } from "../../actions/postsActions";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const [search, setSearch] = useState('');
    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const query = useQuery();
    const page = parseInt(query.get('page')) || 1;
    const searchQuery = query.get('searchQuery');
    const user = useSelector((state) => state.auth?.user);

    useEffect(() => {
        dispatch(getPosts(page));
    }, [dispatch, page]);

    const searchPost = () => {
        if (search.trim() || tags.length > 0) {
            dispatch(getPostBySearch({ search, tags: tags.join(',') }));
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            navigate('/');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchPost();
        }
    };

    const handleAddTag = () => {
        if (tagInput && !tags.includes(tagInput)) {
            setTags([...tags, tagInput]);
            setTagInput('');
        }
    };

    const handleDeleteTag = (tagToDelete) => {
        setTags(tags.filter((tag) => tag !== tagToDelete));
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 p-4">
            <div className="md:col-span-3">
                <Posts setCurrentId={setCurrentId} />
            </div>

            <div className="md:col-span-1 space-y-4">
                <input
                    type="text"
                    placeholder="Search memories"
                    className="w-full px-3 py-2 border rounded-md"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleKeyPress}
                />

                <div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Add tag"
                            className="flex-1 px-3 py-2 border rounded-md"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                        />
                        <button
                            onClick={handleAddTag}
                            className="bg-gray-200 px-3 py-2 rounded hover:bg-gray-300"
                        >
                            Add
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center"
                            >
                {tag}
                                <button
                                    onClick={() => handleDeleteTag(tag)}
                                    className="ml-2 text-red-500 hover:text-red-700"
                                >
                  ×
                </button>
              </span>
                        ))}
                    </div>
                </div>

                <button
                    onClick={searchPost}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                    Search
                </button>

                <Form currentId={currentId} setCurrentId={setCurrentId} />
            </div>

            <div className="col-span-full mt-4">
                <Pagination page={page} />
            </div>
        </div>
    );
};

export default Home;
