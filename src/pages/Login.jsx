import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'

function Login(){
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
      const token = Cookies.get('token');
      if (token) {
        navigate('/');
      }
    }, []); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            identifier: identifier,
            password: password
          };
          try {
            const response = await fetch('http://localhost:1337/api/auth/local', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
        });
            const responseData = await response.json();
            Cookies.set('token', responseData.jwt);

            navigate('/');
        } catch (error) {
            console.error('Error:', error);
        }

    }
    return(
        <div>
            <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Login:</label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
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
          <button type="submit">Login</button>
        </form>
        </div>
    )
}
export default Login