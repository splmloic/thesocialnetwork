import React from 'react'
import Cookies from 'js-cookie';
import {Link, useNavigate} from 'react-router-dom'

function Navbar(){
    const navigate = useNavigate();
    const token = Cookies.get("token");

    const Logout = () => {
        Cookies.remove('token');
        navigate('/');
    };

    if(!token){
        return(
            <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">login</Link></li>
                <li><Link to="/register">register</Link></li>
            </ul>
        </div>
        )
    }

    return(
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/profil">profil</Link></li>
                <li><button onClick={Logout}>Déconnexion</button></li>
            </ul>
        </div>
    )
}
export default Navbar