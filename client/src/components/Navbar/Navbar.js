import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/destination.png";
import { useDispatch } from "react-redux";

const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("profile")));
    const dispatch = useDispatch();

    useEffect(() => {
        const token = user?.token;

        const handleStorageChange = () => {
            setUser(JSON.parse(localStorage.getItem("profile")));
        };
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        localStorage.removeItem("profile");
        setUser(null);
        navigate("/");
        window.location.reload(); // refresh
    };


    return (
        <div className="flex justify-between items-center border-b border-gray-300 shadow-md px-6 py-4">
            {/* LOGO + TITLU */}
            <Link to="/" className="flex items-center space-x-2">
                <img src={logo} alt="logo" className="h-10 w-auto" />
                <h1 className="text-xl text-gray-800 font-semibold">Travel Memories</h1>
            </Link>

            {/* AUTH */}
            <div>
                {user ? (
                    <div className="flex items-center space-x-4">
                        {user?.result?.picture ? (
                            <img
                                src={user.result.picture}
                                alt={user.result.name}
                                className="h-10 w-10 rounded-full"
                            />
                        ) : (
                            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
                                {user?.result?.name?.charAt(0)}
                            </div>
                        )}
                        <h6 className="text-gray-700">{user?.result?.name}</h6>
                        <button
                            onClick={logout}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link to="/auth">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                            Sign In
                        </button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
