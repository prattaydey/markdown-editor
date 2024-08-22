import React from 'react';

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-white dark:bg-zinc-900">
        <img src="./assets/logo.svg" alt="logo" className="-mt-12 mb-20 w-1/5 h-auto"/>
        <div className="bg-white shadow-md border border-gray-200 rounded-lg w-1/4 h-1/3 p-4 sm:p-6 lg:p-8 dark:bg-zinc-800 dark:border-zinc-700">
            <form className="space-y-6" action="#">
                <h3 className="text-xl text-center font-medium text-gray-900 dark:text-white">Login</h3>
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
                    required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800">
                    Login
                </button>
                <div className="text-sm text-center font-medium text-gray-500 dark:text-gray-300">
                    Not registered?{' '}
                    <a href="/register" className="text-violet-700 hover:underline dark:text-violet-500">
                    Sign Up
                    </a>
                </div>
            </form>
        </div>
    </div>
  );
};

export default Login;