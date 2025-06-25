import React, { useState } from "react";
import Input from "./input";
import { GoogleLogin, googleLogout} from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../actions/auth";

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(initialState);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignup) {
            dispatch(signup(formData, navigate));
        } else {
            dispatch(signin(formData, navigate));
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup );
    handleShowPassword(false);
    }

    const googleSuccess = async (res) => {
        try {
            const decoded = jwtDecode(res?.credential);
            // decoded acum conține { name, email, picture, sub, ... }
            dispatch({ type: 'AUTH', data: { result: decoded, token: res?.credential } });
            navigate("/");
        } catch (error) {
            console.error('Error decoding Google credential:', error);
        }
    };

    const googleFail = () => {
        console.log("Error. Try again.");
    }

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white border border-gray-200 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-6">
                {isSignup ? "Sign Up" : "Sign In"}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <div className="flex flex-wrap -mx-2">
                    {isSignup && (
                        <>
                            <Input
                                name="firstName"
                                label="First Name"
                                handleChange={handleChange}
                                autoFocus
                                half
                            />
                            <Input
                                name="lastName"
                                label="Last Name"
                                handleChange={handleChange}
                                half
                            />
                        </>
                    )}
                    <Input
                        name="email"
                        label="Email Address"
                        handleChange={handleChange}
                        type="email"
                    />
                    <Input
                        name="password"
                        label="Password"
                        handleChange={handleChange}
                        type={showPassword ? "text" : "password"}
                        handleShowPassword={handleShowPassword}
                    />
                    {isSignup && (
                        <Input
                            name="confirmPassword"
                            label="Repeat Password"
                            handleChange={handleChange}
                            type="password"
                        />
                    )}
                </div>
                <button
                    type="submit"
                    className="mt-4 w-full bg-blue-500 text-white font-medium rounded-md px-4 py-2 hover:bg-blue-600 transition"
                >
                    {isSignup ? "Sign Up" : "Login"}
                </button>

                <div className="mt-4 w-full flex justify-center">
                    <GoogleLogin
                        onSuccess={googleSuccess}
                        onError={googleFail}
                        size="large"
                        text="signin_with"
                        shape="pill"
                        theme="filled_blue"
                    />
                </div>

                <div className="flex justify-end mt-2">
                    <button
                        type="button"
                        onClick={switchMode}
                        className="text-sm text-blue-500 hover:text-blue-600 focus:outline-none"
                    >
                        {isSignup
                            ? "Already have an account? Sign In"
                            : "Don't have an account? Sign Up"}
                    </button>
                </div>

            </form>
        </div>
    );
};

export default Auth;
