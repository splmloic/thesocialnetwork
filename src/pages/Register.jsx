import React, { useState }  from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'

function Register(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const data = {
        username: username,
        email: email,
        password: password
      };
  
      try {
        const response = await fetch('http://localhost:1337/api/auth/local/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
  
        const responseData = await response.json();
        Cookies.set('token', responseData.jwt);
  
        navigate('/login');
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    return (
      <div className="container mx-auto flex flex-col items-center bg-orange-50">
      <div className="p-4 bg-slate-100 rounded-md shadow-md">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="self-end px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
>Register</button>
        </form>
      </div>
    </div>
    );
}
export default Register