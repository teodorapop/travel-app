import React from "react";
import { Eye, EyeOff } from "lucide-react"; // opțional pentru iconițe

const Input = ({ name, handleChange, label, half, autoFocus, type, handleShowPassword }) => {
    return (
        <div className={`w-full ${half ? "sm:w-1/2" : "w-full"} px-2 mb-4`}>
            <label htmlFor={name} className="block text-sm font-medium mb-1 text-gray-700">
                {label}
            </label>
            <div className="relative">
                <input
                    id={name}
                    name={name}
                    onChange={handleChange}
                    required
                    autoFocus={autoFocus}
                    type={type}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {name === "password" && handleShowPassword && (
                    <button
                        type="button"
                        onClick={handleShowPassword}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-800"
                    >
                        {type === "password" ? <Eye size={20} /> : <EyeOff size={20} />}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Input;
