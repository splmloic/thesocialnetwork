import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { useAtom } from 'jotai';
import { userAtom } from '../atoms/getUser';

function UpdateUser() {
    const token = Cookies.get("token");
    const [user,setUser] = useAtom(userAtom);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        if (user) {
            setUsername(user.username || '');
            setDescription(user.description || '');
            setEmail(user.email || '');
        }
    }, [user]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const data = {
            username: username,
            description: description,
            email: email
        };
        try {
            await fetch(`http://localhost:1337/api/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data)
            });
        }catch (error) {

        } 
    };

    return (
        <div className="max-w-md mx-auto bg-slate-100  p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Updater le Profile</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                    <label className="block text-gray-700 mb-2">Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Description:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
                >
                    Update
                </button>
            </form>
        </div>
    );
}

export default UpdateUser;
