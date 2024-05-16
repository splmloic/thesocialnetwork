import React from 'react'
import Cookies from 'js-cookie';
import {Link, useNavigate} from 'react-router-dom'
function Navbar(){
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('token');
        navigate('/');
    };

    return(
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">login</Link></li>
                <li><Link to="/profil">profil</Link></li>
                <li><Link to="/register">register</Link></li>
                <li><button onClick={handleLogout}>Déconnexion</button></li>
            </ul>
        </div>
    )
}
export default Navbar