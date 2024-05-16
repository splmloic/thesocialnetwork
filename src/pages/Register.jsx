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
      <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    );
}
export default Register