import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getPosts } from '../actions/postsActions';

const Paginate = ({ page }) => {
    const { numberOfPages } = useSelector((state) => state.posts);
    const dispatch = useDispatch();

    useEffect(() => {
        if (page) dispatch(getPosts(page));
    }, [page]);

    const currentPage = Number(page) || 1;

    const generatePages = () => {
        let pages = [];
        for (let i = 1; i <= numberOfPages; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className="flex justify-center mt-6 space-x-2">
            {generatePages().map((p) => (
                <Link
                    key={p}
                    to={`/posts?page=${p}`}
                    className={`px-4 py-2 border rounded ${
                        p === currentPage
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                    }`}
                >
                    {p}
                </Link>
            ))}
        </div>
    );
};

export default Paginate;
