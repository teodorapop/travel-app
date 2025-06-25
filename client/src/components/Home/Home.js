import React, {useEffect, useState} from 'react';
import Posts from "../Posts/Posts";
import {useDispatch, useSelector} from "react-redux";
import {getPosts} from "../../actions/postsActions";
import Form from "../Form/Form";

const Home = () => {

    const [currentId, setCurrentId] = useState(null);

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth?.user);

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch, user]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">

            <div className="md:col-span-3">
                <Posts setCurrentId={setCurrentId} />
            </div>

            <div className="md:col-span-1">
                <Form currentId={currentId} setCurrentId={setCurrentId} />
            </div>
        </div>
    )
}

export default Home;