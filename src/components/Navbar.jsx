import React from 'react'
import Cookies from 'js-cookie';
import {Link, useNavigate} from 'react-router-dom'
import {useAtom} from 'jotai'
import { userAtom } from '../atoms/getUser'

function Navbar(){
    const navigate = useNavigate();
    const token = Cookies.get("token");
    const [user] = useAtom(userAtom); 
    const Logout = () => {
        Cookies.remove('token');
        navigate('/');
    };

    if(!token){
        return(
        <nav className='bg-slate-500 p-5 flex justify-center'>
            <ul className='flex'>
                <li><Link to="/" className='text-gray-100 hover:text-gray-300'>Home</Link></li>
                <li><Link to="/login" className='text-gray-100 hover:text-gray-300'>login</Link></li>
                <li><Link to="/register" className='text-gray-100 hover:text-gray-300'>register</Link></li>
            </ul>
        </nav>
        )
    }

    return(
        <nav className='bg-slate-500 p-5 flex justify-center'>
            <ul className='flex'>
                <li className='mr-6'><Link to="/" className='text-gray-100 hover:text-gray-300'>Home</Link></li>
                <li className='mr-6'><Link to={`/profil/${user.username}`} className='text-gray-100 hover:text-gray-300'>Profil</Link></li>
                <li className='mr-6' ><button onClick={Logout} className='bg-transparent text-gray-100 hover:text-gray-300 rounded-full'>Déconnexion</button></li>
            </ul>
        </nav>
    )
}
export default Navbar