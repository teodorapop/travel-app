import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from "@react-oauth/google";

import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {
    const user = JSON.parse(localStorage.getItem("profile"));

    return (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_PUBLIC_GOOGLE_API_TOKEN}>
            <BrowserRouter>
                <div className='p-4'>
                    <Navbar />
                    <Routes>
                        <Route path='/' element={<Navigate to='/posts' replace />} />
                        <Route path='/posts' element={<Home />} />
                        <Route path='/posts/search' element={<Home />} />
                        <Route path='/posts/:id' element={<PostDetails />} />
                        <Route
                            path='/auth'
                            element={!user ? <Auth /> : <Navigate to='/posts' replace />}
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </GoogleOAuthProvider>
    );
};

export default App;
