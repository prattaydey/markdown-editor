import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Error from '../components/ErrorAlert';
import API_BASE_URL from '../apiConfig.ts';

export default function Signup() {
    const [error, setError] = useState(false);

    const [inputs, setInputs] = useState({
        email: "",
        username: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleSignup = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const res = await fetch(`${API_BASE_URL}/api/users/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs),
            });
            const data = await res.json();
            if (data.error){
                setError(true);
                return
            }
            localStorage.setItem("user-info", JSON.stringify(data));
            // Read the content from the defaulttext.txt file
            const welcomeText = await fetch("/defaulttext.txt").then((res) =>
                res.text()
            );
  
            // Create welcome.md file API call
            const createFileRes = await fetch(`${API_BASE_URL}/api/files/create`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    postedBy: data._id,
                    title: "welcome.md",
                    text: welcomeText,
                }),
            });
  
            const createFileData = await createFileRes.json();
            if (createFileData.error) {
                console.log("Error creating welcome file:", createFileData.error);
                return;
            }
            navigate("/");
        } catch (error) {
            console.log("Error", error, "error")
        }
    }
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full bg-white dark:bg-zinc-900">
            <img src="./assets/logo.svg" alt="logo" className="-mt-12 mb-20 w-1/5 h-auto"/>
            <div className="bg-white shadow-md border border-gray-200 rounded-lg w-1/4 h-1/3 p-4 sm:p-6 lg:p-8 dark:bg-zinc-800 dark:border-zinc-700">
                <form className="space-y-6" onSubmit={handleSignup}>
                    <h3 className="text-xl text-center font-medium text-gray-900 dark:text-white">Register</h3>
                    <div>
                        <label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
                        Email
                        </label>
                        <input
                        type="email"
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="name@email.com"
                        onChange={(e) => setInputs({...inputs, email: e.target.value})}
                        value={inputs.email}
                        required
                        />
                    </div>
                    <div>
                        <label
                        htmlFor="username"
                        className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
                        Username
                        </label>
                        <input
                        type="text"
                        name="username"
                        id="username"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="johndoe"
                        onChange={(e) => setInputs({...inputs, username: e.target.value})}
                        value={inputs.username}
                        required
                        />
                    </div>
                    <div>
                        <label
                        htmlFor="password"
                        className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
                        Password
                        </label>
                        <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        onChange={(e) => setInputs({...inputs, password: e.target.value})}
                        value={inputs.password}
                        required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800"
                        >
                        Register
                    </button>
                    <div className="text-sm text-center font-medium text-gray-500 dark:text-gray-300">
                        Already have an account?{' '}
                        <a href="/" className="text-violet-700 hover:underline dark:text-violet-500">
                        Login
                        </a>
                    </div>
                </form>
            </div>
            <div className='pt-8'>
                {error && <Error message='User already exists' />} {/* Conditionally render Error component */}
            </div>
        </div>
    );
};