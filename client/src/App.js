import React, { useState, useEffect } from 'react';
import logo from './assets/images/destination.png';
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import {getPosts} from './actions/postsActions';

import {useDispatch} from 'react-redux'; // dispatch an action

const App = () => {

    const [currentId, setCurrentId] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    return(
        <div className='p-4 '>
            <div className='flex items-center space-x-3 border-b border-gray-300 shadow-md p-4'>
                <img src={logo} alt='logo' className='h-10 w-auto' />
                <h1 className='text-xl text-gray-800'>Travel Memories</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                {/* Postările ocupă 3 coloane */}
                <div className="md:col-span-3">
                    <Posts setCurrentId={setCurrentId} />
                </div>

                {/* Formularul ocupă 1 coloană */}
                <div className="md:col-span-1">
                    <Form currentId={currentId} setCurrentId={setCurrentId} />
                </div>
            </div>

        </div>
    )
}

export default App;