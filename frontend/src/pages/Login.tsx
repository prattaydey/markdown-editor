import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom.ts';
import Error from '../components/ErrorAlert.tsx';
import API_BASE_URL from '../apiConfig.ts';

export default function Login() {
    const setUser = useSetRecoilState(userAtom);
    const [error, setError] = useState(false);

    const [inputs, setInputs] = useState({
		username: "",
		password: "",
	});

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
		try {
			const res = await fetch(`${API_BASE_URL}/api/users/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(inputs),
			});
			const data = await res.json();
			if (data.error) {
				setError(true);
				return;
			}
			localStorage.setItem("user-info", JSON.stringify(data));
			setUser(data);
		} catch (error) {
			console.log(error)
	    }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full bg-white dark:bg-zinc-900">
            <img src="./assets/logo.svg" alt="logo" className="-mt-12 mb-20 w-1/5 h-auto"/>
            <div className="bg-white shadow-md border border-gray-200 rounded-lg w-1/4 h-1/3 p-4 sm:p-6 lg:p-8 dark:bg-zinc-800 dark:border-zinc-700">
                <form className="space-y-6" onSubmit={handleLogin}>
                    <h3 className="text-xl text-center font-medium text-gray-900 dark:text-white">Login</h3>
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
                        onChange={(e) => setInputs((inputs) => ({ ...inputs, username: e.target.value }))}
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="••••••••••••"
                        onChange={(e) => setInputs((inputs) => ({ ...inputs, password: e.target.value }))}
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
            <div className='pt-8'>
                {error && <Error message='Username or password incorrect' />} {/* Conditionally render Error component */}
            </div>
        </div>
    );
};